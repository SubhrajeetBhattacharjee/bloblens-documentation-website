'use client';

import { DocLayout } from './doc-layout';
import { Header } from './header';
import { ChevronRight } from 'lucide-react';

interface DocPageProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function DocPage({ title, description, children }: DocPageProps) {
  return (
    <DocLayout>
      <div className="min-h-screen flex flex-col">
        <Header />

        <div className="flex-1 px-6 md:px-12 py-12 max-w-4xl w-full mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-foreground/50 mb-8">
            <a href="/" className="hover:text-foreground/70 transition-colors">
              Home
            </a>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{title}</span>
          </nav>

          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              {title}
            </h1>
            {description && (
              <p className="text-lg text-foreground/70 leading-relaxed max-w-2xl">
                {description}
              </p>
            )}
          </header>

          {/* Content */}
          <article className="prose prose-invert max-w-none">
            {children}
          </article>
        </div>

        {/* Footer */}
        <footer className="border-t border-border px-6 md:px-12 py-8 text-center text-sm text-foreground/50">
          <p>© 2025 BlobLens. Documentation for blockchain analytics.</p>
        </footer>
      </div>
    </DocLayout>
  );
}
