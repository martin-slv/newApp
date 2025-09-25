'use client';

import { Card, Group, Badge, Title, Text, Stack, Progress, ActionIcon, Menu, Button, Modal, Textarea, Select } from '@mantine/core';
import { IconDots, IconEye, IconShare, IconEdit, IconCheck, IconX, IconClock, IconUsers } from '@tabler/icons-react';
import { useAccount } from 'wagmi';
import { useDAOContract } from '@/hooks/useDAOContract';
import { showNotification } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';
import { useState, useEffect } from 'react';
import type { Proposal } from '@/lib/contracts';

interface ProposalCardProps {
  proposalId: bigint;
}

export function ProposalCard({ proposalId }: ProposalCardProps) {
  const { address } = useAccount();
  const { useProposal, useVote } = useDAOContract();
  const [opened, { open, close }] = useDisclosure(false);
  const [voteReason, setVoteReason] = useState('');

  // Fetch proposal data
  const { data: proposalData, isLoading, error, refetch } = useProposal(proposalId);
  const { vote, isPending: isVoting, isSuccess, error: voteError } = useVote();

  const proposal = proposalData as any;

  useEffect(() => {
    if (isSuccess) {
      showNotification({
        title: 'Vote Submitted',
        message: 'Your vote has been recorded on the blockchain',
        color: 'green',
      });
      refetch(); // Refresh proposal data
      close();
      setVoteReason('');
    }
  }, [isSuccess, refetch, close]);

  useEffect(() => {
    if (voteError) {
      showNotification({
        title: 'Vote Failed',
        message: voteError.message,
        color: 'red',
      });
    }
  }, [voteError]);

  const handleVote = (support: boolean) => {
    if (!address) {
      showNotification({
        title: 'Wallet Required',
        message: 'Please connect your wallet to vote',
        color: 'yellow',
      });
      return;
    }

    vote(proposalId, support);
  };

  const getStatusColor = (proposal: any) => {
    if (!proposal) return 'gray';
    const now = Date.now() / 1000;
    const endTime = Number(proposal.endTime);
    
    if (proposal.executed) {
      return proposal.passed ? 'green' : 'red';
    } else if (endTime < now) {
      return 'orange';
    } else {
      return 'blue';
    }
  };

  const getStatusText = (proposal: any) => {
    if (!proposal) return 'Loading...';
    const now = Date.now() / 1000;
    const endTime = Number(proposal.endTime);
    
    if (proposal.executed) {
      return proposal.passed ? 'Executed' : 'Failed';
    } else if (endTime < now) {
      return 'Ended';
    } else {
      return 'Active';
    }
  };

  const calculateProgress = (proposal: any) => {
    if (!proposal) return 0;
    const totalVotes = Number(proposal.forVotes) + Number(proposal.againstVotes);
    if (totalVotes === 0) return 0;
    return (Number(proposal.forVotes) / totalVotes) * 100;
  };

  const formatTimeRemaining = (proposal: any) => {
    if (!proposal) return '';
    const now = Date.now() / 1000;
    const endTime = Number(proposal.endTime);
    const timeLeft = endTime - now;
    
    if (timeLeft <= 0) return 'Voting ended';
    
    const days = Math.floor(timeLeft / 86400);
    const hours = Math.floor((timeLeft % 86400) / 3600);
    
    if (days > 0) return `${days}d ${hours}h remaining`;
    if (hours > 0) return `${hours}h remaining`;
    return 'Less than 1h remaining';
  };

  if (isLoading) {
    return (
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="sm">
          <div style={{ height: 20, background: '#f1f3f5', borderRadius: 4 }} />
          <div style={{ height: 40, background: '#f1f3f5', borderRadius: 4 }} />
          <div style={{ height: 16, background: '#f1f3f5', borderRadius: 4 }} />
        </Stack>
      </Card>
    );
  }

  if (error || !proposal) {
    return (
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text c="red">Error loading proposal</Text>
      </Card>
    );
  }

  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group justify="space-between" mb="xs">
          <Badge color={getStatusColor(proposal)} variant="light">
            {getStatusText(proposal)}
          </Badge>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <ActionIcon variant="subtle">
                <IconDots size={16} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item leftSection={<IconEye size={14} />}>
                View Details
              </Menu.Item>
              <Menu.Item leftSection={<IconShare size={14} />}>
                Share Proposal
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item leftSection={<IconEdit size={14} />} disabled>
                Edit Proposal
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
        
        <Title order={4} mb="md" lineClamp={2}>
          {proposal.title}
        </Title>
        
        <Text size="sm" c="dimmed" mb="md" lineClamp={3}>
          {proposal.description}
        </Text>
        
        <Stack gap="sm">
          <Group justify="space-between">
            <Group gap="xs">
              <IconUsers size={16} />
              <Text size="sm" c="dimmed">Total Votes</Text>
            </Group>
            <Text fw={500}>
              {(Number(proposal.forVotes) + Number(proposal.againstVotes)).toLocaleString()}
            </Text>
          </Group>
          
          <div>
            <Group justify="space-between" mb="xs">
              <Text size="sm" c="green">For: {Number(proposal.forVotes).toLocaleString()}</Text>
              <Text size="sm" c="red">Against: {Number(proposal.againstVotes).toLocaleString()}</Text>
            </Group>
            <Progress value={calculateProgress(proposal)} size="sm" />
          </div>
          
          <Group justify="space-between" align="center">
            <Group gap="xs">
              <IconClock size={16} />
              <Text size="sm" c="dimmed">
                {formatTimeRemaining(proposal)}
              </Text>
            </Group>
            
            {!proposal.executed && Number(proposal.endTime) > Date.now() / 1000 && (
              <Group gap="xs">
                <Button
                  size="xs"
                  color="green"
                  variant="light"
                  leftSection={<IconCheck size={14} />}
                  onClick={() => handleVote(true)}
                  loading={isVoting}
                  disabled={!address}
                >
                  For
                </Button>
                <Button
                  size="xs"
                  color="red"
                  variant="light"
                  leftSection={<IconX size={14} />}
                  onClick={() => handleVote(false)}
                  loading={isVoting}
                  disabled={!address}
                >
                  Against
                </Button>
              </Group>
            )}
          </Group>
        </Stack>
      </Card>

      <Modal opened={opened} onClose={close} title="Vote on Proposal" size="md">
        <Stack>
          <Text size="sm" c="dimmed">
            Provide a reason for your vote (optional):
          </Text>
          
          <Textarea
            placeholder="Explain your voting decision..."
            value={voteReason}
            onChange={(event) => setVoteReason(event.currentTarget.value)}
            autosize
            minRows={3}
          />
          
          <Group justify="flex-end" mt="md">
            <Button variant="outline" onClick={close}>
              Cancel
            </Button>
            <Button
              color="green"
              onClick={() => handleVote(true)}
              loading={isVoting}
            >
              Vote For
            </Button>
            <Button
              color="red"
              onClick={() => handleVote(false)}
              loading={isVoting}
            >
              Vote Against
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}