import { ProductColor } from "../types/product";

export function getColor(color: ProductColor) {
    if (color.colorType === "custom") {
        return color.customValue?.hex;
    }

    if (color.colorType === "standard") {
        return color.standardColor?.value?.hex;
    }

    return undefined;
}

export function getColorName(color: ProductColor) {
    if (color.colorType === "custom") {
        return color.customName || "";
    }

    if (color.colorType === "standard") {
        return color.standardColor?.title || "";
    }

    return "";
}