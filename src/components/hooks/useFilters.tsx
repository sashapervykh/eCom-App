import { createContext, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Filters {
  sort: string | undefined;
  search: string | undefined;
  category?: string;
  subcategory?: string;
  limit?: number;
  offset?: number;
  price: [number, number];
  area: [number, number];
  floors?: number;
  developers?: string;
}

interface FiltersContextType {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const FiltersContext = createContext<FiltersContextType>({} as FiltersContextType);

export const FiltersProvider = ({ children }: { children: React.ReactNode }) => {
  const { category } = useParams<{
    category?: string;
  }>();
  const [filters, setFilters] = useState<Filters>({
    sort: undefined,
    search: undefined,
    category: category,
    subcategory: undefined,
    limit: undefined,
    offset: undefined,
    price: [0, 1000000],
    area: [0, 1000],
    floors: undefined,
    developers: undefined,
  });

  const FiltersContextValue = {
    filters,
    setFilters,
  };

  return <FiltersContext.Provider value={FiltersContextValue}>{children}</FiltersContext.Provider>;
};

export const useFilters = () => useContext(FiltersContext);
