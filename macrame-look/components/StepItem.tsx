"use client";

import {
    CalendarDotsIcon,
    DressIcon,
    HeartIcon,
    ShoppingBagIcon,
} from "@phosphor-icons/react";

import { StepItems } from "../lib/constants/info";

const icons = {
    shop: ShoppingBagIcon,
    schedule: CalendarDotsIcon,
    enjoy: DressIcon,
    heart: HeartIcon,
} as const;

const StepItem = () => {
    return (
        <div className="grid grid-cols-2 gap-8 md:flex md:justify-between md:gap-4">
            {StepItems.map((item, index) => {
                const Icon = icons[item.icon as keyof typeof icons];

                return (
                    <div
                        key={`${item.icon}-${index}`}
                        className="flex-col-center"
                    >
                        <div className="flex-col-center mb-5 h-16 w-16 rounded-full bg-purple/80">
                            {Icon && (
                                <Icon
                                    size={30}
                                    weight="regular"
                                    className="text-ivory"
                                />
                            )}
                        </div>

                        <p className="simple-text font-dm-sans">
                            {item.title}
                        </p>

                        <p className="simple-text text-center font-dm-sans font-normal">
                            {item.text}
                        </p>
                    </div>
                );
            })}
        </div>
    );
};

export default StepItem;