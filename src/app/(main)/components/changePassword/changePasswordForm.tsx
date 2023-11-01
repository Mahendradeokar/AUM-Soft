/* eslint-disable react/jsx-props-no-spreading */

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { commonAPICallHandler } from '@/lib/utils';
import { useRouter } from 'next/navigation';

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

type TChangePasswordValues = z.infer<typeof changePasswordSchema>;

const defaultValues: Partial<TChangePasswordValues> = {
  oldPwd: '',
  newPwd: '',
  confirmPwd: '',
};

export default function ChangePassword() {
  const router = useRouter();
  const form = useForm<TChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues,
    mode: 'onChange',
  });

  async function onSubmit(values: TChangePasswordValues) {
    try {
      const reqData = {
        old_password: values.oldPwd,
        new_password: values.newPwd,
      };
      await commonAPICallHandler({ url: '/profile/changes-password', data: reqData, method: 'PUT' });
      toast({
        variant: 'default',
        title: 'New Password Update!',
        description: 'Your password is changed',
      });
    } catch (error: any) {
      if (error.error === 'ERR_JWT_EXPIRED') {
        router.push('/login');
        return;
      }
      toast({
        variant: 'destructive',
        title: 'Whoops!!',
        description: 'Something went wrong, Please try again later!',
      });
    }
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
          name="newPwd"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>Please enter new Password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPwd"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>Please confirm your new password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" isLoading={form.formState.isSubmitting}>
          Update Password
        </Button>
      </form>
    </Form>
  );
}
