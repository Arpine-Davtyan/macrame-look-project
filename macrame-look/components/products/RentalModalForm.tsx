"use client";

import { CalendarDays, CheckCircle2, User, Phone, Palette, Minus, Plus } from "lucide-react";
import { useState } from "react";

import type { RentalModalFormProps } from "@/lib/types/product";

import { getColor, getColorName } from "@/lib/actions/product";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const RentalModalForm = ({
    rentalPrices,
    minQuantity,
    maxQuantity,
    colors = [],
    form,
    loading = false,
    handleChange,
    handleSubmit,
}: RentalModalFormProps) => {
    const [startDateOpen, setStartDateOpen] = useState(false);
    const [endDateOpen, setEndDateOpen] = useState(false);
    const [colorOpen, setColorOpen] = useState(false);

    const getRentalDays = () => {
        if (
            !form.startDate ||
            !form.endDate
        ) {
            return 0;
        }

        const start = new Date(`${form.startDate}T00:00:00`);
        const end = new Date(`${form.endDate}T00:00:00`);

        const difference = end.getTime() - start.getTime();
        return Math.ceil(difference / (1000 * 60 * 60 * 24));
    };

    const rentalDays = getRentalDays();

    const rentalPrice =
        rentalDays > 0
            ? rentalDays <= 3
                ? rentalPrices.oneToThreeDays
                : rentalDays <= 5
                    ? rentalPrices.threeToFiveDays
                    : rentalPrices.fivePlusDays
            : undefined;

    const totalPrice = (rentalPrice ?? 0) * form.quantity * rentalDays;

    const selectedColor =
        colors.find(
            (color) => getColorName(color) === form.color
        );

    const getMinDate = () => {
        const date = new Date();

        date.setHours(0, 0, 0, 0);
        date.setDate(
            date.getDate() + 2
        );

        return date;
    };

    const minDate = getMinDate();

    const handleQuantityChange = (
        quantity: number
    ) => {
        const event = {
            target: {
                name: "quantity",
                value: String(
                    Math.min(
                        maxQuantity,
                        Math.max(minQuantity, quantity)
                    )
                ),
            },
        } as React.ChangeEvent<HTMLInputElement>;

        handleChange(event);
    };

    const dateToInputValue = (
        date: Date
    ) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };

    const handleStartDateSelect = (
        date: Date | undefined
    ) => {
        if (!date) return;

        const selected = new Date(date);
        selected.setHours(0, 0, 0, 0);
        const minimum = new Date(minDate);
        minimum.setHours(0, 0, 0, 0);

        if (selected < minimum) {
            return;
        }

        const value = dateToInputValue(selected);

        handleChange({
            target: {
                name: "startDate",
                value,
            },
        } as React.ChangeEvent<HTMLInputElement>);

        if (
            form.endDate &&
            form.endDate < value
        ) {
            handleChange({
                target: {
                    name: "endDate",
                    value: "",
                },
            } as React.ChangeEvent<HTMLInputElement>);
        }

        setStartDateOpen(false);
    };

    const handleEndDateSelect = (
        date: Date | undefined
    ) => {
        if (!date) return;

        const selected = new Date(date);
        selected.setHours(0, 0, 0, 0);
        const minimum = new Date(minDate);
        minimum.setHours(0, 0, 0, 0);

        if (selected < minimum) {
            return;
        }

        if (form.startDate) {
            const start = new Date(
                `${form.startDate}T00:00:00`
            );

            if (selected <= start) {
                return;
            }
        }

        const value = dateToInputValue(selected);

        handleChange({
            target: {
                name: "endDate",
                value,
            },
        } as React.ChangeEvent<HTMLInputElement>);

        setEndDateOpen(false);
    };

    return (
        <div className="px-4 py-4 sm:px-6">
            <div className="mb-3 text-center">
                <h4>Վարձույթի Հայտ</h4>
                <div className="divider m-auto my-3" />
            </div>

            <form
                onSubmit={(e) => handleSubmit(e, totalPrice)}
                className="space-y-4"
            >
                <div className="grid gap-4 grid-cols-2 sm:gap-5">
                    <div>
                        <label
                            htmlFor="fullName"
                            className="form-label"
                        >
                            Անուն Ազգանուն
                        </label>

                        <div className="relative">
                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                required
                                value={form.fullName}
                                onChange={handleChange}
                                className="form-input"
                            />

                            <User
                                size={20}
                                strokeWidth={1.5}
                                className="input-icon"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="phone"
                            className="form-label"
                        >
                            Հեռախոս
                        </label>

                        <div className="relative">
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                required
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="+374XXXXXXXX"
                                className="form-input"
                            />

                            <Phone
                                size={20}
                                strokeWidth={1.5}
                                className="input-icon"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 grid-cols-2 sm:gap-5">
                    <div className="relative">
                        <label className="form-label">
                            Սկզբի ամսաթիվ
                        </label>

                        <button
                            type="button"
                            onClick={() =>
                                setStartDateOpen(
                                    (prev) => !prev
                                )
                            }
                            className="form-input relative w-full text-left"
                        >
                            {form.startDate ? (
                                format(
                                    new Date(`${form.startDate}T00:00:00`),
                                    "dd.MM.yyyy"
                                )
                            ) : (
                                <span className="opacity-60">
                                    Ընտրել
                                </span>
                            )}

                            <CalendarDays
                                size={20}
                                className="calendar-icon"
                            />
                        </button>

                        {startDateOpen && (
                            <div className="absolute right-0 top-full z-999 mt-1 w-auto rounded-md border border-purple/80 bg-white p-0 shadow-xl">
                                <Calendar
                                    mode="single"
                                    selected={
                                        form.startDate
                                            ? new Date(`${form.startDate}T00:00:00`)
                                            : undefined
                                    }
                                    disabled={{ before: minDate }}
                                    onSelect={ handleStartDateSelect }
                                />
                            </div>
                        )}
                    </div>

                    <div className="relative">
                        <label className="form-label">
                            Ավարտի ամսաթիվ
                        </label>

                        <button
                            type="button"
                            onClick={() =>
                                setEndDateOpen((prev) => !prev)
                            }
                            className="form-input relative w-full text-left"
                        >
                            {form.endDate ? (
                                format(
                                    new Date(`${form.endDate}T00:00:00`),
                                    "dd.MM.yyyy"
                                )
                            ) : (
                                <span className="opacity-60">
                                    Ընտրել
                                </span>
                            )}

                            <CalendarDays
                                size={20}
                                className="calendar-icon"
                            />
                        </button>

                        {endDateOpen && (
                            <div className="absolute right-0 top-full z-999 mt-1 w-auto rounded-md border border-purple/80 bg-white p-0 shadow-xl">
                                <Calendar
                                    mode="single"
                                    selected={
                                        form.endDate
                                            ? new Date(
                                                `${form.endDate}T00:00:00`
                                            )
                                            : undefined
                                    }
                                    disabled={{
                                        before:
                                            form.startDate
                                                ? new Date(`${form.startDate}T00:00:00`)
                                                : minDate,
                                    }}
                                    onSelect={
                                        handleEndDateSelect
                                    }
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid gap-4 grid-cols-2 sm:gap-5">
                    <div>
                        <label
                            htmlFor="quantity"
                            className="form-label"
                        >
                            Քանակ
                        </label>

                        <div className="qty-box">
                            <button
                                type="button"
                                onClick={() => handleQuantityChange(form.quantity - 1)}
                                disabled={form.quantity <= minQuantity}
                                className="minus-plus-btn"
                            >
                                <Minus size={16} />
                            </button>

                            <input
                                id="quantity"
                                name="quantity"
                                type="number"
                                min={minQuantity}
                                max={maxQuantity}
                                value={form.quantity}
                                onChange={handleChange}
                                className="input-qty"
                                required
                            />

                            <button
                                type="button"
                                onClick={() => handleQuantityChange(form.quantity + 1)}
                                disabled={form.quantity >= maxQuantity}
                                className="minus-plus-btn"
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                    </div>

                    <div className="relative">
                        <label className="form-label">
                            Գույն
                        </label>

                        <button
                            type="button"
                            onClick={() => setColorOpen((prev) => !prev)}
                            className="color-input"
                        >
                            <span className="flex min-w-0 items-center gap-3">
                                {selectedColor ? (
                                    <>
                                        <span
                                            className="color-ring shrink-0"
                                            style={{backgroundColor: getColor(selectedColor)}}
                                        />

                                        <span className="truncate">
                                            {form.color}
                                        </span>
                                    </>
                                ) : (
                                    <span className="opacity-60">
                                        Ընտրել
                                    </span>
                                )}
                            </span>

                            <Palette
                                size={20}
                                strokeWidth={1.5}
                                className="input-icon top-13!"
                            />
                        </button>

                        {colorOpen && (
                            <div className="color-dropdown">
                                {colors.map(
                                    (
                                        color,
                                        index
                                    ) => {
                                        const colorName = getColorName(color);
                                        const colorValue = getColor(color);

                                        if (
                                            !colorName
                                        ) {
                                            return null;
                                        }

                                        return (
                                            <button
                                                key={`${colorName}-${index}`}
                                                type="button"
                                                onClick={() => {
                                                    handleChange(
                                                        {
                                                            target: {
                                                                name: "color",
                                                                value: colorName,
                                                            },
                                                        } as React.ChangeEvent<HTMLInputElement>
                                                    );

                                                    setColorOpen(false);
                                                }}
                                                className="color-option"
                                            >
                                                <span
                                                    className="color-ring shrink-0"
                                                    style={{backgroundColor: colorValue}}
                                                />

                                                <span className="font-dm-sans text-sm">
                                                    {colorName}
                                                </span>
                                            </button>
                                        );
                                    }
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="message"
                        className="form-label"
                    >
                        Հաղորդագրություն
                    </label>

                    <textarea
                        id="message"
                        name="message"
                        rows={3}
                        value={form.message}
                        onChange={handleChange}
                        className="form-textarea"
                    />
                </div>

                {rentalPrice !== undefined && rentalDays > 0 && (
                    <div className="flex items-end justify-between gap-4 rounded-lg bg-purple/20 px-4 py-3">
                        <div className="min-w-0">
                            <p className="font-dm-sans text-sm">
                                Ընդհանուր գին
                            </p>

                            {rentalDays > 0 && (
                                <div className="font-dm-sans text-sm opacity-60">
                                    Վարձույթի տևողություն՝ {rentalDays} օր
                                </div>
                            )}

                            <p className="font-dm-sans text-xs opacity-60">
                                {rentalPrice.toLocaleString("hy-AM")} ֏ × 
                                {form.quantity} հատ × 
                                {rentalDays} օր
                            </p>
                        </div>

                        <p className="shrink-0 font-dm-sans text-lg font-semibold">
                            {totalPrice.toLocaleString("hy-AM")} ֏
                        </p>
                    </div>
                )}

                <button
                    type="submit"
                    className="btn w-full"
                    disabled={
                        !form.startDate ||
                        !form.endDate ||
                        loading
                    }
                >
                    {loading
                        ? "Ուղարկվում է..."
                        : "Հաստատել"}
                </button>

                <div className="flex-center gap-2 pt-1 text-center text-xs">
                    <CheckCircle2
                        size={17}
                        strokeWidth={1.5}
                        className="shrink-0 text-purple/80"
                    />

                    <span className="mt-1">
                        Մենք կապ կհաստատենք Ձեզ հետ վարձույթը հաստատելու համար
                    </span>
                </div>
            </form>
        </div>
    );
};

export default RentalModalForm;