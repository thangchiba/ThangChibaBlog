import { defineConfig } from 'tinacms'

export default defineConfig({
  branch: process.env.VERCEL_GIT_COMMIT_REF || '',
  clientId: process.env.TINA_CLIENT_ID || '',
  token: process.env.TINA_TOKEN || '',
  build: {
    publicFolder: 'public',
    outputFolder: 'admin',
  },
  media: {
    tina: {
      publicFolder: 'public',
      mediaRoot: 'static',
    },
  },
  schema: {
    collections: [
      {
        name: 'blog',
        label: 'Blog',
        path: 'data/en/blog/',
        format: 'mdx',
        ui: {
          router: (props) => {
            return '/'
          },
        },
        fields: [
          {
            name: 'title',
            label: 'Title',
            type: 'string',
          },
          {
            name: 'date',
            label: 'Date',
            type: 'datetime',
            ui: {
              parse: (val?: string) => {
                return val ? new Date(val).toISOString().split('T')[0] : ''
              }, // Save as 'YYYY-MM-DD'
              format: (val?: string) => (val ? new Date(val).toISOString().split('T')[0] : ''), // Display as 'YYYY-MM-DD'
            },
          },
          {
            name: 'tags',
            label: 'Tags',
            type: 'string',
            list: true,
          },
          {
            name: 'draft',
            label: 'Draft',
            type: 'boolean',
          },
          {
            name: 'summary',
            label: 'Summary',
            type: 'string',
          },
          {
            name: 'audioURL',
            label: 'Audio URL',
            type: 'string',
          },
          {
            name: 'authors',
            label: 'Authors',
            type: 'string',
            options: ['default', 'thangchiba'],
            list: true,
          },
          {
            name: 'images',
            label: 'Images',
            type: 'image',
            list: true,
          },
          {
            name: 'body',
            label: 'Body',
            type: 'rich-text',
            isBody: true,
          },
        ],
      },
    ],
  },
})
