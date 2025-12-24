import { DEVELOPERS_NAMES } from '../constants/constants';
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
    developers,
    sort,
  }: {
    categoryKey?: string;
    price: [number, number];
    area: [number, number];
    floors: Record<string, boolean> | undefined;
    developers?: Record<string, boolean>;
    sort?: string;
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

    if (developers) {
      const developersArray = Object.entries(developers)
        .filter((element) => element[1])
        .map((element) => element[0])
        .map((developerKey) => {
          return DEVELOPERS_NAMES[developerKey];
        })
        .filter(Boolean);
      if (developersArray.length) query = query.in('developer', developersArray);
    }

    query = query.gte('price', price[0]);
    query = query.lte('price', price[1]);
    query = query.gte('area', area[0]);
    query = query.lte('area', area[1]);

    if (sort && sort !== 'None') {
      switch (true) {
        case sort === 'price ASC': {
          query = query.order('price', { ascending: true });
          break;
        }
        case sort === 'price DESC': {
          query = query.order('price', { ascending: false });
          break;
        }
        case sort === 'name.en-US ASC': {
          query = query.order('name', { ascending: true });
          break;
        }
        case sort === 'name.en-US DESC': {
          query = query.order('name', { ascending: false });
          break;
        }
      }
    }

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
