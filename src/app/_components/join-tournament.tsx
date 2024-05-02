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
import { type Player, type Team } from "@prisma/client";

type TournamentResponse = {
  createdTeam: Team;
  player1: Player;
  player2: Player;
}

const FormSchema = z.object({
  teamname: z.string().min(2, {
    message: "Der Teamname muss mindestens 2 Zeichen besitzen.",
  }),
  player1: z.string().min(2, {
    message: "Der Spieler muss mindestens 2 Zeichen besitzen.",
  }),
  player2: z.string().min(2, {
    message: "Der Spieler muss mindestens 2 Zeichen besitzen.",
  }),
  tournamentCode: z.string().min(4, {
    message: "Der Code muss mindestens 4 Zeichen besitzen.",
  }),
});

export function JoinTournament() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      teamname: "",
      player1: "",
      player2: "",
      tournamentCode: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const response = await fetch("/api/tournament/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const tournamentResponse = await response.json() as TournamentResponse;

    toast({
      title: "Du bist dem Turnier beigetreten",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify({
            Teamname: tournamentResponse.createdTeam.name,
            Spieler1: tournamentResponse.player1.name,
            Spieler2: tournamentResponse.player2.name,
            Turniercode: data.tournamentCode,
          }, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="teamname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team-Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Pongstar" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="player1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name Spieler 1</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Jan" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="player2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name Spieler 2</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Peter" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tournamentCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Turniercode</FormLabel>
              <FormControl>
                <Input type="text" placeholder="BIERPONG" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Eintragen</Button>
      </form>
    </Form>
  );
}
