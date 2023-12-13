'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/api.services';
import { Button } from '../../../components/ui/button';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  pwd: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});

function SignUpForm() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      pwd: '',
    },
  });

  const onSubmit = async function (values: z.infer<typeof formSchema>) {
    try {
      const reqData = {
        username: values.name,
        email: values.email,
        password: values.pwd,
      };
      await auth.signup(reqData);
      router.push('/login');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Whoops!!',
        description: error.message || 'Something went wrong!',
      });
    }
  };

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <Button type="submit" className="w-full" isLoading={form.formState.isSubmitting}>
          Sign up
        </Button>
      </form>
    </Form>
  );
}

export default SignUpForm;
