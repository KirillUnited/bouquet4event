import {defineField, defineType} from 'sanity';

export default defineType({
  name: 'media',
  title: 'Media',
  type: 'object',
  fields: [
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'radio',
      },
      initialValue: 'image',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      hidden: ({ parent }) => parent?.mediaType !== 'image',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'file',
      hidden: ({ parent }) => parent?.mediaType !== 'video',
      options: {
        accept: 'video/*',
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Description for screen readers',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'poster',
          type: 'image',
          title: 'Poster Image',
          description: 'Image to show while video is loading',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'autoplay',
          type: 'boolean',
          title: 'Autoplay',
          initialValue: false,
        },
        {
          name: 'loop',
          type: 'boolean',
          title: 'Loop',
          initialValue: true,
        },
        {
          name: 'muted',
          type: 'boolean',
          title: 'Muted',
          initialValue: true,
        },
        {
          name: 'controls',
          type: 'boolean',
          title: 'Show Controls',
          initialValue: true,
        },
      ],
    }),
  ],
  preview: {
    select: {
      mediaType: 'mediaType',
      image: 'image',
      video: 'video',
    },
    prepare({ mediaType, image, video }) {
      return {
        title: mediaType === 'image' ? 'Image' : 'Video',
        media: mediaType === 'image' ? image : video,
      };
    },
  },
});
