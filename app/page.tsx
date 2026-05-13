'use client';

import Link from 'next/link';
import { DocLayout } from '@/components/doc-layout';
import { Header } from '@/components/header';
import { ArrowRight, Zap, Database, TrendingUp, Compass, Rocket, LineChart, FlaskConical, HelpCircle, Copy } from 'lucide-react';
import { Tooltip } from '@/components/ui/tooltip';
import { MarketLiveMetrics, ResearchLiveSummary } from '@/components/live-metrics';

export default function Home() {
  const copyToClipboard = (sectionId: string) => {
    const url = `${window.location.origin}#${sectionId}`;
    navigator.clipboard.writeText(url);
  };

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'BlobLens',
    'description': 'Real-time analytics platform for monitoring Ethereum blob transactions, rollup activity, and network metrics.',
    'url': 'https://blobsense.io',
    'applicationCategory': 'BusinessApplication',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'featureList': [
      'Real-time blob transaction data',
      'Market analytics and trends',
      'Rollup ecosystem monitoring',
      'Historical data research',
      'Fee and cost analysis'
    ]
  };

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
      <DocLayout>
        <div className="min-h-screen flex flex-col">
        <Header />

        <section id="overview" className="page-section scroll-mt-24 flex-1 px-6 md:px-12 py-20 md:py-24 max-w-5xl mx-auto w-full border-b border-border/50">
          <div className="mb-6 inline-block">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/20">
              DOCUMENTATION HUB
            </span>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-2 text-text-balance">
                  Real-time Blob <span className="text-accent">Analytics</span>
                </h1>
                <Tooltip tip="Copy link to this section">
                  <button
                    onClick={() => copyToClipboard('overview')}
                    className="text-foreground/60 hover:text-accent transition-colors"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                </Tooltip>
              </div>
              <p className="text-lg text-foreground/70 mb-4 max-w-2xl leading-relaxed">
                Interactive dashboards that show blob usage, costs, and market signals — designed to help teams make data-driven decisions quickly.
              </p>
              <p className="text-foreground/70 mb-6">Key items on this page:</p>
              <ul className="list-disc list-inside text-foreground/70 space-y-1">
                <li>Live Feed — recent blocks and blobs</li>
                <li>Total Blobs chart — volume over time</li>
                <li>Rollup Share donut — who is producing blobs</li>
                <li>Cost Heatmap — cost per blob over hours and days</li>
              </ul>
            </div>

            <div className="ml-auto hidden md:block">
              <Tooltip tip="This page updates in near-real-time. Use the sidebar to jump to subsections.">
                <button className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 bg-card">
                  <HelpCircle className="w-5 h-5 text-accent" />
                  Help
                </button>
              </Tooltip>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-16 mt-8">
            <Link
              href="#overview-what"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-accent hover:bg-accent/90 text-accent-foreground font-semibold transition-colors"
            >
              Get Started
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link
              href="#leaderboard"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border hover:bg-secondary/50 text-foreground font-semibold transition-colors"
            >
              Learn More
            </Link>
          </div>

          {/* Feature cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-20">
            <div className="p-6 rounded-lg border border-border bg-secondary/30 hover:bg-secondary/50 transition-colors">
              <Database className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-lg font-semibold mb-2">Real-time Data</h3>
              <p className="text-sm text-foreground/70">
                Access live blob transaction data, costs, and network metrics updated continuously.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-border bg-secondary/30 hover:bg-secondary/50 transition-colors">
              <TrendingUp className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-lg font-semibold mb-2">Deep Analytics</h3>
              <p className="text-sm text-foreground/70">
                Understand blob trends, market dynamics, and cost optimization strategies.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-border bg-secondary/30 hover:bg-secondary/50 transition-colors">
              <Zap className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-lg font-semibold mb-2">API & Integration</h3>
              <p className="text-sm text-foreground/70">
                Integrate blob analytics into your applications with our comprehensive API.
              </p>
            </div>
          </div>

          {/* Historical Blob Cost & Current Transaction Cost */}
          <div className="grid md:grid-cols-2 gap-6 mt-16">
            <div className="rounded-lg border border-border p-6 bg-card/50">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold text-foreground/60">24h · USD / blob</span>
              </div>
              <h3 className="text-lg font-semibold mb-4">Historical Blob Cost</h3>
              <img src="/overview_historicalblobcost.png" alt="Historical Blob Cost" className="w-full h-48 rounded object-cover" />
              <p className="text-xs text-foreground/50 mt-3">Shows cost per blob throughout the past 24 hours. Use this to identify peak fee periods and cost trends.</p>
            </div>

            <div className="rounded-lg border border-border p-6 bg-card/50">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold text-foreground/60">Last Hour Average</span>
              </div>
              <h3 className="text-lg font-semibold mb-4">Current Transaction Cost</h3>
              <img src="/overview_currentfee.png" alt="Current Transaction Cost" className="w-full h-48 rounded object-cover" />
              <p className="text-xs text-foreground/50 mt-3">Real-time gauge showing whether blob costs are currently cheap, normal, or expensive based on recent activity.</p>
            </div>
          </div>

          {/* Overview subsections */}
          <div id="overview-what" className="mt-12">
            <h2 className="text-2xl font-semibold mb-2">What is a Blob?</h2>
            <p className="text-foreground/70 mb-4">
              A "blob" is a compact chunk of transaction data used by modern Ethereum rollups to store user data more efficiently. Think of blobs as packets of data attached to transactions — they let applications include larger payloads at lower on-chain cost. Blobs are most useful for batching many small pieces of data, storing off-chain references, or shipping larger application data without bloating the main chain.
            </p>
            <p className="text-foreground/70">
              In simple terms: blobs let developers move more data while keeping fees lower. This overview will help you read the live feed, understand key metrics, and use the dashboard to make decisions.
            </p>
          </div>

          <div id="overview-live-feed" className="mt-10 page-section">
            <h3 className="text-xl font-semibold mb-2">Live Feed</h3>
            <p className="text-foreground/70 mb-3">
              The Live Feed shows recent blocks and transactions that include blobs. Each row lists the block, age, number of transactions, number of blobs, gas usage for blobs, cost per blob, and related rollups. Use it to spot spikes in activity or sudden fee changes.
            </p>
            <p className="text-foreground/70">
              Tip: watch the "Cost / Blob" column to see how expensive storing data is over time. Combine this with the heatmap and charts to understand if costs are trending up or down.
            </p>

            <img src="/overview_livefeed.png" alt="Live Feed" className="w-full rounded object-cover mt-6" />
          </div>

          <div id="overview-metrics" className="mt-10 page-section">
            <h3 className="text-xl font-semibold mb-2">Metrics & Charts</h3>
            <p className="text-foreground/70 mb-3">
              Key charts include total blobs over time, rollup share (who is producing blobs), and cost heatmaps. These visualizations help you answer questions like "Which rollups are using most blob space?" and "When are costs peaking during the day?".
            </p>
            <p className="text-foreground/70">
              Use the charts to compare daily trends, evaluate rollup market share, and detect anomalous behavior that may signal congestion or new usage patterns.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <div className="rounded-lg border border-border p-4 bg-card">
                  <h4 className="font-semibold mb-2">Total Blobs — 30d</h4>
                  <img src="/overview_totalblobs.png" alt="Total Blobs" className="w-full rounded object-cover" />
                </div>
              </div>

              <div>
                <div className="rounded-lg border border-border p-4 bg-card">
                  <h4 className="font-semibold mb-2">Rollup Share</h4>
                  <img src="/overview_rollupshare.png" alt="Rollup Share" className="w-full rounded object-cover" />
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-lg border border-border p-4 bg-card">
              <h4 className="font-semibold mb-2">Cost Heatmap — 7d × 24h</h4>
              <img src="/overview_costuptime.png" alt="Cost Heatmap" className="w-full rounded object-cover" />
            </div>
          </div>

          <div id="overview-how-to" className="mt-10 mb-8 page-section">
            <h3 className="text-xl font-semibold mb-2">How to Use This Page</h3>
            <ol className="list-decimal list-inside text-foreground/70 space-y-2">
              <li>Start with the Live Feed to see recent blocks and immediate activity.</li>
              <li>Open the Leaderboard to identify top blob producers and active dApps.</li>
              <li>Use the Market view to inspect fee volatility and long-term trends.</li>
              <li>Check Research for deeper analysis and experimental insights.</li>
              <li>Toggle Light/Dark mode with the control in the header for best readability.</li>
            </ol>
  </div>         
        </section>

        {/* sticky help pill for quick guidance on small screens */}
        <div className="tooltip-floating md:hidden">
          <Tooltip tip="This page updates in near-real-time. Tap sidebar items to jump to sections.">
            <button className="inline-flex items-center gap-2 rounded-full border px-3 py-2 bg-card">
              <HelpCircle className="w-5 h-5 text-accent" />
            </button>
          </Tooltip>
        </div>

        <section id="leaderboard" className="page-section scroll-mt-24 px-6 md:px-12 py-16 max-w-5xl mx-auto w-full border-b border-border/50">
          <div className="flex items-center gap-3 mb-4">
            <LineChart className="w-6 h-6 text-accent" />
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Leaderboard</h2>
          </div>
          <p className="text-foreground/70 max-w-3xl mb-8 leading-relaxed">
            Track the top 40 rollups by blob activity and contribution. Monitor real-time rankings, throughput, costs, and market share.
          </p>

          <div id="leaderboard-rollups" className="page-section mt-10">
            <h3 className="text-xl font-semibold mb-4">Top Rollups</h3>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary/30">
                    <th className="px-4 py-3 text-left font-semibold text-foreground/70">#</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground/70">Rollup</th>
                    <th className="px-4 py-3 text-right font-semibold text-foreground/70">Total Blobs</th>
                    <th className="px-4 py-3 text-right font-semibold text-foreground/70">Avg Cost</th>
                    <th className="px-4 py-3 text-right font-semibold text-foreground/70">24h Trend</th>
                    <th className="px-4 py-3 text-right font-semibold text-foreground/70">Market Share</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { rank: 1, name: 'Base', blobs: 7845, cost: '$0.003601', trend: '+12.5%', share: '37.9%' },
                    { rank: 2, name: 'World Chain', blobs: 2286, cost: '$0.003492', trend: '+5.2%', share: '11.0%' },
                    { rank: 3, name: 'Arbitrum One', blobs: 2202, cost: '$0.003382', trend: '-2.1%', share: '10.6%' },
                    { rank: 4, name: 'Optimism', blobs: 1950, cost: '$0.003421', trend: '+8.3%', share: '9.4%' },
                    { rank: 5, name: 'OP Mainnet', blobs: 1080, cost: '$0.003369', trend: '+3.7%', share: '5.2%' },
                    { rank: 6, name: 'Soleum', blobs: 750, cost: '$0.003133', trend: '-1.5%', share: '3.6%' },
                    { rank: 7, name: 'Unichain', blobs: 654, cost: '$0.003512', trend: '+15.2%', share: '3.2%' },
                    { rank: 8, name: 'Abstract', blobs: 441, cost: '$0.003596', trend: '+7.8%', share: '2.1%' },
                    { rank: 9, name: 'Mantle', blobs: 420, cost: '$0.003445', trend: '-0.3%', share: '2.0%' },
                    { rank: 10, name: 'Taiko', blobs: 385, cost: '$0.003678', trend: '+22.1%', share: '1.9%' },
                  ].map((row) => (
                    <tr key={row.rank} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                      <td className="px-4 py-3 text-foreground/70">{row.rank}</td>
                      <td className="px-4 py-3 font-medium text-foreground">{row.name}</td>
                      <td className="px-4 py-3 text-right text-foreground">{row.blobs.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-accent">{row.cost}</td>
                      <td className="px-4 py-3 text-right text-green-500">{row.trend}</td>
                      <td className="px-4 py-3 text-right text-foreground/70">{row.share}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-foreground/50 mt-3">Showing top 10 of 40 tracked rollups. Scroll or visit the full leaderboard for complete rankings.</p>
          </div>

          <div id="leaderboard-senders" className="page-section mt-12">
            <h3 className="text-xl font-semibold mb-4">Undistributed Senders</h3>
            <p className="text-foreground/70 mb-6">Senders not yet categorized to a known rollup. These may be new protocols, custom implementations, or experimental services.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { addr: '0x1234...5678', blobs: 156, cost: '$0.003421', lastSeen: '2 min ago' },
                { addr: '0xabcd...ef00', blobs: 134, cost: '$0.003356', lastSeen: '5 min ago' },
                { addr: '0x9999...0001', blobs: 98, cost: '$0.003512', lastSeen: '12 min ago' },
                { addr: '0x7777...2222', blobs: 87, cost: '$0.003289', lastSeen: '18 min ago' },
                { addr: '0x5555...4444', blobs: 76, cost: '$0.003678', lastSeen: '25 min ago' },
                { addr: '0x3333...1111', blobs: 64, cost: '$0.003445', lastSeen: '32 min ago' },
                { addr: '0xeeee...cccc', blobs: 52, cost: '$0.003721', lastSeen: '41 min ago' },
                { addr: '0xaaaa...bbbb', blobs: 48, cost: '$0.003189', lastSeen: '55 min ago' },
                { addr: '0xffff...0000', blobs: 41, cost: '$0.003534', lastSeen: '1h ago' },
                { addr: '0x1111...6666', blobs: 35, cost: '$0.003412', lastSeen: '1h 15m ago' },
              ].map((sender, idx) => (
                <div key={idx} className="rounded-lg border border-border p-4 bg-secondary/30 hover:bg-secondary/50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-mono text-sm text-accent">{sender.addr}</p>
                    <span className="text-xs text-foreground/50">{sender.lastSeen}</span>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <div>
                      <p className="text-foreground/50">Blobs</p>
                      <p className="font-semibold text-foreground">{sender.blobs}</p>
                    </div>
                    <div>
                      <p className="text-foreground/50">Avg Cost</p>
                      <p className="font-semibold text-accent">{sender.cost}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="market" className="page-section scroll-mt-24 px-6 md:px-12 py-16 max-w-5xl mx-auto w-full border-b border-border/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <LineChart className="w-6 h-6 text-accent" />
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Market</h2>
            </div>
            <Tooltip tip="Copy link to this section">
              <button
                onClick={() => copyToClipboard('market')}
                className="text-foreground/60 hover:text-accent transition-colors"
              >
                <Copy className="w-5 h-5" />
              </button>
            </Tooltip>
          </div>
          <p className="text-foreground/70 max-w-3xl mb-8 leading-relaxed">
            Real-time market signals, fee trends, and blob demand metrics. Monitor volatility, utilization patterns, and network dynamics to inform operational decisions.
          </p>

          <div id="market-trends" className="page-section mt-10">
            <h3 className="text-xl font-semibold mb-4">Fee Trends</h3>
            <p className="text-foreground/70 mb-6">Monitor fee patterns and pricing cycles to understand when it's best to submit blob transactions. The trend chart shows historical fee movements over the past week, while the heatmap reveals peak cost periods across different times of day and day of week.</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-lg border border-border p-6 bg-card">
                <h4 className="font-semibold mb-4">Blob Base Fee Trend</h4>
                <img src="/market_blobbasefeetrend.png" alt="Blob Base Fee Trend" className="w-full rounded object-cover" />
              </div>
              <div className="rounded-lg border border-border p-6 bg-card">
                <h4 className="font-semibold mb-4">Regime Heatmap — 7d × 24h</h4>
                <img src="/market_regimeheatmap.png" alt="Regime Heatmap" className="w-full rounded object-cover" />
              </div>
            </div>
          </div>

          <div id="market-activity" className="page-section mt-10">
            <h3 className="text-xl font-semibold mb-4">Network Activity</h3>
            <p className="text-foreground/70 mb-6">See which rollups are actively submitting blobs and understand their contribution to overall network activity. This helps identify dominant players in the blob ecosystem and track shifting usage patterns.</p>
            <div className="rounded-lg border border-border p-6 bg-card">
              <h4 className="font-semibold mb-4">Blob Activity by Rollup (24h)</h4>
              <img src="/market_blobactivitybyrollup.png" alt="Blob Activity by Rollup" className="w-full rounded object-cover" />
            </div>
          </div>

          <div id="market-ecosystem" className="page-section mt-10">
            <h3 className="text-xl font-semibold mb-4">Rollup Ecosystem Map</h3>
            <p className="text-foreground/70 mb-6">Visualize the complete rollup ecosystem and understand the relationships between different rollup solutions, their market share, and their blob utilization patterns. This comprehensive map provides a high-level view of the blob landscape.</p>
            <div className="rounded-lg border border-border p-6 bg-card">
              <img src="/market_rollupecosystemmap.png" alt="Rollup Ecosystem Map" className="w-full rounded object-cover" />
            </div>
          </div>
        </section>

        <section id="research" className="page-section scroll-mt-24 px-6 md:px-12 py-16 max-w-5xl mx-auto w-full border-b border-border/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <FlaskConical className="w-6 h-6 text-accent" />
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Research</h2>
            </div>
            <Tooltip tip="Copy link to this section">
              <button
                onClick={() => copyToClipboard('research')}
                className="text-foreground/60 hover:text-accent transition-colors"
              >
                <Copy className="w-5 h-5" />
              </button>
            </Tooltip>
          </div>
          <p className="text-foreground/70 max-w-3xl mb-8 leading-relaxed">
            Long-horizon blob economics: how usage grows, how different rollups behave over time, and what the market signals are telling us. This section is meant to be readable for non-technical users while still giving enough depth for analysis.
          </p>

          <div id="research-growth" className="page-section mt-10">
            <h3 className="text-xl font-semibold mb-4">Cumulative Blob Growth</h3>
            <div className="rounded-lg border border-border p-6 bg-card">
              <p className="text-foreground/70 mb-4">
                The line chart below shows how blob usage rises over time. A steady slope means adoption is expanding smoothly; sharp jumps often indicate release cycles, new rollup launches, or changes in fee incentives.
              </p>
              <img src="/research_cumulativeblobgrowth.png" alt="Cumulative Blob Growth" className="w-full rounded object-cover" />
            </div>
          </div>

          <div id="research-activity" className="page-section mt-10">
            <h3 className="text-xl font-semibold mb-4">Daily Blob Volume by Rollup</h3>
            <div className="rounded-lg border border-border p-6 bg-card">
              <p className="text-foreground/70 mb-4">
                This chart breaks down total blob volume by rollup across the last 30 days. It helps answer a simple question: which rollups are consistently active, and which ones spike only occasionally?
              </p>
              <img src="/research_dailyblobvolumebyrollup.png" alt="Daily Blob Volume by Rollup" className="w-full rounded object-cover" />
            </div>
          </div>

          <div id="research-utilization" className="page-section mt-10">
            <h3 className="text-xl font-semibold mb-4">Blob Slot Utilization</h3>
            <div className="rounded-lg border border-border p-6 bg-card">
              <p className="text-foreground/70 mb-4">
                Slot utilization shows how full the blob space is over time. When utilization is high, it indicates strong demand and potentially higher fees. When it drops, it suggests less network congestion or decreased interest in blob transactions.
              </p>
              <img src="/research_slotutilization.png" alt="Slot Utilization" className="w-full rounded object-cover" />
            </div>
          </div>

          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <div className="rounded-lg border border-border p-6 bg-secondary/30">
              <h3 className="font-semibold mb-2">What the Research Means</h3>
              <p className="text-sm text-foreground/70">
                A simple way to read this section: growth chart = usage growth, donut chart = who is dominating, stacked bars = when blobs were created, and regime timeline = how stable the market has been.
              </p>
            </div>
            <div className="rounded-lg border border-border p-6 bg-secondary/30">
              <h3 className="font-semibold mb-2">What to Watch Next</h3>
              <p className="text-sm text-foreground/70">
                Watch for sudden growth spikes, a shift in market share, or a wider distribution across rollups. Those often mean the ecosystem is changing.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border px-6 md:px-12 py-8 text-center text-sm text-foreground/50">
          <p>© 2025 BlobLens. Real-time blob analytics and documentation platform for Ethereum rollups.</p>
        </footer>
      </div>
    </DocLayout>
    </>
  );
}
