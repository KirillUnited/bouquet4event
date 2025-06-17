export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Product Name',
      type: 'string',
      description: 'Название продукта (обязательное поле)',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Уникальный идентификатор для URL (генерируется автоматически из названия)',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'gallery',
      title: 'Image Gallery',
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
              title: 'Alternative Text',
              description: 'Альтернативный текст для изображения (важно для SEO и доступности)',
            },
          ],
        },
      ],
      validation: (Rule: any) => Rule.required().min(1),
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Цена продукта (должна быть положительным числом)',
      validation: (Rule: any) => Rule.required().positive(),
    },
    {
      name: 'currency',
      title: 'Currency',
      type: 'string',
      description: 'Валюта цены продукта',
      options: {
        list: [
          { title: 'USD', value: 'USD' },
          { title: 'EUR', value: 'EUR' },
          { title: 'RUB', value: 'RUB' },
        ],
      },
      initialValue: 'RUB',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      description: 'Подробное описание продукта с возможностью форматирования текста',
      of: [
        {
          type: 'block',
        },
      ],
    },
    {
      name: 'specifications',
      title: 'Specifications',
      type: 'array',
      description: 'Технические характеристики и спецификации продукта',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Specification Name',
              type: 'string',
              description: 'Название характеристики',
            },
            {
              name: 'value',
              title: 'Specification Value',
              type: 'string',
              description: 'Значение характеристики',
            },
          ],
        },
      ],
    },
    {
      name: 'stock',
      title: 'Stock',
      type: 'number',
      description: 'Количество товара на складе',
      initialValue: 0,
    },
    {
      name: 'isAvailable',
      title: 'Available for Purchase',
      type: 'boolean',
      description: 'Доступен ли продукт для покупки',
      initialValue: true,
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      description: 'Настройки SEO для страницы продукта',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Заголовок страницы для поисковых систем',
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          description: 'Описание страницы для поисковых систем',
        },
        {
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          description: 'Ключевые слова для SEO',
          of: [{ type: 'string' }],
        },
      ],
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      description: 'Категории, к которым относится продукт',
      of: [
        {
          type: 'reference',
          to: [{ type: 'category' }],
        },
      ],
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      description: 'Теги для организации и фильтрации продуктов',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'gallery.0',
    },
  },
}
