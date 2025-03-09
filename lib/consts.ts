import {
  arbitrum,
  arbitrumSepolia,
  avalanche,
  avalancheFuji,
  base,
  baseSepolia,
  flowMainnet,
  flowTestnet,
  scroll,
  scrollSepolia,
  sonic,
  sonicBlazeTestnet,
} from "viem/chains";

export const BEAR_RED_HEX = "#E9171A";
export const BULL_GREEN_HEX = "#17E97D";

export type SupportedChains =
  | typeof avalancheFuji
  | typeof avalanche
  | typeof baseSepolia
  | typeof arbitrumSepolia
  | typeof flowTestnet
  | typeof base
  | typeof arbitrum
  | typeof flowMainnet
  | typeof scrollSepolia
  | typeof scroll
  | typeof sonicBlazeTestnet
  | typeof sonic;
