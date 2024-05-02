import { getSession } from "@/server/api/jwt";
import { StartPage } from "./_components/start-page";
import { redirect } from "next/navigation";

export default async function Home() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const session = await getSession();

  if(!session) return <StartPage />;

  return redirect("/tournament");
}
