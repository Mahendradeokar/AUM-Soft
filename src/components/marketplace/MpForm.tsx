'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { toast } from '@/components/ui/use-toast';
import { MARKETPLACE_TYPE } from '@/common/constants';
import { getFbOauthUrl } from '@/config/flipkart';

const formSchema = z.object({
  marketPlace: z.string().min(1, 'Please select the marketplace.'),
  apiKey: z.string().min(3, 'Please enter the valid API Key!').optional(),
  apiSecret: z.string().min(3, 'Please enter the valid API Secret!').optional(),
  accountName: z.string().min(4, 'Please entry the account name'),
});

// 2. Define a submit handler.
// function onSubmit(values: z.infer<typeof formSchema>) {
//   try {
//     axiosInstance.post("/ecom/add_ecom")
//   } catch (error) {

//   }
// }

const marketplaceOptions = [
  { name: 'Flipkart', value: MARKETPLACE_TYPE.flipkart, isDisable: false },
  { name: 'Amazon', value: MARKETPLACE_TYPE.amazon, isDisable: true },
  { name: 'Meesho', value: MARKETPLACE_TYPE.meesho, isDisable: true },
];

export type Mode = 'edit' | 'create';

interface IAPIKeyFormProps {
  mode?: Mode;
  apiKey?: string;
  secret?: string;
  marketPlace?: string | null;
  close?: () => void;
}

function APIKeyForm({ mode = 'create', marketPlace = null }: IAPIKeyFormProps) {
  const defaultValues = {
    // apiKey: mode === 'edit' ? apiKey : '',
    // apiSecret: mode === 'edit' ? secret : '',
    accountName: '',
    marketPlace: '',
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async function (values: z.infer<typeof formSchema>) {
    const reqData = {
      market_place_name: values.marketPlace,
      account_name: values.accountName,
    };

    if (mode === 'edit') {
      return toast({
        variant: 'destructive',
        title: 'Contact Support',
        description: 'This is not available now. We are working hard on it.',
      });
    }

    const jsonString = JSON.stringify(reqData);
    const redirectURL = getFbOauthUrl(encodeURIComponent(jsonString));
    if (redirectURL) {
      const popup: any = window.open(redirectURL, reqData.account_name.trim(), 'popup');
      const checkPopup = setInterval(() => {
        try {
          if (popup.window.location.href) {
            const currentURl = window.location.href;
            // eslint-disable-next-line no-console
            console.log('I am accessing it....', currentURl);
            if (currentURl.includes(redirectURL!)) {
              const { searchParams } = new URL(currentURl);
              const code = searchParams.get('code');
              const state = searchParams.get('state');
              // eslint-disable-next-line no-console
              console.log('code and state', code, JSON.parse(state!));
            }
            popup.close();
          }
          if (!popup || !popup.closed) return;
          clearInterval(checkPopup);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error);
        }
      }, 1000);
      // window.open(
      //   '/',
      //   'testing',
      //   `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=600,height=300,left=100,top=100`,
      // );
      // router.push(redirectURL);
    }
    // const { isSuccess } = await marketplace.addMarketplace(reqData);
    // if (isSuccess) {
    //   form.reset();
    //   // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    //   close && close();
    // }
    return null;
  };

  return (
    //  eslint-disable-next-line react/jsx-props-no-spreading
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="marketPlace"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Marketplace</FormLabel> */}
              <Select
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
                disabled={Boolean(marketPlace)}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={marketPlace || 'Select a marketplace'} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {marketplaceOptions.map(({ name, value, isDisable }) => (
                    <SelectItem key={value} value={value} disabled={isDisable}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="accountName"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>API Key</FormLabel> */}
              <FormControl>
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <Input placeholder="Account Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name="apiKey"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="API Key" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        {/* <FormField
          control={form.control}
          name="apiSecret"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="API Secret" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <Button className="w-full" type="submit" isLoading={form.formState.isSubmitting}>
          {mode === 'edit' ? 'Update' : 'Add'}
        </Button>
      </form>
    </Form>
  );
}

export default APIKeyForm;
