import React, { useEffect, useRef, useState } from 'react';
import MicroModal from 'react-micro-modal';
import { TokenMetadata } from '../../services/ft-contract';
import { ArrowDownGreen, ArrowDownWhite } from '../icon';
import { isMobile, getExplorer } from '../../utils/device';
import { FormattedMessage, useIntl } from 'react-intl';
import { TokenBalancesView } from '../../services/token';
import { IoCloseOutline } from 'react-icons/io5';
import CommonBasses from '../../components/tokens/CommonBasses';
import Table from '../../components/table/Table';
import { useTokensData } from '../../state/token';
import { toRealSymbol } from '../../utils/token';
import { FaSearch } from 'react-icons/fa';
import AddToken from './AddToken';
import { getTokenPriceList } from '../../services/indexer';
import {
  toPrecision,
  divide,
  toInternationalCurrencySystem,
  toInternationalCurrencySystemLongString,
} from '../../utils/numbers';
import {
  BTCIDS,
  BTC_CLASS_STABLE_TOKEN_IDS,
  CUSDIDS,
  LINEARIDS,
  NEARXIDS,
  NEAR_CLASS_STABLE_TOKEN_IDS,
  STABLE_TOKEN_USN_IDS,
  STNEARIDS,
  USD_CLASS_STABLE_TOKEN_IDS,
} from '../../services/near';
import {
  STABLE_TOKEN_IDS,
  STABLE_POOL_TYPE,
  USD_CLASS_STABLE_POOL_IDS,
} from '../../services/near';
import _ from 'lodash';

function sort(a: any, b: any) {
  if (typeof a === 'string' && typeof b === 'string') {
    return a.localeCompare(b);
  } else if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  } else {
    return a;
  }
}
export function tokenPrice(price: string, error?: boolean) {
  return (
    <span className="text-xs text-primaryText">
      {`$${
        error || !price
          ? '-'
          : toInternationalCurrencySystemLongString(price, 2)
      }`}
    </span>
  );
}

export function SingleToken({
  token,
  price,
}: {
  token: TokenMetadata;
  price: string;
}) {
  return (
    <>
      {token.icon ? (
        <img
          src={token.icon}
          alt={toRealSymbol(token.symbol)}
          style={{
            width: '25px',
            height: '25px',
          }}
          className="inline-block mr-2 border rounded-full border-greenLight"
        />
      ) : (
        <div
          className="inline-block mr-2 border rounded-full border-greenLight"
          style={{
            width: '25px',
            height: '25px',
          }}
        ></div>
      )}
      <span className="text-white">
        <div
          style={{
            position: 'relative',
            top: `${price ? '2px' : ''}`,
          }}
        >
          {toRealSymbol(token.symbol)}
        </div>
        <span
          style={{
            position: 'relative',
            bottom: `${price ? '2px' : ''}`,
          }}
        >
          {price ? tokenPrice(price) : null}
        </span>
      </span>
    </>
  );
}

