/* eslint-disable react/jsx-props-no-spreading */

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';

const changePasswordSchema = z
  .object({
    oldPwd: z.string().min(6, {
      message: 'Password must be at least 6 characters.',
    }),
    newPwd: z.string().min(6, {
      message: 'Password must be at least 6 characters.',
    }),
    confirmPwd: z.string(),
  })
  .refine((value) => value.confirmPwd === value.newPwd, {
    message: 'Passwords do not match',
    path: ['confirmPwd'],
  });

// @TODO :- make all form validation common

type TChangePasswordValues = z.infer<typeof changePasswordSchema>;

const defaultValues: Partial<TChangePasswordValues> = {
  oldPwd: '',
  newPwd: '',
  confirmPwd: '',
};

export default function ChangePassword() {
  const form = useForm<TChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues,
    mode: 'onChange',
  });

  function onSubmit(data: TChangePasswordValues) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="oldPwd"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Old Password</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Enter your old password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPwd"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>Please enter the you email address.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  );
}
