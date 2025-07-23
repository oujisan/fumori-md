import { fetchMarkdown } from '@/lib/api'
import { serialize } from 'next-mdx-remote/serialize'
import ClientWrapper from './client-wrapper'
import 'highlight.js/styles/nord.css'

type PageProps = {
  params: { slug: string }
}

export default async function ViewerPage({ params }: PageProps) {
  const awaitedParams = await params;
  const slug = awaitedParams.slug;

  const post = await fetchMarkdown(slug);

  if (!post) return <div>Catatan tidak ditemukan.</div>

  const mdx = await serialize(post.content)

  return <ClientWrapper mdx={mdx} />
}