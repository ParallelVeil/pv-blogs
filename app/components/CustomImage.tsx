import Image from "next/image"

type Props = {
    src: string,
    alt: string,
    priority?: string,
}

export default function CustomImage({ src, alt, priority }: any) {
    if (src.startsWith("images/") || src.startsWith("/images/") || src.startsWith("./images/")) {
        src = `http://localhost:3000/api/images${src.replace(/^\.*\/?images\//, '/')}`;
    }
    return (
        <div className="w-full h-full">
            <Image
                className="rounded-lg mx-auto"
                src={src}
                alt={alt}
                width={650}
                height={650}
                priority={!!priority}
            />
        </div>
    )
}