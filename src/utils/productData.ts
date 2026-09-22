import type { ProductFamily } from '../types/product';
import dinMetricFittings from '../data/products/din-metric-fittings.json';
import jicTubeFittings from '../data/products/jic-tube-fittings.json';
import orfsFittings from '../data/products/orfs-fittings.json';
import conversionAdaptors from '../data/products/conversion-adaptors.json';
import doubleFerrule from '../data/products/double-ferrule.json';
import customFittings from '../data/products/custom-fittings.json';

export function getAllProductFamilies(): ProductFamily[] {
  return [
    dinMetricFittings as ProductFamily,
    jicTubeFittings as ProductFamily,
    orfsFittings as ProductFamily,
    conversionAdaptors as ProductFamily,
    doubleFerrule as ProductFamily,
    customFittings as ProductFamily,
  ];
}

export function getProductFamilyBySlug(slug: string): ProductFamily | undefined {
  return getAllProductFamilies().find(family => family.slug === slug);
}
