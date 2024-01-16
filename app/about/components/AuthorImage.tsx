import Image from "next/image";
import dynamic from "next/dynamic";
import { Suspense } from "react";

function Loading(){
    return <div className="skeleton w-[200] h-[200] rounded-full shrink-0"></div>
}
export default function AuthorImage() {
  return (
    <Suspense fallback={<Loading/>}>
      <Image
        className="border-4 border-[#212936] dark:border-slate-500 drop-shadow-xl shadow-[#212936] rounded-full mx-auto mt-8 z-0"
        src="/images/ishiko.png"
        width={200}
        height={200}
        alt="ishiko"
        priority={true}
      />
    </Suspense>
  );
}

export const DynamicAuthorImage = dynamic(() => import("./AuthorImage"), {
  loading: () => <Loading/>,
});
