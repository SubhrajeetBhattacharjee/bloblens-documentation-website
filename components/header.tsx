'use client';

import Link from 'next/link';
import { Github, Moon, Sun, Search, X } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { useTheme } from 'next-themes';

interface SearchItem {
  id: string;
  title: string;
  section: string;
  keywords: string[];
}

const SEARCH_ITEMS: SearchItem[] = [
  {
    id: 'overview',
    title: 'Real-time Blob Analytics',
    section: 'Overview',
    keywords: ['overview', 'blob', 'analytics', 'real-time', 'dashboard']
  },
  {
    id: 'overview-what',
    title: 'What is a Blob?',
    section: 'Overview',
    keywords: ['what', 'blob', 'explanation', 'definition', 'ethereum']
  },
  {
    id: 'overview-live-feed',
    title: 'Live Feed',
    section: 'Overview',
    keywords: ['live', 'feed', 'transactions', 'blocks']
  },
  {
    id: 'overview-metrics',
    title: 'Metrics & Charts',
    section: 'Overview',
    keywords: ['metrics', 'charts', 'total blobs', 'rollup share', 'heatmap']
  },
  {
    id: 'market',
    title: 'Market',
    section: 'Market',
    keywords: ['market', 'trends', 'fees', 'activity', 'ecosystem']
  },
  {
    id: 'market-trends',
    title: 'Fee Trends',
    section: 'Market',
    keywords: ['fee', 'trends', 'costs', 'pricing']
  },
  {
    id: 'market-activity',
    title: 'Network Activity',
    section: 'Market',
    keywords: ['activity', 'rollup', 'network', 'usage']
  },
  {
    id: 'market-ecosystem',
    title: 'Rollup Ecosystem Map',
    section: 'Market',
    keywords: ['ecosystem', 'map', 'rollups', 'relationships']
  },
  {
    id: 'research',
    title: 'Research',
    section: 'Research',
    keywords: ['research', 'analysis', 'growth', 'volume']
  },
  {
    id: 'research-growth',
    title: 'Cumulative Blob Growth',
    section: 'Research',
    keywords: ['growth', 'cumulative', 'adoption', 'expansion']
  },
  {
    id: 'research-activity',
    title: 'Daily Blob Volume by Rollup',
    section: 'Research',
    keywords: ['volume', 'daily', 'rollup', 'activity']
  },
  {
    id: 'research-utilization',
    title: 'Blob Slot Utilization',
    section: 'Research',
    keywords: ['utilization', 'slots', 'capacity', 'usage']
  }
];

export function Header() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = SEARCH_ITEMS.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.keywords.some(kw => kw.includes(searchQuery.toLowerCase()))
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.location.hash = sectionId;
    }
    setSearchOpen(false);
    setSearchQuery('');
  };

  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex flex-col md:flex-row items-center justify-between px-4 md:px-6 py-3 md:py-4 gap-3 md:gap-4">
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="#overview"
            className="text-sm text-foreground/70 hover:text-foreground transition-colors"
          >
            Documentation
          </Link>
        </nav>

        {/* Search Bar */}
        <div className="relative w-full md:flex-1 md:max-w-md" ref={searchRef}>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchOpen(true)}
              className="w-full px-3 py-2 pl-9 text-sm rounded-md border border-border bg-background text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSearchResults([]);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {searchOpen && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-md shadow-lg max-h-96 overflow-y-auto z-50">
              {searchResults.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSearch(item.id)}
                  className="w-full text-left px-4 py-3 hover:bg-secondary/50 transition-colors border-b border-border/50 last:border-b-0"
                >
                  <div className="text-sm font-semibold text-foreground">{item.title}</div>
                  <div className="text-xs text-foreground/60">{item.section}</div>
                </button>
              ))}
            </div>
          )}

          {searchOpen && searchQuery && searchResults.length === 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-md shadow-lg p-4 z-50">
              <p className="text-sm text-foreground/60">No results found for "{searchQuery}"</p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
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
        </div>
      </div>
    </header>
  );
}
