import React, { FC } from 'react'

const Tags: FC<{ article: Article }> = ({ article }) => {
    return (
        <div className="flex flex-row gap-2">
            {article.tags.map((tag) => (
                <span className="text-sm border border-slate-500 bg-slate-700 rounded-md px-3 py-[1px]" key={tag.tag.id}>{tag.tag.name}</span>
            ))}
        </div>
    )
}


export default Tags;