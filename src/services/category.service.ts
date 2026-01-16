import { supabase } from '../shared/api/client';
import { Category } from '../libs/supabase/types';

class CategoryService {
  tableName = 'categories';

  protected get query() {
    return supabase.from(this.tableName);
  }

  async getAll() {
    const { data, error } = await this.query.select<'*', Category>();
    if (error) {
      throw error;
    }

    return data;
  }

  async getByName(name: string) {
    const { data, error } = await this.query.select<'*', Category>().eq('name', name).single();
    if (error) {
      throw error;
    }
    return data;
  }
}

export const categoryService = new CategoryService();
