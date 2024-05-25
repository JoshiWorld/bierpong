"use client";

import { Button } from "@/components/ui/button";

export default function TournamentLogout() {

  const handleLogout = async () => {
    await fetch("/api/tournament/logout").then(() => {
        window.location.href = "/";
    }).catch((error) => {
        console.error("Logout error:", error);
    })
  };

  return (
    <div className="container flex items-center justify-center">
      <Button variant="destructive" onClick={handleLogout}>
        Ausloggen
      </Button>
    </div>
  );
}
