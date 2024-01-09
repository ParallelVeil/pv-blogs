import { CopyButton } from "@/app/components/CopyButton";
import clsx from "clsx";

export function Pre({
    children,
    raw,
    buttonClasses = 'absolute top-3 right-3 bg-zinc-900',
    ...props
}: React.ComponentProps<'pre'>&{raw:string,buttonClasses?:string}) {
    return (
        <div className='relative my-0'>
            <pre {...props} className={clsx('not-prose','mt-4 group',props.className)}>
                {children}
                <CopyButton text={raw} className={clsx(buttonClasses,'opacity-0 transition-all group-hover:opacity-100')} />
            </pre>
        </div>
    )
}

