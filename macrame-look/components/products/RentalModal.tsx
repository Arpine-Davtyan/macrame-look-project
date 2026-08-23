"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import RentalModalSuccess from "./RentalModalSuccess";
import RentalModalForm from "./RentalModalForm";

import type { RentalForm, RentalModalProps } from "@/lib/types/product";
import { createOrder } from "@/lib/actions/orders";

export default function RentalModal({
    productId,
    productTitle,
    productSlug,
    rentalPrices,
    minQuantity,
    maxQuantity,
    productSize,
    productMaterial,
    available = true,
    colors = [],
}: RentalModalProps) {
    const [open, setOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState<RentalForm>({
        fullName: "",
        phone: "",
        startDate: "",
        endDate: "",
        quantity: minQuantity,
        color: "",
        message: "",
        totalPrice: 0
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement |
            HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]:
                name === "quantity"
                    ? Number(value)
                    : value,
        }));
    };

    const getRentalPrice = () => {
        if (
            !form.startDate ||
            !form.endDate
        ) {
            return null;
        }

        const start = new Date(form.startDate);
        const end = new Date(form.endDate);

        const difference = end.getTime() - start.getTime();

        const days = Math.ceil(difference / (1000 * 60 * 60 * 24));

        if (days <= 0) {
            return null;
        }

        if (days <= 3) {
            return (
                rentalPrices.oneToThreeDays ?? null
            );
        }

        if (days <= 5) {
            return (
                rentalPrices.threeToFiveDays ?? null
            );
        }

        return (
            rentalPrices.fivePlusDays ?? null
        );
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>,
        totalPrice: number
    ) => {
        e.preventDefault();

        if (loading) return;

        if (!form.startDate || !form.endDate) {
            return;
        }

        const start = new Date(form.startDate);
        const end = new Date(form.endDate);

        if (end <= start) {
            console.error("End date must be after start date");
            return;
        }

        const rentalPrice = getRentalPrice();

        setLoading(true);

        try {
            const result = await createOrder({
                project: "macrame-look",
                type: "rent",
                start_date: form.startDate,
                end_date: form.endDate,
                client_name: form.fullName,
                client_phone: form.phone,
                client_message: form.message,
                product_id: productId,
                product_title: productTitle,
                product_slug: productSlug,
                product_color: form.color || null,
                product_size: productSize || null,
                product_qty: form.quantity,
                order_note: form.message,
                rental_price: rentalPrice,
                product_material: productMaterial || null,
                active: true,
                order_status: "new",
                total_price: totalPrice,
            });

            if (!result.success) {
                console.error(
                    "Order creation failed:",
                    result.error
                );

                return;
            }

            setSubmitted(true);
        } catch (error) {
            console.error(
                "Order submission error:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setSubmitted(false);

        setForm({
            fullName: "",
            phone: "",
            startDate: "",
            endDate: "",
            quantity: minQuantity,
            color: "",
            message: "",
            totalPrice: 0
        });
    };

    const handleClose = () => {
        setOpen(false);

        setTimeout(() => {
            resetForm();
        }, 200);
    };

    return (
        <>
            {available && (
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="btn mt-6 flex w-full justify-center"
                >
                    Վարձել հիմա
                </button>
            )}

            <Dialog
                open={open}
                onOpenChange={(value) => {
                    if (!value) {
                        handleClose();
                    } else {
                        setOpen(true);
                    }
                }}
            >
                <DialogContent
                    showCloseButton={false}
                    className="dialog-content"
                >
                    <button
                        type="button"
                        onClick={handleClose}
                        className="dialog-close"
                        aria-label="Փակել"
                    >
                        <X
                            size={22}
                            strokeWidth={1.5}
                        />
                    </button>

                    {!submitted ? (
                        <RentalModalForm
                            rentalPrices={rentalPrices}
                            minQuantity={minQuantity}
                            maxQuantity={maxQuantity}
                            colors={colors}
                            form={form}
                            loading={loading}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                        />
                    ) : (
                        <RentalModalSuccess
                            onClose={handleClose}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}