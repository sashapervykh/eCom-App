import { useState, useEffect } from 'react';
import { Category } from '../../libs/supabase/types';
import { categoryService } from '../../services/category.service';

export interface CategoryInfo {
  id: number;
  key: string;
  name: string;
  subcategories?: CategoryInfo[];
}

export function useCategories() {
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setIsLoading(true);
        const data = await categoryService.getAll();
        const categoryMap = new Map<number, CategoryInfo>();
        const rootCategories: CategoryInfo[] = [];

        data.forEach((category: Category) => {
          categoryMap.set(category.id, {
            id: category.id,
            key: category.name,
            name: category.name,
            subcategories: [],
          });
        });

        data.forEach((category: Category) => {
          const currentCategory = categoryMap.get(category.id);
          if (!currentCategory) return;
          if (category.parent_id) {
            const parent = categoryMap.get(category.parent_id);
            if (parent) {
              parent.subcategories ??= [];
              parent.subcategories.push(currentCategory);
            }
          } else {
            rootCategories.push(currentCategory);
          }
        });

        setCategories(rootCategories);
      } catch (_) {
        setError('Failed to get categories from API');
      } finally {
        setIsLoading(false);
      }
    }

    void fetchCategories();
  }, []);

  return { categories, isLoading, error };
}
