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
import { StatusCodes } from 'http-status-codes';

const changePasswordSchema = z
  .object({
    oldPwd: z.string().min(6, {
      message: 'Password must be at least 6 characters.',
    }),
    newPwd: z.string().min(6, {
      message: 'Password must be at least 6 characters.',
    }),
    confirmPwd: z.string().min(6, {
      message: 'Password must be at least 6 characters.',
    }),
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
      form.reset();
    } catch (error: any) {
      if (error.statusCode === StatusCodes.UNAUTHORIZED) {
        router.push('/login');
        return;
      }
      toast({
        variant: 'destructive',
        description: error.message ?? 'Something went wrong, Please try again later!',
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
                <Input placeholder="Old Password" {...field} />
              </FormControl>
              {form.formState.errors.oldPwd ? (
                <FormMessage />
              ) : (
                <FormDescription>Enter your old password.</FormDescription>
              )}
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
                <Input placeholder="New Password" {...field} />
              </FormControl>

              {form.formState.errors.newPwd ? (
                <FormMessage />
              ) : (
                <FormDescription>Please enter new Password.</FormDescription>
              )}
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
                <Input placeholder="Confirm Password" {...field} />
              </FormControl>

              {form.formState.errors.confirmPwd ? (
                <FormMessage />
              ) : (
                <FormDescription>Please confirm your new password.</FormDescription>
              )}
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
