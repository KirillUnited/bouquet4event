import { orderRankField } from "@sanity/orderable-document-list";

export default {
  name: 'product',
  title: 'Продукт',
  type: 'document',
  groups: [
    {
      name: 'basic',
      title: 'Основная информация',
      default: true,
    },
    {
      name: 'media',
      title: 'Изображения',
    },
    {
      name: 'pricing',
      title: 'Цена и наличие',
    },
    {
      name: 'content',
      title: 'Описание и характеристики',
    },
    {
      name: 'organization',
      title: 'Категории и теги',
    },
    {
      name: 'seo',
      title: 'Поисковая оптимизация',
    },
  ],
  fields: [
    {
      name: 'name',
      title: 'Название продукта',
      type: 'string',
      description: 'Название продукта (обязательное поле)',
      validation: (Rule: any) => Rule.required(),
      group: 'basic',
    },
    {
      name: 'slug',
      title: 'URL идентификатор',
      type: 'slug',
      description: 'Уникальный идентификатор для URL (генерируется автоматически из названия)',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
      group: 'basic',
    },
    {
      name: 'gallery',
      title: 'Галерея изображений',
      type: 'array',
      description: 'Галерея изображений продукта (минимум 1 изображение)',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Альтернативный текст',
              description: 'Альтернативный текст для изображения (важно для SEO и доступности)',
            },
          ],
        },
      ],
      validation: (Rule: any) => Rule.required().min(1),
      group: 'media',
    },
    {
      name: 'price',
      title: 'Цена',
      type: 'number',
      description: 'Цена продукта (должна быть положительным числом)',
      validation: (Rule: any) => Rule.required().positive(),
      group: 'pricing',
    },
    {
      name: 'currency',
      title: 'Валюта',
      type: 'string',
      description: 'Валюта цены продукта',
      options: {
        list: [
          { title: 'Рубль', value: 'RUB' },
          { title: 'Доллар', value: 'USD' },
          { title: 'Евро', value: 'EUR' },
        ],
      },
      initialValue: 'RUB',
      group: 'pricing',
    },
    {
      name: 'stock',
      title: 'Количество на складе',
      type: 'number',
      description: 'Количество товара на складе',
      initialValue: 0,
      group: 'pricing',
    },
    {
      name: 'isAvailable',
      title: 'Доступен для покупки',
      type: 'boolean',
      description: 'Доступен ли продукт для покупки',
      initialValue: true,
      group: 'pricing',
    },
    {
      name: 'description',
      title: 'Описание',
      type: 'array',
      description: 'Подробное описание продукта с возможностью форматирования текста',
      of: [
        {
          type: 'block',
        },
      ],
      group: 'content',
    },
    {
      name: 'specifications',
      title: 'Характеристики',
      type: 'array',
      description: 'Технические характеристики и спецификации продукта',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Название характеристики',
              type: 'string',
              description: 'Название характеристики',
            },
            {
              name: 'value',
              title: 'Значение характеристики',
              type: 'string',
              description: 'Значение характеристики',
            },
          ],
        },
      ],
      group: 'content',
    },
    {
      name: 'categories',
      title: 'Категории',
      type: 'array',
      description: 'Категории, к которым относится продукт',
      of: [
        {
          type: 'reference',
          to: [{ type: 'category' }],
        },
      ],
      group: 'organization',
    },
    {
      name: 'tags',
      title: 'Теги',
      type: 'array',
      description: 'Теги для организации и фильтрации продуктов',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      group: 'organization',
    },
    {
      name: 'seo',
      title: 'SEO настройки',
      type: 'object',
      description: 'Настройки SEO для страницы продукта',
      group: 'seo',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta заголовок',
          type: 'string',
          description: 'Заголовок страницы для поисковых систем',
        },
        {
          name: 'metaDescription',
          title: 'Meta описание',
          type: 'text',
          description: 'Описание страницы для поисковых систем',
        },
        {
          name: 'keywords',
          title: 'Ключевые слова',
          type: 'array',
          description: 'Ключевые слова для SEO',
          of: [{ type: 'string' }],
        },
      ],
    },
    orderRankField({ type: "product" }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'gallery.0',
    },
  },
}
