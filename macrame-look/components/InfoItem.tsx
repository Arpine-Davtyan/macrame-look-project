"use client";

import {
    ArrowsClockwiseIcon,
    CoatHangerIcon,
    HeartIcon,
    LeafIcon,
} from "@phosphor-icons/react";

import { InfoItems } from "../lib/constants/info";

const icons = {
    leaf: LeafIcon,
    coatHanger: CoatHangerIcon,
    heart: HeartIcon,
    refresh: ArrowsClockwiseIcon,
} as const;

const InfoItem = () => {
    return (
        <div className="grid grid-cols-2 gap-6 sm:flex sm:justify-between sm:gap-4">
            {InfoItems.map((item, index) => {
                const Icon = icons[item.icon as keyof typeof icons];

                return (
                    <div
                        key={`${item.icon}-${index}`}
                        className="flex items-center gap-3 sm:gap-5"
                    >
                        <div>
                            {Icon && (
                                <Icon
                                    size={28}
                                    weight="regular"
                                    className="text-purple"
                                />
                            )}
                        </div>

                        <div>
                            <p className="simple-text">
                                {item.title}
                            </p>
                            <p className="simple-text font-normal">
                                {item.text}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default InfoItem;