export const StableSelectToken = ({
  onSelect,
  tokens,
  selected,
  preSelected,
  postSelected,
  onSelectPost,
}: {
  tokens: TokenMetadata[];
  onSelect?: (token: TokenMetadata) => void;
  selected: string | React.ReactElement;
  preSelected?: TokenMetadata;
  postSelected?: TokenMetadata;
  onSelectPost?: (t: TokenMetadata) => void;
}) => {
  const USDTokenList = USD_CLASS_STABLE_TOKEN_IDS;
  const BTCTokenList = BTC_CLASS_STABLE_TOKEN_IDS;

  const NEARTokenList = NEAR_CLASS_STABLE_TOKEN_IDS;

  const [stableCoinType, setStableCoinType] = useState<STABLE_POOL_TYPE>(
    STABLE_POOL_TYPE.USD
  );

  const ref = useRef(null);

  const [visible, setVisible] = useState(false);

  const USDtokens = USDTokenList.map((id) => tokens.find((t) => t.id === id));

  const BTCtokens = BTCTokenList.map((id) => tokens.find((t) => t.id === id));

  const NEARtokens = NEARTokenList.map((id) => tokens.find((t) => t.id === id));

  const coverUSD =
    preSelected && !USDtokens.find((token) => token.id === preSelected.id);

  const coverBTC =
    preSelected && !BTCtokens.find((token) => token.id === preSelected.id);

  const coverNEAR =
    preSelected && !NEARtokens.find((token) => token.id === preSelected.id);

  const handleSelect = (token: TokenMetadata) => {
    if (token.id != NEARXIDS[0]) {
      onSelect(token);
    }

    if (!postSelected || !onSelectPost) {
      return;
    }

    const onTokenBTC = BTCtokens.find((t) => t.id === token.id);

    const onTokenUSD = USDtokens.find((t) => t.id === token.id);

    const onTokenNEAR = NEARtokens.find((t) => t.id === token.id);

    if (onTokenBTC && !BTCtokens.find((t) => t.id === postSelected.id)) {
      onSelectPost(BTCtokens.find((t) => t.id !== token.id));
    } else if (onTokenUSD && !USDtokens.find((t) => t.id === postSelected.id)) {
      onSelectPost(USDtokens.find((t) => t.id !== token.id));
    } else if (
      onTokenNEAR &&
      !NEARtokens.find((t) => t.id === postSelected.id)
    ) {
      onSelectPost(NEARtokens.find((t) => t.id !== token.id));
    }
  };

  useEffect(() => {
    if (!coverUSD) {
      setStableCoinType(STABLE_POOL_TYPE.USD);
    } else if (!coverBTC) {
      setStableCoinType(STABLE_POOL_TYPE.BTC);
    } else if (!coverNEAR) {
      setStableCoinType(STABLE_POOL_TYPE.NEAR);
    }
  }, [coverBTC, coverUSD, coverNEAR]);

  useEffect(() => {
    if (visible)
      document.addEventListener('click', () => {
        setVisible(false);
      });
  }, [visible]);

  const getDisplayList = (type: string) => {
    switch (type) {
      case 'USD':
        return USDtokens;
      case 'BTC':
        return BTCtokens;
      case 'NEAR':
        return NEARtokens;
    }
  };

  const displayList = getDisplayList(stableCoinType);

  return (
    <div className="w-2/5 outline-none my-auto relative overflow-visible">
      <div
        className={`w-full relative `}
        onClick={(e) => {
          e.nativeEvent.stopImmediatePropagation();
          if (
            !visible &&
            document.getElementsByClassName('stable-token-selector')?.[0]
          ) {
            ref.current = document.getElementsByClassName(
              'stable-token-selector'
            )?.[0];
            ref.current.click();
          }
          setVisible(!visible);
        }}
      >
        {selected}
      </div>
      <div
        className={`stable-token-selector rounded-2xl flex flex-col w-56 top-12 py-3 ${
          visible ? 'block' : 'hidden'
        } absolute`}
        style={{
          background:
            getExplorer() === 'Firefox' ? '#323E46' : 'rgba(58,69,77,0.6)',
          backdropFilter: 'blur(15px)',
          WebkitBackdropFilter: 'blur(15px)',
          border: '1px solid #415462',
          zIndex: 999,
          right: 0,
        }}
      >
        <div
          className="w-full flex items-center justify-between"
          style={{
            borderBottom: '1px solid #415462',
          }}
        >
          <div
            className={`rounded-lg py-1 w-full px-4 mb-2 text-center font-bold mt-1 ml-3 text-sm ${
              stableCoinType === 'USD'
                ? 'text-gradientFrom bg-black bg-opacity-20'
                : 'text-primaryText cursor-pointer'
            }  self-start ${coverUSD ? 'opacity-30' : ''}`}
            onClick={(e) => {
              e.nativeEvent.stopImmediatePropagation();
              if (coverUSD) return;
              else setStableCoinType(STABLE_POOL_TYPE.USD);
            }}
          >
            USD
          </div>
          <div
            className={`rounded-lg w-full py-1 text-center font-bold  px-4 mb-2 mt-1
          ${
            stableCoinType === 'BTC'
              ? 'text-BTCColor bg-black bg-opacity-20'
              : 'text-primaryText cursor-pointer'
          }
           text-sm  self-start
            ${coverBTC ? 'opacity-30' : ''}
            `}
            onClick={(e) => {
              e.nativeEvent.stopImmediatePropagation();
              if (coverBTC) return;
              else setStableCoinType(STABLE_POOL_TYPE.BTC);
            }}
          >
            BTC
          </div>

          <div
            className={`rounded-lg w-full py-1 text-center mr-3 font-bold  px-4 mb-2 mt-1
          ${
            stableCoinType === 'NEAR'
              ? 'text-NEARBlue bg-black bg-opacity-20'
              : 'text-primaryText cursor-pointer'
          }
           text-sm  self-start
            ${coverNEAR ? 'opacity-30' : ''}
            `}
            onClick={(e) => {
              e.nativeEvent.stopImmediatePropagation();
              if (coverNEAR) return;
              else setStableCoinType(STABLE_POOL_TYPE.NEAR);
            }}
          >
            NEAR
          </div>
        </div>
        <div
          className={`flex flex-col`}
          style={{
            height: '270px',
          }}
        >
          {displayList.map((token) => {
            return (
              <div
                key={`stable-token-${token.id}`}
                className={`flex items-center justify-between hover:bg-black hover:bg-opacity-20 cursor-pointer py-2 pl-4 pr-2 mx-3 mt-3 rounded-2xl `}
                onClick={(e) => {
                  e.nativeEvent.stopImmediatePropagation();

                  setVisible(!visible);
                  handleSelect(token);
                }}
              >
                <span className="text-white font-semibold text-sm">
                  {toRealSymbol(token.symbol)}
                </span>
                <span>
                  {token.icon ? (
                    <img
                      className="rounded-full border border-gradientFromHover"
                      src={token.icon}
                      style={{
                        width: '26px',
                        height: '26px',
                      }}
                    />
                  ) : (
                    <div
                      className="rounded-full border border-gradientFromHover"
                      style={{
                        width: '26px',
                        height: '26px',
                      }}
                    ></div>
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default function SelectToken({
  tokens,
  selected,
  render,
  onSelect,
  standalone,
  placeholder,
  balances,
  tokenPriceList,
  forCross,
}: {
  tokens: TokenMetadata[];
  selected: string | React.ReactElement;
  standalone?: boolean;
  placeholder?: string;
  render?: (token: TokenMetadata) => string;
  onSelect?: (token: TokenMetadata) => void;
  onSearch?: (value: string) => void;
  balances?: TokenBalancesView;
  tokenPriceList?: Record<string, any>;
  forCross?: boolean;
}) {
  const [visible, setVisible] = useState(false);
  const [listData, setListData] = useState<TokenMetadata[]>([]);
  const [currentSort, setSort] = useState<string>('down');
  const [sortBy, setSortBy] = useState<string>('near');
  const [showCommonBasses, setShowCommonBasses] = useState<boolean>(true);
  const addToken = () => <AddToken />;

  if (!onSelect) {
    return (
      <button className="focus:outline-none p-1" type="button">
        {selected}
      </button>
    );
  }
  const dialogWidth = isMobile() ? '95%' : forCross ? '25%' : '420px';
  const dialogMinwidth = isMobile() ? 340 : 380;
  const dialogHidth = isMobile() ? '95%' : '57%';
  const intl = useIntl();
  const {
    tokensData,
    loading: loadingTokensData,
    trigger,
  } = useTokensData(tokens, balances);
  useEffect(() => {
    trigger();
  }, [trigger]);

  useEffect(() => {
    if (!loadingTokensData) {
      const sortedData = [...tokensData].sort(sortTypes[currentSort].fn);
      setListData(sortedData);
    }
  }, [loadingTokensData, tokensData]);

  useEffect(() => {
    if (!!tokensData) {
      const sortedData = [...tokensData].sort(sortTypes[currentSort].fn);
      setListData(sortedData);
    }
  }, [currentSort, sortBy]);

  const sortTypes: { [key: string]: any } = {
    up: {
      class: 'sort-up',
      fn: (a: any, b: any) => sort(a[sortBy], b[sortBy]),
    },
    down: {
      class: 'sort-down',
      fn: (a: any, b: any) => sort(b[sortBy], a[sortBy]),
    },
    default: {
      class: 'sort',
      fn: (a: any, b: any) => a,
    },
  };

  const onSortChange = (params: string) => {
    if (params === sortBy) {
      let nextSort;
      if (currentSort === 'down') nextSort = 'up';
      else if (currentSort === 'up') nextSort = 'down';
      setSort(nextSort);
    } else {
      setSort('up');
    }
    setSortBy(params);
  };

  const onSearch = (value: string) => {
    setShowCommonBasses(value.length === 0);

    const result = tokensData.filter((token) => {
      const symbol = token?.symbol === 'NEAR' ? 'wNEAR' : token?.symbol;
      if (!symbol) return false;
      return toRealSymbol(symbol)
        .toLocaleUpperCase()
        .includes(value.toLocaleUpperCase());
    });
    setListData(result);
  };

  const debounceSearch = _.debounce(onSearch, 300);

  const handleClose = () => {
    const sortedData = [...tokensData].sort(sortTypes[currentSort].fn);
    setListData(sortedData);
    setVisible(false);
    setShowCommonBasses(true);
  };

  return (
    <MicroModal
      open={visible}
      handleClose={handleClose}
      trigger={() => (
        <div
          className={`focus:outline-none my-auto  ${
            standalone ? 'w-full' : 'w-2/5'
          }`}
          onClick={() => setVisible(true)}
        >
          {selected || (
            <section
              className={`flex justify-between items-center px-3 py-2 ${
                standalone
                  ? 'bg-inputDarkBg text-white relative flex overflow-hidden rounded align-center my-2'
                  : ''
              }`}
            >
              <p
                className="text-lg text-gray-400 font-semibold leading-none"
                style={{ lineHeight: 'unset' }}
              >
                {placeholder ?? 'Select'}
              </p>
              <div className="pl-2">
                <ArrowDownWhite />
              </div>
            </section>
          )}
        </div>
      )}
      overrides={{
        Overlay: {
          style: {
            zIndex: 110,
            backgroundColor: 'rgba(0, 19, 32, 0.95)',
          },
        },
        Dialog: {
          style: {
            width: dialogWidth,
            minWidth: dialogMinwidth,
            borderRadius: '0.75rem',
            border: '1px solid rgba(0, 198, 162, 0.5)',
            padding: '1.5rem 0',
            background: '#1D2932',
            height: dialogHidth,
            zIndex: 100,
          },
        },
      }}
    >
      {() => (
        <section className="text-white">
          <div className="flex items-center justify-between pb-5 px-8 relative">
            <h2 className="text-sm font-bold text-center">
              <FormattedMessage
                id="select_token"
                defaultMessage="Select Token"
              />
            </h2>
            <IoCloseOutline
              onClick={() => handleClose()}
              className="absolute text-gray-400 text-2xl right-6 cursor-pointer"
            />
          </div>
          <div className="flex justify-between items-center mb-5 mx-8">
            <div className="flex-auto rounded text-gray-400 flex items-center pr-2 mr-4 bg-inputDarkBg">
              <input
                className={`text-sm outline-none rounded w-full py-2 px-1`}
                placeholder={intl.formatMessage({ id: 'search_token' })}
                onChange={(evt) => debounceSearch(evt.target.value)}
              />
              <FaSearch />
            </div>
            {!forCross && addToken()}
          </div>
          {showCommonBasses && !forCross && (
            <CommonBasses
              tokens={tokensData}
              onClick={(token) => {
                onSelect && onSelect(token);
                handleClose();
              }}
              tokenPriceList={tokenPriceList}
            />
          )}
          <Table
            sortBy={sortBy}
            tokenPriceList={tokenPriceList}
            currentSort={currentSort}
            onSortChange={onSortChange}
            tokens={listData}
            onClick={(token) => {
              if (token.id != NEARXIDS[0]) {
                onSelect && onSelect(token);
              }
              handleClose();
            }}
            balances={balances}
            forCross={forCross}
          />
        </section>
      )}
    </MicroModal>
  );
}

export const SelectTokenForList = ({
  onSelect,
  tokens,
  selected,
}: {
  tokens: TokenMetadata[];
  onSelect?: (token: TokenMetadata) => void;
  selected: string | React.ReactElement;
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible)
      document.addEventListener('click', () => {
        setVisible(false);
      });
  }, [visible]);

  return (
    <div className="w-2/5 left-0 outline-none my-auto relative overflow-visible">
      <div
        className={`w-full relative `}
        onClick={(e) => {
          e.nativeEvent.stopImmediatePropagation();
          setVisible(!visible);
        }}
      >
        {selected}
      </div>
      <div
        className={` rounded-2xl left-0 flex flex-col w-56 top-12 py-3 ${
          visible ? 'block' : 'hidden'
        } absolute`}
        style={{
          background:
            getExplorer() === 'Firefox' ? '#323E46' : 'rgba(58,69,77,0.6)',
          backdropFilter: 'blur(15px)',
          WebkitBackdropFilter: 'blur(15px)',
          border: '1px solid #415462',
          zIndex: 999,
          right: 0,
        }}
      >
        <div className={`flex flex-col`}>
          {tokens.map((token) => {
            return (
              <div
                key={`${token.id}`}
                className={`flex items-center justify-between hover:bg-black hover:bg-opacity-20 cursor-pointer py-2 pl-4 pr-2 mx-3 mt-3 rounded-2xl `}
                onClick={(e) => {
                  e.nativeEvent.stopImmediatePropagation();
                  onSelect(token);
                  setVisible(!visible);
                }}
              >
                <span className="text-white font-semibold text-sm">
                  {toRealSymbol(token.symbol)}
                </span>
                <span>
                  {token.icon ? (
                    <img
                      className="rounded-full border border-gradientFromHover"
                      src={token.icon}
                      style={{
                        width: '26px',
                        height: '26px',
                      }}
                    />
                  ) : (
                    <div
                      className="rounded-full border border-gradientFromHover"
                      style={{
                        width: '26px',
                        height: '26px',
                      }}
                    ></div>
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
