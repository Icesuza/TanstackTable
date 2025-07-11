import React from 'react'
import BlogTable from './DataTable'
import { columns } from './columns'
import { BlogType } from '@/types/blogtType'

async function getData():Promise<BlogType[]> {
    const res = await fetch('https://dummyjson.com/posts')
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    const data = await res.json()
    return data.posts as BlogType[]
}

export default async function page() {
    const data  = await getData()
    return (
    <section className='w-[95%] mx-auto mt-5'>
        <h1 className='text-2xl font-bold mb-5'>Blog Dashboard</h1>
      <BlogTable
        columns={columns} data={data}
      />
    </section>
    )
}
