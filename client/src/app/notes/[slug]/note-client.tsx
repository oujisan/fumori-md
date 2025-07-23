'use client'

import { useEffect } from 'react'
import { MDXRemote } from 'next-mdx-remote'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { mdxComponents } from '../../../components/mdx-component'

export default function NoteClientComponent({
  mdx,
}: {
  mdx: MDXRemoteSerializeResult
}) {
  return (
    <div className="flex justify-center px-4 py-10 scrollbar-none">
      <article className="prose prose-lg prose-neutral dark:prose-invert w-full max-w-3xl">
        <MDXRemote {...mdx} components={mdxComponents} />
      </article>
    </div>
  )
}
