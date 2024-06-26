export let siteMetadata = {
  siteUrl: 'https://blog.thangchiba.com',
  siteRepo: 'https://github.com/thangchiba',
  siteLogo: '/static/images/logo.jpg',
  image: '/static/images/logo.jpg',
  socialBanner: '/static/images/logo.jpg',
  email: 'contact@thangchiba.com',
  github: 'https://github.com/thangchiba',
  x: 'https://x.com/thangchiba',
  facebook: 'https://facebook.com/kennythang9x',
  youtube: 'https://www.youtube.com/@thangchiba',
  linkedin: 'https://www.linkedin.com/in/thangchiba/',
  locale: 'en-US',
  analyticsURL: 'http://api.thangchiba.com:51211/share/nLMqY0CD/blog',
  analytics: {
    plausibleDataDomain: '',
    simpleAnalytics: false, // true | false
    umamiWebsiteId: '4574828f-610b-4bd9-b786-7524543bcef0',
    googleAnalyticsId: 'G-KKSDBZSET6', // e.g. UA-000000-2 or G-XXXXXXX
  },
  socialAccounts: {
    github: 'thangchiba',
    linkedin: 'thangchiba',
    x: 'thangchiba',
    facebook: 'kennythang9x',
  },
}

/**
 * Select a provider and use the environment variables associated to it
 * https://vercel.com/docs/environment-variables
 * --
 *
 * Visit each provider's documentation link and follow the instructions, then add the environment variable to your project2.
 */
export let commentConfig = {
  provider: 'giscus', // 'giscus' | 'utterances' | 'disqus',
  // https://giscus.app/
  giscusConfig: {
    repo: '', // process.env.GISCUS_REPO
    repositoryId: '', // process.env.GISCUS_REPOSITORY_ID
    category: '', // process.env.GISCUS_CATEGORY
    categoryId: '', // process.env.GISCUS_CATEGORY_ID
    mapping: 'title',
    reactions: '1',
    metadata: '0',
    lightTheme: 'light',
    darkTheme: 'transparent_dark',
    themeURL: '',
  },
  // https://utteranc.es/
  utterancesConfig: {
    repo: '', // process.env.UTTERANCES_REPO
    issueTerm: '',
    label: '',
    lightTheme: '',
    darkTheme: '',
  },
  // https://help.disqus.com/en/articles/1717111-what-s-a-shortname
  disqus: {
    shortname: '', // process.env.DISQUS_SHORTNAME
  },
}
