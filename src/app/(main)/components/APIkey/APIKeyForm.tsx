/* eslint-disable no-debugger */
/* eslint-disable no-console */

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
// import { marketplace } from '@/requests';
import axios from 'axios';

const formSchema = z.object({
  marketPlace: z.string().min(1, 'Please select the marketplace.'),
  apiKey: z.string().min(3, 'Please enter the valid API Key!'),
  apiSecret: z.string().min(3, 'Please enter the valid API Secret!'),
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
}

function APIKeyForm({ mode = 'create', apiKey = '', secret = '', marketPlace = null }: IAPIKeyFormProps) {
  const defaultValues = {
    apiKey: mode === 'edit' ? apiKey : '',
    apiSecret: mode === 'edit' ? secret : '',
    accountName: '',
    marketPlace: '',
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async function (values: z.infer<typeof formSchema>) {
    const reqData = {
      api_key: values.apiKey,
      secret: values.apiSecret,
      market_place_name: values.marketPlace,
      account_name: values.accountName,
    };

    console.log(reqData);
    if (mode === 'edit') {
      return toast({
        variant: 'destructive',
        title: 'Contact Support',
        description: 'This is not available now. We are working hard on it.',
      });
    }
    // const response = await marketplace.addMarketplace(reqData);
    const response = await axios.get(
      'https://api.flipkart.net/oauth-service/oauth/authorize?client_id=522457b7048bb49786ab5946b06862084038&redirect_uri=https://aumsoft.vercel.app/&response_type=code&scope=Seller_Api&state=fb-seller',
    );
    debugger;
    if (response.data) {
      form.reset();
    }
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

        <FormField
          control={form.control}
          name="apiKey"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>API Key</FormLabel> */}
              <FormControl>
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <Input placeholder="API Key" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="apiSecret"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>API Secret</FormLabel> */}
              <FormControl>
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <Input placeholder="API Secret" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit" isLoading={form.formState.isSubmitting}>
          {mode === 'edit' ? 'Update' : 'Add'}
        </Button>
      </form>
    </Form>
  );
}

export default APIKeyForm;
