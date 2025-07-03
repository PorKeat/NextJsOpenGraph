/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from "next";
import UserDetailPage from "./UserDetailPage";

export async function generateMetadata(
  // ✅ Let Next.js infer the correct type
  props: any
): Promise<Metadata> {
  const { params } = props;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}users/${params.id}`
    );
    if (!res.ok) {
      return { title: "User not found" };
    }

    const user = await res.json();
    const fullName = `${user.firstName} ${user.lastName}`;


    return {
      title: fullName,
      openGraph: {
        title: fullName,
        images: [user?.image],
      },
    };
  } catch {
    return {
      title: "User not found",
    };
  }
}

export default function page() {
  return <UserDetailPage />;
}
