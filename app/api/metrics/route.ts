import { NextResponse } from 'next/server';
import { fetchLiveDashboardMetrics } from '@/lib/metrics';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(await fetchLiveDashboardMetrics(), {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    },
  });
}