export type ProductMeta = {
  id: string;
  image: string;
  url: string;
};

/** Metadata no traducible (imágenes, URLs) */
export const productsMeta: ProductMeta[] = [
  {
    id: 'matchly',
    image: '/products/matchlyproduct.png',
    url: 'https://www.matchlysports.com/',
  },
];

export function getProductMeta(id: string): ProductMeta | undefined {
  return productsMeta.find((p) => p.id === id);
}
