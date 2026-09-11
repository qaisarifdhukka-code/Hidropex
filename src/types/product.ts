export interface DimensionalData {
  tubeOD: string;
  partNo: string;
  thread: string;
  l?: string;
  s1?: string;
  d?: string;
  [key: string]: string | undefined; // For other dynamic dimensional attributes
}

export interface ProductSpec {
  category: string;
  tubeODRange: string;
  partType: string;
}

export interface ProductDetail {
  slug: string;
  name: string;
  description: string;
  specs: ProductSpec;
  dimensionalData: DimensionalData[];
  bodyDrawingUrl?: string;
  assemblyDrawingUrl?: string;
  productImageUrl?: string;
  brochureUrl?: string;
}

export interface ProductGroup {
  slug: string;
  name: string;
  series: string; // e.g., "Straight Series"
  groupImageUrl: string;
  products: ProductDetail[];
}

export interface ProductFamily {
  slug: string; // e.g., "din-metric-fittings"
  name: string;
  description: string;
  seriesList: string[]; // List of all series for the sidebar
  groups: ProductGroup[];
}
