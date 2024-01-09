'use client'
import { useState } from 'react'
import clsx from 'clsx'
import { FaRegCopy, FaCheck } from 'react-icons/fa'
import useWatchTimeout from '../context/useWatchTimeout'

export function CopyButton({ text, className }: React.ComponentProps<'button'> & { text: string }) {
    const [copied, setCopied] = useState(false);

    useWatchTimeout(copied, 1500, () => {
        setCopied(false);
    });

    const copy = async () => {
        await navigator.clipboard.writeText(text)
        setCopied(true)
    }

    const Icon = copied ? FaCheck : FaRegCopy

    return (
        <button
            disabled={copied}
            onClick={copy}
            className={clsx('flex items-center text-xs font-medium text-white rounded', className)}
        >
            <Icon className="mr-1 h-4 w-4" />
            <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
    )
}

