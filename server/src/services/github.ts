import axios from "axios";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
export const REPO_OWNER = "oujisan";
export const REPO_NAME = "markdown-lib";
export const BRANCH = "main";

const api = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github.v3+json",
    Authorization: `${GITHUB_TOKEN}`,
  },
});

export interface GitHubFileMeta {
  name: string;
  sha: string;
  path: string;
  type: string;
  download_url: string;
}

export interface GitHubContentResponse {
  content: string; // base64
  sha: string;
  name: string;
  path: string;
  encoding: "base64";
}

export async function getAllMarkdowns(): Promise<{ title: string; slug: string }[]> {
  try {
    const res = await api.get<GitHubFileMeta[]>(
      `/repos/${REPO_OWNER}/${REPO_NAME}/contents`
    );

    return res.data
      .filter(
        (file) =>
          (file.name.endsWith(".md") || file.name.endsWith(".mdx")) &&
          file.name.toLowerCase() !== "readme.md"
      )
      .map((file) => {
        const base = file.name.replace(/\.mdx?$/, "");
        return {
          title: base,
          slug: base,
        };
      });
  } catch (err: any) {
    console.error("Error fetching markdown list:", err.response?.data || err.message);
    throw new Error("Gagal mengambil daftar markdown dari GitHub.");
  }
}

export async function getMarkdown(
  slug: string
): Promise<{ content: string; sha: string }> {
  const possibleExtensions = [".md", ".mdx"];
  const baseName = slug.replace(/\.(mdx?|MDX?)$/, "");

  for (const ext of possibleExtensions) {
    const filename = `${baseName}${ext}`;
    try {
      const res = await api.get<GitHubContentResponse>(
        `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filename}`
      );

      const { content: base64, sha, encoding } = res.data;

      if (encoding !== "base64") {
        throw new Error(`Unexpected encoding: ${encoding}`);
      }

      const decoded = Buffer.from(base64, "base64").toString("utf-8");
      return { content: decoded, sha };
    } catch (err: any) {
      if (err.response?.status === 404) continue;
      console.error(`Error fetching ${filename}:`, err.response?.data || err.message);
      throw new Error(`Gagal mengambil file ${filename}`);
    }
  }

  throw new Error(`File ${slug}.md/mdx tidak ditemukan di repositori.`);
}

export async function saveMarkdown(
  slug: string,
  content: string,
  sha?: string
): Promise<GitHubContentResponse> {
  try {
    const filename = normalizeFilename(slug);
    const encoded = Buffer.from(content).toString("base64");

    const res = await api.put<GitHubContentResponse>(
      `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filename}`,
      {
        message: `${sha ? "Update" : "Create"} note ${filename}`,
        content: encoded,
        sha,
        branch: BRANCH,
      }
    );

    return res.data;
  } catch (err: any) {
    console.error(`Error saving ${slug}:`, err.response?.data || err.message);
    throw new Error(`Gagal menyimpan file ${slug}`);
  }
}

export async function deleteMarkdown(slug: string, sha: string): Promise<void> {
  try {
    const filename = normalizeFilename(slug);

    await api.request({
      method: "DELETE",
      url: `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filename}`,
      data: {
        message: `Delete ${filename}`,
        sha,
        branch: BRANCH,
      },
    });
  } catch (err: any) {
    console.error(`Error deleting ${slug}:`, err.response?.data || err.message);
    throw new Error(`Gagal menghapus file ${slug}`);
  }
}

function normalizeFilename(slug: string): string {
  return slug.endsWith(".md") || slug.endsWith(".mdx") ? slug : `${slug}.mdx`;
}
