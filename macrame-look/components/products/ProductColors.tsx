import { getColor, getColorName } from '@/lib/actions/product';
import { ProductColor } from '@/lib/types/product';

type ProductColorsProps = {
    colors?: ProductColor[];
};

const ProductColors = ({ colors }: ProductColorsProps) => {
    if (!colors || colors.length === 0) {
        return null;
    }

    return (
        <div className="colors-block">
            {colors.slice(0, 5).map((color, index) => {
                const hex = getColor(color);

                if (!hex) return null;

                return (
                    <span
                        key={`${hex}-${index}`}
                        title={getColorName(color)}
                        className="color-item"
                        style={{
                            backgroundColor: hex,
                        }}
                    />
                );
            })}
        </div>
    )
}

export default ProductColors
