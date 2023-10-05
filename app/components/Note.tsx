import React from 'react'

const containerClasses = 'tracking-tight -ml-4 -mr-4 px-5 py-4 sm:-ml-6 sm:-mr-6 sm:rounded-lg sm:shadow sm:px-2';
const titleClasses = 'absolute -top-[27px] py-0 rounded-t leading-6 px-5 text-xs border-b-0 z-10 font-bold border-t-4 sm:left-0';

type Props = {
    'data-bq-color': string,
    'data-bq-title': string,
    children: React.ReactNode
}

export function Note({
                         'data-bq-color': color,
                         'data-bq-title': title,
                         children,
                     }: any) {

    if (!color) {
        return <blockquote>{children}</blockquote>
    }

    let colorClass = '';
    switch (color) {
        case 'slate':
            colorClass = 'bg-slate-50 border border-slate-200 text-slate-800';
            break;
        case 'gray':
            colorClass = 'bg-zinc-50 border border-zinc-200 text-zinc-800';
            break;
        case 'zinc':
            colorClass = 'bg-zinc-50 border border-zinc-200 text-zinc-800';
            break;
        case 'neutral':
            colorClass = 'bg-neutral-50 border border-neutral-200 text-neutral-800';
            break;
        case 'stone':
            colorClass = 'bg-stone-50 border border-stone-200 text-stone-800';
            break;
        case 'red':
            colorClass = 'bg-red-50 border border-red-200 text-red-800';
            break;
        case 'orange':
            colorClass = 'bg-orange-50 border border-orange-200 text-orange-800';
            break;
        case 'amber':
            colorClass = 'bg-amber-50 border border-amber-200 text-amber-800';
            break;
        case 'yellow':
            colorClass = 'bg-yellow-50 border border-yellow-200 text-yellow-800';
            break;
        case 'lime':
            colorClass = 'bg-lime-50 border border-lime-200 text-lime-800';
            break;
        case 'green':
            colorClass = 'bg-green-50 border border-green-200 text-green-800';
            break;
        case 'emerald':
            colorClass = 'bg-emerald-50 border border-emerald-200 text-emerald-800';
            break;
        case 'teal':
            colorClass = 'bg-teal-50 border border-teal-200 text-teal-800';
            break;
        case 'cyan':
            colorClass = 'bg-cyan-50 border border-cyan-200 text-cyan-800';
            break;
        case 'sky':
            colorClass = 'bg-sky-50 border border-sky-200 text-sky-800';
            break;
        case 'blue':
            colorClass = 'bg-blue-50 border border-blue-200 text-blue-800';
            break;
        case 'indigo':
            colorClass = 'bg-indigo-50 border border-indigo-200 text-indigo-800';
            break;
        case 'violet':
            colorClass = 'bg-violet-50 border border-violet-200 text-violet-800';
            break;
        case 'purple':
            colorClass = 'bg-purple-50 border border-purple-200 text-purple-800';
            break;
        case 'fuchsia':
            colorClass = 'bg-fuchsia-50 border border-fuchsia-200 text-fuchsia-800';
            break;
        case 'pink':
            colorClass = 'bg-pink-50 border border-pink-200 text-pink-800';
            break;
        case 'rose':
            colorClass = 'bg-rose-50 border border-rose-200 text-rose-800';
            break;
        default:
            colorClass = 'bg-yellow-50 border border-yellow-200 text-yellow-800';
    }
    return (
        <div className="relative my-24 w-full">
            <div className={`${containerClasses} ${colorClass}`}>
                {title ? <div className={`${titleClasses} ${colorClass}`}>{title}</div> : null}
                <div className="p-3">
                    {children}
                </div>
            </div>
        </div>
    )
}
