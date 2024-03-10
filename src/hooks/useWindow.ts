import { toast } from '@/components/ui/use-toast';
import { useRef, useState } from 'react';

type TWindowSetting = {
  scrollbars: boolean;
  resizable: boolean;
  status: boolean;
  location: boolean;
  toolbar: boolean;
  menubar: boolean;
  width: number;
  height: number;
  left: number;
  top: number;
};

interface IOpenWindow {
  url: string;
  title: string;
  setting?: TWindowSetting;
}

interface IOpenWindowWithSetting extends IOpenWindow {
  setting: TWindowSetting;
}

const defaultSetting: IOpenWindowWithSetting['setting'] = {
  scrollbars: false,
  resizable: false,
  status: false,
  location: false,
  toolbar: false,
  menubar: false,
  width: 1000,
  height: 1000,
  left: 50,
  top: 50,
};

function convertToQueryString(settings: IOpenWindowWithSetting['setting']) {
  const convertedSettings = Object.entries(settings)
    .map(([key, value]) => {
      return `${key}=${value ? 'yes' : 'no'}`;
    })
    .join(',');

  return convertedSettings;
}

function openWindow({ url, title, setting }: IOpenWindow): null | Window {
  const stg = {
    ...defaultSetting,
    ...setting,
  };
  if (!window) {
    toast({
      description: 'Could not open a window. Please reload the page and try again!.',
      title: 'Error',
      variant: 'destructive',
    });
    return null;
  }

  const settingQueryString = convertToQueryString(stg);
  return window.open(url, title, settingQueryString);
}

const checkHrefChange = (windowRef: Window, cb: (value: any) => void) => {
  const redirectURL = process.env.NEXT_PUBLIC_FLIPKART_REDIRECT_URL;
  // eslint-disable-next-line no-param-reassign
  windowRef.onload = () => {
    setInterval(() => {
      const currentURl = window.location.href;
      if (currentURl.includes(redirectURL!)) {
        const { searchParams } = new URL(currentURl);
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        cb({ code, state });
      }
    }, 100);
  };
};

export const useWindow = () => {
  const refWindow = useRef<null | Window>(null);
  const [data, setData] = useState<any>(null);

  const onUrlChange = (value: any) => {
    setData(value);
    if (refWindow.current) {
      const isClosed = refWindow.current.closed;
      if (!isClosed) {
        refWindow.current.close();
      }
    }
  };

  const open = ({ url, title, setting }: IOpenWindow) => {
    let win = openWindow({ url, title, setting });
    // eslint-disable-next-line no-console
    console.log(win);
    refWindow.current = win;
    checkHrefChange(refWindow.current!, onUrlChange);
  };
  return { refWindow, data, open };
};
