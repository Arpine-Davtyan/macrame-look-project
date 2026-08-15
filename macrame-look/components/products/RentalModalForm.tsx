"use client";

import { CalendarDays, CheckCircle2, User, Phone, Palette, Minus, Plus } from "lucide-react";
import { useState } from "react";

import type { RentalModalFormProps } from "@/lib/types/product";
import { getColor, getColorName } from "@/lib/actions/product";

const RentalModalForm = ({
    rentalPrice,
    minQuantity,
    maxQuantity,
    colors = [],
    form,
    handleChange,
    handleSubmit,
}: RentalModalFormProps) => {
    const totalPrice = (rentalPrice ?? 0) * form.quantity;

    const [colorOpen, setColorOpen] = useState(false);

    const selectedColor = colors.find(
        (color) => getColorName(color) === form.color
    );

    const getMinDate = () => {
        const today = new Date();

        today.setDate(today.getDate() + 2);

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };

    const handleQuantityChange = (quantity: number) => {
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

    return (
        <div className="px-4 py-4 sm:px-6">
            <div className="mb-3 text-center">
                <h4>Վարձույթի Հայտ</h4>

                <div className="divider m-auto my-3" />
            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >
                {/* Name */}
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

                {/* Phone / Date */}
                <div className="grid gap-4 grid-cols-2 sm:gap-5">
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

                    <div>
                        <label
                            htmlFor="startDate"
                            className="form-label"
                        >
                            Ամսաթիվ
                        </label>

                        <div className="relative">
                            <input
                                id="startDate"
                                name="startDate"
                                type="date"
                                required
                                min={getMinDate()}
                                value={form.startDate}
                                onChange={handleChange}
                                className="form-input calendar-input"
                            />

                            <CalendarDays
                                size={20}
                                strokeWidth={1.5}
                                className="input-icon pointer-events-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Quantity / Color */}
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
                                onClick={() =>
                                    handleQuantityChange(
                                        form.quantity - 1
                                    )
                                }
                                disabled={
                                    form.quantity <= minQuantity
                                }
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
                                required
                                className="input-qty"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    handleQuantityChange(
                                        form.quantity + 1
                                    )
                                }
                                disabled={
                                    form.quantity >= maxQuantity
                                }
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
                            onClick={() =>
                                setColorOpen((prev) => !prev)
                            }
                            className="color-input"
                        >
                            <span className="flex min-w-0 items-center gap-3">
                                {selectedColor ? (
                                    <>
                                        <span
                                            className="color-ring shrink-0"
                                            style={{
                                                backgroundColor:
                                                    getColor(
                                                        selectedColor
                                                    ),
                                            }}
                                        />

                                        <span className="truncate">
                                            {form.color}
                                        </span>
                                    </>
                                ) : (
                                    <span className="opacity-60">
                                        Ընտրել գույնը
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
                                {colors.map((color, index) => {
                                    const colorName =
                                        getColorName(color);

                                    const colorValue =
                                        getColor(color);

                                    if (!colorName) return null;

                                    return (
                                        <button
                                            key={`${colorName}-${index}`}
                                            type="button"
                                            onClick={() => {
                                                handleChange({
                                                    target: {
                                                        name: "color",
                                                        value: colorName,
                                                    },
                                                } as React.ChangeEvent<HTMLInputElement>);

                                                setColorOpen(false);
                                            }}
                                            className="color-option"
                                        >
                                            <span
                                                className="color-ring shrink-0"
                                                style={{
                                                    backgroundColor:
                                                        colorValue,
                                                }}
                                            />

                                            <span className="font-dm-sans text-sm">
                                                {colorName}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {/* Message */}
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

                {/* Total Price */}
                {rentalPrice !== undefined && (
                    <div className="flex items-center justify-between gap-4 rounded-lg bg-purple/20 px-4 py-3">
                        <div className="min-w-0">
                            <p className="font-dm-sans text-sm">
                                Ընդհանուր գին
                            </p>

                            <p className="font-dm-sans text-xs opacity-60">
                                {rentalPrice.toLocaleString(
                                    "hy-AM"
                                )}{" "}
                                ֏ × {form.quantity} հատ
                            </p>
                        </div>

                        <p className="shrink-0 font-dm-sans text-lg font-semibold">
                            {totalPrice.toLocaleString(
                                "hy-AM"
                            )}{" "}
                            ֏
                        </p>
                    </div>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    className="btn w-full"
                >
                    Հաստատել
                </button>

                {/* Info */}
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