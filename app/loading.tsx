import Image from 'next/image';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="flex flex-col items-center gap-5 rounded-2xl border border-border bg-card/80 px-8 py-10 shadow-lg backdrop-blur">
        <div className="relative h-28 w-28">
          <div className="absolute inset-0 animate-pulse rounded-full bg-cyan-500/10 shadow-[0_0_0_1px_rgba(6,182,212,0.12),0_0_24px_rgba(6,182,212,0.18)]" />
          <Image
            src="/bloblogo.png"
            alt="BlobLens Docs"
            fill
            className="rounded-2xl object-cover"
            sizes="112px"
            priority
          />
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-foreground">BlobLens Docs</p>
          <p className="mt-1 text-sm text-foreground/60">Loading live blob analytics...</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-foreground/50">
          <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
          Fetching latest data
        </div>
      </div>
    </div>
  );
}