'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { marketplace, orders, payment, returns } from '@/requests';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { reloadSite } from '@/lib/utils';
import { toast } from '../ui/use-toast';
import { Loader } from '../shared';

const formSchema = z.object({
  marketplaceName: z.string({
    required_error: 'Please select the marketplace',
  }),
  // dateRange: z.date({ required_error: 'Please select the date', invalid_type_error: "That's not a date!" }),
  file: z.any().refine(() => {
    return true;
  }, 'File is required with a valid extension'),
});

// TODO - Add validation for file upload.

export function UploadOrders({ openMp, closeModal }: { openMp: () => void; closeModal: () => void }) {
  const [existingMarketPlaces, setExistingMarketplaces] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [sheet, setSheet] = useState(new File([], 'demo'));
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = useCallback(
    async (value: z.infer<typeof formSchema>) => {
      const formData = new FormData();
      // const startDate = convertDateToUnix(value?.dateRange);
      if (sheet.size === 0) {
        form.setError('file', { message: `File is empty. Please upload another file.`, type: 'required' });
        return;
      }
      formData.append('order_sheet', sheet);
      formData.append('account_name', value.marketplaceName);
      // formData.append('sheet_start_date', String(startDate));
      const { isSuccess } = await orders.upload({ formData });
      if (isSuccess) {
        toast({
          description: 'Orders Uploaded successfully!',
          title: 'Orders Upload!',
          variant: 'success',
        });
        closeModal();
        reloadSite();
      }
    },
    [sheet, closeModal, form],
  );

  const onFileUpload = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const allowedExtensions = ['pdf'];

      if (e.target.files?.[0]) {
        const file = e.target.files[0];
        const fileExtension = file.name.split('.').at(-1)?.toLowerCase();
        if (fileExtension && allowedExtensions.includes(fileExtension)) {
          setSheet(file);
          return;
        }
        form.setError('file', {
          message: `Please upload the orders with a valid extension.`,
          type: 'invalid_type_error',
        });
        return;
      }
      form.setError('file', { message: `Please upload Orders.`, type: 'required' });
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

            {/* <FormField
              control={form.control}
              name="dateRange"
              render={({ field }) => (
                <FormItem>
                  <CalendarDateRangePicker date={field.value} onSelect={field.onChange} />
                  <FormMessage />
                </FormItem>
              )}
            /> */}

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
                    <FormDescription className="dark:text-primary text-primary">*Upload Your Orders</FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </>
        )}

        <Button
          disabled={isLoading || form.formState.isSubmitting}
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

export function UploadPaymentSheet({ openMp, closeModal }: { openMp: () => void; closeModal: () => void }) {
  const [existingMarketPlaces, setExistingMarketplaces] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [sheet, setSheet] = useState(new File([], 'demo'));
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = useCallback(
    async (value: z.infer<typeof formSchema>) => {
      const formData = new FormData();
      // const startDate = convertDateToUnix(value?.dateRange);
      if (sheet.size === 0) {
        form.setError('file', { message: `File is empty. Please upload another file.`, type: 'required' });
        return;
      }
      formData.append('payment_sheet', sheet);
      formData.append('account_name', value.marketplaceName);
      // formData.append('sheet_start_date', String(startDate));
      const { isSuccess } = await payment.uploadPaymentSheet({ formData });
      if (isSuccess) {
        toast({
          description: 'Payment sheet uploaded  successfully!',
          title: 'Return Upload!',
          variant: 'success',
        });
        closeModal();
        reloadSite();
      }
    },
    [sheet, closeModal, form],
  );

  const onFileUpload = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const allowedExtensions = ['xls', 'xlsx'];

      if (e.target.files?.[0]) {
        const file = e.target.files[0];
        const fileExtension = file.name.split('.').at(-1)?.toLowerCase();
        if (fileExtension && allowedExtensions.includes(fileExtension)) {
          setSheet(file);
          return;
        }
        form.setError('file', {
          message: `Please upload payment sheet with a valid extension.`,
          type: 'invalid_type_error',
        });
        return;
      }
      form.setError('file', { message: `Please upload payment.`, type: 'required' });
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

            {/* <FormField
              control={form.control}
              name="dateRange"
              render={({ field }) => (
                <FormItem>
                  <CalendarDateRangePicker date={field.value} onSelect={field.onChange} />
                  <FormMessage />
                </FormItem>
              )}
            /> */}

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
                      *Upload Your Payment sheet
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </>
        )}

        <Button
          disabled={isLoading || form.formState.isSubmitting}
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

export function UploadReturnSheet({ openMp, closeModal }: { openMp: () => void; closeModal: () => void }) {
  const [existingMarketPlaces, setExistingMarketplaces] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [sheet, setSheet] = useState(new File([], 'demo'));
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = useCallback(
    async (value: z.infer<typeof formSchema>) => {
      const formData = new FormData();
      // const startDate = convertDateToUnix(value?.dateRange);
      if (sheet.size === 0) {
        form.setError('file', { message: `File is empty. Please upload another file.`, type: 'required' });
        return;
      }
      formData.append('payment_sheet', sheet);
      formData.append('account_name', value.marketplaceName);
      // formData.append('sheet_start_date', String(startDate));
      const { isSuccess } = await returns.upload({ formData });
      if (isSuccess) {
        toast({
          description: 'Payment sheet uploaded  successfully!',
          title: 'Return Upload!',
          variant: 'success',
        });
        closeModal();
        reloadSite();
      }
    },
    [sheet, closeModal, form],
  );

  const onFileUpload = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const allowedExtensions = ['xls', 'xlsx'];

      if (e.target.files?.[0]) {
        const file = e.target.files[0];
        const fileExtension = file.name.split('.').at(-1)?.toLowerCase();
        if (fileExtension && allowedExtensions.includes(fileExtension)) {
          setSheet(file);
          return;
        }
        form.setError('file', {
          message: `Please upload payment sheet with a valid extension.`,
          type: 'invalid_type_error',
        });
        return;
      }
      form.setError('file', { message: `Please upload payment.`, type: 'required' });
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

            {/* <FormField
              control={form.control}
              name="dateRange"
              render={({ field }) => (
                <FormItem>
                  <CalendarDateRangePicker date={field.value} onSelect={field.onChange} />
                  <FormMessage />
                </FormItem>
              )}
            /> */}

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
                      *Upload Your Return sheet
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </>
        )}

        <Button
          disabled={isLoading || form.formState.isSubmitting}
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
