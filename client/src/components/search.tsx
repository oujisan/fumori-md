'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Post } from '@/lib/api'

type Props = {
  posts: Post[]
}

export default function ClientSearch({ posts }: Props) {
  const [search, setSearch] = useState('')

  const filtered = posts
    .filter(post => typeof post.title === 'string' && typeof post.slug === 'string')
    .filter(post =>
      post.title.toLowerCase().includes(search.toLowerCase())
    )


  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center border rounded-full px-4 py-2 mb-4">
        <span className="text-gray-400 mr-2">🔍</span>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full outline-none bg-transparent"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-400">No results found.</p>
      ) : (
        filtered.map(post => (
          <Link key={post.slug} href={`/notes/${post.slug}`} className="block">
            <div className="border rounded-xl p-4 flex gap-4 items-center mb-4 hover:bg-gray-50 transition">
              <div className="w-12 h-12 rounded-lg bg-black shrink-0" />
              <div>
                <p className="font-semibold">{post.title}</p>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  )
}
