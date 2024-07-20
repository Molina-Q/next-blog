import Link from 'next/link';
import React from 'react'

type Props = {
    label: string;
    link?: string;
}

export default function RoundBtn({label, link}: Props) {
  return (
    <>
    {   
        link 
            ? <Link className='border border-slate-600 p-1 rounded-lg hover:bg-slate-600 w-fit' href={link}>{label}</Link>
            : <div>{label}</div>
    }
    </>
  )
}