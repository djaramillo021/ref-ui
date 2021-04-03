import React, { useState } from 'react';
import FormWrap from '../forms/FormWrap';
import TokenAmount from '../forms/TokenAmount';
import { TokenMetadata } from '../../services/ft-contract';
import { withdraw } from '../../services/token';
import { useTokenBalances } from '../../state/token';

export default function Withdraw({ tokens }: { tokens: TokenMetadata[] }) {
  const balances = useTokenBalances();

  const [amount, setAmount] = useState<string>();
  const [selectedToken, setSelectedToken] = useState<TokenMetadata>();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    withdraw({
      tokenId: selectedToken.id,
      amount,
    });
  };

  return (
    <FormWrap
      buttonText="Withdraw"
      canSubmit={!!amount && !!selectedToken}
      onSubmit={handleSubmit}
    >
      <TokenAmount
        amount={amount}
        max={balances?.[selectedToken?.id]}
        tokens={tokens}
        selectedToken={selectedToken}
        balances={balances}
        onSelectToken={setSelectedToken}
        onChangeAmount={setAmount}
      />
    </FormWrap>
  );
}
