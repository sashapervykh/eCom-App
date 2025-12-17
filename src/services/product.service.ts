import { supabase } from '../libs/supabase/client';
import { Product } from '../libs/supabase/types';

class ProductService {
  tableName = 'products';

  protected get query() {
    return supabase.from(this.tableName);
  }

  async getAll() {
    const { data, error } = await this.query.select<'*', Product>();
    if (error) {
      throw error;
    }

    return data;
  }

  async getByCategory(categoryId: string) {
    const { data, error } = await this.query.select<'*', Product>().eq('category_id', categoryId);

    if (error) {
      throw error;
    }

    return data;
  }

  async getById(id: number) {
    const { data, error } = await this.query.select<'*', Product>().eq('id', id).single();

    if (error) {
      throw error;
    }

    return data;
  }
}

export const productService = new ProductService();
