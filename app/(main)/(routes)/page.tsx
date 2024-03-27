import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { initialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Profile } from "@prisma/client";

export default async function Home() {
  const profile = await initialProfile();
  console.log({ profile });
  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  if (server) {
    return redirect(`/server/${server.id}`);
  }
  return (
    <main className="text-3xl font-bold text-indigo-500">
      Create A Server
      <UserButton />
    </main>
  );
}
