export interface Post {
  slug: string
  title: string
}

export interface MarkdownDetail {
  slug: string
  content: string
  sha: string
}

export async function fetchAllPosts(): Promise<Post[]> {
  try {
    const res = await fetch(`${process.env.MARKDOWN_API_URL}/api/notes`)
    if (!res.ok) throw new Error("Failed to fetch")

    const data = await res.json()
    return data
  } catch (err) {
    console.error("Error fetching posts:", err)
    return []
  }
}

export async function fetchMarkdown(slug: string): Promise<MarkdownDetail | null> {
  try {
    const res = await fetch(`${process.env.MARKDOWN_API_URL}/api/notes/${slug}`)

    if (!res.ok) throw new Error("Failed to fetch markdown")

    const data = await res.json()
    return {
      slug,
      content: data.content?.content ?? "",
      sha: data.sha,
    }
  } catch (err) {
    console.error(`Error fetching markdown ${slug}:`, err)
    return null
  }
}