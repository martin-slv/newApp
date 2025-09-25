'use client';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/spotlight/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/code-highlight/styles.css';

import { MantineProvider, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import { Web3Provider } from '@/components/providers/Web3Provider';

const theme = createTheme({
  colors: {
    dao: [
      '#e8f4fd',
      '#d0e7f7',
      '#a1cdee',
      '#6fb1e4',
      '#4a9adc',
      '#358bd7',
      '#2984d6',
      '#1a72be',
      '#0c66aa',
      '#005a95'
    ],
  },
  primaryColor: 'dao',
  fontFamily: 'Inter, system-ui, sans-serif',
  headings: { fontFamily: 'Inter, system-ui, sans-serif' },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>DAO Community Governance</title>
        <meta name="description" content="A comprehensive DAO governance platform showcasing Mantine UI components" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <Web3Provider>
          <MantineProvider theme={theme}>
            <ModalsProvider>
              <Notifications />
              {children}
            </ModalsProvider>
          </MantineProvider>
        </Web3Provider>
      </body>
    </html>
  );
}