import { Product } from "@shopware-pwa/types";

/**
 * get the thumbnail image URL with the smallest width
 * 
 * @deprecated use `getSmallestThumbnailUrl` helper instead
 * 
 * @param {Product} product product entity
 *
 * @beta
 *
 * @category Product
 */
export function getProductThumbnailUrl(product: Product): string {
  const coverImageUrlFallback = product?.cover?.media?.url || "";
  const thumbnailImage =
    (product?.cover?.media?.thumbnails?.length &&
      product.cover.media.thumbnails.reduce(function (res, thumb) {
        return thumb.width < res.width ? thumb : res;
      })) ||
    null;
  return thumbnailImage?.url || coverImageUrlFallback;
}
