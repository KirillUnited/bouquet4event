'use server';
import axios from 'axios';

const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;
const BASE_URL = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

export async function openCheckoutMessage(data: any): Promise<any> {
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
    const isConsultation = region === 'Обратный звонок';
    const title = isConsultation ? 'Новая консультация' : `Новый счёт для "${userId || '💬 Цветочный счёт'}"`;
    
    const message = `
    📝 ${title}:\n
    👤 Имя: ${name}
    📱 Телефон: ${phone}
    ${isConsultation ? '📞' : '🌍'} ${region}
    ${!isConsultation ? `📅 Дата мероприятия: ${date ? date?.split('T')[0] : 'Не указана'}\n` : ''}
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

export async function sendDonateMessage(data: any): Promise<any> {
    const {userId, amount, date, email} = data;
    const message = `
    💸 Новый донат для "${userId || '💬 Цветочный счёт'}":\n
    👥 Email: ${email}
    💸 Сумма: ${amount/100}
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