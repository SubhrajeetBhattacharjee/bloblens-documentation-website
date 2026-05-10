'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { DashboardMetrics } from '@/lib/metrics';

const METRICS_ENDPOINT = '/api/metrics';

function useLiveMetrics(refreshMs = 15000) {
  const [data, setData] = useState<DashboardMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const response = await fetch(METRICS_ENDPOINT, { cache: 'no-store' });

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const json = (await response.json()) as DashboardMetrics;

        if (!active) return;
        setData(json);
        setError(null);
      } catch (error_) {
        if (!active) return;
        setError(error_ instanceof Error ? error_.message : 'Failed to load metrics');
      } finally {
        if (!active) return;
        setIsLoading(false);
      }
    };

    load();
    const intervalId = window.setInterval(load, refreshMs);

    return () => {
      active = false;
      window.clearInterval(intervalId);
    };
  }, [refreshMs]);

  return { data, isLoading, error };
}

function StatusRow({ isLoading, error, generatedAt }: { isLoading: boolean; error: string | null; generatedAt?: string }) {
  return (
    <div className="flex items-center gap-3 text-xs text-foreground/50 mb-4">
      <span className="inline-flex items-center gap-2 rounded-full border border-border px-2 py-1 text-foreground/70">
        <span className="h-2 w-2 rounded-full bg-green-500" />
        Live
      </span>
      {isLoading && <span>Loading current metrics...</span>}
      {!isLoading && !error && generatedAt && <span>Updated {new Date(generatedAt).toLocaleTimeString()}</span>}
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
}

export function MarketLiveMetrics() {
  const { data, isLoading, error } = useLiveMetrics();

  const market = data?.market;

  return (
    <div>
      <StatusRow isLoading={isLoading} error={error} generatedAt={data?.generatedAt} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="py-0 gap-0">
          <CardHeader className="px-4 pt-4 pb-2">
            <CardTitle className="text-xs text-foreground/50 uppercase tracking-wide">Cost / Blob (Last Hr)</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-3xl font-bold text-accent mb-1">{isLoading ? '$0.000000' : `$${market?.costPerBlob.toFixed(6) ?? '0.000000'}`}</p>
            <p className="text-xs text-foreground/50">Updated from the live API</p>
          </CardContent>
        </Card>

        <Card className="py-0 gap-0">
          <CardHeader className="px-4 pt-4 pb-2">
            <CardTitle className="text-xs text-foreground/50 uppercase tracking-wide">Blobs (Last Hr)</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-3xl font-bold text-foreground mb-1">{isLoading ? '0' : market?.blobsLastHr?.toLocaleString() ?? '0'}</p>
            <p className="text-xs text-foreground/50">Updated from the live API</p>
          </CardContent>
        </Card>

        <Card className="py-0 gap-0">
          <CardHeader className="px-4 pt-4 pb-2">
            <CardTitle className="text-xs text-foreground/50 uppercase tracking-wide">Avg Utilization (24h)</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-3xl font-bold text-green-500 mb-1">{isLoading ? '0.0%' : `${market?.avgUtilization.toFixed(1)}%`}</p>
            <p className="text-xs text-foreground/50">Updated from the live API</p>
          </CardContent>
        </Card>

        <Card className="py-0 gap-0">
          <CardHeader className="px-4 pt-4 pb-2">
            <CardTitle className="text-xs text-foreground/50 uppercase tracking-wide">Most Active</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-3xl font-bold text-foreground mb-1">{isLoading ? '...' : market?.mostActive ?? '—'}</p>
            <p className="text-xs text-foreground/50">Updated from the live API</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function ResearchLiveSummary() {
  const { data, isLoading, error } = useLiveMetrics();

  const research = data?.research;

  return (
    <div>
      <StatusRow isLoading={isLoading} error={error} generatedAt={data?.generatedAt} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="py-0 gap-0">
          <CardHeader className="px-4 pt-4 pb-2">
            <CardTitle className="text-xs text-foreground/50 uppercase tracking-wide">Blobs (30d)</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-3xl font-bold text-accent mb-1">{isLoading ? '0' : research?.blobs30d.toLocaleString() ?? '0'}</p>
            <p className="text-xs text-foreground/50">Total blobs observed over 30 days</p>
          </CardContent>
        </Card>

        <Card className="py-0 gap-0">
          <CardHeader className="px-4 pt-4 pb-2">
            <CardTitle className="text-xs text-foreground/50 uppercase tracking-wide">Transactions (30d)</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-3xl font-bold text-foreground mb-1">{isLoading ? '0' : research?.transactions30d.toLocaleString() ?? '0'}</p>
            <p className="text-xs text-foreground/50">Transactions carrying blob activity</p>
          </CardContent>
        </Card>

        <Card className="py-0 gap-0">
          <CardHeader className="px-4 pt-4 pb-2">
            <CardTitle className="text-xs text-foreground/50 uppercase tracking-wide">Active Rollups</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-3xl font-bold text-green-500 mb-1">{isLoading ? '0' : research?.activeRollups ?? 0}</p>
            <p className="text-xs text-foreground/50">Rollups active in the last window</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}