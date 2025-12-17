import { supabase } from '../libs/supabase/client';
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
}

export const categoryService = new CategoryService();
