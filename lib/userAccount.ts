'use server';
import { client } from "../sanity/lib/client";
import { token } from "../sanity/lib/token";

/**
 * Интерфейс для данных аккаунта пользователя
 */
export interface Donation {
  amount: number;
  email: string;
  orderNumber?: string;
}

export interface UserAccountData {
  userId: string;
  userDonationLink: string;
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
    if (!userData.userId || !userData.name || !userData.phone || !userData.region || !userData.privacyPolicy) {
      throw new Error("Все обязательные поля должны быть заполнены");
    }

    const clientWithToken = client.withConfig({ token });
    const userAccount = await clientWithToken.create({
      _type: "userAccount",
      userId: userData.userId,
      userDonationLink: userData.userDonationLink,
      name: userData.name,
      phone: userData.phone,
      region: userData.region,
      date: userData.date,
      privacyPolicy: userData.privacyPolicy || false,
      privacyPolicyData: userData.privacyPolicyData || false,
      totalAmount: userData.totalAmount || 0,
      createdAt: new Date().toISOString(),
    });

    return userAccount;
  } catch (error) {
    throw error;
  }
}

/**
 * Обновляет аккаунт пользователя с новой информацией о пожертвовании
 * @param userId - userId пользователя для поиска аккаунта
 * @param donation - Данные о пожертвовании
 * @returns Promise с обновленным документом или ошибкой
 */
export async function updateUserAccount(userId: string, donation: Donation): Promise<{ user: any, isNewDonation: boolean }> {
  try {
    // Находим пользователя по userId
    const clientWithToken = client.withConfig({ token });
    
    // Ищем пользователя по userId
    const query = `*[_type == "userAccount" && userId match $userId][0]`;
    const params = { userId };
    
    const user = await clientWithToken.fetch(query, params);
    
    if (!user) {
      throw new Error("Пользователь с указанным userId не найден");
    }

    // Проверяем, существует ли уже пожертвование с таким orderNumber
    const currentDonations = user.donations || [];
    const donationExists = currentDonations.some(
      (existingDonation: any) => existingDonation.orderNumber === donation.orderNumber
    );

    // Если пожертвование с таким orderNumber уже существует, не добавляем его снова
    if (donationExists) {
      console.log(`Пожертвование с orderNumber ${donation.orderNumber} уже обработано`);
      return { user, isNewDonation: false };
    }

    // Обновляем общую сумму и добавляем новое пожертвование
    // суммы пожертвования из копеек в рубли
    const updatedTotal = (user.totalAmount || 0) + (donation.amount / 100);
    
    const updatedUser = await clientWithToken
      .patch(user._id)
      .set({
        totalAmount: updatedTotal,
        donations: [...currentDonations, {
          ...donation,
          amount: donation.amount / 100,
          _key: `donation_${Date.now()}`,
          _type: 'donation'
        }]
      })
      .commit();
      
    return { user: updatedUser, isNewDonation: true };
  } catch (error) {
    console.error("Ошибка при обновлении данных пользователя:", error);
    throw error;
  }
}