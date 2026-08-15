"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { urlFor } from "@/lib/sanity/image";
import { ProductGalleryProps } from "@/lib/types/product";

export default function ProductGallery({
    images,
    title,
}: ProductGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    if (!images?.length) {
        return (
            <div className="flex aspect-4/3 items-center justify-center rounded-2xl bg-ivory">
                <span className="text-sm text-ink">
                    Նկար չկա
                </span>
            </div>
        );
    }

    const selectedImage = images[selectedIndex];

    const previousImage = () => {
        setSelectedIndex((current) =>
            current === 0 ? images.length - 1 : current - 1
        );
    };

    const nextImage = () => {
        setSelectedIndex((current) =>
            current === images.length - 1 ? 0 : current + 1
        );
    };

    return (
        <div className="w-full">
            {/* Desktop Gallery */}
            <div className="flex gap-3">
                {/* Thumbnails */}
                {images.length > 0 && (
                    <div className="hidden w-16 shrink-0 flex-col gap-3 sm:flex">
                        {images.map((image, index) => {
                            const isSelected = index === selectedIndex;

                            return (
                                <button
                                    key={
                                        image._key ??
                                        `${image.asset._ref}-${index}`
                                    }
                                    type="button"
                                    onClick={() =>
                                        setSelectedIndex(index)
                                    }
                                    aria-label={`Դիտել նկար ${index + 1}`}
                                    className={`
                                        thumbnail
                                        ${
                                            isSelected
                                                ? "thumbnail-selected"
                                                : "thumbnail-not-selected"
                                        }
                                    `}
                                >
                                    <Image
                                        src={urlFor(image).url()}
                                        alt={`${title} - ${index + 1}`}
                                        fill
                                        sizes="64px"
                                        quality={90}
                                        className="object-cover object-center"
                                    />
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* Main Image */}
                <div className="relative min-w-0 flex-1">
                    <div className="main-image">
                        <Image
                            src={urlFor(selectedImage).url()}
                            alt={title}
                            fill
                            priority
                            sizes="(max-width: 500px) 100vw, 50vw"
                            quality={100}
                            className="object-cover object-center transition-all duration-300"
                        />

                        {/* Previous */}
                        {images.length > 1 && (
                            <button
                                type="button"
                                onClick={previousImage}
                                aria-label="Նախորդ նկար"
                                className="gallery-chevron left-2"
                            >
                                <ChevronLeft size={20} />
                            </button>
                        )}

                        {/* Next */}
                        {images.length > 1 && (
                            <button
                                type="button"
                                onClick={nextImage}
                                aria-label="Հաջորդ նկար"
                                className="gallery-chevron right-2"
                            >
                                <ChevronRight size={20} />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile thumbnails */}
            {images.length > 1 && (
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1 sm:hidden">
                    {images.map((image, index) => {
                        const isSelected =
                            index === selectedIndex;

                        return (
                            <button
                                key={
                                    image._key ??
                                    `${image.asset._ref}-${index}`
                                }
                                type="button"
                                onClick={() =>
                                    setSelectedIndex(index)
                                }
                                className={`
                                    mobile-thumbnail
                                    ${
                                        isSelected
                                            ? "thumbnail-selected"
                                            : "thumbnail-not-selected"
                                    }
                                `}
                            >
                                <Image
                                    src={urlFor(image).url()}
                                    alt={`${title} - ${index + 1}`}
                                    fill
                                    sizes="64px"
                                    quality={90}
                                    className="object-cover object-center"
                                    loading="eager"
                                />
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}