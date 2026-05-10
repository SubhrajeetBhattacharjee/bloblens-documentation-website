'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const navItems = [
  {
    label: 'SECTIONS',
    items: [
      {
        name: 'Overview',
        href: '#overview',
        children: [
          { name: 'What is a Blob?', href: '#overview-what' },
          { name: 'Live Feed', href: '#overview-live-feed' },
          { name: 'Metrics & Charts', href: '#overview-metrics' },
          { name: 'How to Use', href: '#overview-how-to' },
        ],
      },
      {
        name: 'Leaderboard',
        href: '#leaderboard',
        children: [
          { name: 'Top Rollups', href: '#leaderboard-rollups' },
          { name: 'Undistributed Senders', href: '#leaderboard-senders' },
        ],
      },
      {
        name: 'Market',
        href: '#market',
        children: [
          { name: 'Key Metrics', href: '#market-metrics' },
          { name: 'Fee Trends', href: '#market-trends' },
          { name: 'Utilization', href: '#market-utilization' },
        ],
      },
      {
        name: 'Research',
        href: '#research',
        children: [
          { name: 'Summary', href: '#research-summary' },
          { name: 'Growth', href: '#research-growth' },
          { name: 'Market Share', href: '#research-share' },
          { name: 'Activity', href: '#research-activity' },
          { name: 'Regime Timeline', href: '#research-regime' },
        ],
      },
    ],
  },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('#overview');
  const sectionHashes = navItems[0].items.flatMap((item) => [
    item.href,
    ...(item.children ? item.children.map((c) => c.href) : []),
  ]);

  useEffect(() => {
    const updateHash = () => {
      setActiveHash(window.location.hash || '#main-parts');
    };

    updateHash();
    window.addEventListener('hashchange', updateHash);

    return () => {
      window.removeEventListener('hashchange', updateHash);
    };
  }, []);
  useEffect(() => {
    const sections = sectionHashes
      .map((hash) => document.getElementById(hash.slice(1)))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const id = `#${visible[0].target.id}`;
        setActiveHash(id);
        if (history && history.replaceState) history.replaceState(null, '', id);
      },
      // rootMargin top is negative so the section becomes active when it passes the header
      { root: null, rootMargin: '-30% 0px -40% 0px', threshold: [0.2, 0.5, 0.8] }
    );

    sections.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  }, [sectionHashes]);

  const isActive = (href: string) => {
    if (href === '#main-parts' && activeHash === '') {
      return true;
    }
    return activeHash === href;
  };

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-40 p-2 rounded-lg bg-sidebar-accent/10 hover:bg-sidebar-accent/20 transition-colors"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border overflow-y-auto transition-transform duration-300 z-40 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <Link href="#main-parts" className="flex items-center gap-3 mb-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sidebar-accent/15 shadow-[0_0_0_1px_rgba(6,182,212,0.08),0_0_18px_rgba(6,182,212,0.12)]">
              <Image src="/bloblogo.png" alt="BlobLens Docs" width={52} height={52} className="h-12 w-12 scale-125 rounded-xl object-contain" />
            </div>
            <span className="font-semibold text-sidebar-foreground text-base tracking-tight">
              BlobLens Docs
            </span>
          </Link>

          {/* Navigation groups */}
          <nav className="space-y-8">
            {navItems.map((group) => (
              <div key={group.label}>
                <p className="text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wide mb-3 px-2">
                  {group.label}
                </p>
                <ul className="space-y-1">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`relative flex items-center pl-4 pr-3 py-2 rounded-md text-sm font-medium sidebar-active-transition ${
                          (isActive(item.href) || (item.children || []).some((c) => isActive(c.href)))
                            ? 'bg-sidebar-accent/10 text-sidebar-accent-foreground'
                            : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/10'
                        }`}
                        aria-current={isActive(item.href) ? 'page' : undefined}
                      >
                        {(isActive(item.href) || (item.children || []).some((c) => isActive(c.href))) && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-accent rounded-r-md" aria-hidden />
                        )}
                        <span className="ml-2">{item.name}</span>
                      </Link>

                      {item.children && (
                        <ul className="mt-1 ml-6 space-y-1">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={() => setIsOpen(false)}
                                className={`block px-3 py-1 rounded-md text-sm transition-all ${
                                  isActive(child.href)
                                    ? 'text-sidebar-accent-foreground font-semibold'
                                    : 'text-sidebar-foreground/60 hover:text-sidebar-foreground'
                                }`}
                                aria-current={isActive(child.href) ? 'page' : undefined}
                              >
                                {child.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* Footer section */}
          <div className="mt-12 pt-6 border-t border-sidebar-border">
            <p className="text-xs text-sidebar-foreground/50 mb-3 px-2">
              Questions?
            </p>
            <a
              href="#market-and-research"
              className="block text-xs text-sidebar-accent hover:text-sidebar-accent/80 transition-colors px-2"
            >
              See Market Notes →
            </a>
          </div>
        </div>
      </aside>

      {/* Mobile spacer */}
      <div className="h-12 md:hidden" />
    </>
  );
}
