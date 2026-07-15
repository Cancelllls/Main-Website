"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface V9Data {
  engine: string;
  live_price: number;
  balance: number;
  equity: number;
  wins: number;
  losses: number;
  total_win: number;
  total_loss: number;
  fees: number;
  session_trades: number;
  circuit_broken: boolean;
  demo_mode: boolean;
  rsi: number;
  atr: number;
  vol_ratio: number;
  status: string;
  positions: number;
  pos_list: Array<{
    entry: number;
    amount: number;
    reason: string;
    hold_target: number;
    bars: number;
    pnl: number;
  }>;
  velocity: { "1h": number; "6h": number; "12h": number };
  drawdown: { "12h": number; "24h": number };
  edges: string[];
}

const API_URL = process.env.NEXT_PUBLIC_V9_API || "https://market.cancellls.com/api/status";

const SignalRow = ({
  label,
  desc,
  active,
}: {
  label: string;
  desc: string;
  active: boolean;
}) => (
  <div className="flex items-center justify-between py-2.5 border-b border-[#1a1a1a] last:border-0">
    <div>
      <div className="text-sm font-medium text-[#ededed]">{label}</div>
      <div className="text-xs text-gray-500">{desc}</div>
    </div>
    <span
      className={cn(
        "text-xs font-bold px-2.5 py-1 rounded-md border",
        active
          ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
          : "bg-[#0a0a0a] text-gray-600 border-[#1a1a1a]"
      )}
    >
      {active ? "ACTIVE" : "WAITING"}
    </span>
  </div>
);

const StatBox = ({
  value,
  label,
  accent,
}: {
  value: string;
  label: string;
  accent?: "blue" | "red" | "green";
}) => (
  <div className="flex-1 min-w-[90px] text-center p-3 bg-[#0a0a0a] rounded-xl border border-[#1a1a1a]">
    <span
      className={cn(
        "text-xl font-black block",
        accent === "green" && "text-green-500",
        accent === "red" && "text-red-500",
        accent === "blue" && "text-blue-400",
        !accent && "text-[#ededed]"
      )}
    >
      {value}
    </span>
    <span className="text-[10px] uppercase tracking-wider text-gray-600 mt-1 block">
      {label}
    </span>
  </div>
);

