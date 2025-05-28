import { client } from "../sanity/lib/client";

/**
 * Интерфейс для данных аккаунта пользователя
 */
export interface UserAccountData {
  userId: string;
  name: string;
  phone: string;
  region: string;
  totalAmount?: number;
}

/**
 * Создает новый аккаунт пользователя в Sanity CMS
 * @param userData - Данные пользователя для создания аккаунта
 * @returns Promise с созданным документом или ошибкой
 */
export async function createUserAccount(userData: UserAccountData) {
  try {
    // Проверка обязательных полей
    if (!userData.userId || !userData.name || !userData.phone || !userData.region) {
      throw new Error("Все обязательные поля должны быть заполнены");
    }

    // Валидация формата телефона (простая проверка на международный формат)
    const phoneRegex = /^\+[0-9]{1,3}[0-9]{9,10}$/;
    if (!phoneRegex.test(userData.phone)) {
      throw new Error("Номер телефона должен быть в международном формате (например, +7XXXXXXXXXX)");
    }

    // Создание документа в Sanity
    const userAccount = await client.create({
      _type: "userAccount",
      userId: userData.userId,
      name: userData.name,
      phone: userData.phone,
      region: userData.region,
      totalAmount: userData.totalAmount || 0,
      createdAt: new Date().toISOString(),
    });

    return userAccount;
  } catch (error) {
    console.error("Ошибка при создании аккаунта пользователя:", error);
    throw error;
  }
}

/**
 * Пример использования функции:
 * 
 * ```typescript
 * import { createUserAccount } from "./lib/createUserAccount";
 * 
 * async function handleCreateAccount() {
 *   try {
 *     const newAccount = await createUserAccount({
 *       userId: "user123",
 *       name: "Иван Иванов",
 *       phone: "+79123456789",
 *       region: "Москва",
 *       totalAmount: 1500.75
 *     });
 *     
 *     console.log("Аккаунт успешно создан:", newAccount);
 *   } catch (error) {
 *     console.error("Не удалось создать аккаунт:", error);
 *   }
 * }
 * ```
 */