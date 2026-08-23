"use client";

import { getColor, getColorName } from "@/lib/actions/product";
import { ProductColor } from "@/lib/types/product";

type ProductColorsProps = {
    colors?: ProductColor[];
    selectedColor?: ProductColor | null;
    onSelectColor?: (
        color: ProductColor
    ) => void;
};

const ProductColors = ({
    colors,
    selectedColor,
    onSelectColor,
}: ProductColorsProps) => {
    if (!colors || colors.length === 0) {
        return null;
    }

    return (
        <div className="colors-block">
            {colors.slice(0, 5).map(
                (color, index) => {
                    const hex = getColor(color);

                    if (!hex) {
                        return null;
                    }

                    const isSelected = selectedColor?._key === color._key;

                    return (
                        <button
                            key={
                                color._key ??
                                `${hex}-${index}`
                            }
                            type="button"
                            title={getColorName(color)}
                            aria-label={`Ընտրել ${getColorName(
                                color
                            )}`}
                            onClick={() => onSelectColor?.(color)}
                            className={`
                                color-item
                                ${
                                    isSelected
                                        ? "color-item-selected"
                                        : ""
                                }
                            `}
                            style={{ backgroundColor: hex }}
                        />
                    );
                }
            )}
        </div>
    );
};

export default ProductColors;