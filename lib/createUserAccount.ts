'use server';
import { client } from "../sanity/lib/client";
import { token } from "../sanity/lib/token";

/**
 * Интерфейс для данных аккаунта пользователя
 */
export interface UserAccountData {
  userId: string;
  name: string;
  phone: string;
  region: string;
  totalAmount?: number;
  privacyPolicy?: boolean;
}

/**
 * Создает новый аккаунт пользователя в Sanity CMS
 * @param userData - Данные пользователя для создания аккаунта
 * @returns Promise с созданным документом или ошибкой
 */
export async function createUserAccount(userData: UserAccountData) {
  try {
    // Проверка обязательных полей
    if (!userData.userId || !userData.name || !userData.phone || !userData.region || !userData.privacyPolicy) {
      throw new Error("Все обязательные поля должны быть заполнены");
    }

    // Валидация формата телефона (простая проверка на международный формат)
    const phoneRegex = /^\+[0-9]{1,3}[0-9]{9,10}$/;
    // TODO: добавить валидацию формата телефона
    // if (!phoneRegex.test(userData.phone)) {
    //   throw new Error("Номер телефона должен быть в международном формате (например, +7XXXXXXXXXX)");
    // }

    // Создание документа в Sanity
    const clientWithToken = client.withConfig({ token });
    const userAccount = await clientWithToken.create({
      _type: "userAccount",
      userId: userData.userId,
      name: userData.name,
      phone: userData.phone,
      region: userData.region,
      privacyPolicy: userData.privacyPolicy || false,
      totalAmount: userData.totalAmount || 0,
      createdAt: new Date().toISOString(),
    });

    return userAccount;
  } catch (error) {
    console.error("Ошибка при создании аккаунта пользователя:", error);
    throw error;
  }
}