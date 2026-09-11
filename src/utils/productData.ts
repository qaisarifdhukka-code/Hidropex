import type { ProductFamily } from '../types/product';
import dinMetricFittings from '../data/products/din-metric-fittings.json';

// In the future, import more files here:
// import jicTubeFittings from '../data/products/jic-tube-fittings.json';
// import orfsFittings from '../data/products/orfs-fittings.json';

export function getAllProductFamilies(): ProductFamily[] {
  return [
    dinMetricFittings as ProductFamily,
    // jicTubeFittings as ProductFamily,
    // orfsFittings as ProductFamily,
  ];
}

export function getProductFamilyBySlug(slug: string): ProductFamily | undefined {
  return getAllProductFamilies().find(family => family.slug === slug);
}
