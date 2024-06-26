import type { Project } from '~/types/data'

export let projectData: Project[] = [
  {
    type: 'work',
    title: 'Vegetable Wholesale Digital Transformation',
    description: `Transforming a traditional vegetable wholesale business into a digital platform, including a mobile app for customers and a web app for the business owner.`,
    imgSrc: '/static/images/dog-no-avaiable-banner.webp',
    url: 'https:thangchiba.com',
    builtWith: ['ReactJS', 'SpringBoot', ' PostgreSQL'],
  },
  {
    type: 'self',
    title: 'ChatGPT++',
    description: `ChatGPT++ is a web application that allows you to chat with OpenAI's GPT-3.5 Turbo AI model. The application can speak out loud response messages, learn new things, and save your conversations to your local machine. You can also use the same model with ChatGPT Plus for a very low cost.`,
    imgSrc: `/static/images/project/chatgptpp.png`,
    repo: 'https://thangchiba.com',
    builtWith: ['ReactJS', 'OpenAI', 'AWS'],
  },
]
