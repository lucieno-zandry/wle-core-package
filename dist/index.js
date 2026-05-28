"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  getLandingAbleLabel: () => getLandingAbleLabel,
  getLandingAbleMeta: () => getLandingAbleMeta,
  getLandingAbleThumbnail: () => getLandingAbleThumbnail,
  getLandingAbleType: () => getLandingAbleType,
  isAppImage: () => isAppImage,
  isCategory: () => isCategory,
  isProduct: () => isProduct,
  isVariant: () => isVariant
});
module.exports = __toCommonJS(index_exports);

// src/utils/landing-able-guards.ts
function isProduct(able) {
  if (!able) return false;
  return "slug" in able && "title" in able && "description" in able && !("sku" in able) && !("url" in able);
}
function isVariant(able) {
  if (!able) return false;
  return "sku" in able && "price" in able && "stock" in able && "product_id" in able;
}
function isCategory(able) {
  if (!able) return false;
  return "title" in able && !("slug" in able) && !("sku" in able) && !("url" in able);
}
function isAppImage(able) {
  if (!able) return false;
  return "url" in able && "width" in able && "height" in able;
}
function getLandingAbleLabel(able) {
  if (!able) return "\u2014";
  if (isProduct(able)) return able.title;
  if (isVariant(able)) return `SKU: ${able.sku}`;
  if (isCategory(able)) return able.title;
  if (isAppImage(able)) return `Image #${able.id}`;
  return "\u2014";
}
function getLandingAbleType(able) {
  if (!able) return "None";
  if (isProduct(able)) return "Product";
  if (isVariant(able)) return "Variant";
  if (isCategory(able)) return "Category";
  if (isAppImage(able)) return "Image";
  return "Unknown";
}
function getLandingAbleThumbnail(able) {
  if (!able) return null;
  if (isProduct(able)) return able.images?.[0]?.url ?? null;
  if (isVariant(able)) return able.image?.url ?? null;
  if (isAppImage(able)) return able.url;
  return null;
}
function getLandingAbleMeta(able) {
  if (!able) return "";
  if (isProduct(able)) {
    const variantCount = able.variants?.length ?? 0;
    return able.category?.title ? `${able.category.title} \xB7 ${variantCount} variant${variantCount !== 1 ? "s" : ""}` : `${variantCount} variant${variantCount !== 1 ? "s" : ""}`;
  }
  if (isVariant(able)) {
    return `$${able.price.toFixed(2)} \xB7 ${able.stock} in stock`;
  }
  if (isCategory(able)) {
    return able.parent_id ? `Sub-category` : "Root category";
  }
  if (isAppImage(able)) {
    return `${able.width}\xD7${able.height}px`;
  }
  return "";
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getLandingAbleLabel,
  getLandingAbleMeta,
  getLandingAbleThumbnail,
  getLandingAbleType,
  isAppImage,
  isCategory,
  isProduct,
  isVariant
});
