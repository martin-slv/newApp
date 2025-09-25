'use client';

import { Modal, Stack, TextInput, Select, Textarea, NumberInput, Group, Button, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAccount } from 'wagmi';
import { useDAOContract } from '@/hooks/useDAOContract';
import { showNotification } from '@mantine/notifications';
import { useEffect } from 'react';

interface CreateProposalFormProps {
  opened: boolean;
  onClose: () => void;
}

export function CreateProposalForm({ opened, onClose }: CreateProposalFormProps) {
  const { address } = useAccount();
  const { useCreateProposal } = useDAOContract();
  const { createProposal, isPending, isConfirming, isSuccess, error } = useCreateProposal();

  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      category: '',
      votingDuration: 7, // days
    },
    validate: {
      title: (value) => (value.length < 3 ? 'Title must be at least 3 characters' : null),
      description: (value) => (value.length < 10 ? 'Description must be at least 10 characters' : null),
      category: (value) => (!value ? 'Please select a category' : null),
      votingDuration: (value) => (value < 1 || value > 30 ? 'Voting duration must be between 1 and 30 days' : null),
    },
  });

  useEffect(() => {
    if (isSuccess) {
      showNotification({
        title: 'Proposal Created',
        message: 'Your proposal has been submitted to the blockchain',
        color: 'green',
      });
      form.reset();
      onClose();
    }
  }, [isSuccess, form, onClose]);

  useEffect(() => {
    if (error) {
      showNotification({
        title: 'Failed to Create Proposal',
        message: error.message,
        color: 'red',
      });
    }
  }, [error]);

  const handleSubmit = (values: typeof form.values) => {
    if (!address) {
      showNotification({
        title: 'Wallet Required',
        message: 'Please connect your wallet to create a proposal',
        color: 'yellow',
      });
      return;
    }

    // Convert days to seconds for voting duration
    const votingDurationSeconds = BigInt(values.votingDuration * 24 * 60 * 60);
    createProposal(values.title, values.description, votingDurationSeconds);
  };

  return (
    <Modal 
      opened={opened} 
      onClose={onClose} 
      title="Create New Proposal" 
      size="lg"
      closeOnClickOutside={!isPending && !isConfirming}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            label="Proposal Title"
            placeholder="Enter a descriptive title for your proposal"
            required
            {...form.getInputProps('title')}
          />
          
          <Select
            label="Category"
            placeholder="Select proposal category"
            data={[
              { value: 'governance', label: 'Governance' },
              { value: 'treasury', label: 'Treasury' },
              { value: 'technical', label: 'Technical' },
              { value: 'community', label: 'Community' },
              { value: 'strategic', label: 'Strategic' },
            ]}
            required
            {...form.getInputProps('category')}
          />
          
          <Textarea
            label="Proposal Description"
            placeholder="Provide a detailed description of your proposal, including rationale and implementation details"
            autosize
            minRows={4}
            required
            {...form.getInputProps('description')}
          />
          
          <NumberInput
            label="Voting Period (Days)"
            placeholder="7"
            min={1}
            max={30}
            description="How long should the voting period last?"
            {...form.getInputProps('votingDuration')}
          />
          
          {!address && (
            <Text size="sm" c="red">
              Please connect your wallet to create a proposal
            </Text>
          )}
          
          <Group justify="flex-end" mt="xl">
            <Button 
              variant="subtle" 
              onClick={onClose}
              disabled={isPending || isConfirming}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              loading={isPending || isConfirming}
              disabled={!address}
            >
              {isConfirming ? 'Confirming...' : 'Create Proposal'}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}