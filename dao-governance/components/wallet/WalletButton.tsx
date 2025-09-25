'use client';

import { Button, Menu, Text, Group, Badge, ActionIcon, CopyButton, Tooltip } from '@mantine/core';
import { useAccount, useConnect, useDisconnect, useEnsName, useBalance } from 'wagmi';
import { IconWallet, IconLogout, IconCopy, IconCheck, IconChevronDown } from '@tabler/icons-react';
import { showNotification } from '@mantine/notifications';

export function WalletButton() {
  const { address, isConnected, chainId } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { data: balance } = useBalance({ address });
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  const handleConnect = (connector: any) => {
    connect({ connector }, {
      onSuccess: () => {
        showNotification({
          title: 'Wallet Connected',
          message: 'Successfully connected to your wallet',
          color: 'green',
        });
      },
      onError: (error) => {
        showNotification({
          title: 'Connection Failed',
          message: error.message,
          color: 'red',
        });
      },
    });
  };

  const handleDisconnect = () => {
    disconnect();
    showNotification({
      title: 'Wallet Disconnected',
      message: 'Your wallet has been disconnected',
      color: 'blue',
    });
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const formatBalance = (balance: any) => {
    if (!balance) return '0';
    const formatted = parseFloat(balance.formatted).toFixed(4);
    return `${formatted} ${balance.symbol}`;
  };

  const getChainName = (chainId: number) => {
    switch (chainId) {
      case 1: return 'Ethereum';
      case 11155111: return 'Sepolia';
      case 31337: return 'Hardhat';
      default: return 'Unknown';
    }
  };

  if (isConnected && address) {
    return (
      <Menu shadow="md" width={300}>
        <Menu.Target>
          <Button
            variant="light"
            leftSection={<IconWallet size={16} />}
            rightSection={<IconChevronDown size={14} />}
            loading={isPending}
          >
            <Group gap="xs">
              <Text size="sm" fw={500}>
                {ensName || formatAddress(address)}
              </Text>
              {chainId && (
                <Badge size="xs" color="blue">
                  {getChainName(chainId)}
                </Badge>
              )}
            </Group>
          </Button>
        </Menu.Target>
        
        <Menu.Dropdown>
          <Menu.Label>Wallet Info</Menu.Label>
          
          <Menu.Item>
            <Group justify="space-between">
              <Text size="sm" c="dimmed">Address</Text>
              <Group gap="xs">
                <Text size="sm" ff="mono">
                  {formatAddress(address)}
                </Text>
                <CopyButton value={address} timeout={2000}>
                  {({ copied, copy }) => (
                    <Tooltip label={copied ? 'Copied' : 'Copy address'}>
                      <ActionIcon
                        color={copied ? 'teal' : 'gray'}
                        variant="subtle"
                        size="xs"
                        onClick={copy}
                      >
                        {copied ? <IconCheck size={12} /> : <IconCopy size={12} />}
                      </ActionIcon>
                    </Tooltip>
                  )}
                </CopyButton>
              </Group>
            </Group>
          </Menu.Item>

          <Menu.Item>
            <Group justify="space-between">
              <Text size="sm" c="dimmed">Balance</Text>
              <Text size="sm" fw={500}>
                {formatBalance(balance)}
              </Text>
            </Group>
          </Menu.Item>

          <Menu.Item>
            <Group justify="space-between">
              <Text size="sm" c="dimmed">Network</Text>
              <Badge size="sm" color="blue">
                {chainId ? getChainName(chainId) : 'Unknown'}
              </Badge>
            </Group>
          </Menu.Item>

          <Menu.Divider />

          <Menu.Item
            leftSection={<IconLogout size={16} />}
            color="red"
            onClick={handleDisconnect}
          >
            Disconnect Wallet
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    );
  }

  return (
    <Menu shadow="md" width={250}>
      <Menu.Target>
        <Button
          leftSection={<IconWallet size={16} />}
          loading={isPending}
          variant="gradient"
          gradient={{ from: 'blue', to: 'cyan' }}
        >
          Connect Wallet
        </Button>
      </Menu.Target>
      
      <Menu.Dropdown>
        <Menu.Label>Choose Wallet</Menu.Label>
        {connectors.map((connector) => (
          <Menu.Item
            key={connector.uid}
            onClick={() => handleConnect(connector)}
            disabled={isPending}
          >
            <Group>
              <Text size="sm">{connector.name}</Text>
            </Group>
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}