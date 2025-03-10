import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import getConfig from '../../services/config';
import { FormattedMessage } from 'react-intl';
import { CloseIcon } from '../icon/Actions';
import { isMobile, isClientMobie } from '../../utils/device';
import { checkTransaction } from '../../services/swap';
import { getCurrentWallet } from '../../utils/wallets-integration';
import { ErrorTriangle } from '../icon/SwapRefresh';

export enum TRANSACTION_WALLET_TYPE {
  NEAR_WALLET = 'transactionHashes',
  SENDER_WALLET = 'transactionHashesSender',
  WalletSelector = 'transactionHashesWallets',
}

export enum TRANSACTION_ERROR_TYPE {
  SLIPPAGE_VIOLATION = 'Slippage Violation',
  INVALID_PARAMS = 'Invalid Params',
  RATES_EXPIRED = 'Rates Expired',
  INTEGEROVERFLOW = 'Integer Overflow',
  SHARESUPPLYOVERFLOW = 'Share Supply Overflow',
  TOKEN_FROZEN = 'Token Frozen',
}

const ERROR_PATTERN = {
  slippageErrorPattern: /ERR_MIN_AMOUNT|slippage error/i,
  invaliParamsErrorPattern: /invalid params/i,
  ratesExpiredErrorPattern: /Rates expired/i,
  integerOverflowErrorPattern: /Integer overflow/i,
  ShareSupplyOverflowErrorPattern: /shares_total_supply overflow/i,
  tokenFrozenErrorPattern: /token frozen/i,
};

export enum TRANSACTION_STATE {
  SUCCESS = 'success',
  FAIL = 'fail',
}

export const getURLInfo = () => {
  const search = window.location.search;

  const pathname = window.location.pathname;

  const errorType = new URLSearchParams(search).get('errorType');

  const errorCode = new URLSearchParams(search).get('errorCode');

  const signInErrorType = new URLSearchParams(search).get('signInErrorType');

  const txHashes = (
    new URLSearchParams(search).get(TRANSACTION_WALLET_TYPE.NEAR_WALLET) ||
    new URLSearchParams(search).get(TRANSACTION_WALLET_TYPE.SENDER_WALLET) ||
    new URLSearchParams(search).get(TRANSACTION_WALLET_TYPE.WalletSelector)
  )?.split(',');

  return {
    txHash:
      txHashes && txHashes.length > 0 ? txHashes[txHashes.length - 1] : '',
    pathname,
    errorType,
    signInErrorType,
    errorCode,
    txHashes,
  };
};

export function SwapCheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM12.5657 6.16569C12.8781 5.85327 12.8781 5.34673 12.5657 5.03431C12.2533 4.7219 11.7467 4.7219 11.4343 5.03431L7.2 9.26863L5.36569 7.43431C5.05327 7.1219 4.54673 7.1219 4.23431 7.43431C3.9219 7.74673 3.9219 8.25327 4.23431 8.56569L7.2 11.5314L12.5657 6.16569Z"
        fill="#00FFD1"
      />
    </svg>
  );
}

export const swapToast = (txHash: string) => {
  toast(
    <a
      className="text-white w-full h-full pl-1.5 text-sm flex flex-wrap items-center"
      href={`${getConfig().explorerUrl}/txns/${txHash}`}
      target="_blank"
      style={{
        lineHeight: '40px',
      }}
    >
      <span className="mr-2.5 ">
        <SwapCheckIcon />
      </span>
      <span className="mr-1">
        <FormattedMessage
          id="swap_successful"
          defaultMessage="Swap successful. "
        />
      </span>
      <span
        className="underline"
        style={{
          textDecorationThickness: '1px',
        }}
      >
        <FormattedMessage id="click_to_view" defaultMessage="Click to view" />
      </span>
    </a>,
    {
      autoClose: 8000,
      closeOnClick: true,
      hideProgressBar: false,
      closeButton: <CloseIcon />,
      progressStyle: {
        background: '#00FFD1',
        borderRadius: '8px',
      },
      style: {
        background: '#1D2932',
        boxShadow: '0px 0px 10px 10px rgba(0, 0, 0, 0.15)',
        borderRadius: '8px',
        minHeight: '0px',
      },
    }
  );
};

