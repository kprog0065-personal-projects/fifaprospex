"use client";

import { useState } from "react";
import { parseUnits } from "viem";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { CONTRACT_ADDRESSES, DEMO_EVENTS_ABI, ERC20_ABI } from "~~/lib/contracts";
import { DEMO_WALLETS } from "~~/lib/demoWallets";

type Pool = "foundation" | "pathway" | "proPath";

interface Props {
  pool: Pool;
  totalAssets: bigint | undefined;
  address: string | undefined;
}

function Section({
  title,
  emoji,
  defaultOpen = false,
  children,
}: {
  title: string;
  emoji: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-800/50 overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-3 py-2.5 text-[11px] font-semibold text-slate-200 hover:bg-slate-700/50 transition-colors"
      >
        <span>
          {emoji} {title}
        </span>
        <span className="text-slate-500 text-[10px]">{open ? "▲" : "▼"}</span>
      </button>
      {open && <div className="px-3 pb-3 pt-1 space-y-2 border-t border-slate-700">{children}</div>}
    </div>
  );
}

export function DemoControlPanel({ pool, totalAssets, address }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const [faucetAmount, setFaucetAmount] = useState("");
  const [batchAmount, setBatchAmount] = useState("");
  const [walletAmounts, setWalletAmounts] = useState<string[]>(DEMO_WALLETS.map(() => ""));
  const [showWalletList, setShowWalletList] = useState(false);

  const [yearsOfYield, setYearsOfYield] = useState("");

  const [transferFee, setTransferFee] = useState("");
  const [installments, setInstallments] = useState("1");
  const [currentInstallment, setCurrentInstallment] = useState(1);
  const [showInstallInfo, setShowInstallInfo] = useState(false);

  const [solidarityFee, setSolidarityFee] = useState("");

  const vaultAddress = CONTRACT_ADDRESSES[pool];
  const cadAddress = CONTRACT_ADDRESSES.cad;
  const demoEventsAddress = CONTRACT_ADDRESSES.demoEvents;
  const academyVaultAddress = CONTRACT_ADDRESSES.pathway;
  const isSolidarityEligible = pool === "pathway" || pool === "proPath";

  const { writeContract, data: txHash } = useWriteContract();
  const { isLoading: isPending } = useWaitForTransactionReceipt({
    hash: txHash,
    query: { enabled: !!txHash },
  });

  const updateWalletAmount = (index: number, value: string) => {
    setWalletAmounts(prev => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const resolveAmount = (index: number): string => {
    if (walletAmounts[index]) return walletAmounts[index];
    if (batchAmount) return batchAmount;
    return "10000000";
  };

  const allSameAmount = walletAmounts.every(a => a === walletAmounts[0]);

  const handleTransferFeeChange = (val: string) => {
    setTransferFee(val);
    setCurrentInstallment(1);
  };

  const handleInstallmentsChange = (val: string) => {
    setInstallments(val);
    setCurrentInstallment(1);
  };

  const previewYield = (currentAssets: bigint, years: number): string => {
    if (years <= 0) return "";
    const total = (Number(currentAssets) / 1e18) * Math.pow(1.05, years);
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(total);
  };

  const previewTransfer = (grossFee: number, numInst: number) => {
    const spvShare = grossFee * 0.49;
    const platformFee = spvShare * 0.05;
    const net = spvShare - platformFee;
    const perInstall = net / numInst;
    return {
      spvShare: spvShare.toFixed(2),
      platformFee: platformFee.toFixed(2),
      net: net.toFixed(2),
      foundationPool: (perInstall * 0.5).toFixed(2), // ✅ 50%
      academyPool: (perInstall * 0.3).toFixed(2), // ✅ 30%
      proPool: (perInstall * 0.2).toFixed(2), // ✅ 20%
    };
  };

  const previewSolidarity = (grossFee: number) => {
    const solidarityGross = grossFee * 0.005;
    const spvShare = solidarityGross * 0.49;
    const platformFee = spvShare * 0.05;
    return {
      solidarityGross: solidarityGross.toFixed(2),
      spvShare: spvShare.toFixed(2),
      platformFee: platformFee.toFixed(2),
      netToPool: (spvShare - platformFee).toFixed(2),
    };
  };

  const numInstallments = parseInt(installments) || 1;
  const isLastInstallment = currentInstallment === numInstallments;
  const years = yearsOfYield ? parseInt(yearsOfYield) : 1;
  const yieldPreview = totalAssets && totalAssets > 0n && years > 0 ? previewYield(totalAssets, years) : null;
  const transferPreview = transferFee ? previewTransfer(parseFloat(transferFee), numInstallments) : null;
  const solidarityPreview = solidarityFee ? previewSolidarity(parseFloat(solidarityFee)) : null;

  const handleAction = (action: "faucet" | "batchFaucet" | "transferInstallment" | "yield" | "solidarity") => {
    if (!address) return;

    switch (action) {
      case "faucet":
        writeContract({
          address: cadAddress as `0x${string}`,
          abi: ERC20_ABI,
          functionName: "faucet",
          args: [parseUnits(faucetAmount || "10000000", 18)],
        });
        break;

      case "batchFaucet": {
        const amounts = DEMO_WALLETS.map((_, i) => parseUnits(resolveAmount(i), 18));
        const firstAmount = amounts[0];
        const allEqual = amounts.every(a => a == firstAmount);
        if (allEqual) {
          writeContract({
            address: cadAddress as `0x${string}`,
            abi: ERC20_ABI,
            functionName: "batchFaucet",
            args: [DEMO_WALLETS, firstAmount],
          });
        } else {
          writeContract({
            address: cadAddress as `0x${string}`,
            abi: ERC20_ABI,
            functionName: "batchMintTo",
            args: [DEMO_WALLETS, amounts],
          });
        }
        break;
      }

      case "transferInstallment": {
        if (!transferFee) return;
        const grossPerInstall = parseFloat(transferFee) / numInstallments;
        writeContract({
          address: demoEventsAddress as `0x${string}`,
          abi: DEMO_EVENTS_ABI,
          functionName: "simulateTransferInstallment",
          args: [parseUnits(grossPerInstall.toFixed(6), 18)],
        });
        setCurrentInstallment(prev => (prev >= numInstallments ? 1 : prev + 1));
        break;
      }

      case "yield": {
        if (!totalAssets || totalAssets === 0n) return;
        if (years <= 0) return;
        const multiplierScaled = BigInt(Math.round((Math.pow(1.05, years) - 1) * 1_000_000));
        const yieldAssets = (totalAssets * multiplierScaled) / 1_000_000n;
        if (yieldAssets === 0n) return;
        writeContract({
          address: demoEventsAddress as `0x${string}`,
          abi: DEMO_EVENTS_ABI,
          functionName: "addYearYield",
          args: [vaultAddress as `0x${string}`, yieldAssets],
        });
        break;
      }

      case "solidarity": {
        if (!solidarityFee || !isSolidarityEligible) return;
        const vaultTarget = pool === "pathway" ? academyVaultAddress : CONTRACT_ADDRESSES.proPath;
        writeContract({
          address: demoEventsAddress as `0x${string}`,
          abi: DEMO_EVENTS_ABI,
          functionName: "simulateSolidarity",
          args: [vaultTarget as `0x${string}`, parseUnits(solidarityFee, 18)],
        });
        break;
      }
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-20 right-4 z-50 rounded-lg bg-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-lg hover:bg-purple-700 transition-all"
      >
        🎮 Demo Controls
      </button>

      {isOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)} />}

      <div
        className={`fixed top-0 right-0 h-full w-96 bg-slate-900 border-l border-slate-700 z-50 overflow-y-auto shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 space-y-2">
          <div className="flex justify-between items-center pb-3 border-b border-slate-700 mb-2">
            <h3 className="text-base font-semibold text-slate-200">🎮 Demo Controls</h3>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-200 text-xl font-bold">
              ✕
            </button>
          </div>

          {/* ── 1. BASE YIELD ── */}
          <Section emoji="📈" title="Base Yield (5% APY — Compounded)">
            <input
              type="number"
              value={yearsOfYield}
              onChange={e => setYearsOfYield(e.target.value)}
              placeholder="Years of yield (default: 1)"
              min="1"
              max="50"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500"
            />
            {yieldPreview && (
              <div className="rounded-lg bg-slate-900/80 border border-slate-700 p-2 text-[10px]">
                <p className="text-slate-400">
                  Vault total after {years} year{years === 1 ? "" : "s"}:{" "}
                  <span className="text-emerald-300 font-semibold">{yieldPreview}</span>
                </p>
                <p className="text-slate-500 mt-0.5">Formula: current balance × (1.05)^{years}</p>
              </div>
            )}
            <button
              onClick={() => handleAction("yield")}
              disabled={isPending || !totalAssets || totalAssets === 0n}
              className="w-full rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white transition-all hover:bg-indigo-700 disabled:opacity-50"
            >
              {isPending ? "Adding Yield..." : `📈 Add ${years} Year${years === 1 ? "" : "s"} @ 5% APY`}
            </button>
            <p className="text-[10px] text-slate-500">
              Compounds annually — each year&apos;s yield builds on the previous.
            </p>
          </Section>

          {/* ── 2. TRANSFER WATERFALL ── */}
          <Section emoji="💰" title="Transfer Waterfall">
            <input
              type="number"
              value={transferFee}
              onChange={e => handleTransferFeeChange(e.target.value)}
              placeholder="Gross transfer fee (e.g. 10000000)"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500"
            />
            <div className="flex gap-2 items-center">
              <input
                type="number"
                value={installments}
                onChange={e => handleInstallmentsChange(e.target.value)}
                placeholder="Installments"
                min="1"
                max="10"
                className="w-24 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500"
              />
              <span className="text-[10px] text-slate-500">total installments</span>
            </div>

            {numInstallments > 1 && (
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {Array.from({ length: numInstallments }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 w-6 rounded-full ${
                        i < currentInstallment - 1
                          ? "bg-emerald-500"
                          : i === currentInstallment - 1
                            ? "bg-purple-400"
                            : "bg-slate-700"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[10px] text-slate-400">
                  {currentInstallment} of {numInstallments}
                  {isLastInstallment ? " — final" : ""}
                </span>
              </div>
            )}

            {transferPreview && (
              <div className="rounded-lg bg-slate-900/80 border border-slate-700 p-2 space-y-1 text-[10px]">
                <p className="text-slate-400">
                  SPV 49%:{" "}
                  <span className="text-slate-200">${parseFloat(transferPreview.spvShare).toLocaleString()}</span>
                </p>
                <p className="text-slate-400">
                  Platform fee (5%):{" "}
                  <span className="text-rose-300">-${parseFloat(transferPreview.platformFee).toLocaleString()}</span>
                </p>
                <p className="text-slate-400">
                  Net to waterfall:{" "}
                  <span className="text-emerald-300">${parseFloat(transferPreview.net).toLocaleString()}</span>
                </p>
                <button
                  onClick={() => setShowInstallInfo(!showInstallInfo)}
                  className="text-slate-500 hover:text-slate-300 text-[10px] pt-1"
                >
                  {showInstallInfo ? "▲ Hide" : "▼ Show"} pool split
                </button>
                {showInstallInfo && (
                  <div className="space-y-0.5 pt-1 border-t border-slate-700">
                    <p className="text-slate-400">
                      → Foundation (50%):{" "}
                      <span className="text-slate-200">
                        ${parseFloat(transferPreview.foundationPool).toLocaleString()}
                      </span>
                    </p>
                    <p className="text-slate-400">
                      → Academy (30%):{" "}
                      <span className="text-slate-200">
                        ${parseFloat(transferPreview.academyPool).toLocaleString()}
                      </span>
                    </p>
                    <p className="text-slate-400">
                      → Pro (20%):{" "}
                      <span className="text-slate-200">${parseFloat(transferPreview.proPool).toLocaleString()}</span>
                    </p>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={() => handleAction("transferInstallment")}
              disabled={isPending || !transferFee}
              className={`w-full rounded-lg px-3 py-2 text-xs font-semibold text-white transition-all disabled:opacity-50 ${
                isLastInstallment && numInstallments > 1
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-purple-600 hover:bg-purple-700"
              }`}
            >
              {isPending
                ? "Simulating..."
                : numInstallments === 1
                  ? "💰 Simulate Transfer"
                  : `💰 Installment ${currentInstallment} of ${numInstallments}${isLastInstallment ? " ✓ Final" : ""}`}
            </button>
            <p className="text-[10px] text-slate-500">
              Press once per installment. Counter advances automatically and resets after the final installment.
            </p>
          </Section>

          {/* ── 3. SOLIDARITY ── */}
          <Section emoji="🤝" title={`Solidarity Payment${!isSolidarityEligible ? " (N/A)" : ""}`}>
            {isSolidarityEligible ? (
              <>
                <input
                  type="number"
                  value={solidarityFee}
                  onChange={e => setSolidarityFee(e.target.value)}
                  placeholder="Gross transfer fee that triggered solidarity"
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500"
                />
                {solidarityPreview && (
                  <div className="rounded-lg bg-slate-900/80 border border-slate-700 p-2 space-y-1 text-[10px]">
                    <p className="text-slate-400">
                      Solidarity gross (0.50%):{" "}
                      <span className="text-slate-200">
                        ${parseFloat(solidarityPreview.solidarityGross).toLocaleString()}
                      </span>
                    </p>
                    <p className="text-slate-400">
                      SPV 49%:{" "}
                      <span className="text-slate-200">${parseFloat(solidarityPreview.spvShare).toLocaleString()}</span>
                    </p>
                    <p className="text-slate-400">
                      Platform fee (5%):{" "}
                      <span className="text-rose-300">
                        -${parseFloat(solidarityPreview.platformFee).toLocaleString()}
                      </span>
                    </p>
                    <p className="text-slate-400">
                      Net to {pool === "pathway" ? "Academy" : "Pro"} pool:{" "}
                      <span className="text-emerald-300">
                        ${parseFloat(solidarityPreview.netToPool).toLocaleString()}
                      </span>
                    </p>
                  </div>
                )}
                <button
                  onClick={() => handleAction("solidarity")}
                  disabled={isPending || !solidarityFee}
                  className="w-full rounded-lg bg-amber-600 px-3 py-2 text-xs font-semibold text-white transition-all hover:bg-amber-700 disabled:opacity-50"
                >
                  {isPending
                    ? "Simulating..."
                    : `🤝 Simulate Solidarity — ${pool === "pathway" ? "Academy (U12–U17)" : "Pro (U18–U23)"}`}
                </button>
                <p className="text-[10px] text-slate-500">
                  0.50% of gross transfer → SPV 49% → platform 5% → net to pool.
                </p>
              </>
            ) : (
              <p className="text-[10px] text-slate-500">
                Foundation pool (U6–U11) is excluded from FIFA solidarity mechanism. Players must be U12+ to generate
                solidarity payments.
              </p>
            )}
          </Section>

          {/* ── 4. SETUP ACTIONS ── */}
          <Section emoji="⚙️" title="Setup Actions">
            <p className="text-[10px] text-slate-500">Fund connected wallet only</p>
            <input
              type="number"
              value={faucetAmount}
              onChange={e => setFaucetAmount(e.target.value)}
              placeholder="Amount (default: 10,000,000)"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-slate-200 placeholder:text-slate-500"
            />
            <button
              onClick={() => handleAction("faucet")}
              disabled={isPending}
              className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-emerald-700 disabled:opacity-50"
            >
              {isPending ? "Minting..." : faucetAmount ? `Get ${faucetAmount} Test CAD` : "Get Test CAD (10,000,000)"}
            </button>

            <div className="pt-2 border-t border-slate-700 space-y-2">
              <p className="text-[11px] font-semibold text-teal-300">👛 Fund All Demo Wallets</p>
              <input
                type="number"
                value={batchAmount}
                onChange={e => setBatchAmount(e.target.value)}
                placeholder="Default amount for all wallets (10,000,000)"
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500"
              />
              <button
                onClick={() => setShowWalletList(!showWalletList)}
                className="text-[10px] text-teal-400 hover:text-teal-300 w-full text-left"
              >
                {showWalletList ? "▲ Hide" : "▼ Show"} individual wallet amounts
              </button>

              {showWalletList && (
                <div className="space-y-2">
                  {DEMO_WALLETS.map((wallet, i) => (
                    <div key={wallet} className="flex gap-2 items-center">
                      <span className="text-[10px] text-slate-500 font-mono w-24 shrink-0">
                        W{i + 1}: {wallet.slice(0, 4)}…{wallet.slice(-3)}
                      </span>
                      <input
                        type="number"
                        value={walletAmounts[i]}
                        onChange={e => updateWalletAmount(i, e.target.value)}
                        placeholder={resolveAmount(i)}
                        className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-2 py-1 text-[11px] text-slate-200 placeholder:text-slate-600"
                      />
                    </div>
                  ))}
                  <div className="rounded-lg bg-slate-900/80 border border-slate-700 p-2 text-[10px]">
                    <p className="text-slate-500 mb-1">Will send:</p>
                    <div className="flex flex-col gap-0.5">
                      {DEMO_WALLETS.map((wallet, i) => (
                        <div key={wallet} className="text-slate-400">
                          W{i + 1}:{" "}
                          <span className="text-teal-300 font-semibold">
                            {Number(resolveAmount(i)).toLocaleString()} CAD
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={() => handleAction("batchFaucet")}
                disabled={isPending}
                className="w-full rounded-lg bg-teal-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-teal-700 disabled:opacity-50"
              >
                {isPending
                  ? "Funding Wallets..."
                  : allSameAmount
                    ? `👛 Fund All ${DEMO_WALLETS.length} Wallets (${Number(resolveAmount(0)).toLocaleString()} each)`
                    : `👛 Fund All ${DEMO_WALLETS.length} Wallets (Custom Amounts)`}
              </button>
              <p className="text-[10px] text-slate-500">
                Same amounts → <code>batchFaucet</code>. Different → <code>batchMintTo</code>.
              </p>
            </div>
          </Section>

          <p className="text-[10px] text-slate-600 leading-relaxed pt-2">
            <strong className="text-slate-500">Demo Mode:</strong> Simulates blockchain events. In production all flows
            are automatic from real SPV events.
          </p>
        </div>
      </div>
    </>
  );
}
