'use client';

import { createConfig, http } from 'wagmi';
import { mainnet, sepolia, hardhat } from 'viem/chains';
import { injected, walletConnect, coinbaseWallet } from 'wagmi/connectors';

// Get the WalletConnect project ID from environment (we'll add this later)
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'your-project-id';

export const config = createConfig({
  chains: [mainnet, sepolia, hardhat],
  connectors: [
    injected(),
    walletConnect({ 
      projectId,
      metadata: {
        name: 'DAO Governance Platform',
        description: 'Decentralized Autonomous Organization Governance Platform',
        url: 'https://dao-governance.example.com',
        icons: ['https://avatars.githubusercontent.com/u/37784886']
      }
    }),
    coinbaseWallet({ 
      appName: 'DAO Governance Platform',
      appLogoUrl: 'https://avatars.githubusercontent.com/u/37784886'
    })
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [hardhat.id]: http('http://127.0.0.1:8545')
  }
});

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}