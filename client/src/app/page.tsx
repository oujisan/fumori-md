import { getAllMarkdownTitles } from '@/lib/mdx'
import ClientSearch from '@/components/search'
import 'highlight.js/styles/nord.css'

export default async function HomePage() {
  const posts = await getAllMarkdownTitles()

  return (
    <div className="min-h-screen p-6">
      <ClientSearch posts={posts} />
    </div>
  )
}