export const failToast = (txHash: string, errorType?: string) => {
  toast(
    <a
      className="text-error w-full h-full pl-1.5 py-1 flex flex-col text-sm"
      href={`${getConfig().explorerUrl}/txns/${txHash}`}
      target="_blank"
      style={{
        lineHeight: '20px',
      }}
    >
      <span className=" flex items-center">
        <span className="mr-2.5">
          <ErrorTriangle />
        </span>

        <span>
          <FormattedMessage
            id="transaction_failed"
            defaultMessage="Transaction failed"
          />
          {'. '}
        </span>
      </span>

      <span>
        <FormattedMessage id="Type" defaultMessage="Type" />: {` `}
        {errorType}
        {'. '}
        <span
          className="underline decoration-1"
          style={{
            textDecorationThickness: '1px',
          }}
        >
          <FormattedMessage id="click_to_view" defaultMessage="Click to view" />
        </span>
      </span>
    </a>,
    {
      autoClose: false,
      closeOnClick: true,
      hideProgressBar: false,
      closeButton: <CloseIcon />,
      progressStyle: {
        background: '#FF7575',
        borderRadius: '8px',
      },
      style: {
        background: '#1D2932',
        boxShadow: '0px 0px 10px 10px rgba(0, 0, 0, 0.15)',
        border: '1px solid #FF7575',
        borderRadius: '8px',
      },
    }
  );
};

export const failToastAccount = (errorMsg?: string) => {
  toast(
    <a
      className="text-error w-full h-full pl-1.5 py-1 flex flex-col text-sm"
      href={`${
        getConfig().explorerUrl
      }/address/${getCurrentWallet()?.wallet?.getAccountId()}`}
      target="_blank"
      style={{
        lineHeight: '20px',
      }}
    >
      <span className=" flex items-center">
        <span className="mr-2.5">
          <ErrorTriangle />
        </span>

        <span>
          <FormattedMessage
            id="transaction_failed"
            defaultMessage="Transaction failed"
          />
          {'. '}
        </span>
      </span>
      <span
        className="underline"
        style={{
          textDecorationThickness: '1px',
        }}
      >
        <FormattedMessage id="click_to_view" defaultMessage="Click to view" />
      </span>
    </a>,
    {
      autoClose: false,
      closeOnClick: true,
      hideProgressBar: false,
      closeButton: <CloseIcon />,
      progressStyle: {
        background: '#FF7575',
        borderRadius: '8px',
      },
      style: {
        background: '#1D2932',
        boxShadow: '0px 0px 10px 10px rgba(0, 0, 0, 0.15)',
        border: '1px solid #FF7575',
        borderRadius: '8px',
      },
    }
  );
};

export const checkAccountTip = () => {
  toast(
    <span
      className="w-full h-full pl-1.5 text-base"
      style={{
        color: '#C4C4C4',
        width: '286px',
      }}
    >
      <FormattedMessage
        id="ref_account_balance_tip"
        defaultMessage="It seems like an error occurred while adding/removing liquidity to the pool"
      />
    </span>,
    {
      autoClose: false,
      closeOnClick: true,
      hideProgressBar: false,
      closeButton: <CloseIcon />,
      progressStyle: {
        background: '#00FFD1',
        borderRadius: '8px',
      },
      style: {
        background: '#1D2932',
        boxShadow: '0px 0px 10px 10px rgba(0, 0, 0, 0.15)',
        borderRadius: '8px',
        minHeight: '60px',
        margin: 'auto',
        marginTop: isMobile() ? '20px' : 'none',
        width: isMobile() ? '320px' : 'none',
      },
    }
  );
};

