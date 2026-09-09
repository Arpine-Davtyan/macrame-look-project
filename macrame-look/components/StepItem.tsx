"use client";

import { CalendarDotsIcon, HeartIcon, ShoppingBagIcon, SmileyIcon } from "@phosphor-icons/react";

import { StepItems } from "../lib/constants/info";

const icons = {
    shop: ShoppingBagIcon,
    schedule: CalendarDotsIcon,
    enjoy: SmileyIcon,
    heart: HeartIcon,
} as const;

const StepItem = () => {
    return (
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-6">
            {StepItems.map((item, index) => {
                const Icon = icons[item.icon as keyof typeof icons];

                return (
                    <div
                        key={`${item.icon}-${index}`}
                        className="flex flex-col items-center"
                    >
                        <div className="flex-col-center mb-4 h-16 w-16 rounded-full bg-purple/80">
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

                        <p className="simple-text text-center font-dm-sans font-light">
                            {item.text}
                        </p>
                    </div>
                );
            })}
        </div>
    );
};

export default StepItem;