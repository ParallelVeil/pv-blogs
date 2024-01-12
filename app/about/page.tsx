import { Suspense } from "react";
import Profile from "./components/Profile";
import ProfilePic from "./components/ProfilePic";

export default async function Page() {
  return (
    <Suspense fallback={<span className="loading loading-dots loading-lg"></span>}>
      <div className="mx-auto">
        <ProfilePic />
        <Profile />
      </div>
    </Suspense>
  );
}
