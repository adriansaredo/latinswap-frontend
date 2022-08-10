import { Button, Modal, Text, Grid, InjectedModalProps, Box } from '@pancakeswap/uikit'
import { ChainId } from '@pancakeswap/sdk'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { chains } from 'utils/wagmi'
import { useMemo } from 'react'
import { useHistory } from 'contexts/HistoryContext'
import NextLink from 'next/link'

export function NetworkSupportModal({
  title,
  onDismiss,
  image,
}: InjectedModalProps & { title?: React.ReactNode; image?: string }) {
  const { switchNetwork, isLoading } = useSwitchNetwork()
  const { chainId } = useActiveWeb3React()

  const foundChain = useMemo(() => chains.find((c) => c.id === chainId), [chainId])
  const historyManager = useHistory()

  const lastValidPath = historyManager?.history?.find((h) => ['/swap', 'liquidity', '/'].includes(h))

  return (
    <Modal title={title} hideCloseButton headerBackground="gradients.cardHeader">
      <Grid style={{ gap: '16px' }} maxWidth="360px">
        <Text bold>It’s a BNB Smart Chain only feature</Text>
        <Text small>Currently only Swap is supported in BNB Smart Chain</Text>

        {image && (
          <Box mx="auto" my="8px">
            <img src={image} alt="feature" />
          </Box>
        )}
        <Text small>
          Our Trading Competition, Prediction and Lottery features are currently available only on BNB Chain! Come over
          and join the community in the fun!
        </Text>
        <Button
          variant="secondary"
          isLoading={isLoading}
          onClick={() => switchNetwork(ChainId.BSC).then(() => onDismiss?.())}
        >
          Switch to BNB Smart Chain
        </Button>
        {foundChain && lastValidPath && (
          <NextLink href={lastValidPath} passHref>
            <Button as="a">Stay on {foundChain.name}</Button>
          </NextLink>
        )}
      </Grid>
    </Modal>
  )
}