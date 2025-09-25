// DAO Smart Contract ABIs and Addresses
// In a real implementation, these would be deployed contracts

export const DAO_GOVERNANCE_ABI = [
  // Proposal Management
  'function createProposal(string memory title, string memory description, uint256 votingDuration) external returns (uint256)',
  'function vote(uint256 proposalId, bool support) external',
  'function executeProposal(uint256 proposalId) external',
  'function getProposal(uint256 proposalId) external view returns (tuple(uint256 id, string title, string description, uint256 forVotes, uint256 againstVotes, uint256 endTime, bool executed, bool passed, address proposer))',
  'function getProposalCount() external view returns (uint256)',
  
  // Member Management
  'function addMember(address member, uint256 votingPower) external',
  'function removeMember(address member) external',
  'function getMemberVotingPower(address member) external view returns (uint256)',
  'function isMember(address account) external view returns (bool)',
  'function getMemberCount() external view returns (uint256)',
  
  // Treasury Management
  'function deposit() external payable',
  'function withdraw(uint256 amount, address to) external',
  'function getBalance() external view returns (uint256)',
  
  // Events
  'event ProposalCreated(uint256 indexed proposalId, address indexed proposer, string title)',
  'event VoteCast(uint256 indexed proposalId, address indexed voter, bool support, uint256 weight)',
  'event ProposalExecuted(uint256 indexed proposalId)',
  'event MemberAdded(address indexed member, uint256 votingPower)',
  'event MemberRemoved(address indexed member)',
  'event Deposit(address indexed from, uint256 amount)',
  'event Withdrawal(address indexed to, uint256 amount)'
] as const;

export const DAO_TOKEN_ABI = [
  // Standard ERC20 functions
  'function name() external view returns (string)',
  'function symbol() external view returns (string)',
  'function decimals() external view returns (uint8)',
  'function totalSupply() external view returns (uint256)',
  'function balanceOf(address account) external view returns (uint256)',
  'function transfer(address to, uint256 amount) external returns (bool)',
  'function allowance(address owner, address spender) external view returns (uint256)',
  'function approve(address spender, uint256 amount) external returns (bool)',
  'function transferFrom(address from, address to, uint256 amount) external returns (bool)',
  
  // Governance-specific functions
  'function delegates(address account) external view returns (address)',
  'function delegate(address delegatee) external',
  'function delegateBySig(address delegatee, uint256 nonce, uint256 expiry, uint8 v, bytes32 r, bytes32 s) external',
  'function getCurrentVotes(address account) external view returns (uint256)',
  'function getPriorVotes(address account, uint256 blockNumber) external view returns (uint256)',
  
  // Events
  'event Transfer(address indexed from, address indexed to, uint256 value)',
  'event Approval(address indexed owner, address indexed spender, uint256 value)',
  'event DelegateChanged(address indexed delegator, address indexed fromDelegate, address indexed toDelegate)',
  'event DelegateVotesChanged(address indexed delegate, uint256 previousBalance, uint256 newBalance)'
] as const;

// Contract addresses (these would be real deployed addresses)
export const CONTRACTS = {
  DAO_GOVERNANCE: {
    [mainnet.id]: '0x0000000000000000000000000000000000000000', // Replace with actual mainnet address
    [sepolia.id]: '0x0000000000000000000000000000000000000000', // Replace with actual testnet address
    [hardhat.id]: '0x5FbDB2315678afecb367f032d93F642f64180aa3' // Local development address
  },
  DAO_TOKEN: {
    [mainnet.id]: '0x0000000000000000000000000000000000000000', // Replace with actual mainnet address
    [sepolia.id]: '0x0000000000000000000000000000000000000000', // Replace with actual testnet address
    [hardhat.id]: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512' // Local development address
  }
} as const;

// Import chain IDs
import { mainnet, sepolia, hardhat } from 'viem/chains';

// Helper function to get contract address for current chain
export const getContractAddress = (contractName: keyof typeof CONTRACTS, chainId: number): string => {
  const contract = CONTRACTS[contractName];
  const address = contract[chainId as keyof typeof contract];
  
  if (!address || address === '0x0000000000000000000000000000000000000000') {
    throw new Error(`Contract ${contractName} not deployed on chain ${chainId}`);
  }
  
  return address;
};

// Type definitions
export interface Proposal {
  id: bigint;
  title: string;
  description: string;
  forVotes: bigint;
  againstVotes: bigint;
  endTime: bigint;
  executed: boolean;
  passed: boolean;
  proposer: string;
}

export interface Member {
  address: string;
  votingPower: bigint;
  hasVoted: boolean;
}

export interface TreasuryTransaction {
  id: string;
  type: 'deposit' | 'withdrawal';
  amount: bigint;
  from: string;
  to: string;
  timestamp: bigint;
  txHash: string;
}