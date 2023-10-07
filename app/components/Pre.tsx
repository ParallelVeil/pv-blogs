import { CopyButton } from "@/app/components/CopyButton";
import clsx from "clsx";

export function Pre({
    children,
    raw,
    buttonClasses = 'absolute top-3 right-3 bg-zinc-900',
    ...props
}: any) {
    return (
        <div className='relative my-0'>
            <pre {...props} className={clsx('not-prose','mt-4',props.className)}>
                {children}
                <CopyButton text={raw} className={buttonClasses} />
            </pre>
        </div>
    )
}