export const checkCrossSwapTransactions = async (txHashes: string[]) => {
  const lastTx = txHashes.pop();
  const txDetail: any = await checkTransaction(lastTx);

  if (txHashes.length > 0) {
    // judge if aurora call
    const isAurora = txDetail.transaction?.receiver_id === 'aurora';

    const ifCall =
      txDetail.transaction?.actions?.length === 1 &&
      txDetail.transaction?.actions?.[0]?.FunctionCall?.method_name === 'call';

    if (isAurora && ifCall) {
      const parsedOut = parsedTransactionSuccessValue(txDetail);

      const erc20FailPattern = /burn amount exceeds balance/i;

      if (
        erc20FailPattern.test(parsedOut) ||
        (parsedOut.toString().trim().length === 14 &&
          parsedOut.toString().trim().indexOf('|R') !== -1)
      ) {
        return {
          hash: lastTx,
          status: false,
          errorType: 'Withdraw Failed',
        };
      } else {
        const secondLastHash = txHashes.pop();
        const secondDetail = await checkTransaction(secondLastHash);

        const slippageErrprReg = /INSUFFICIENT_OUTPUT_AMOUNT/i;
        const expiredErrorReg = /EXPIRED/i;

        const parsedOutput = parsedTransactionSuccessValue(secondDetail);

        if (slippageErrprReg.test(parsedOutput)) {
          return {
            hash: secondLastHash,
            status: false,
            errorType: 'Slippage Violation',
          };
        } else if (expiredErrorReg.test(parsedOutput)) {
          return {
            hash: secondLastHash,
            status: false,
            errorType: 'Expired',
          };
        } else {
          return {
            hash: lastTx,
            status: true,
          };
        }
      }
    } else {
      // normal swap judgement

      const errorMessasge = getErrorMessage(txDetail);

      if (errorMessasge)
        return {
          status: false,
          hash: lastTx,
          errorType: errorMessasge,
        };
      else {
        return {
          status: true,
          hash: lastTx,
        };
      }
    }

    // validate if last tx is success
  } else {
    const errorMessasge = getErrorMessage(txDetail);

    if (errorMessasge)
      return {
        status: false,
        hash: lastTx,
        errorType: errorMessasge,
      };
    else {
      return {
        status: true,
        hash: lastTx,
      };
    }
  }
};

export const parsedTransactionSuccessValue = (res: any) => {
  const status: any = res.status;

  const data: string | undefined = status.SuccessValue;

  if (data) {
    const buff = Buffer.from(data, 'base64');
    const parsedData = buff.toString('ascii');
    return parsedData;
  }
};

export const usnBuyAndSellToast = (txHash: string) => {
  toast(
    <a
      className="text-white w-full h-full pl-1.5 flex flex-wrap items-center text-sm"
      href={`${getConfig().explorerUrl}/txns/${txHash}`}
      target="_blank"
      style={{
        lineHeight: '40px',
      }}
    >
      <span className="mr-2.5 ">
        <SwapCheckIcon />
      </span>
      <span className="mr-1">
        <FormattedMessage
          id="trading_successfull"
          defaultMessage="Trading successful. "
        />
      </span>
      <span
        className="underline"
        style={{
          textDecorationThickness: '1px',
        }}
      >
        <FormattedMessage id="click_to_view" defaultMessage="Click to view" />
      </span>
    </a>,
    {
      autoClose: 8000,
      closeOnClick: true,
      hideProgressBar: false,
      closeButton: <CloseIcon />,
      progressStyle: {
        background: '#00FFD1',
        borderRadius: '8px',
      },
      style: {
        background: '#1D2932',
        boxShadow: '0px 0px 10px 10px rgba(0, 0, 0, 0.15)',
        borderRadius: '8px',
        minHeight: '0px',
      },
    }
  );
};

