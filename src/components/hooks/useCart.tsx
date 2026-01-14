import { createContext, useContext, useState } from 'react';
import {
  addToCart,
  removeFromCart,
  getBasketItems,
  isProductInCart,
  BasketItem,
  // getFullCartInfo,
  deleteCart,
  addPromoCodeCart,
  checkPromoCodeExistence,
  // getPromoCodeByID,
  removePromoCodeByID,
} from '../../utilities/return-basket-items';
// import { formatPrice } from '../../utilities/format-price';
import { Image } from '@commercetools/platform-sdk';
import { CartItem, cartService } from '../../services/cart.service';

type RemovingType = Record<string, boolean>;
type ChangingType = Record<string, boolean | number>;
export interface CartProductType {
  id: string;
  name: string;
  price: string;
  totalPrice: string;
  fullPrice?: number;
  images?: Image[];
  quantity: number;
  fullProductPrice?: number;
}
export interface CartPageDataType {
  id: string;
  version?: number;
  code?: string | undefined;
  codeId?: string | undefined;
  isDiscountApplied?: boolean;
  totalCartPrice?: number;
  cartProducts: CartItem[];
  fullCartPrice?: number;
}

interface CartContextType {
  productsInCartAmount: number | undefined;
  updateProductsInCartAmount: () => void;
  addToCart: (productId: number, quantity?: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  isProductInCart: (productId: number) => Promise<boolean>;
  getBasketItems: () => Promise<BasketItem[]>;
  removingProducts: RemovingType;
  setRemovingProducts: React.Dispatch<React.SetStateAction<RemovingType>>;
  productsWithChangedAmount: ChangingType;
  setProductsWithChangedAmount: React.Dispatch<React.SetStateAction<ChangingType>>;
  getCartPageData: () => Promise<void>;
  cartPageData: CartPageDataType | undefined;
  setCartPageData: React.Dispatch<React.SetStateAction<CartPageDataType | undefined>>;
  isCartPageLoading: boolean;
  isCartDeleting: boolean;
  clearCart: () => Promise<void>;
  addPromoCode: (cartId: string, version: number, key: string) => Promise<string | undefined>;
  removePromoCode: (cartId: string, version: number, codeId: string) => Promise<void>;
  isDiscountInProcess: boolean;
  updateProductQuantity: (productId: string, quantity: number) => Promise<void>;
}

const CartContext = createContext<CartContextType>({} as CartContextType);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [productsInCartAmount, setProductsInCartAmount] = useState<number | undefined>(undefined);
  const [removingProducts, setRemovingProducts] = useState<RemovingType>({});
  const [productsWithChangedAmount, setProductsWithChangedAmount] = useState<ChangingType>({});
  const [cartPageData, setCartPageData] = useState<CartPageDataType | undefined>(undefined);
  const [isCartPageLoading, setIsCartPageLoading] = useState(false);
  const [isCartDeleting, setIsCartDeleting] = useState(false);
  const [isDiscountInProcess, setIsDiscountInProcess] = useState(false);

  const getCartPageData = async () => {
    setIsCartPageLoading(true);
    try {
      const cart = await cartService.getOrCreateCart();
      if (!cart) throw new Error('Cart data is not received');
      const totalCartPrice = cart.items.reduce(
        (accumulator, current) => accumulator + current.quantity * current.price_at_add,
        0,
      );
      setCartPageData({
        id: cart.id,
        totalCartPrice,
        cartProducts: cart.items.sort((a, b) => a.product_id - b.product_id),
      });

      setIsCartPageLoading(false);
    } catch (error) {
      console.error('Error fetching cart data:', error);
      setIsCartPageLoading(false);
    }
  };

  const updateProductQuantity = async (productId: string, quantity: number) => {
    await cartService.updateProductQuantity(productId, quantity);
  };

  const updateProductsInCartAmount = async () => {
    const cart = await getBasketItems();
    setProductsInCartAmount(cart.length);
  };

  const addPromoCode = async (cartId: string, version: number, promo: string) => {
    const isPromoExist = await checkPromoCodeExistence(promo);
    if (isPromoExist) {
      setIsDiscountInProcess(true);
      await addPromoCodeCart(cartId, version, promo);
      await getCartPageData();
      setIsDiscountInProcess(false);
      return;
    } else if (isPromoExist === false) {
      setIsDiscountInProcess(false);
      return 'This code does not exist';
    } else {
      setIsDiscountInProcess(false);
      return 'The promo code was not applied. Please try again';
    }
  };

  const removePromoCode = async (cartId: string, version: number, codeId: string) => {
    setIsDiscountInProcess(true);
    await removePromoCodeByID(cartId, version, codeId);
    await getCartPageData();
    setIsDiscountInProcess(false);
  };

  const addProductToCart = async (productId: number, quantity = 1) => {
    await addToCart(productId, quantity);
    await updateProductsInCartAmount();
  };

  const removeProductFromCart = async (productId: number) => {
    await removeFromCart(productId);
    await updateProductsInCartAmount();
  };

  const checkProductInCart = async (productId: number) => {
    return await isProductInCart(productId);
  };

  const clearCart = async () => {
    try {
      setIsCartDeleting(true);
      await deleteCart();

      await getCartPageData();
      setIsCartDeleting(false);
    } catch (error) {
      console.error('Error while deleting the cart:', error);
    }
  };

  const CartContextValue = {
    addToCart: addProductToCart,
    removeFromCart: removeProductFromCart,
    isProductInCart: checkProductInCart,
    getBasketItems: getBasketItems,
    updateProductsInCartAmount: updateProductsInCartAmount,
    productsInCartAmount: productsInCartAmount,
    removingProducts,
    setRemovingProducts,
    productsWithChangedAmount,
    setProductsWithChangedAmount,
    getCartPageData,
    cartPageData,
    setCartPageData,
    isCartPageLoading,
    isCartDeleting,
    clearCart,
    addPromoCode,
    removePromoCode,
    isDiscountInProcess,
    updateProductQuantity,
  };

  return <CartContext.Provider value={CartContextValue}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
