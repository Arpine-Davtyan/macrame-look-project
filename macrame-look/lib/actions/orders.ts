"use server";

import { supabase } from "@/lib/supabase";
import { CreateOrderInput } from "../types/product";
import { sendOrderTelegram } from "../telegram/message";


export type UpdateOrderInput = Partial<CreateOrderInput>;

// CREATE
export async function createOrder(data: CreateOrderInput) {
    const { data: order, error } = await supabase
        .from("orders")
        .insert({
            project: data.project ?? null,
            type: data.type ?? null,
            order_date: data.order_date ?? null,
            client_name: data.client_name ?? null,
            client_phone: data.client_phone ?? null,
            client_message: data.client_message ?? null,
            product_id: data.product_id ?? null,
            product_title: data.product_title ?? null,
            product_slug: data.product_slug ?? null,
            product_color: data.product_color ?? null,
            product_size: data.product_size ?? null,
            product_qty: data.product_qty ?? null,
            order_note: data.order_note ?? null,
            rental_price: data.rental_price ?? null,
            product_material: data.product_material ?? null,
            active: data.active ?? true,
            order_status: data.order_status ?? null,
        })
        .select()
        .single();

    if (error) {
        console.error("createOrder error:", error);

        return {
            success: false,
            error: error.message,
        };
    }

    try {
        const telegramResult = await sendOrderTelegram(data);

        if (!telegramResult.success) {
            console.error(
                "Order created, but Telegram failed:",
                telegramResult.error
            );
        }
    } catch (error) {
        console.error(
            "Order created, but Telegram request failed:",
            error
        );
    }

    return {
        success: true,
        data: order,
    };
}


// GET ALL
export async function getOrders() {
    const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", {
            ascending: false,
        });

    if (error) {
        console.error("getOrders error:", error);

        return {
            success: false,
            error: error.message,
            data: [],
        };
    }

    return {
        success: true,
        data,
    };
}


// GET BY ID
export async function getOrderById(id: string) {
    const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.error(
            "getOrderById error:",
            error
        );

        return {
            success: false,
            error: error.message,
            data: null,
        };
    }

    return {
        success: true,
        data,
    };
}


// UPDATE
export async function updateOrder(
    id: string,
    data: UpdateOrderInput
) {
    const { data: order, error } = await supabase
        .from("orders")
        .update(data)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        console.error(
            "updateOrder error:",
            error
        );

        return {
            success: false,
            error: error.message,
        };
    }

    return {
        success: true,
        data: order,
    };
}


// DELETE
export async function deleteOrder(id: string) {
    const { error } = await supabase
        .from("orders")
        .delete()
        .eq("id", id);

    if (error) {
        console.error(
            "deleteOrder error:",
            error
        );

        return {
            success: false,
            error: error.message,
        };
    }

    return {
        success: true,
    };
}


// TOGGLE ACTIVE
export async function toggleOrderActive(
    id: string,
    active: boolean
) {
    const { data, error } = await supabase
        .from("orders")
        .update({ active })
        .eq("id", id)
        .select()
        .single();

    if (error) {
        console.error(
            "toggleOrderActive error:",
            error
        );

        return {
            success: false,
            error: error.message,
        };
    }

    return {
        success: true,
        data,
    };
}


// UPDATE STATUS
export async function updateOrderStatus(
    id: string,
    order_status: string
) {
    const { data, error } = await supabase
        .from("orders")
        .update({ order_status })
        .eq("id", id)
        .select()
        .single();

    if (error) {
        console.error(
            "updateOrderStatus error:",
            error
        );

        return {
            success: false,
            error: error.message,
        };
    }

    return {
        success: true,
        data,
    };
}