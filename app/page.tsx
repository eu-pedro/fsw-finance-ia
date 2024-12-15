import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Navbar } from "./_components/navbar";

export default async function Home() {
  const { userId } = await auth();
  if (!userId) redirect("/login");

  return <Navbar />;
}