export default function TradePage() {
  const [data, setData] = useState<V9Data | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function poll() {
      try {
        const res = await fetch(API_URL, { cache: "no-store" });
        const json = await res.json();
        if (mounted) {
          setData(json);
          setError(false);
        }
      } catch {
        if (mounted) setError(true);
      }
      if (mounted) setTimeout(poll, 3000);
    }
    poll();
    return () => {
      mounted = false;
    };
  }, []);

  if (error && !data) {
    return (
      <main className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-3 h-3 rounded-full bg-red-500 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-400 font-mono text-sm">ENGINE OFFLINE</p>
        </div>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-3 h-3 rounded-full bg-blue-500 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-400 font-mono text-sm">INITIALIZING SYSTEM</p>
        </div>
      </main>
    );
  }

  const v6 = data.velocity?.["6h"] ?? 0;
  const d12 = data.drawdown?.["12h"] ?? 0;
  const winRate =
    data.wins + data.losses > 0
      ? ((data.wins / (data.wins + data.losses)) * 100).toFixed(1)
      : "0.0";

  return (
    <main className="relative z-10 min-h-screen pb-20">
      {/* Header */}
      <div className="fixed top-16 left-0 right-0 z-20 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-[#222]">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <h1 className="text-sm font-black tracking-widest uppercase text-[#ededed]">
              C.Funds V9 — Velocity Engine
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md border",
                data.circuit_broken
                  ? "bg-red-500/10 text-red-400 border-red-500/30"
                  : data.demo_mode
                  ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                  : "bg-green-500/10 text-green-400 border-green-500/30"
              )}
            >
              {data.circuit_broken
                ? "BREAKER"
                : data.demo_mode
                ? "PAPER"
                : "LIVE"}
            </span>
            <span className="text-[10px] font-mono text-gray-600">
              {new Date().toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>

      <div className="pt-28 max-w-7xl mx-auto px-6">
        {/* Price hero */}
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-600 mb-2">
            BTC / USDT Live Price
          </p>
          <div className="flex items-baseline gap-3">
            <span className="text-5xl font-black text-[#ededed] tracking-tight tabular-nums">
              ${data.live_price.toLocaleString()}
            </span>
            <span
              className={cn(
                "text-lg font-bold",
                v6 < -2
                  ? "text-blue-400"
                  : v6 < 0
                  ? "text-red-400"
                  : "text-green-400"
              )}
            >
              {v6 > 0 ? "+" : ""}
              {v6.toFixed(2)}% 6h
            </span>
          </div>
          <div className="flex gap-6 mt-2">
            <span className="text-xs font-mono text-gray-500">
              RSI {data.rsi.toFixed(1)}
            </span>
            <span className="text-xs font-mono text-gray-500">
              ATR ${data.atr.toFixed(0)}
            </span>
            <span className="text-xs font-mono text-gray-500">
              VOL {data.vol_ratio.toFixed(2)}x
            </span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Signals */}
          <div className="bg-[#111]/60 backdrop-blur-xl border border-[#222] rounded-3xl p-5">
            <h3 className="text-[11px] uppercase tracking-[0.15em] text-gray-500 mb-4 font-bold">
              Entry Signals
            </h3>
            <SignalRow
              label="6H Velocity &lt; -3%"
              desc="+1.30% · 81% WR · n=16"
              active={v6 < -3 && data.rsi < 40}
            />
            <SignalRow
              label="6H Velocity &lt; -2%"
              desc="+0.50% · 69% WR · n=55"
              active={v6 < -2}
            />
            <SignalRow
              label="12H Drawdown &lt; -5%"
              desc="+0.52% · 71% WR · n=49"
              active={d12 < -5}
            />
            <SignalRow
              label="RSI &lt; 30 + Vel &lt; -1.5%"
              desc="Deep oversold bounce"
              active={data.rsi < 30 && v6 < -1.5}
            />
          </div>

          {/* Velocity meters */}
          <div className="bg-[#111]/60 backdrop-blur-xl border border-[#222] rounded-3xl p-5">
            <h3 className="text-[11px] uppercase tracking-[0.15em] text-gray-500 mb-4 font-bold">
              Velocity Metrics
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">6H Velocity</span>
                  <span className={v6 < -2 ? "text-blue-400" : v6 < 0 ? "text-red-400" : "text-green-400"}>
                    {v6 > 0 ? "+" : ""}
                    {v6.toFixed(2)}%
                  </span>
                </div>
                <div className="h-1.5 bg-[#0a0a0a] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, Math.abs(v6) * 15)}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">12H Drawdown</span>
                  <span className={d12 < -5 ? "text-blue-400" : "text-gray-400"}>
                    {d12.toFixed(2)}%
                  </span>
                </div>
                <div className="h-1.5 bg-[#0a0a0a] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-500 to-pink-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, Math.abs(d12) * 6)}%` }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="bg-[#0a0a0a] rounded-xl p-3 border border-[#1a1a1a]">
                  <div className="text-xs text-gray-500">1H Vel</div>
                  <div className="text-lg font-black text-[#ededed] tabular-nums">
                    {data.velocity?.["1h"] > 0 ? "+" : ""}
                    {data.velocity?.["1h"].toFixed(2)}%
                  </div>
                </div>
                <div className="bg-[#0a0a0a] rounded-xl p-3 border border-[#1a1a1a]">
                  <div className="text-xs text-gray-500">12H Vel</div>
                  <div className="text-lg font-black text-[#ededed] tabular-nums">
                    {data.velocity?.["12h"] > 0 ? "+" : ""}
                    {data.velocity?.["12h"].toFixed(2)}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance */}
          <div className="bg-[#111]/60 backdrop-blur-xl border border-[#222] rounded-3xl p-5">
            <h3 className="text-[11px] uppercase tracking-[0.15em] text-gray-500 mb-4 font-bold">
              Performance
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              <StatBox value={String(data.wins)} label="Wins" accent="green" />
              <StatBox value={String(data.losses)} label="Losses" accent="red" />
              <StatBox value={`${winRate}%`} label="Win Rate" accent="blue" />
              <StatBox value={String(data.session_trades)} label="Today" />
            </div>
            <div className="bg-[#0a0a0a] rounded-xl p-4 border border-[#1a1a1a]">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Balance</span>
                <span className="text-[#ededed] font-bold tabular-nums">
                  ${data.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between text-sm mt-1.5">
                <span className="text-gray-500">Equity</span>
                <span className="text-[#ededed] font-bold tabular-nums">
                  ${data.equity.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between text-sm mt-1.5">
                <span className="text-gray-500">Fees</span>
                <span className="text-gray-400 tabular-nums">${data.fees.toFixed(4)}</span>
              </div>
              <div className="flex justify-between text-sm mt-1.5">
                <span className="text-gray-500">P&L</span>
                <span className={(data.total_win - data.total_loss) >= 0 ? "text-green-400" : "text-red-400"}>
                  ${(data.total_win - data.total_loss).toFixed(4)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Positions */}
        {data.pos_list && data.pos_list.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {data.pos_list.map((p, i) => (
              <div
                key={i}
                className="bg-[#111]/60 backdrop-blur-xl border border-[#222] rounded-3xl p-5"
              >
                <div className="flex justify-between items-center mb-3">
                  <span
                    className={cn(
                      "text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md border",
                      p.pnl >= 0
                        ? "bg-green-500/10 text-green-400 border-green-500/30"
                        : "bg-red-500/10 text-red-400 border-red-500/30"
                    )}
                  >
                    {p.pnl >= 0 ? "PROFIT" : "LOSS"}
                  </span>
                  <span className="text-xs text-gray-500 font-mono">{p.reason}</span>
                </div>
                <div className="text-sm text-[#ededed]">
                  Entry: ${p.entry.toLocaleString()}
                </div>
                <div className="text-sm mt-1">
                  PnL:{" "}
                  <span className={p.pnl >= 0 ? "text-green-400" : "text-red-400"}>
                    ${p.pnl.toFixed(2)}
                  </span>
                </div>
                <div className="flex gap-4 mt-2 text-xs text-gray-500">
                  <span>Bars: {p.bars}/{p.hold_target}</span>
                  <span>Size: {p.amount.toFixed(6)} BTC</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Status bar */}
        <div className="bg-[#111]/60 backdrop-blur-xl border border-[#222] rounded-3xl p-4">
          <h3 className="text-[11px] uppercase tracking-[0.15em] text-gray-500 mb-2 font-bold">
            System Status
          </h3>
          <p className="text-xs font-mono text-gray-400">{data.status}</p>
        </div>
      </div>
    </main>
  );
}
