import { Button, Card, Skeleton, Text } from '@gravity-ui/uikit';
import styles from './styles.module.css';
import { AmountController } from './amount-controller/amount-controller';
import { useCart } from '../../../../components/hooks/useCart';
import { TrashBin } from '@gravity-ui/icons';
import { useState } from 'react';
import { RemovedProduct } from '../../../../components/removing-message/removing-message';
import { formatPrice } from '../../../../utilities/format-price';
import { CartItem } from '../../../../services/cart.service';

export function CartProduct({ product }: { product: CartItem }) {
  const { productsWithChangedAmount, removeFromCart, setRemovingProducts } = useCart();
  const { getCartPageData } = useCart();
  const { removingProducts } = useCart();
  const [isRemoving, setIsRemoving] = useState<boolean | undefined>(removingProducts[product.id]);
  const totalCurrentProductPrice = product.quantity * product.price_at_add;
  let totalFullProductPrice;

  if (product.product?.fullPrice) totalFullProductPrice = product.quantity * product.product.fullPrice;

  const handleRemoveClick = async () => {
    setIsRemoving(true);
    setRemovingProducts((previous) => {
      previous[product.id] = true;
      return previous;
    });
    await removeFromCart(product.product_id);
    await getCartPageData();
  };

  return (
    <Card key={product.id} className={styles['product-wrapper']}>
      {isRemoving && <RemovedProduct />}
      <img className={styles.image} src={product.product?.images[0] ?? ''}></img>
      <div className={styles['part-wrapper']}>
        <div className={styles['product-part']}>
          <div className={`${styles.name} ${styles.line}`}>
            <Text className={`${styles.name} ${styles.line}`} variant="body-2">
              {product.product?.name}
            </Text>
          </div>
          <Text className={styles.line} variant="body-2">
            <b>Unit price:</b>{' '}
            {product.product?.fullPrice ? (
              <div>
                <div className={styles['discounted-price']}>${formatPrice(product.product.price)}</div>{' '}
                <div className={styles['full-price']}>${formatPrice(product.product.fullPrice)}</div>{' '}
              </div>
            ) : (
              <div>${product.product?.price}</div>
            )}
          </Text>
        </div>
        <div className={styles['product-part']}>
          <AmountController product={product} />
          <div className={styles.line}>
            <Text variant="body-2">
              <b>Total:</b>{' '}
            </Text>
            <div className={styles['total-wrapper']}>
              {productsWithChangedAmount[product.id] ? (
                <Skeleton className={styles.total} />
              ) : (
                <>
                  {product.product?.fullPrice ? (
                    <div className={styles['total-prices']}>
                      <Text variant="body-2" className={styles['discounted-price']}>
                        ${formatPrice(totalCurrentProductPrice)}
                      </Text>{' '}
                      <Text variant="body-2" className={styles['full-price']}>
                        ${formatPrice(totalFullProductPrice)}
                      </Text>{' '}
                    </div>
                  ) : (
                    <div>${formatPrice(totalCurrentProductPrice)}</div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <div className={styles['product-part']}>
          <Button
            view="action"
            className={styles['remove-button']}
            onClick={async () => {
              await handleRemoveClick();
            }}
          >
            <div className={styles['remove-container']}>
              <div>Remove</div> <TrashBin className={styles['remove-icon']} />
            </div>
          </Button>
        </div>
      </div>
    </Card>
  );
}
