import React, { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { marketplace } from '@/requests';
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '../ui/form';
import { Loader } from '../shared';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';

/**
 *
 * NOT BEING USED @notUse
 *
 *
 */
const formSchema = z.object({
  marketplaceId: z.string().min(1, { message: 'Marketplace is required' }),
});

interface ScanFormProps {
  setFormData: (state: { marketplaceId: string }) => void;
}

export function ScanForm({ setFormData }: ScanFormProps) {
  const [existingMarketPlaces, setExistingMarketplaces] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = useCallback(
    async (value: z.infer<typeof formSchema>) => {
      setFormData({ marketplaceId: value.marketplaceId });
    },
    [setFormData],
  );

  useEffect(() => {
    (async () => {
      const { isSuccess, data } = await marketplace.getMarketplace();
      if (isSuccess) {
        setExistingMarketplaces(data);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        {isLoading ? (
          <Loader className="h-auto" />
        ) : (
          <FormField
            control={form.control}
            name="marketplaceId"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the Marketplace" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {existingMarketPlaces.map(({ account_name: accountName, platform_id: platformId }) => (
                      <SelectItem key={platformId} value={platformId}>
                        {accountName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
                <FormDescription />
              </FormItem>
            )}
          />
        )}

        <Button
          // disabled={isLoading || form.formState.isSubmitting}
          isLoading={form.formState.isSubmitting}
          className="w-full"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
