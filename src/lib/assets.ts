const altecRoot = "/altec";
const imageRoot = `${altecRoot}/images`;

export const assetRoots = {
  images: imageRoot,
  brandImages: `${imageRoot}/brand`,
  productImages: `${imageRoot}/products`,
  productDetails: `${imageRoot}/details`,
  applicationCovers: `${imageRoot}/applications`,
  applicationDetails: `${imageRoot}/applications/details`,
  downloads: `${altecRoot}/downloads`,
  legacy: `${imageRoot}/legacy`,
  optimized: `${imageRoot}/optimized`,
} as const;

export const brandLogo = `${assetRoots.brandImages}/altec-logo.svg`;
export const brandFavicon = `${assetRoots.brandImages}/favicon.ico`;

function joinAssetPath(root: string, ...segments: string[]) {
  return [root, ...segments.map((segment) => segment.replace(/^\/+|\/+$/g, ""))].join("/");
}

export function productImageFile(fileName: string) {
  return joinAssetPath(assetRoots.productImages, fileName);
}

export function productDetailImage(model: string, fileName: string) {
  return joinAssetPath(assetRoots.productDetails, model, fileName);
}

export function applicationCoverImage(fileName: string) {
  return joinAssetPath(assetRoots.applicationCovers, fileName);
}

export function applicationDetailImage(group: string, fileName: string) {
  return joinAssetPath(assetRoots.applicationDetails, group, fileName);
}

export function downloadAsset(fileName: string) {
  return joinAssetPath(assetRoots.downloads, fileName);
}

export const productImageFiles = {
  AL807: "AL807.jpg",
  AL808: "AL808.jpg",
  AL810: "AL810.jpg",
  AL830: "AL830.jpg",
  PC900: "PC900.jpg",
  D4: "D4.jpg",
  DC220: "DC220.jpg",
  TC818: "TC818.jpg",
  TC808: "TC808.jpg",
  TC930: "TC930.jpg",
  TC950: "TC950.jpg",
  AL210: "AL210.jpg",
  CTS: "CTS.jpg",
  HTS: "HTS.jpg",
  LXA: "LXA.jpg",
  SUP: "SUP.jpg",
  TH135: "TH135.jpg",
  TH136: "TH136.jpg",
  MTC35: "MTC35.jpg",
  "pH/ORP800": "PH800.jpg",
  CPC316: "CPC316.jpg",
} as const;

export type ProductImageModel = keyof typeof productImageFiles;

export function productImage(model: ProductImageModel) {
  return productImageFile(productImageFiles[model]);
}

export const brandOgImage = productImage("AL808");
