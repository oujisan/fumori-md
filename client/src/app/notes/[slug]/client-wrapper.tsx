'use client'

import dynamic from 'next/dynamic'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'

const ViewerClient = dynamic(() => import('./note-client'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-96 w-full">
      <p className="text-muted-foreground text-lg animate-pulse">
        Loading Markdown...
      </p>
    </div>
  ),
})

export default function ClientWrapper({ mdx }: { mdx: MDXRemoteSerializeResult }) {
  return <ViewerClient mdx={mdx} />
}
