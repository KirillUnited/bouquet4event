'use server';
import axios from 'axios';

const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;
const BASE_URL = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

export async function openCheckout(data): Promise<any> {
    const {
        createdAt,
        name,
        phone,
        privacyPolicy,
        region,
        date,
        totalAmount,
        userId,
        _createdAt,
        _id,
        _rev,
        _type,
        _updatedAt
    } = data;
    const message = `
    📝 Новый счёт для "${userId || '💬 Цветочный счёт'}":\n\n
    📅 Дата создания: ${createdAt}\n
    👤 Имя: ${name}\n
    📱 Телефон: ${phone}\n
    💸 Регион: ${region}\n
    📅 Дата мероприятия: ${date}
    `;

    return await axios
        .post(BASE_URL, {
            chat_id: chatId,
            text: message,
        })
        .then((response) => {
            console.log('Message sent to Telegram:', response.data);
            return response.data;
        })
        .catch((error) => {
            console.error('Error sending message to Telegram:', error);
            throw error;
        });
}

export async function sendDonate(data): Promise<any> {
    const {userId, amount, date, email} = data;
    const message = `
    💸 Новый донат для "${userId || '💬 Цветочный счёт'}":\n\n
    📅 Дата мероприятия: ${date}\n
    👥 Email: ${email}\n
    💸 Сумма: ${amount}
    `;


    return await axios
        .post(BASE_URL, {
            chat_id: chatId,
            text: message,
        })
        .then((response) => {
            console.log('Message sent to Telegram:', response.data);
            return response.data;
        })
        .catch((error) => {
            console.error('Error sending message to Telegram:', error);
            throw error;
        });
}