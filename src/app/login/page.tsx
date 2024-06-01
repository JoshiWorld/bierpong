"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

const FormSchema = z.object({
  code: z.string().min(4, {
    message: "Der Code muss mindestens 4 Zeichen besitzen.",
  }),
  password: z.string(),
});

function LoginAdmin() {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      code: "",
      password: "",
    },
  });

  const login = api.tournament.login.useMutation({
    onSuccess: (jwt) => {
      setCookie("adminsession", jwt, {
        //      sek  min  std
        maxAge: 60 * 60 * 24,
      });

      router.push("/admin");
      toast({
        title: "Du bist jetzt als Admin eingeloggt.",
      });
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    login.mutate({ code: data.code, password: data.password });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Turnier-Code</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Passwort</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={login.isPending}>
          {login.isPending ? "Wird eingeloggt..." : "Einloggen"}
        </Button>
      </form>
    </Form>
  );
}

export default function LoginPage() {
  return (
    <div className="relative flex h-[50rem] w-full  items-center justify-center bg-white bg-dot-black/[0.2] dark:bg-background dark:bg-dot-white/[0.2]">
      {/* <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-background"></div> */}
      <LoginAdmin />
    </div>
  );
}
