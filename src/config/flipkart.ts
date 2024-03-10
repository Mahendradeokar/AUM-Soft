import { toast } from '@/components/ui/use-toast';

const REDIRECT_URL = process.env.NEXT_PUBLIC_FLIPKART_REDIRECT_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_FLIPKART_CLIENT_ID;

const FB_OAUTH_CONFIG = {
  REDIRECT_URL,
  CLIENT_ID,
};

export const getFbOauthUrl = (metaData: string) => {
  if (!FB_OAUTH_CONFIG.CLIENT_ID || !FB_OAUTH_CONFIG.REDIRECT_URL) {
    toast({
      description: 'Something went wrong.',
      title: 'Whoop......!',
      variant: 'destructive',
    });

    // eslint-disable-next-line no-console
    console.error('Please provide the client id and redirect url for FB flow!');
    return null;
  }

  return `https://api.flipkart.net/oauth-service/oauth/authorize?client_id=${FB_OAUTH_CONFIG.CLIENT_ID}&redirect_uri=${
    FB_OAUTH_CONFIG.REDIRECT_URL
  }&response_type=code&scope=Seller_Api&state=${encodeURIComponent(metaData)}`;
};
