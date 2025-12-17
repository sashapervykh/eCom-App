// import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { Card, Text } from '@gravity-ui/uikit';
import { useNavigate } from 'react-router-dom';
// import { AddToCartButton } from '../../../../../components/add-to-cart-button/add-to-cart-button';
import { Product } from '../../../../../libs/supabase/types';

export function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();
  // const [isImageLoaded, setIsImageLoaded] = useState(false);
  // const [hasError, setHasError] = useState(false);

  // useEffect(() => {
  //   setIsImageLoaded(false);
  //   setHasError(false);
  // }, [product.id]);
  console.log(product);
  return (
    <Card
      type="selection"
      view="raised"
      key={product.id}
      className={styles.wrapper}
      onClick={() => navigate(`/products/${product.id.toString()}`)}
    >
      <div className={styles['content-wrapper']}>
        {/* <div className={styles['image-wrapper']}>
          {productInfo.images.map((image, index) => (
            <div key={index}>
              {!isImageLoaded && !hasError && (
                <div className={styles.loader}>
                  <Spin size="m" />
                </div>
              )}
              <img
                className={styles.image}
                src={image.url}
                alt={image.label}
                loading="lazy"
                onLoad={() => setIsImageLoaded(true)}
                onError={() => setHasError(true)}
                style={{
                  opacity: isImageLoaded ? 1 : 0,
                  transition: 'opacity 0.3s ease-in-out',
                }}
              />
              {hasError && (
                <div className={styles.errorPlaceholder}>
                  <Text color="danger">Image not available</Text>
                </div>
              )}
            </div>
          ))}
        </div> */}
        <div className={styles['text-wrapper']}>
          <Text variant="body-2" className={styles.text}>
            <b>Name:</b> {product.name}
          </Text>
          <Text variant="body-2" className={styles.text}>
            <b>Price:</b> ${product.price}{' '}
            {product.fullPrice ? <span className={styles['full-price']}>${product.fullPrice}</span> : ''}
          </Text>
          <Text variant="body-2" className={`${styles.text} ${styles.description}`} ellipsis ellipsisLines={5}>
            <b>Description:</b> {product.description}
          </Text>
        </div>
      </div>
      <div className={styles['actions-wrapper']}>
        Button to add
        {/* <AddToCartButton product={product} /> */}
      </div>
    </Card>
  );
}
