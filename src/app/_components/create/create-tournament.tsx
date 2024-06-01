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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Der Turniername muss mindestens 2 Zeichen besitzen.",
  }),
  code: z.string().min(4, {
    message: "Der Code muss mindestens 4 Zeichen besitzen.",
  }),
  password: z.string().min(6, {
    message: "Das Passwort muss mindestens 6 Zeichen besitzen.",
  }),
  tournamentSize: z.string(),
});

export function CreateTournament() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      code: "",
      password: "",
      tournamentSize: "BIG",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await fetch("/api/tournament/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
        toast({
          title: "Du bist dem Turnier beigetreten",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(
                  {
                    Turniername: data.name,
                    Turniercode: data.code,
                    Size: data.tournamentSize,
                  },
                  null,
                  2,
                )}
              </code>
            </pre>
          ),
        });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Turnier-Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Lustiges Turnier" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Turnier-Code</FormLabel>
              <FormControl>
                <Input type="text" placeholder="pingpong" {...field} />
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
              <FormLabel>Admin-Passwort</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tournamentSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Turnier-Größe</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Turniergröße wählen" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="SMALL">4 Teams | 8 Spieler</SelectItem>
                  <SelectItem value="MEDIUM">8 Teams | 16 Spieler</SelectItem>
                  <SelectItem value="LARGE">16 Teams | 32 Spieler</SelectItem>
                  <SelectItem value="BIG">32 Teams | 64 Spieler</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Erstellen</Button>
      </form>
    </Form>
  );
}
