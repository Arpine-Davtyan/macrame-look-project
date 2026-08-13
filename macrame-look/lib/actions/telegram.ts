"use server";

type TelegramMessage = {
    text: string;
};

export async function sendTelegramMessage({
    text,
}: TelegramMessage) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
        console.error("Telegram environment variables are missing");

        return {
            success: false,
            error: "Telegram configuration is missing",
        };
    }

    try {
        const response = await fetch(
            `https://api.telegram.org/bot${token}/sendMessage`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text,
                    parse_mode: "HTML",
                }),
            }
        );

        const result = await response.json();

        if (!response.ok || !result.ok) {
            console.error("Telegram error:", result);

            return {
                success: false,
                error: result.description ?? "Telegram message failed",
            };
        }

        return {
            success: true,
        };
    } catch (error) {
        console.error("Telegram request error:", error);

        return {
            success: false,
            error: "Telegram request failed",
        };
    }
}
