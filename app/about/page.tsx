import Profile from "./components/Profile";
import ProfilePic from "./components/ProfilePic";

export default async function Page() {
  return (
    <div className="mx-auto">
      <ProfilePic/>
      <Profile />
    </div>
  );
}
