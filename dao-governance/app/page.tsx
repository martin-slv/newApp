'use client';

import {
  AppShell,
  Container,
  Title,
  Text,
  Button,
  Group,
  Stack,
  Card,
  Badge,
  Grid,
  Progress,
  Avatar,
  ActionIcon,
  Menu,
  Tabs,
  Table,
  TextInput,
  Select,
  NumberInput,
  Textarea,
  Checkbox,
  Switch,
  Radio,
  Slider,
  ColorInput,
  FileInput,
  Pagination,
  Alert,
  Notification,
  Modal,
  Drawer,
  Tooltip,
  Popover,
  HoverCard,
  Breadcrumbs,
  Stepper,
  Timeline,
  Affix,
  BackgroundImage,
  Paper,
  ThemeIcon,
  Anchor,
  Center,
  Divider,
  Space,
  Flex,
  Box,
  Loader,
  RingProgress,
  Skeleton,
  ScrollArea,
  Rating,
  SegmentedControl,
  JsonInput,
  PinInput,
  rem,
} from '@mantine/core';
import { useDisclosure, useLocalStorage } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { modals } from '@mantine/modals';
import { DatePicker, DateValue, TimeInput } from '@mantine/dates';
import { WalletButton } from '@/components/wallet/WalletButton';
import { ProposalCard } from '@/components/dao/ProposalCard';
import { CreateProposalForm } from '@/components/dao/CreateProposalForm';
import { useAccount } from 'wagmi';
import { useDAOContract } from '@/hooks/useDAOContract';
import {
  IconBell,
  IconHome,
  IconUsers,
  IconUserCheck,
  IconTrendingUp,
  IconSettings,
  IconSearch,
  IconPlus,
  IconUser,
  IconLogout,
  IconHeart,
  IconStar,
  IconEye,
  IconMessage,
  IconShare,
  IconDownload,
  IconEdit,
  IconTrash,
  IconCheck,
  IconX,
  IconAlertCircle,
  IconInfoCircle,
  IconExternalLink,
  IconChevronDown,
  IconDots,
  IconCalendar,
  IconClock,
  IconMapPin,
  IconPhone,
  IconMail,
  IconWorld
} from '@tabler/icons-react';
import { useState } from 'react';

