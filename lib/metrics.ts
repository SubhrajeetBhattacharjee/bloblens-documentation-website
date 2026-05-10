const SOURCE_BASE = 'http://134.209.107.4';

export type OverviewLiveFeedRow = {
  block: string;
  age: string;
  txCount: number;
  blobCount: number;
  blobGasUsage: string;
  costPerBlob: string;
  rollups: string[];
};

export type OverviewMetrics = {
  currentTransactionCost: string;
  blobBaseFee: string;
  ethUsd: string;
  liveFeed: OverviewLiveFeedRow[];
};

export type LeaderboardRow = {
  rank: number;
  rollup: string;
  totalBlobs: number;
  txCount: number;
  avgPerTx: string;
  avgCostPerBlob: string;
  daCostEth: string;
  packing: string;
  netShare: string;
  lastActive: string;
};

export type LeaderboardMetrics = {
  trackedRollups: number;
  rows: LeaderboardRow[];
  unattributedSendersCount: number;
};

export type MarketMetrics = {
  costPerBlob: number;
  blobsLastHr: number;
  avgUtilization: number;
  mostActive: string;
  currentFee: string;
  feePressure: string;
  forecast: Array<{ horizon: string; fee: string; change: string }>;
};

export type ResearchMetrics = {
  blobs30d: number;
  transactions30d: number;
  activeRollups: number;
};

export type DashboardMetrics = {
  generatedAt: string;
  overview: OverviewMetrics;
  leaderboard: LeaderboardMetrics;
  market: MarketMetrics;
  research: ResearchMetrics;
};

function decodeHtmlEntities(input: string) {
  return input
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#x27;/g, "'");
}

function stripTags(input: string) {
  return decodeHtmlEntities(input.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}

function parseNumber(input: string) {
  return Number.parseFloat(input.replace(/[^0-9.-]/g, ''));
}

async function fetchHtml(path: string) {
  const response = await fetch(`${SOURCE_BASE}${path}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}: ${response.status}`);
  }

  return response.text();
}

function sliceAfter(html: string, marker: string, length = 4000) {
  const index = html.toLowerCase().indexOf(marker.toLowerCase());
  if (index < 0) {
    throw new Error(`Missing marker: ${marker}`);
  }

  return html.slice(index, index + length);
}

function extractFirstMatch(html: string, regex: RegExp) {
  const match = html.match(regex);
  if (!match) {
    throw new Error(`Missing pattern: ${regex}`);
  }

  return stripTags(match[1] ?? match[0]);
}

