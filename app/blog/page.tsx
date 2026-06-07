import Link from 'next/link'
import { BLOG_POSTS } from '@/lib/blog-posts'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog — RenewalMate',
  description: 'Subscription tracking tips, free Mint alternatives, how to cancel forgotten bills, and personal finance advice. No fluff.',
}

const CATEGORY_COLORS: Record<string, string> = {
  'Alternatives':     'bg-blue-100 text-blue-700',
  'Personal Finance': 'bg-green-100 text-green-700',
  'Privacy':          'bg-purple-100 text-purple-700',
}

export default function BlogPage() {
  const sorted = [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date))
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
          <div className="flex gap-5 text-sm">
            <Link href="/guides" className="text-gray-500 hover:text-[#1e7a4a] transition-colors">Guides</Link>
            <Link href="/blog" className="text-[#1e7a4a] font-semibold">Blog</Link>
            <Link href="/#waitlist" className="px-4 py-1.5 bg-[#1e7a4a] text-white text-xs font-bold rounded-full">Get Access</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="mb-14">
          <p className="text-[#1e7a4a] text-xs font-bold tracking-[0.3em] uppercase mb-3">The RenewalMate Blog</p>
          <h1 className="text-5xl font-black text-[#1a2e22] tracking-tight mb-4">Spend less. Know more.</h1>
          <p className="text-gray-500 text-lg">Subscription tracking, free alternatives to paid apps, and personal finance tips with no agenda.</p>
        </div>

        <div className="space-y-5">
          {sorted.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`}
              className="block bg-white border border-gray-100 rounded-2xl p-6 hover:border-[#1e7a4a]/30 hover:shadow-sm transition-all group">
              <div className="flex items-center gap-3 mb-3">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${CATEGORY_COLORS[post.category] ?? 'bg-gray-100 text-gray-600'}`}>
                  {post.category}
                </span>
                <span className="text-xs text-gray-400">{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <h2 className="text-xl font-black text-[#1a2e22] mb-2 group-hover:text-[#1e7a4a] transition-colors">{post.title}</h2>
              <p className="text-gray-500 text-sm leading-relaxed">{post.excerpt}</p>
              <p className="text-[#1e7a4a] text-xs font-semibold mt-4">Read more →</p>
            </Link>
          ))}
        </div>
      </div>

      <footer className="border-t border-gray-100 py-8 px-6 bg-white mt-12">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-gray-400">© 2026 RenewalMate — Gilgamesh Enterprise LLC</span>
          <div className="flex gap-5 text-xs text-gray-400">
            <a href="https://www.gilgameshenterprise.com" className="hover:text-[#1e7a4a]">Gilgamesh Enterprise</a>
            <a href="https://socialmate.studio" className="hover:text-[#1e7a4a]">SocialMate</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
