export const benefitsType = {
  name: 'benefitsType',
  title: 'Преимущества',
  type: 'array',
  of: [
    {
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Название',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Описание',
          type: 'text',
        },
        {
            name: 'icon',
            title: 'Иконка',
            description: 'Иконка в формате Font Awesome Icon Class Name (e.g. "fa-solid fa-heart")',
            type: 'string',
        }
      ],
    },
  ],
}