function parseOverviewLiveFeed(html: string): OverviewLiveFeedRow[] {
  const rows = [...html.matchAll(/<tr class="[^\"]*(?:group|border-b)[^\"]*">([\s\S]*?)<\/tr>/g)];

  return rows
    .map((rowMatch) => {
      const cells = [...rowMatch[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((cellMatch) => stripTags(cellMatch[1]));

      if (cells.length < 7) {
        return null;
      }

      const rollupNames = cells[6]
        .split(' ')
        .map((part) => part.trim())
        .filter(Boolean)
        .filter((part) => part !== '?');

      return {
        block: cells[0],
        age: cells[1],
        txCount: Number.parseInt(cells[2].replace(/,/g, ''), 10),
        blobCount: Number.parseInt(cells[3].replace(/,/g, ''), 10),
        blobGasUsage: cells[4],
        costPerBlob: cells[5],
        rollups: rollupNames.length > 0 ? rollupNames : [cells[6]],
      } satisfies OverviewLiveFeedRow;
    })
    .filter((row): row is OverviewLiveFeedRow => row !== null);
}

function parseLeaderboardRows(html: string): LeaderboardRow[] {
  const rows = [...html.matchAll(/<tr class="group[\s\S]*?<\/tr>/g)];

  return rows
    .map((rowMatch) => {
      const cells = [...rowMatch[0].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((cellMatch) => stripTags(cellMatch[1]));

      if (cells.length < 10) {
        return null;
      }

      return {
        rank: Number.parseInt(cells[0], 10),
        rollup: cells[1],
        totalBlobs: Number.parseInt(cells[2].replace(/,/g, ''), 10),
        txCount: Number.parseInt(cells[3].replace(/,/g, ''), 10),
        avgPerTx: cells[4],
        avgCostPerBlob: cells[5],
        daCostEth: cells[6],
        packing: cells[7],
        netShare: cells[8],
        lastActive: cells[9],
      } satisfies LeaderboardRow;
    })
    .filter((row): row is LeaderboardRow => row !== null);
}

function parseMarketForecast(html: string) {
  const forecastSection = sliceAfter(html, 'Fee Congestion Forecast', 9000);
  const rows = [...forecastSection.matchAll(/<td class="py-2 pr-4 font-mono text-[#9CA3AF]">([\s\S]*?)<\/td>\s*<td class="py-2 pr-4 font-mono text-foreground">([\s\S]*?)<\/td>\s*<td class="py-2 pr-4 font-mono text-foreground">([\s\S]*?)<\/td>/g)];

  return rows.map((match) => ({
    horizon: stripTags(match[1]),
    fee: stripTags(match[2]),
    change: stripTags(match[3]),
  }));
}

async function scrapeOverview() {
  const html = await fetchHtml('/');
  const currentCostSlice = sliceAfter(html, 'Current Transaction Cost', 4000);

  const currentTransactionCost = extractFirstMatch(currentCostSlice, /font-mono text-4xl[^>]*>([\s\S]*?)<\/p>/i);
  const blobBaseFee = extractFirstMatch(currentCostSlice, /blob base fee:[\s\S]*?<span class="font-mono text-\[#9CA3AF\]">([\s\S]*?)<\/span>/i);
  const ethUsd = extractFirstMatch(currentCostSlice, /ETH \/ USD:[\s\S]*?<span class="font-mono">\$([\s\S]*?)<\/span>/i);

  return {
    currentTransactionCost,
    blobBaseFee,
    ethUsd,
    liveFeed: parseOverviewLiveFeed(html).slice(0, 12),
  } satisfies OverviewMetrics;
}

async function scrapeLeaderboard() {
  const html = await fetchHtml('/leaderboard');
  const trackedRollupsMatch = html.match(/([0-9]+)<!-- --> rollups tracked/i);
  const unattributedSendersMatch = html.match(/Unattributed Senders[^0-9]*([0-9]+)/i);

  return {
    trackedRollups: trackedRollupsMatch ? Number.parseInt(trackedRollupsMatch[1], 10) : 40,
    rows: parseLeaderboardRows(html).slice(0, 40),
    unattributedSendersCount: unattributedSendersMatch ? Number.parseInt(unattributedSendersMatch[1], 10) : 10,
  } satisfies LeaderboardMetrics;
}

async function scrapeMarket() {
  const html = await fetchHtml('/market');

  const costCard = sliceAfter(html, 'Cost / Blob (last hr)', 2500);
  const blobsCard = sliceAfter(html, 'Blobs (last hr)', 2500);
  const utilizationCard = sliceAfter(html, 'Avg Utilization (24h)', 2500);
  const activeCard = sliceAfter(html, 'Most Active', 2500);

  const costPerBlob = parseNumber(extractFirstMatch(costCard, /font-display text-\[1\.95rem\] font-bold leading-none sm:text-\[2\.15rem\][^>]*>([\s\S]*?)<\/p>/i));
  const blobsLastHr = Number.parseInt(extractFirstMatch(blobsCard, /font-display text-\[1\.95rem\] font-bold leading-none sm:text-\[2\.15rem\][^>]*>([\s\S]*?)<\/p>/i).replace(/,/g, ''), 10);
  const avgUtilization = parseNumber(extractFirstMatch(utilizationCard, /font-display text-\[1\.95rem\] font-bold leading-none sm:text-\[2\.15rem\][^>]*>([\s\S]*?)<\/p>/i));
  const mostActive = extractFirstMatch(activeCard, /font-display text-\[1\.95rem\] font-bold leading-none sm:text-\[2\.15rem\][^>]*>([\s\S]*?)<\/p>/i);

  const feePressure = /Fee pressure:[\s\S]*?<span class="font-semibold"[^>]*>([\s\S]*?)<\/span>/i.exec(html)?.[1]
    ? stripTags(/Fee pressure:[\s\S]*?<span class="font-semibold"[^>]*>([\s\S]*?)<\/span>/i.exec(html)![1])
    : 'Falling';
  const currentFee = /Current fee[\s\S]*?<p class="font-mono text-sm text-foreground">([\s\S]*?)<\/p>/i.exec(html)?.[1]
    ? stripTags(/Current fee[\s\S]*?<p class="font-mono text-sm text-foreground">([\s\S]*?)<\/p>/i.exec(html)![1])
    : '';

  return {
    costPerBlob,
    blobsLastHr,
    avgUtilization,
    mostActive,
    currentFee,
    feePressure,
    forecast: parseMarketForecast(html),
  } satisfies MarketMetrics;
}

async function scrapeResearch() {
  const html = await fetchHtml('/research');
  const summarySlice = sliceAfter(html, 'Blobs (30d)', 5000);

  const blobs30d = Number.parseInt(extractFirstMatch(summarySlice, /font-mono text-xl font-bold text-foreground">([0-9,]+)<\/p>/i).replace(/,/g, ''), 10);
  const transactionsMatch = summarySlice.match(/Transactions \(30d\)<\/p><p class="font-mono text-xl font-bold text-foreground">([0-9,]+)<\/p>/i);
  const rollupsMatch = summarySlice.match(/Active rollups<\/p><p class="font-mono text-xl font-bold text-foreground">([0-9,]+)<\/p>/i);

  return {
    blobs30d,
    transactions30d: transactionsMatch ? Number.parseInt(transactionsMatch[1].replace(/,/g, ''), 10) : 0,
    activeRollups: rollupsMatch ? Number.parseInt(rollupsMatch[1], 10) : 0,
  } satisfies ResearchMetrics;
}

export async function fetchLiveDashboardMetrics(): Promise<DashboardMetrics> {
  const [overview, leaderboard, market, research] = await Promise.all([
    scrapeOverview(),
    scrapeLeaderboard(),
    scrapeMarket(),
    scrapeResearch(),
  ]);

  return {
    generatedAt: new Date().toISOString(),
    overview,
    leaderboard,
    market,
    research,
  };
}