import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPost, BLOG_POSTS } from '@/lib/blog-posts'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return BLOG_POSTS.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return { title: `${post.title} — RenewalMate`, description: post.excerpt }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const paragraphs = post.content.split('\n\n')

  return (
    <div className="min-h-screen bg-[#f8faf9]">
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#1e7a4a] flex items-center justify-center">
              <span className="text-white font-black text-sm">R</span>
            </div>
            <span className="font-black text-[#1a2e22] tracking-tight">RenewalMate</span>
          </Link>
          <Link href="/blog" className="text-gray-500 hover:text-[#1e7a4a] text-sm transition-colors">← All posts</Link>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-6 py-20">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs font-bold text-[#1e7a4a] bg-[#1e7a4a]/10 px-3 py-1 rounded-full">{post.category}</span>
            <span className="text-xs text-gray-400">{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-[#1a2e22] tracking-tight leading-tight mb-6">{post.title}</h1>
          <p className="text-gray-500 text-xl leading-relaxed border-l-2 border-[#1e7a4a]/40 pl-4">{post.excerpt}</p>
        </div>

        <div className="space-y-5">
          {paragraphs.map((para, i) => {
            if (para.startsWith('**') && para.endsWith('**')) {
              return <h3 key={i} className="text-xl font-black text-[#1a2e22] mt-8 mb-2">{para.replace(/\*\*/g, '')}</h3>
            }
            if (para.includes('**')) {
              const parts = para.split(/(\*\*[^*]+\*\*)/)
              return (
                <p key={i} className="text-gray-600 leading-relaxed">
                  {parts.map((part, j) =>
                    part.startsWith('**') ? <strong key={j} className="text-[#1a2e22] font-bold">{part.replace(/\*\*/g, '')}</strong> : part
                  )}
                </p>
              )
            }
            return <p key={i} className="text-gray-600 leading-relaxed">{para}</p>
          })}
        </div>

        <div className="mt-16 bg-[#1e7a4a] rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-black text-white mb-2">Try RenewalMate free.</h2>
          <p className="text-green-100 text-sm mb-5">No credit card. No bank sync. No paywall.</p>
          <Link href="/#waitlist" className="inline-block px-7 py-2.5 bg-white text-[#1e7a4a] font-black rounded-full hover:bg-gray-50 transition-colors text-sm">
            Get Early Access →
          </Link>
        </div>
      </article>
    </div>
  )
}
