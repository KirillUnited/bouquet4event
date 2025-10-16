// Mock user data - Russian translations
const userData = {
  id: 1,
  name: "Анна Иванова",
  email: "anna.ivanova@email.com",
  avatar:
    "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  joinDate: "2023-03-15",
  phone: "+7 (912) 345-67-89",
  deliveryAddress: "ул. Тверская, 15, кв. 42, Москва, 125009",
  deliveryDate: "2024-10-15",
  deliveryInterval: "Еженедельно",
  bouquetCategory: "Романтические",
  bouquetWishes: "Розовые и белые цветы, без сильного запаха",
  referralLink: "https://bloombox.ru/ref/anna_ivanova",
  accountStatus: "Активен",
};

// Mock user stats - Russian translations with Account Sum
const userStats = {
  totalDeliveries: 24,
  favoriteFlowers: 8,
  accountSum: 12450.0, // Replaced averageRating with accountSum
  referrals: 3,
  recentActivity: [
    {
      type: "delivery",
      description: 'Букет "Осенний урожай" доставлен',
      date: "2024-10-08",
    },
    {
      type: "rating",
      description: 'Оценен букет "Сезонное великолепие" — 5 звёзд',
      date: "2024-10-06",
    },
    {
      type: "preference",
      description: "Обновлены предпочтения по цветам",
      date: "2024-10-05",
    },
  ],
};

// Mock subscription data - Russian translations
const subscriptionData = {
  id: 1,
  planName: "Премиум Сезонный",
  price: 4999.99,
  status: "active",
  frequency: "Раз в две недели",
  nextDelivery: "2024-10-15",
  startDate: "2023-03-15",
  deliveriesCount: 24,
  canUpgrade: true,
};

// Mock delivery calendar data - Russian translations
const deliveryData = [
  {
    id: 1,
    date: "2024-10-15",
    bouquetName: "Осенняя гармония",
    status: "Запланирована",
  },
  {
    id: 2,
    date: "2024-10-29",
    bouquetName: "Хеллоуинские специи",
    status: "Запланирована",
  },
  {
    id: 3,
    date: "2024-10-08",
    bouquetName: "Осенний урожай",
    status: "Доставлен",
  },
  {
    id: 4,
    date: "2024-09-24",
    bouquetName: "Сезонное великолепие",
    status: "Доставлен",
  },
];

// Mock delivery history - Russian translations
const deliveryHistory = [
  {
    id: 1,
    date: "2024-10-08",
    bouquetName: "Осенний урожай",
    bouquetImage:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
    description:
      "Тёплая коллекция сезонных цветов с подсолнухами, оранжевыми розами и осенней листвой.",
    status: "delivered",
    rating: 5,
    feedback: "Абсолютно потрясающе! Цвета были идеальными для осени.",
    flowersIncluded: [
      "Подсолнухи",
      "Оранжевые розы",
      "Осенние листья",
      "Колосья пшеницы",
    ],
    careInstructions: true,
  },
  {
    id: 2,
    date: "2024-09-24",
    bouquetName: "Сезонное великолепие",
    bouquetImage:
      "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=300&h=300&fit=crop",
    description:
      "Элегантная смесь поздних летних и ранних осенних цветов в богатых, тёплых тонах.",
    status: "delivered",
    rating: 4,
    feedback: "Красивая композиция, продержалась больше недели!",
    flowersIncluded: ["Георгины", "Хризантемы", "Эвкалипт"],
    careInstructions: true,
  },
  {
    id: 3,
    date: "2024-09-10",
    bouquetName: "Садовая свежесть",
    bouquetImage:
      "https://images.unsplash.com/photo-1574684891174-df6b02ab38d7?w=300&h=300&fit=crop",
    description: "Свежие садовые цветы с естественным, органичным ощущением.",
    status: "delivered",
    rating: 5,
    flowersIncluded: ["Смешанные полевые цветы", "Гипсофила", "Зелень"],
    careInstructions: true,
  },
  {
    id: 4,
    date: "2024-08-27",
    bouquetName: "Летний закат",
    bouquetImage:
      "https://images.unsplash.com/photo-1520763185298-1b434c919102?w=300&h=300&fit=crop",
    description: "Яркие летние цвета, напоминающие красивый закат.",
    status: "skipped",
    flowersIncluded: [],
    careInstructions: false,
  },
];

const tabs = [
  { id: "overview", name: "Обзор", icon: "Home" },
  { id: "calendar", name: "Календарь", icon: "Calendar" },
  { id: "preferences", name: "Настройки", icon: "Settings" },
  { id: "history", name: "История", icon: "Clock" },
  { id: "notifications", name: "Уведомления", icon: "Bell" },
];

export {
  userData,
  userStats,
  subscriptionData,
  deliveryData,
  deliveryHistory,
  tabs,
};
