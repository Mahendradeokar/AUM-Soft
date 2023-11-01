/* eslint-disable react/jsx-props-no-spreading */

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { useEffect } from 'react';
import { commonAPICallHandler } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const profileFormSchema = z.object({
  username: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  username: '',
  email: '',
};

export function ProfileForm() {
  const router = useRouter();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  useEffect(() => {
    (async () => {
      try {
        const response = (await commonAPICallHandler({
          url: '/profile',
          method: 'GET',
        })) as { message: string; data: any };
        form.setValue('email', response.data.email);
        form.setValue('username', response.data.user_name);
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
    })();
  }, [router, form]);

  function onSubmit() {
    toast({
      title: 'Coming Soon',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">Working on it! We will get back to you...</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter you full name." {...field} disabled />
              </FormControl>
              {/* <FormDescription>Enter you full name.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <Input placeholder="Please enter the you email address." {...field} disabled />
              </FormControl>
              {/* <FormDescription>Please enter the you email address.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled>
          Update profile (Coming Soon)
        </Button>
      </form>
    </Form>
  );
}
