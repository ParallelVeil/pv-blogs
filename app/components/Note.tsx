import React from 'react'
import "./rehype-blockquote.css"
import clsx from 'clsx';
import Card from './Card';
const containerClasses = 'tracking-tight -ml-4 -mr-4 px-5 py-4 sm:-ml-6 sm:-mr-6 sm:rounded-lg sm:shadow sm:px-2';
const titleClasses = 'absolute -top-[27px] py-0 rounded-t leading-6 px-5 text-xs border-b-0 z-10 font-bold border-t-4 sm:left-0';

type Props = {
    'data-bq-color': string,
    'data-bq-title': string,
    'data-question': string,
    'data-answer': string,
    'data-SRS': string
}

export function Note({
                         'data-bq-color': color,
                         'data-bq-title': title,
                         'data-question': question,
                         'data-answer': answer,
                         'data-SRS': SRS,
                         children,
                     }: React.ComponentProps<'blockquote'> & Props) {

    if(SRS){
        return <Card question={question} answer={answer} />
    }
    if (!color) {
        return <blockquote>{children}</blockquote>
    }

    const colorClass = `color-${color||'default'}`;
    return (
        <div className="relative my-24 w-full">
            <div className={`${containerClasses} ${colorClass}`}>
                {title ? <div className={clsx(titleClasses,colorClass)}>{title}</div> : null}
                <div className="p-3">
                    {children}
                </div>
            </div>
        </div>
    )
}
