export type PoolKey = "foundation" | "pathway" | "proPath";

export const POOL_CONFIG: Record<PoolKey, { label: string; oneYearApy: number; minDeposit: number }> = {
  foundation: { label: "Foundation Pool", oneYearApy: 0.06, minDeposit: 500 },
  pathway: { label: "Pathway Pool", oneYearApy: 0.08, minDeposit: 1500 },
  proPath: { label: "Pro Path Pool", oneYearApy: 0.1, minDeposit: 5000 },
};