export default function HomePage() {
  const [opened, { open, close }] = useDisclosure(false);
  const [drawerOpened, { open: openDrawer, close: closeDrawer }] = useDisclosure(false);
  const [createProposalOpened, { open: openCreateProposal, close: closeCreateProposal }] = useDisclosure(false);
  const [activeTab, setActiveTab] = useState<string | null>('governance');
  const [selectedDate, setSelectedDate] = useState<DateValue>(null);
  const [sliderValue, setSliderValue] = useState(50);
  const [rating, setRating] = useState(0);
  const [segmentedValue, setSegmentedValue] = useState('proposals');
  
  // Blockchain integration
  const { address, isConnected } = useAccount();
  const { useProposalCount, useTreasuryBalance } = useDAOContract();
  const { data: proposalCount } = useProposalCount();
  const { data: treasuryBalance } = useTreasuryBalance();

  // Sample data for DAO governance
  const proposals = [
    { id: 1, title: 'Increase Treasury Allocation for Marketing', status: 'Active', votes: 1250, endDate: '2024-01-15' },
    { id: 2, title: 'Implement New Governance Token Distribution', status: 'Passed', votes: 890, endDate: '2024-01-10' },
    { id: 3, title: 'Community Development Fund Proposal', status: 'Failed', votes: 450, endDate: '2024-01-08' },
  ];

  const members = [
    { name: 'Alice Johnson', role: 'Lead Contributor', votingPower: 1250, joined: '2023-06-15' },
    { name: 'Bob Smith', role: 'Core Contributor', votingPower: 890, joined: '2023-07-22' },
    { name: 'Carol Davis', role: 'Community Member', votingPower: 450, joined: '2023-08-10' },
  ];

  const openConfirmModal = () => modals.openConfirmModal({
    title: 'Confirm Your Vote',
    children: (
      <Text size="sm">
        Are you sure you want to vote "Yes" on this proposal? This action cannot be undone.
      </Text>
    ),
    labels: { confirm: 'Vote Yes', cancel: 'Cancel' },
    onConfirm: () => showNotification({
      title: 'Vote Submitted',
      message: 'Your vote has been recorded on the blockchain.',
      color: 'green',
    }),
  });

  return (
    <AppShell
      header={{ height: 70 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <ThemeIcon size="lg" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
              <IconUserCheck style={{ width: rem(18), height: rem(18) }} />
            </ThemeIcon>
            <Title order={3}>DAO Governance Platform</Title>
          </Group>
          
          <Group>
            <ActionIcon
              onClick={() => showNotification({
                title: 'Search',
                message: 'Search functionality activated!',
                color: 'blue',
              })}
              variant="subtle"
              size="lg"
            >
              <IconSearch style={{ width: rem(18), height: rem(18) }} />
            </ActionIcon>
            
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <ActionIcon variant="subtle" size="lg">
                  <IconBell style={{ width: rem(18), height: rem(18) }} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item leftSection={<IconInfoCircle style={{ width: rem(14), height: rem(14) }} />}>
                  New proposal created
                </Menu.Item>
                <Menu.Item leftSection={<IconUserCheck style={{ width: rem(14), height: rem(14) }} />}>
                  Voting period ending soon
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
                  Notification settings
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>

            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Group gap={7}>
                  <Avatar src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80" size="sm" radius="xl" />
                  <Text size="sm" fw={500}>
                    John Doe
                  </Text>
                  <IconChevronDown style={{ width: rem(12), height: rem(12) }} />
                </Group>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item leftSection={<IconUser style={{ width: rem(14), height: rem(14) }} />}>
                  Profile
                </Menu.Item>
                <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
                  Settings
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item 
                  color="red" 
                  leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Stack>
          <Button
            leftSection={<IconHome size={16} />}
            variant="light"
            justify="start"
          >
            Dashboard
          </Button>
          <Button
            leftSection={<IconUserCheck size={16} />}
            variant="subtle"
            justify="start"
          >
            Proposals
          </Button>
          <Button
            leftSection={<IconUsers size={16} />}
            variant="subtle"
            justify="start"
          >
            Members
          </Button>
          <Button
            leftSection={<IconTrendingUp size={16} />}
            variant="subtle"
            justify="start"
          >
            Analytics
          </Button>
          
          <Divider my="sm" />
          
          <Title order={6} c="dimmed" mb="xs">DAO Treasury</Title>
          <Paper p="md" withBorder>
            <Stack gap="xs">
              <Group justify="space-between">
                <Text size="sm">Total Value</Text>
                <Text fw={700}>$2.4M</Text>
              </Group>
              <Progress value={75} size="sm" />
              <Text size="xs" c="dimmed">75% allocated</Text>
            </Stack>
          </Paper>

          <Title order={6} c="dimmed" mb="xs">Quick Actions</Title>
          <Stack gap="xs">
            <Button
              leftSection={<IconPlus size={16} />}
              variant="outline"
              size="sm"
              onClick={open}
            >
              Create Proposal
            </Button>
            <Button
              leftSection={<IconUsers size={16} />}
              variant="outline"
              size="sm"
              onClick={openDrawer}
            >
              Invite Members
            </Button>
          </Stack>
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>
        <Container size="xl">
          <Stack>
            {/* Header Section */}
            <Group justify="space-between" align="flex-start">
              <Stack gap="xs">
                <Title order={1}>DAO Governance Dashboard</Title>
                <Text c="dimmed" size="lg">
                  Welcome to the comprehensive Mantine UI component showcase for DAO governance
                </Text>
                <Breadcrumbs>
                  <Anchor href="#" size="sm">Home</Anchor>
                  <Anchor href="#" size="sm">Dashboard</Anchor>
                  <Text size="sm">Overview</Text>
                </Breadcrumbs>
              </Stack>

              <Group>
                <Badge size="lg" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
                  Active: 15 Proposals
                </Badge>
                <Button
                  leftSection={<IconPlus size={16} />}
                  gradient={{ from: 'blue', to: 'cyan' }}
                  variant="gradient"
                  onClick={openConfirmModal}
                >
                  New Proposal
                </Button>
              </Group>
            </Group>

            {/* Alert Section */}
            <Alert
              icon={<IconInfoCircle />}
              title="Important Governance Update"
              color="blue"
              variant="light"
            >
              The voting period for "Treasury Allocation Update" ends in 2 days. Make sure to cast your vote!
            </Alert>

            {/* Tabs Navigation */}
            <Tabs value={activeTab} onChange={setActiveTab}>
              <Tabs.List>
                <Tabs.Tab value="governance" leftSection={<IconUserCheck size={16} />}>
                  Governance
                </Tabs.Tab>
                <Tabs.Tab value="analytics" leftSection={<IconTrendingUp size={16} />}>
                  Analytics
                </Tabs.Tab>
                <Tabs.Tab value="members" leftSection={<IconUsers size={16} />}>
                  Members
                </Tabs.Tab>
                <Tabs.Tab value="treasury" leftSection={<IconWorld size={16} />}>
                  Treasury
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="governance">
                <Stack mt="lg">
                  {/* Segmented Control */}
                  <SegmentedControl
                    value={segmentedValue}
                    onChange={setSegmentedValue}
                    data={[
                      { label: 'Active Proposals', value: 'proposals' },
                      { label: 'Voting History', value: 'history' },
                      { label: 'Drafts', value: 'drafts' },
                    ]}
                  />

                  {/* Proposals Grid */}
                  <Grid>
                    {proposals.map((proposal) => (
                      <Grid.Col span={{ base: 12, md: 6, lg: 4 }} key={proposal.id}>
                        <Card shadow="sm" padding="lg" radius="md" withBorder>
                          <Group justify="space-between" mb="xs">
                            <Badge 
                              color={proposal.status === 'Active' ? 'blue' : proposal.status === 'Passed' ? 'green' : 'red'}
                              variant="light"
                            >
                              {proposal.status}
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
                                  Share
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item leftSection={<IconEdit size={14} />} disabled={proposal.status !== 'Active'}>
                                  Edit
                                </Menu.Item>
                              </Menu.Dropdown>
                            </Menu>
                          </Group>
                          
                          <Title order={4} mb="md" lineClamp={2}>
                            {proposal.title}
                          </Title>
                          
                          <Stack gap="sm">
                            <Group justify="space-between">
                              <Text size="sm" c="dimmed">Total Votes</Text>
                              <Text fw={500}>{proposal.votes.toLocaleString()}</Text>
                            </Group>
                            
                            <Progress value={65} size="sm" />
                            
                            <Group justify="space-between">
                              <Text size="sm" c="dimmed">Ends: {proposal.endDate}</Text>
                              <Group gap="xs">
                                <ActionIcon variant="subtle" color="green">
                                  <IconCheck size={16} />
                                </ActionIcon>
                                <ActionIcon variant="subtle" color="red">
                                  <IconX size={16} />
                                </ActionIcon>
                              </Group>
                            </Group>
                          </Stack>
                        </Card>
                      </Grid.Col>
                    ))}
                  </Grid>

                  {/* Stepper */}
                  <Paper p="xl" withBorder radius="md">
                    <Title order={3} mb="lg">Proposal Creation Process</Title>
                    <Stepper active={1}>
                      <Stepper.Step 
                        label="Draft" 
                        description="Create your proposal"
                        icon={<IconEdit size={16} />}
                      >
                        Write and format your proposal content
                      </Stepper.Step>
                      <Stepper.Step 
                        label="Review" 
                        description="Community feedback"
                        icon={<IconUsers size={16} />}
                      >
                        Get feedback from community members
                      </Stepper.Step>
                      <Stepper.Step 
                        label="Vote" 
                        description="Active voting period"
                        icon={<IconUserCheck size={16} />}
                      >
                        Community votes on the proposal
                      </Stepper.Step>
                      <Stepper.Step 
                        label="Execute" 
                        description="Implement results"
                        icon={<IconCheck size={16} />}
                      >
                        Execute the approved proposal
                      </Stepper.Step>
                    </Stepper>
                  </Paper>
                </Stack>
              </Tabs.Panel>

              <Tabs.Panel value="analytics">
                <Stack mt="lg">
                  <Grid>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <Paper p="xl" withBorder radius="md">
                        <Title order={4} mb="lg">Voting Participation</Title>
                        <Center>
                          <RingProgress
                            size={200}
                            thickness={20}
                            sections={[
                              { value: 40, color: 'blue', tooltip: 'Active voters - 40%' },
                              { value: 25, color: 'cyan', tooltip: 'Occasional voters - 25%' },
                              { value: 35, color: 'gray', tooltip: 'Non-voters - 35%' },
                            ]}
                            label={
                              <Text c="blue" fw={700} ta="center" size="xl">
                                65%
                              </Text>
                            }
                          />
                        </Center>
                        <Stack mt="md" gap="xs">
                          <Group justify="space-between">
                            <Group gap="xs">
                              <div style={{ width: 12, height: 12, backgroundColor: '#228be6', borderRadius: 2 }} />
                              <Text size="sm">Active Voters</Text>
                            </Group>
                            <Text size="sm" fw={500}>40%</Text>
                          </Group>
                          <Group justify="space-between">
                            <Group gap="xs">
                              <div style={{ width: 12, height: 12, backgroundColor: '#15aabf', borderRadius: 2 }} />
                              <Text size="sm">Occasional Voters</Text>
                            </Group>
                            <Text size="sm" fw={500}>25%</Text>
                          </Group>
                          <Group justify="space-between">
                            <Group gap="xs">
                              <div style={{ width: 12, height: 12, backgroundColor: '#adb5bd', borderRadius: 2 }} />
                              <Text size="sm">Non-Voters</Text>
                            </Group>
                            <Text size="sm" fw={500}>35%</Text>
                          </Group>
                        </Stack>
                      </Paper>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <Paper p="xl" withBorder radius="md">
                        <Title order={4} mb="lg">Treasury Allocation</Title>
                        <Stack gap="lg">
                          <div>
                            <Group justify="space-between" mb="xs">
                              <Text size="sm">Development</Text>
                              <Text size="sm" fw={500}>45%</Text>
                            </Group>
                            <Progress value={45} color="blue" size="lg" />
                          </div>
                          <div>
                            <Group justify="space-between" mb="xs">
                              <Text size="sm">Marketing</Text>
                              <Text size="sm" fw={500}>25%</Text>
                            </Group>
                            <Progress value={25} color="cyan" size="lg" />
                          </div>
                          <div>
                            <Group justify="space-between" mb="xs">
                              <Text size="sm">Operations</Text>
                              <Text size="sm" fw={500}>20%</Text>
                            </Group>
                            <Progress value={20} color="teal" size="lg" />
                          </div>
                          <div>
                            <Group justify="space-between" mb="xs">
                              <Text size="sm">Reserve</Text>
                              <Text size="sm" fw={500}>10%</Text>
                            </Group>
                            <Progress value={10} color="gray" size="lg" />
                          </div>
                        </Stack>
                      </Paper>
                    </Grid.Col>
                  </Grid>

                  <Paper p="xl" withBorder radius="md">
                    <Title order={4} mb="lg">Timeline of Recent Activities</Title>
                    <Timeline active={1} bulletSize={24}>
                      <Timeline.Item
                        bullet={<IconUserCheck size={12} />}
                        title="New proposal submitted"
                        color="blue"
                      >
                        <Text c="dimmed" size="sm">
                          "Increase Treasury Allocation for Marketing" proposal was submitted by Alice Johnson
                        </Text>
                        <Text size="xs" mt={4}>2 hours ago</Text>
                      </Timeline.Item>

                      <Timeline.Item
                        bullet={<IconCheck size={12} />}
                        title="Proposal passed"
                        color="green"
                      >
                        <Text c="dimmed" size="sm">
                          "Implement New Governance Token Distribution" passed with 67% approval
                        </Text>
                        <Text size="xs" mt={4}>1 day ago</Text>
                      </Timeline.Item>

                      <Timeline.Item
                        bullet={<IconUsers size={12} />}
                        title="New member joined"
                        color="cyan"
                      >
                        <Text c="dimmed" size="sm">
                          Carol Davis joined the DAO community
                        </Text>
                        <Text size="xs" mt={4}>3 days ago</Text>
                      </Timeline.Item>

                      <Timeline.Item
                        bullet={<IconX size={12} />}
                        title="Proposal rejected"
                        color="red"
                      >
                        <Text c="dimmed" size="sm">
                          "Community Development Fund Proposal" was rejected with 32% approval
                        </Text>
                        <Text size="xs" mt={4}>1 week ago</Text>
                      </Timeline.Item>
                    </Timeline>
                  </Paper>
                </Stack>
              </Tabs.Panel>

              <Tabs.Panel value="members">
                <Stack mt="lg">
                  <Paper p="xl" withBorder radius="md">
                    <Group justify="space-between" mb="lg">
                      <Title order={4}>Community Members</Title>
                      <Button leftSection={<IconPlus size={16} />} variant="light">
                        Invite Member
                      </Button>
                    </Group>

                    <ScrollArea>
                      <Table striped highlightOnHover>
                        <Table.Thead>
                          <Table.Tr>
                            <Table.Th>Member</Table.Th>
                            <Table.Th>Role</Table.Th>
                            <Table.Th>Voting Power</Table.Th>
                            <Table.Th>Joined</Table.Th>
                            <Table.Th>Rating</Table.Th>
                            <Table.Th>Actions</Table.Th>
                          </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                          {members.map((member, index) => (
                            <Table.Tr key={index}>
                              <Table.Td>
                                <Group gap="sm">
                                  <Avatar 
                                    src={`https://images.unsplash.com/photo-${1500000000000 + index}?w=40&h=40&fit=crop&crop=face`} 
                                    size="sm" 
                                    radius="xl" 
                                  />
                                  <Text fw={500}>{member.name}</Text>
                                </Group>
                              </Table.Td>
                              <Table.Td>
                                <Badge 
                                  color={member.role.includes('Lead') ? 'blue' : member.role.includes('Core') ? 'green' : 'gray'}
                                  variant="light"
                                >
                                  {member.role}
                                </Badge>
                              </Table.Td>
                              <Table.Td>
                                <Text fw={500}>{member.votingPower.toLocaleString()}</Text>
                              </Table.Td>
                              <Table.Td>{member.joined}</Table.Td>
                              <Table.Td>
                                <Rating value={4 + index % 2} readOnly />
                              </Table.Td>
                              <Table.Td>
                                <Group gap="xs">
                                  <Tooltip label="View Profile">
                                    <ActionIcon variant="subtle" size="sm">
                                      <IconEye size={16} />
                                    </ActionIcon>
                                  </Tooltip>
                                  <Tooltip label="Send Message">
                                    <ActionIcon variant="subtle" size="sm">
                                      <IconMessage size={16} />
                                    </ActionIcon>
                                  </Tooltip>
                                </Group>
                              </Table.Td>
                            </Table.Tr>
                          ))}
                        </Table.Tbody>
                      </Table>
                    </ScrollArea>
                  </Paper>
                </Stack>
              </Tabs.Panel>

              <Tabs.Panel value="treasury">
                <Stack mt="lg">
                  <Grid>
                    <Grid.Col span={{ base: 12, md: 8 }}>
                      <Paper p="xl" withBorder radius="md">
                        <Title order={4} mb="lg">Treasury Management Form</Title>
                        <Stack>
                          <Grid>
                            <Grid.Col span={6}>
                              <TextInput
                                label="Transaction Title"
                                placeholder="Enter transaction title"
                                leftSection={<IconEdit size={16} />}
                              />
                            </Grid.Col>
                            <Grid.Col span={6}>
                              <Select
                                label="Category"
                                placeholder="Select category"
                                data={['Development', 'Marketing', 'Operations', 'Community', 'Reserve']}
                                leftSection={<IconWorld size={16} />}
                              />
                            </Grid.Col>
                          </Grid>

                          <Grid>
                            <Grid.Col span={6}>
                              <NumberInput
                                label="Amount (USD)"
                                placeholder="0.00"
                                leftSection="$"
                                thousandSeparator=","
                                decimalScale={2}
                              />
                            </Grid.Col>
                            <Grid.Col span={6}>
                              <DatePicker
                                value={selectedDate}
                                onChange={setSelectedDate}
                              />
                            </Grid.Col>
                          </Grid>

                          <Textarea
                            label="Description"
                            placeholder="Provide detailed description of the transaction"
                            autosize
                            minRows={3}
                          />

                          <Title order={6} mt="md">Priority Level</Title>
                          <Slider
                            value={sliderValue}
                            onChange={setSliderValue}
                            step={25}
                            marks={[
                              { value: 0, label: 'Low' },
                              { value: 25, label: 'Medium' },
                              { value: 50, label: 'High' },
                              { value: 75, label: 'Critical' },
                              { value: 100, label: 'Emergency' },
                            ]}
                          />

                          <Group mt="lg">
                            <Checkbox label="Requires community approval" />
                            <Switch label="Auto-execute when approved" />
                          </Group>

                          <Group mt="xl">
                            <Button variant="outline">Save as Draft</Button>
                            <Button>Submit for Approval</Button>
                          </Group>
                        </Stack>
                      </Paper>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 4 }}>
                      <Stack>
                        <Paper p="xl" withBorder radius="md">
                          <Title order={5} mb="md">Treasury Overview</Title>
                          <Stack gap="sm">
                            <Group justify="space-between">
                              <Text size="sm" c="dimmed">Total Balance</Text>
                              <Text fw={700} size="lg">$2,400,000</Text>
                            </Group>
                            <Group justify="space-between">
                              <Text size="sm" c="dimmed">Available</Text>
                              <Text fw={500} c="green">$600,000</Text>
                            </Group>
                            <Group justify="space-between">
                              <Text size="sm" c="dimmed">Allocated</Text>
                              <Text fw={500} c="blue">$1,800,000</Text>
                            </Group>
                            <Divider />
                            <Group justify="space-between">
                              <Text size="sm" c="dimmed">Monthly Burn</Text>
                              <Text fw={500} c="red">$120,000</Text>
                            </Group>
                          </Stack>
                        </Paper>

                        <Paper p="xl" withBorder radius="md">
                          <Title order={5} mb="md">Recent Transactions</Title>
                          <Stack gap="sm">
                            <Group justify="space-between">
                              <div>
                                <Text size="sm" fw={500}>Development Team</Text>
                                <Text size="xs" c="dimmed">2 days ago</Text>
                              </div>
                              <Text size="sm" c="red">-$45,000</Text>
                            </Group>
                            <Group justify="space-between">
                              <div>
                                <Text size="sm" fw={500}>Marketing Campaign</Text>
                                <Text size="xs" c="dimmed">1 week ago</Text>
                              </div>
                              <Text size="sm" c="red">-$15,000</Text>
                            </Group>
                            <Group justify="space-between">
                              <div>
                                <Text size="sm" fw={500}>Token Sale</Text>
                                <Text size="xs" c="dimmed">2 weeks ago</Text>
                              </div>
                              <Text size="sm" c="green">+$200,000</Text>
                            </Group>
                          </Stack>
                        </Paper>

                        <Paper p="xl" withBorder radius="md">
                          <Title order={5} mb="md">Quick Actions</Title>
                          <Stack gap="xs">
                            <Button variant="light" fullWidth leftSection={<IconDownload size={16} />}>
                              Export Report
                            </Button>
                            <Button variant="light" fullWidth leftSection={<IconShare size={16} />}>
                              Share Dashboard
                            </Button>
                            <Button variant="light" fullWidth leftSection={<IconSettings size={16} />}>
                              Treasury Settings
                            </Button>
                          </Stack>
                        </Paper>
                      </Stack>
                    </Grid.Col>
                  </Grid>
                </Stack>
              </Tabs.Panel>
            </Tabs>

            {/* Footer Section */}
            <Space h="xl" />
            <Divider />
            <Group justify="center" py="xl">
              <Text size="sm" c="dimmed">
                DAO Governance Platform - Showcasing Mantine UI Components
              </Text>
            </Group>
          </Stack>
        </Container>

        {/* Modals */}
        <Modal opened={opened} onClose={close} title="Create New Proposal" size="lg">
          <Stack>
            <TextInput
              label="Proposal Title"
              placeholder="Enter a descriptive title for your proposal"
              required
            />
            
            <Select
              label="Category"
              placeholder="Select proposal category"
              data={['Governance', 'Treasury', 'Technical', 'Community', 'Strategic']}
              required
            />
            
            <Textarea
              label="Proposal Description"
              placeholder="Provide a detailed description of your proposal"
              autosize
              minRows={4}
              required
            />
            
            <NumberInput
              label="Voting Period (Days)"
              placeholder="7"
              min={1}
              max={30}
            />
            
            <FileInput
              label="Supporting Documents"
              placeholder="Upload relevant files"
              multiple
            />
            
            <Radio.Group
              label="Proposal Type"
              description="Select the type of proposal"
            >
              <Stack mt="xs">
                <Radio value="standard" label="Standard Proposal" />
                <Radio value="emergency" label="Emergency Proposal" />
                <Radio value="constitutional" label="Constitutional Change" />
              </Stack>
            </Radio.Group>
            
            <Group justify="flex-end" mt="xl">
              <Button variant="subtle" onClick={close}>
                Cancel
              </Button>
              <Button>
                Create Proposal
              </Button>
            </Group>
          </Stack>
        </Modal>

        <Drawer opened={drawerOpened} onClose={closeDrawer} title="Invite New Members" position="right" size="md">
          <Stack>
            <Alert
              icon={<IconInfoCircle />}
              title="Member Invitation"
              color="blue"
              variant="light"
            >
              Invite new members to join your DAO community and participate in governance decisions.
            </Alert>
            
            <TextInput
              label="Email Address"
              placeholder="member@example.com"
              leftSection={<IconMail size={16} />}
            />
            
            <TextInput
              label="Full Name"
              placeholder="John Doe"
              leftSection={<IconUser size={16} />}
            />
            
            <Select
              label="Initial Role"
              placeholder="Select role"
              data={['Community Member', 'Contributor', 'Core Contributor']}
            />
            
            <NumberInput
              label="Initial Voting Power"
              placeholder="100"
              min={1}
              max={10000}
            />
            
            <Textarea
              label="Personal Message"
              placeholder="Add a personal welcome message (optional)"
              autosize
              minRows={3}
            />
            
            <Group justify="flex-end" mt="xl">
              <Button variant="outline" onClick={closeDrawer}>
                Cancel
              </Button>
              <Button>
                Send Invitation
              </Button>
            </Group>
          </Stack>
        </Drawer>

        {/* Floating Action Button */}
        <Affix position={{ bottom: 20, right: 20 }}>
          <Tooltip label="Quick Vote">
            <ActionIcon
              size="xl"
              radius="xl"
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan' }}
              onClick={() => showNotification({
                title: 'Quick Vote',
                message: 'Quick voting feature activated!',
                color: 'blue',
              })}
            >
              <IconUserCheck size={24} />
            </ActionIcon>
          </Tooltip>
        </Affix>

        {/* Loading States Demo */}
        <Paper p="md" withBorder mt="xl" style={{ position: 'fixed', bottom: 20, left: 20, width: 200 }}>
          <Stack gap="xs" align="center">
            <Text size="xs" c="dimmed">Loading States</Text>
            <Loader size="sm" />
            <Skeleton height={8} mt={6} width="80%" radius="xl" />
            <Skeleton height={8} width="60%" radius="xl" />
          </Stack>
        </Paper>
      </AppShell.Main>
    </AppShell>
  );
}