"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
const formSchema = z.object({     
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      console.log(values)
    }
  
const LoginForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
        },
    })
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex justify-center items-center h-screen">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="min-w-[30rem]">
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
                  <FormControl>
                <Input placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
              <FormControl>
              <Button className="flex min-w-[30rem] justify-center text-center" type="submit">login</Button>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export default LoginForm