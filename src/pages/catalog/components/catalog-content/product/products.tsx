import { ProductCard } from './product';
import styles from './styles.module.css';
import { Text } from '@gravity-ui/uikit';
import { useProducts } from '../../../../../components/hooks/useProducts';
import { Product } from '../../../../../libs/supabase/types';

export function ProductsList({ productsInfo }: { productsInfo: Product[] }) {
  const { isFiltersOpen } = useProducts();

  return productsInfo.length === 0 ? (
    <Text
      className={styles.message}
      variant="subheader-3"
    >{`It seems that we don't have similar products. Try another options...`}</Text>
  ) : (
    <div className={`${styles['product-list']} ${isFiltersOpen ? styles['product-list-hidden'] : ''}`}>
      {productsInfo.map((product) => (
        <ProductCard key={product.name} product={product} />
      ))}
    </div>
  );
}
