"use client";

import { useEffect, useState } from "react";
import { DemoControlPanel } from "./DemoControlPanel";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { formatUnits, parseUnits } from "viem";
import { useAccount, useBlockNumber, useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { CONTRACT_ADDRESSES, ERC20_ABI, VAULT_ABI } from "~~/lib/contracts";

type Pool = "foundation" | "pathway" | "proPath";

interface Props {
  pool: Pool;
  minDeposit: number;
}

const POOL_APY_BPS: Record<Pool, bigint> = {
  foundation: 500n,
  pathway: 500n,
  proPath: 500n,
};

const formatBpsPercent = (bps: bigint) => {
  const whole = bps / 100n;
  const frac = bps % 100n;
  return frac === 0n ? `${whole}%` : `${whole}.${frac.toString().padStart(2, "0")}%`;
};

const formatCAD = (amount: bigint | undefined) => {
  if (!amount) return "$0.00";
  const num = parseFloat(formatUnits(amount, 18));
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};

const formatNumber = (amount: bigint | undefined) => {
  if (!amount) return "0";
  const num = parseFloat(formatUnits(amount, 18));
  return new Intl.NumberFormat("en-CA", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(num);
};

export function PurchaseVaultShares({ pool, minDeposit }: Props) {
  const [depositAmount, setDepositAmount] = useState("");
  const [sellShares, setSellShares] = useState("");

  const vaultAddress = CONTRACT_ADDRESSES[pool];
  const cadAddress = CONTRACT_ADDRESSES.cad;

  const { address } = useAccount();

  const apyBps = POOL_APY_BPS[pool];
  const apyLabel = formatBpsPercent(apyBps);

  const { writeContract, data: txHash } = useWriteContract();

  const { isLoading: isPending, isSuccess: isTxSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
    query: { enabled: !!txHash },
  });

  const { data: blockNumber } = useBlockNumber({ watch: true });

  const { data: cadBalance, refetch: refetchCadBalance } = useReadContract({
    address: cadAddress,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const { data: vaultShares, refetch: refetchVaultShares } = useReadContract({
    address: vaultAddress,
    abi: VAULT_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const { data: totalAssets, refetch: refetchTotalAssets } = useReadContract({
    address: vaultAddress,
    abi: VAULT_ABI,
    functionName: "totalAssets",
    query: { enabled: true },
  });

  const { data: totalSupply, refetch: refetchTotalSupply } = useReadContract({
    address: vaultAddress,
    abi: VAULT_ABI,
    functionName: "totalSupply",
    query: { enabled: true },
  });

  // Preview how much CAD a share redemption would return
  const { data: previewRedeemAmount } = useReadContract({
    address: vaultAddress,
    abi: VAULT_ABI,
    functionName: "previewRedeem",
    args: sellShares ? [parseUnits(sellShares, 18)] : undefined,
    query: { enabled: !!sellShares && parseFloat(sellShares) > 0 },
  });

  const refetchAll = () => {
    refetchCadBalance();
    refetchVaultShares();
    refetchTotalAssets();
    refetchTotalSupply();
  };

  useEffect(() => {
    if (!address) return;
    refetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockNumber, address]);

  useEffect(() => {
    if (!isTxSuccess) return;
    refetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTxSuccess]);

  // 1-year simple yield display
  const oneYearYield = totalAssets ? (totalAssets * apyBps) / 10_000n : 0n;

  const handleAction = (action: "approve" | "deposit" | "redeem") => {
    if (!address) return;

    switch (action) {
      case "approve":
        if (!depositAmount) return;
        writeContract({
          address: cadAddress as `0x${string}`,
          abi: ERC20_ABI,
          functionName: "approve",
          args: [vaultAddress as `0x${string}`, parseUnits(depositAmount, 18)],
        });
        break;

      case "deposit":
        if (!depositAmount) return;
        writeContract({
          address: vaultAddress as `0x${string}`,
          abi: VAULT_ABI,
          functionName: "deposit",
          args: [parseUnits(depositAmount, 18), address],
        });
        break;

      case "redeem":
        if (!sellShares) return;
        writeContract({
          address: vaultAddress as `0x${string}`,
          abi: VAULT_ABI,
          functionName: "redeem",
          args: [parseUnits(sellShares, 18), address, address],
        });
        break;
    }
  };

  return (
    <>
      <DemoControlPanel pool={pool} totalAssets={totalAssets} address={address} />

      <ConnectButton.Custom>
        {({ account, chain, openConnectModal, mounted }) => {
          const ready = mounted;
          const connected = ready && account && chain;

          if (!mounted) {
            return (
              <div className="flex justify-center items-center py-8">
                <span className="loading loading-spinner loading-md text-blue-500"></span>
              </div>
            );
          }

          return (
            <div className="space-y-4">
              {!connected ? (
                <div className="flex justify-center">
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="w-full rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md"
                  >
                    Purchase
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* WALLET + VAULT TILES */}
                  <div className="space-y-2">
                    {/* Wallet */}
                    <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-3 text-[11px]">
                      <p className="mb-2 font-semibold text-slate-200">Wallet</p>
                      <p className="text-slate-400">
                        CAD: <span className="text-slate-200">{formatCAD(cadBalance)}</span>
                      </p>
                      <p className="text-slate-400">
                        Pool Tokens: <span className="text-slate-200">{formatNumber(vaultShares)}</span>
                      </p>
                    </div>

                    {/* Vault */}
                    <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-3 text-[11px]">
                      <p className="mb-2 font-semibold text-slate-200">Vault</p>
                      <p className="text-slate-400">
                        Vault total (CAD): <span className="text-slate-200">{formatCAD(totalAssets)}</span>
                      </p>
                      <p className="text-slate-400">
                        Total Pool Tokens: <span className="text-slate-200">{formatNumber(totalSupply)}</span>
                      </p>
                      <p className="text-slate-400">
                        1Y yield @{apyLabel} (CAD): <span className="text-slate-200">{formatCAD(oneYearYield)}</span>
                      </p>
                    </div>
                  </div>

                  {/* ── BUY FLOW ── */}
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={e => setDepositAmount(e.target.value)}
                    placeholder={`Min: ${minDeposit} CAD`}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-200 placeholder:text-slate-500"
                  />

                  <button
                    onClick={() => handleAction("approve")}
                    disabled={isPending || !depositAmount}
                    className="w-full rounded-lg bg-amber-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-amber-700 disabled:opacity-50"
                  >
                    {isPending ? "Approving..." : "Approve CAD Spending"}
                  </button>

                  <button
                    onClick={() => handleAction("deposit")}
                    disabled={isPending || !depositAmount}
                    className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-emerald-700 disabled:opacity-50"
                  >
                    {isPending ? "Depositing..." : "Deposit into Vault"}
                  </button>

                  {/* ── SELL / INSTANT REDEEM ── */}
                  <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-3 space-y-2 text-[11px] text-slate-400">
                    <p className="font-semibold text-slate-200">Sell Shares</p>

                    <input
                      type="number"
                      value={sellShares}
                      onChange={e => setSellShares(e.target.value)}
                      placeholder="Shares to sell"
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-[11px] text-slate-200 placeholder:text-slate-500"
                    />

                    {/* Live CAD preview */}
                    {previewRedeemAmount !== undefined && sellShares && parseFloat(sellShares) > 0 && (
                      <div className="rounded-lg bg-slate-900/80 border border-slate-700 p-2 text-[10px]">
                        <p className="text-slate-400">
                          You will receive:{" "}
                          <span className="text-emerald-300 font-semibold">{formatCAD(previewRedeemAmount)}</span>
                        </p>
                      </div>
                    )}

                    <button
                      onClick={() => handleAction("redeem")}
                      disabled={isPending || !sellShares}
                      className="w-full rounded-lg bg-rose-600 px-3 py-1.5 text-[11px] font-medium text-white transition-colors hover:bg-rose-700 disabled:opacity-50"
                    >
                      {isPending ? "Redeeming..." : "Sell Shares for CAD"}
                    </button>

                    <p className="text-[10px] text-slate-500">
                      Shares redeemed instantly at current vault NAV. In production, withdrawals are gated by quarterly
                      repurchase windows.
                    </p>
                  </div>

                  {/* Account */}
                  <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-2 text-[11px] text-slate-400">
                    <p>Wallet: {account.displayName}</p>
                  </div>
                </div>
              )}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </>
  );
}
