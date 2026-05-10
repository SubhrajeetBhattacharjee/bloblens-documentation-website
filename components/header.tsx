'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Github, Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export function Header() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-card shadow-[0_0_0_1px_rgba(6,182,212,0.08),0_0_18px_rgba(6,182,212,0.14)]">
            <Image src="/bloblogo.png" alt="BlobLens Docs" width={52} height={52} className="h-12 w-12 scale-125 rounded-xl object-contain" />
          </div>
          <h1 className="text-lg font-semibold hidden md:block">BlobLens Docs</h1>
        </div>

        <nav className="flex items-center gap-6">
          <Link
            href="#overview"
            className="text-sm text-foreground/70 hover:text-foreground transition-colors hidden sm:inline"
          >
            Documentation
          </Link>
          <a
            href="https://github.com/AvarchLLC/blob_lens"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/70 hover:text-foreground transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="text-foreground/70 hover:text-foreground transition-colors"
            aria-label="Toggle color theme"
          >
            {mounted ? (
              isDark ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-sky-600" />
              )
            ) : (
              <span className="inline-block h-5 w-5" aria-hidden />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
