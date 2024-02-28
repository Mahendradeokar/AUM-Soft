import { MONTH_LIST } from '@/common/constants';
import { Loader } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { marketplace } from '@/requests';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  marketplaceName: z.string(),
  month: z.string(),
  file: z.string().refine(
    (path) => {
      const parts = path.split('.');
      const fileExtension = parts[parts.length - 1];
      return ['xlsx', 'xls'].includes(fileExtension.toLowerCase());
    },
    {
      message: 'Invalid file extension. Supported extensions are xlsx, xls',
    },
  ),
});

export default function UploadSheet({ openMp }: { openMp: () => void }) {
  const [existingMarketPlaces, setExistingMarketplaces] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

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
      <form className="space-y-5">
        {isLoading ? (
          <Loader className="h-auto" />
        ) : (
          <>
            <FormField
              control={form.control}
              name="marketplaceName"
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
                  <div className="flex justify-between">
                    <FormMessage />
                    <FormDescription>
                      <Button
                        onClick={openMp}
                        variant="link"
                        type="button"
                        className="dark:text-primary text-primary underline"
                        size="xs"
                      >
                        Add New Marketplace
                      </Button>
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="month"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the Month" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-60 overflow-auto">
                      {MONTH_LIST.sort((a, b) => a.number - b.number).map(({ name, number }) => (
                        <SelectItem key={number} value={String(number)}>
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
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="file" id="sheetFile" {...field} />
                  </FormControl>
                  <div className="flex justify-between">
                    <FormMessage />
                    <FormDescription className="dark:text-primary text-primary">
                      *Upload Your Payment report
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </>
        )}

        <Button disabled={isLoading} className="w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
