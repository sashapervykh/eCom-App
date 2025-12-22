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

  async getFilteredProducts({
    categoryKey,
    price,
    area,
    floors,
  }: {
    categoryKey?: string;
    price: [number, number];
    area: [number, number];
    floors: Record<string, boolean> | undefined;
    developers?: { '1': boolean; '2': boolean; '3': boolean };
  }) {
    let query = this.query.select<'*', Product>();

    if (categoryKey) {
      query = query.eq('category_id', categoryKey);
    }

    if (floors) {
      const floorsArray = Object.entries(floors)
        .filter((element) => element[1])
        .map((element) => element[0]);
      if (floorsArray.length) query = query.in('floors', floorsArray);
    }

    query = query.gte('price', price[0]);
    query = query.lte('price', price[1]);
    query = query.gte('area', area[0]);
    query = query.lte('area', area[1]);

    const { data, error } = await query;

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
