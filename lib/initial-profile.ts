import { currentUser, redirectToSignIn, redirectToSignUp } from "@clerk/nextjs";

import { db } from "@/lib/db";

export const initialProfile = async () => {
  const user = await currentUser();

  if (!user) {
    return redirectToSignIn();
  }
  const profile = db.profile.findUnique({
    where: {
      userId: user.id,
    },
  });
  if (!profile) {
    const newProfile = await db.profile.create({
      data: {
        userId: user.id,
        name: `${user.firstName} ${user.lastName}`,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
      },
    });
    return newProfile;
  }

  return profile;
};
