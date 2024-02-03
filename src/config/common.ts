const serverConfig: any = {
  development: {
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL_DEV,
  },

  production: {
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL_PROD,
  },

  staging: {
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL_STAGING,
  },
};

export const serverURL = serverConfig[process.env.NODE_ENV || 'development'].baseURL;
