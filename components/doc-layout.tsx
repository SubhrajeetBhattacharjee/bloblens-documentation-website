'use client';

import { Sidebar } from './sidebar';

export function DocLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 md:pl-64">{children}</main>
    </div>
  );
}
