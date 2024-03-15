'use client';

import { convertDateToUnix } from '@/common/common';
import { CalendarDateRangePicker, Loader } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { marketplace, sheets } from '@/requests';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from '../ui/use-toast';

const formSchema = z.object({
  marketplaceName: z.string({
    required_error: 'Please select the marketplace',
  }),
  dateRange: z
    .object(
      {
        from: z.date(),
        to: z.date(),
      },
      { required_error: 'Please select the date', invalid_type_error: "That's not a date!" },
    )
    .refine(
      ({ from }) => {
        return from.getDate() === 1;
      },
      { message: 'Start date should be 1 (Please upload sheet from day 1)' },
    ),
  file: z.any().refine((val) => {
    return val;
  }, 'File is required with a valid extension'),
});

// TODO - Add validation for file upload.

export default function UploadSheet({ openMp, closeModal }: { openMp: () => void; closeModal: () => void }) {
  const [existingMarketPlaces, setExistingMarketplaces] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [sheet, setSheet] = useState(new File([], 'demo'));
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = useCallback(
    async (value: z.infer<typeof formSchema>) => {
      const formData = new FormData();
      const startDate = convertDateToUnix(value?.dateRange?.from);
      const endDate = convertDateToUnix(value?.dateRange?.to);
      formData.append('order_sheet', sheet);
      formData.append('account_name', value.marketplaceName);
      formData.append('sheet_start_date', String(startDate));
      formData.append('sheet_end_date', String(endDate));
      const { isSuccess } = await sheets.upload({ formData });
      if (isSuccess) {
        toast({
          description: 'Sheet Uploaded successfully!',
          title: 'Sheet Upload!',
          variant: 'success',
        });
        closeModal();
      }
    },
    [sheet, closeModal],
  );

  const onFileUpload = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const allowedExtensions = ['xls', 'xlsx', 'csv'];

      if (e.target.files?.[0]) {
        const file = e.target.files[0];
        const fileExtension = file.name.split('.').at(-1)?.toLowerCase();

        if (fileExtension && allowedExtensions.includes(fileExtension)) {
          setSheet(file);
          return;
        }
        form.setError('file', {
          message: `Please upload the sheet with a valid extension.`,
          type: 'invalid_type_error',
        });
        return;
      }
      form.setError('file', { message: `Please upload sheet.`, type: 'required' });
    },
    [form],
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
                        <SelectItem key={platformId} value={accountName}>
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

            {/* <FormField
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
            /> */}

            <FormField
              control={form.control}
              name="dateRange"
              render={({ field }) => (
                <FormItem>
                  <CalendarDateRangePicker date={field.value} onSelect={field.onChange} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="file"
              render={() => (
                <FormItem>
                  <FormControl>
                    <Input type="file" onChange={onFileUpload} id="sheetFile" />
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

        <Button
          disabled={isLoading || form.formState.isSubmitting || form.formState.isSubmitted}
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

// TODO - refresh on marketplace added create page
