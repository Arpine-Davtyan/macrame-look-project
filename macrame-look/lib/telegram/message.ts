"use server";

import { sendTelegramMessage } from "@/lib/actions/telegram";
import { CreateOrderInput } from "../types/product";

export async function sendOrderTelegram(data: CreateOrderInput) {
  const domain = process.env.NEXT_PUBLIC_URL!;

  const formattedStartDate = new Date(
    `${data.start_date}T00:00:00`
  ).toLocaleDateString("en-GB");

  const formattedEndDate = new Date(
    `${data.end_date}T00:00:00`
  ).toLocaleDateString("en-GB");

  const dateRange = `${formattedStartDate} - ${formattedEndDate}`;

  const productUrl = `${domain}/products/${data.product_slug}`;

  const text = `
  <b>🔔 Նոր վարձույթի հայտ</b>

  <b>Ապրանք:</b> ${data.product_title ?? ""}
  <b>Գին:</b> ${data.rental_price != null
        ? `${data.rental_price.toLocaleString("hy-AM")} ֏ / օր`
        : ""
      }

  📦 ${data.product_qty ?? ""} հատ
  🎨 ${data.product_color ?? ""}
  📏 ${data.product_size ?? ""}

  👤 ${data.client_name ?? ""}
  📞 ${data.client_phone ?? ""}
  📅 ${dateRange}

  💰 ${data.total_price != null
        ? `${data.total_price.toLocaleString("hy-AM")} ֏ / օր`
        : ""
      }

  <b>Նամակ:</b>
  ${data.client_message || ""}

  <a href="${productUrl}">Դիտել ապրանքը</a>
  `;

  return sendTelegramMessage({
    text,
  });
}