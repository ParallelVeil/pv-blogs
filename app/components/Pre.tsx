import clsx from 'clsx'
import {CopyButton} from "@/app/components/CopyButton";

export function Pre({
                        children,
                        raw,
                        buttonClasses = 'absolute top-3 right-3 bg-zinc-900',
                        ...props
                    }: any) {
    return (
        <pre {...props} className={clsx('relative', props.className)}>
      {children}
            <CopyButton text={raw} className={buttonClasses}/>
    </pre>
    )
}

