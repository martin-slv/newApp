'use client';

import { useReadContract, useWriteContract, useSimulateContract, useWaitForTransactionReceipt } from 'wagmi';
import { useChainId } from 'wagmi';
import { DAO_GOVERNANCE_ABI, getContractAddress, type Proposal } from '@/lib/contracts';
import { useState, useEffect } from 'react';

export function useDAOContract() {
  const chainId = useChainId();
  const contractAddress = getContractAddress('DAO_GOVERNANCE', chainId);

  // Contract read hooks
  const useProposalCount = () => {
    return useReadContract({
      address: contractAddress as `0x${string}`,
      abi: DAO_GOVERNANCE_ABI,
      functionName: 'getProposalCount',
    });
  };

  const useProposal = (proposalId: bigint) => {
    return useReadContract({
      address: contractAddress as `0x${string}`,
      abi: DAO_GOVERNANCE_ABI,
      functionName: 'getProposal',
      args: [proposalId],
    });
  };

  const useTreasuryBalance = () => {
    return useReadContract({
      address: contractAddress as `0x${string}`,
      abi: DAO_GOVERNANCE_ABI,
      functionName: 'getBalance',
    });
  };

  const useMemberVotingPower = (memberAddress: `0x${string}`) => {
    return useReadContract({
      address: contractAddress as `0x${string}`,
      abi: DAO_GOVERNANCE_ABI,
      functionName: 'getMemberVotingPower',
      args: [memberAddress],
    });
  };

  const useIsMember = (memberAddress: `0x${string}`) => {
    return useReadContract({
      address: contractAddress as `0x${string}`,
      abi: DAO_GOVERNANCE_ABI,
      functionName: 'isMember',
      args: [memberAddress],
    });
  };

  // Contract write hooks
  const useCreateProposal = () => {
    const { data: simulateData } = useSimulateContract({
      address: contractAddress as `0x${string}`,
      abi: DAO_GOVERNANCE_ABI,
      functionName: 'createProposal',
    });

    const { writeContract, data: hash, isPending, error } = useWriteContract();

    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
      hash,
    });

    const createProposal = (title: string, description: string, votingDuration: bigint) => {
      writeContract({
        address: contractAddress as `0x${string}`,
        abi: DAO_GOVERNANCE_ABI,
        functionName: 'createProposal',
        args: [title, description, votingDuration],
      });
    };

    return {
      createProposal,
      isPending,
      isConfirming,
      isSuccess,
      error,
      hash,
    };
  };

  const useVote = () => {
    const { writeContract, data: hash, isPending, error } = useWriteContract();

    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
      hash,
    });

    const vote = (proposalId: bigint, support: boolean) => {
      writeContract({
        address: contractAddress as `0x${string}`,
        abi: DAO_GOVERNANCE_ABI,
        functionName: 'vote',
        args: [proposalId, support],
      });
    };

    return {
      vote,
      isPending,
      isConfirming,
      isSuccess,
      error,
      hash,
    };
  };

  const useExecuteProposal = () => {
    const { writeContract, data: hash, isPending, error } = useWriteContract();

    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
      hash,
    });

    const executeProposal = (proposalId: bigint) => {
      writeContract({
        address: contractAddress as `0x${string}`,
        abi: DAO_GOVERNANCE_ABI,
        functionName: 'executeProposal',
        args: [proposalId],
      });
    };

    return {
      executeProposal,
      isPending,
      isConfirming,
      isSuccess,
      error,
      hash,
    };
  };

  return {
    contractAddress,
    // Read functions
    useProposalCount,
    useProposal,
    useTreasuryBalance,
    useMemberVotingPower,
    useIsMember,
    // Write functions
    useCreateProposal,
    useVote,
    useExecuteProposal,
  };
}