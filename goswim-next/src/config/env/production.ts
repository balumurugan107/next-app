export default {
  app: {
    name: 'GoSwim',
    version: '1.0.0'
  },
  enableReduxLogger: false,
  enableBackgroundSVG: true,
  api: {
    baseUrl: '/api',
    default: {
      url: 'https://api.goswim.tv'
    }
  },
  goSwimApi: {
    baseUrl: '/ios',
    default: { url: 'https://www.goswim.tv/api' }
  },
  appleConfig: {
    clientId: process.env.NEXT_PUBLIC_APPLE_CLIENT_ID,
    redirectURI: 'https://api.goswim.tv/apple-authentication'
  },
  stripe: {
    key: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  },
  goswimTutorial: {
    tutorialId: '633fb5fdff561bbc7f140dab'
  },
  goswimGroupAPI: {
    groupId: '633fb60d161a105722ce3408'
  },
  freeValidTill: {
    endDate: process.env.NEXT_PUBLIC_FREE_USER_END_TIME
  },
  googleClientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  S3_BUCKET: process.env.S3_BUCKET,
  S3_REGION: process.env.REGION,
  S3_ACCESS_KEY: process.env.ACCESS_KEY,
  S3_SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
  S3_DIRECTORY: process.env.DIRECTORY
};
