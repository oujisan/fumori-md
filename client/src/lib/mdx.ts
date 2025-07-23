import { serialize } from 'next-mdx-remote/serialize'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import rehypeHighlight from 'rehype-highlight'

import { fetchAllPosts, fetchMarkdown } from '@/lib/api'
import type { Post } from '@/lib/api'

export async function getAllMarkdownTitles(): Promise<Post[]> {
  return await fetchAllPosts()
}

export async function fetchAndSerializeMDX(
  slug: string
): Promise<MDXRemoteSerializeResult | null> {
  const data = await fetchMarkdown(slug)

  if (!data || !data.content) return null

  const mdxSource = await serialize(data.content, {
    parseFrontmatter: true,
    mdxOptions: {
      rehypePlugins: [rehypeHighlight],
    },
  })

  return mdxSource
}
