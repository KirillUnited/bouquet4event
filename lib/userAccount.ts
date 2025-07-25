'use server';
import { client } from "../sanity/lib/client";
import { token } from "../sanity/lib/token";

/**
 * Интерфейс для данных аккаунта пользователя
 */
export interface Donation {
  amount: number;
  date: string;
  email: string;
}

export interface UserAccountData {
  userId: string;
  name: string;
  phone: string;
  region: string;
  date?: Date;
  totalAmount?: number;
  privacyPolicy?: boolean;
  privacyPolicyData?: boolean;
  donations?: Donation[];
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
      date: userData.date,
      privacyPolicy: userData.privacyPolicy || false,
      privacyPolicyData: userData.privacyPolicyData || false,
      totalAmount: userData.totalAmount || 0,
      createdAt: new Date().toISOString(),
    });

    console.log("Новый аккаунт пользователя создан:", userAccount);

    return userAccount;
  } catch (error) {
    console.error("Ошибка при создании аккаунта пользователя:", error);
    throw error;
  }
}

/**
 * Обновляет аккаунт пользователя с новой информацией о пожертвовании
 * @param userId - userId пользователя для поиска аккаунта
 * @param donation - Данные о пожертвовании
 * @returns Promise с обновленным документом или ошибкой
 */
export async function updateUserAccount(userId: string, donation: Donation) {
  try {
    // Находим пользователя по email
    const clientWithToken = client.withConfig({ token });
    
    // Ищем пользователя по email в массиве донатов
    const query = `*[_type == "userAccount" && userId match $userId][0]`;
    const params = { userId };
    
    const user = await clientWithToken.fetch(query, params);
    
    if (!user) {
      throw new Error("Пользователь с указанным userId не найден");
    }

    // Обновляем общую сумму и добавляем новое пожертвование
    const currentDonations = user.donations || [];
    const updatedTotal = (user.totalAmount || 0) + donation.amount;
    
    const updatedUser = await clientWithToken
      .patch(user._id)
      .set({
        totalAmount: updatedTotal,
        donations: [...currentDonations, {
          ...donation,
          _key: `donation_${Date.now()}`,
          _type: 'donation'
        }]
      })
      .commit();

    return updatedUser;
  } catch (error) {
    console.error("Ошибка при обновлении данных пользователя:", error);
    throw error;
  }
}