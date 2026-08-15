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
    rentalPrice,
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
        quantity: minQuantity,
        color: "",
        message: "",
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

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (loading) return;

        setLoading(true);

        try {
            const result = await createOrder({
                project: "macrame-look",
                type: "rent",
                order_date: form.startDate,
                client_name: form.fullName,
                client_phone: form.phone,
                client_message: form.message,
                product_id: productId,
                product_title: productTitle,
                product_slug: productSlug,
                product_color: form.color || null,
                product_size: productSize || null,
                product_qty: form.quantity,
                order_note: null,
                rental_price: rentalPrice,
                product_material: productMaterial || null,
                active: true,
                order_status: "new",
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
            quantity: minQuantity,
            color: "",
            message: "",
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
                            rentalPrice={rentalPrice}
                            minQuantity={minQuantity}
                            maxQuantity={maxQuantity}
                            colors={colors}
                            form={form}
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