export const getErrorMessage = (res: any) => {
  const isSlippageError = res.receipts_outcome.some((outcome: any) => {
    return ERROR_PATTERN.slippageErrorPattern.test(
      outcome?.outcome?.status?.Failure?.ActionError?.kind?.FunctionCallError
        ?.ExecutionError
    );
  });

  const isInvalidAmountError = res.receipts_outcome.some((outcome: any) => {
    return ERROR_PATTERN.invaliParamsErrorPattern.test(
      outcome?.outcome?.status?.Failure?.ActionError?.kind?.FunctionCallError
        ?.ExecutionError
    );
  });

  const isRatesExpiredError = res.receipts_outcome.some((outcome: any) => {
    return ERROR_PATTERN.ratesExpiredErrorPattern.test(
      outcome?.outcome?.status?.Failure?.ActionError?.kind?.FunctionCallError
        ?.ExecutionError
    );
  });

  const isIntegerOverFlowError = res.receipts_outcome.some((outcome: any) => {
    return ERROR_PATTERN.integerOverflowErrorPattern.test(
      outcome?.outcome?.status?.Failure?.ActionError?.kind?.FunctionCallError
        ?.ExecutionError
    );
  });

  const isShareSupplyOerflowError = res.receipts_outcome.some(
    (outcome: any) => {
      return ERROR_PATTERN.ShareSupplyOverflowErrorPattern.test(
        outcome?.outcome?.status?.Failure?.ActionError?.kind?.FunctionCallError
          ?.ExecutionError
      );
    }
  );

  const isTokenFrozen = res.receipts_outcome.some((outcome: any) => {
    return ERROR_PATTERN.tokenFrozenErrorPattern.test(
      outcome?.outcome?.status?.Failure?.ActionError?.kind?.FunctionCallError
        ?.ExecutionError
    );
  });

  if (isSlippageError) {
    return TRANSACTION_ERROR_TYPE.SLIPPAGE_VIOLATION;
  } else if (isInvalidAmountError) {
    return TRANSACTION_ERROR_TYPE.INVALID_PARAMS;
  } else if (isRatesExpiredError) {
    return TRANSACTION_ERROR_TYPE.RATES_EXPIRED;
  } else if (isIntegerOverFlowError) {
    return TRANSACTION_ERROR_TYPE.INTEGEROVERFLOW;
  } else if (isShareSupplyOerflowError) {
    return TRANSACTION_ERROR_TYPE.SHARESUPPLYOVERFLOW;
  } else if (isTokenFrozen) {
    return TRANSACTION_ERROR_TYPE.TOKEN_FROZEN;
  } else {
    return null;
  }
};

export const normalFailToast = (text: string) => {
  toast(
    <div
      className="text-error w-full h-full pl-1.5 py-1  flex-col text-sm"
      style={{
        lineHeight: '40px',
        width: isClientMobie() ? null : '280px',
      }}
    >
      <span>{text}</span>
    </div>,
    {
      autoClose: false,
      closeOnClick: true,
      hideProgressBar: false,
      closeButton: <CloseIcon />,
      progressStyle: {
        background: '#FF7575',
        borderRadius: '8px',
      },
      style: {
        background: '#1D2932',
        boxShadow: '0px 0px 10px 10px rgba(0, 0, 0, 0.15)',
        border: '1px solid #FF7575',
        borderRadius: '8px',
      },
    }
  );
};
export const normalSuccessToast = (text: string) => {
  toast(
    <div
      className="text-white w-full h-full pl-1.5 text-sm  flex-wrap items-center"
      style={{
        lineHeight: '30px',
        width: isClientMobie() ? null : '270px',
      }}
    >
      <div className="w-4 h-4 mr-2  relative top-1 inline-flex">
        <SwapCheckIcon />
      </div>
      {text}
    </div>,
    {
      autoClose: 8000,
      closeOnClick: true,
      hideProgressBar: false,
      closeButton: <CloseIcon />,
      progressStyle: {
        background: '#00FFD1',
        borderRadius: '8px',
      },
      style: {
        background: '#1D2932',
        boxShadow: '0px 0px 10px 10px rgba(0, 0, 0, 0.15)',
        borderRadius: '8px',
        minHeight: '0px',
      },
    }
  );
};
