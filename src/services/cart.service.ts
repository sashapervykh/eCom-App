import { supabase } from '../shared/api/client';
import { v4 as uuidv4 } from 'uuid';
import { Product } from '../libs/supabase/types';

export interface CartItem {
  id: string;
  product_id: number;
  quantity: number;
  price_at_add: number;
  totalPrice?: number;
  fullProductPrice?: number;
  product?: Product;
}

export interface Cart {
  id: string;
  user_id: string | null;
  session_id: string;
  items: CartItem[];
}

class CartService {
  private sessionId: string;

  constructor() {
    this.sessionId = this.getSessionId();
  }

  private getSessionId(): string {
    let sessionId = localStorage.getItem('cart_session_id');
    if (!sessionId) {
      sessionId = uuidv4();
      localStorage.setItem('cart_session_id', sessionId);
    }
    return sessionId;
  }

  async getOrCreateCart(): Promise<Cart | null> {
    try {
      const userId = await this.getUserId();
      let query = supabase
        .from('carts')
        .select(
          `
          *,
          items:cart_items(
            *,
            product:products(*)
          )
        `,
        )
        .eq('status', 'active');

      if (userId) {
        query = query.eq('user_id', userId);
      } else {
        query = query.eq('session_id', this.sessionId);
      }

      const { data: cart, error } = await query.single<Cart>();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching cart:', error);
        return null;
      }

      if (!cart) {
        const newCart = await this.createCart();
        return newCart;
      }

      return {
        id: cart.id,
        user_id: cart.user_id,
        session_id: cart.session_id,
        items: cart.items,
      };
    } catch (error) {
      console.error('Error in getOrCreateCart:', error);
      return null;
    }
  }

  private async createCart(): Promise<Cart | null> {
    const userId = await this.getUserId();

    const { data: cart, error } = await supabase
      .from('carts')
      .insert({
        session_id: this.sessionId,
        user_id: userId,
      })
      .select()
      .single<Cart>();

    if (error) {
      console.error('Error creating cart:', error);
      return null;
    }

    return {
      ...cart,
      items: [],
    };
  }

  async addToCart(productId: number, quantity = 1): Promise<boolean> {
    try {
      const { data: product, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single<Product | null>();

      if (productError || !product) {
        console.error('Product not found:', productError);
        return false;
      }

      const cart = await this.getOrCreateCart();
      if (!cart) return false;

      const existingItem = cart.items.find((item) => item.product_id === productId);

      if (existingItem) {
        const { error } = await supabase
          .from('cart_items')
          .update({
            quantity: existingItem.quantity + quantity,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingItem.id);

        return !error;
      } else {
        const { error } = await supabase.from('cart_items').insert({
          cart_id: cart.id,
          product_id: productId,
          quantity: quantity,
          price_at_add: product.price,
        });

        return !error;
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      return false;
    }
  }

  private async getUserId() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error('The user data was not found');
    }
    return user ? user.id : null;
  }

  async clear() {
    const { data: cartData, error: cartError } = await supabase
      .from('carts')
      .select('id')
      .eq('session_id', this.sessionId)
      .single();

    if (cartError || typeof cartData.id !== 'string') {
      return false;
    }
    const { error } = await supabase.from('cart_items').delete().eq('cart_id', cartData.id);

    return !error;
  }

  async removeFromCart(itemId: number): Promise<boolean> {
    const { data: cartData, error: cartError } = await supabase
      .from('carts')
      .select('id')
      .eq('session_id', this.sessionId)
      .single();

    if (cartError || typeof cartData.id !== 'string') {
      return false;
    }
    const { error } = await supabase.from('cart_items').delete().eq('product_id', itemId).eq('cart_id', cartData.id);

    return !error;
  }

  async updateProductQuantity(productId: string, quantity: number) {
    const { error } = await supabase.from('cart_items').update({ quantity: quantity }).eq('id', productId);

    return !error;
  }
}

export const cartService = new CartService();
