'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { commonAPICallHandler } from '@/lib/utils';

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  pwd: z.string().min(6, {
    message: 'Passwrod must be at least 6 characters.',
  }),
});

function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      pwd: '',
    },
  });

  const onSubmit = async function (values: z.infer<typeof formSchema>) {
    try {
      const reqData = {
        email: values.email,
        password: values.pwd,
      };
      await commonAPICallHandler({ url: 'auth/login', data: reqData, method: 'POST' });
      router.push('/');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Whoops!!',
        description: error.message,
      });
    }
  };
  return (
    //  eslint-disable-next-line react/jsx-props-no-spreading
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pwd"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit" isLoading={form.formState.isSubmitting}>
          login
        </Button>
      </form>
    </Form>
  );
}

export default LoginForm;
