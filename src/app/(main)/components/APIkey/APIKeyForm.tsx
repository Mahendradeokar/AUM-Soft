'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { MARKETPLACE_TYPE } from '@/common/common';

const formSchema = z.object({
  marketPlace: z.string({
    required_error: 'Please select the marketplace.',
  }),
  apiKey: z.string({
    required_error: 'API key is required!',
  }),
  apiSecret: z.string({
    required_error: 'API Secret is required!',
  }),
});

// 2. Define a submit handler.
function onSubmit(values: z.infer<typeof formSchema>) {
  // Do something with the form values.
  // ✅ This will be type-safe and validated.
  console.log(values);
}

const marketplaceOptions = [
  { name: 'Flipkart', value: MARKETPLACE_TYPE.flipkart, isDisable: false },
  { name: 'Amazon', value: MARKETPLACE_TYPE.amazon, isDisable: true },
  { name: 'Meesho', value: MARKETPLACE_TYPE.meesho, isDisable: true },
];

enum Mode {
  edit = 'edit',
  create = 'create',
}

interface IAPIKeyFormProps {
  mode?: Mode;
  key?: string;
  secret?: string;
}

function APIKeyForm({ mode = Mode.create, key = '', secret = '' }: IAPIKeyFormProps) {
  const defaultValues = {
    apiKey: mode === Mode.edit ? key : '',
    apiSecret: mode === Mode.edit ? secret : '',
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a marketplace" />
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
        <Button className="w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default APIKeyForm;
