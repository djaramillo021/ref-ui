import React, { useState, useEffect, useRef } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import QuestionMark from '~components/farm/QuestionMark';
import ReactTooltip from 'react-tooltip';
import {
  RiskLogo,
  ExternalLinkIcon,
  ShapeTitleIcon,
} from '~components/icon/Risk';

export default function RiskPage() {
  const intl = useIntl();
  const local = localStorage.getItem('local') || navigator.language;
  function lockedTip() {
    const content = `<div class="text-navHighLightText text-xs text-left w-96 xs:w-60 md:w-60 font-normal">
        <div class="mb-2">
            ${intl.formatMessage({ id: 'Locked_paragraph_1' })}
        </div>
        <div class="mb-1">
            ${intl.formatMessage({ id: 'Locked_paragraph_2' })}
        </div>
        <div class="mb-1 pl-2">
            ${intl.formatMessage({ id: 'Locked_paragraph_3' })}
        </div>
        <div class="mb-2 pl-2">
            ${intl.formatMessage({ id: 'Locked_paragraph_4' })}
        </div>
        <div class="mb-2">
            ${intl.formatMessage({ id: 'Locked_paragraph_5' })}
        </div>
        <div>
            ${intl.formatMessage({ id: 'Locked_paragraph_6' })}
        </div>
    </div>`;
    return content;
  }
  return (
    <div className="w-1/2 mx-auto pt-24 relative xs:w-11/12 md:w-11/12">
      <div className="flex justify-center absolute -top-16 left-1/2 transform -translate-x-1/2">
        <RiskLogo></RiskLogo>
      </div>
      <div className="flex justify-center text-white font-medium text-2xl whitespace-nowrap">
        <span
          dangerouslySetInnerHTML={{
            __html: intl.formatMessage({ id: 'risks_of_using_ref_finance' }),
          }}
        ></span>
      </div>
      <div className="text-riskTextColor text-sm mt-3">
        <FormattedMessage id="introduction" />
      </div>
      <div className="flex justify-center items-center mt-5">
        <div
          onClick={() => {
            window.open(
              'https://form.typeform.com/to/EPmUetxU?typeform-source=mzko2gfnij6.typeform.com'
            );
          }}
          className="flex justify-between items-center w-48 bg-cardBg rounded-lg px-2.5 py-1.5 text-sm text-riskTextColor cursor-pointer hover:text-white mr-2.5"
        >
          <FormattedMessage id="general_risks_quiz" />
          <ExternalLinkIcon></ExternalLinkIcon>
        </div>
        <div
          onClick={() => {
            window.open('https://uniswap.org/whitepaper.pdf');
          }}
          className="flex justify-between items-center w-48 bg-cardBg rounded-lg px-2.5 py-1.5 text-sm text-riskTextColor cursor-pointer hover:text-white"
        >
          <FormattedMessage id="amm_core_design" />
          <ExternalLinkIcon></ExternalLinkIcon>
        </div>
      </div>
      <div className="mt-7">
        <ModuleTemplate title={intl.formatMessage({ id: 'audits' })}>
          <p className="text-sm text-riskTextColor mb-4">
            <span
              dangerouslySetInnerHTML={{
                __html: intl.formatMessage({ id: 'audited_first_sentence' }),
              }}
            ></span>
          </p>
          <p className="text-sm text-riskTextColor">
            <FormattedMessage id="audits_paragraph_2" />
          </p>
        </ModuleTemplate>
        <ModuleTemplate title={intl.formatMessage({ id: 'admin_keys' })}>
          <p className="text-sm text-riskTextColor mb-4">
            <span
              dangerouslySetInnerHTML={{
                __html: intl.formatMessage({ id: 'admin_sentence_1' }),
              }}
            ></span>
          </p>
          <p className="text-sm text-riskTextColor break-words">
            <span
              dangerouslySetInnerHTML={{
                __html: intl.formatMessage({ id: 'admin_sentence_2' }),
              }}
            ></span>
          </p>
        </ModuleTemplate>
        <ModuleTemplate title={intl.formatMessage({ id: 'rug_pull' })}>
          <p className="text-sm text-riskTextColor mb-4">
            <FormattedMessage id="rug_pull_paragraph_1" />
          </p>
          <p className="text-sm text-riskTextColor mb-4">
            <FormattedMessage id="rug_pull_paragraph_2" />{' '}
          </p>
          <p className="text-sm text-riskTextColor">
            <FormattedMessage id="rug_pull_paragraph_3" />
          </p>
        </ModuleTemplate>
        <ModuleTemplate title={intl.formatMessage({ id: 'divergence_loss' })}>
          <p className="text-sm text-riskTextColor mb-4">
            <FormattedMessage id="divergence_loss_paragraph_1" />
          </p>
          <p className="text-sm text-riskTextColor mb-4">
            <FormattedMessage id="divergence_loss_paragraph_2" />
          </p>
          <div className="overflow-hidden">
            <p
              className="flex items-center text-sm text-riskTextColor mb-4 cursor-pointer float-left hover:text-white"
              onClick={() => {
                window.open(
                  'https://pintail.medium.com/uniswap-a-good-deal-for-liquidity-providers-104c0b6816f2'
                );
              }}
            >
              <FormattedMessage id="divergence_loss_paragraph_3" />
              <ExternalLinkIcon className="ml-2"></ExternalLinkIcon>
            </p>
          </div>
        </ModuleTemplate>
        <ModuleTemplate title={intl.formatMessage({ id: 'staking_risks' })}>
          <p className="text-sm text-riskTextColor">
            <FormattedMessage id="staking_risks_paragraph_1" />
          </p>
        </ModuleTemplate>
        <ModuleTemplate
          title={intl.formatMessage({ id: 'permanent_loss_of_a_peg' })}
        >
          <p className="text-sm text-riskTextColor">
            <FormattedMessage id="permanent_loss_of_a_peg_paragraph_1" />
          </p>
        </ModuleTemplate>
        <ModuleTemplate title={intl.formatMessage({ id: 'systemic_issues' })}>
          <p className="text-sm text-riskTextColor mb-4">
            <FormattedMessage id="systemic_issues_paragraph_1" />
          </p>
          <p className="text-sm text-riskTextColor mb-4">
            <FormattedMessage id="systemic_issues_paragraph_2" />
          </p>
          <p className="text-sm text-riskTextColor mb-4">
            <FormattedMessage id="systemic_issues_paragraph_3" />
          </p>
          <p className="text-sm text-riskTextColor">
            - <FormattedMessage id="systemic_issues_paragraph_4" />
          </p>
          <p className="text-sm text-riskTextColor">
            - <FormattedMessage id="systemic_issues_paragraph_5" />
          </p>
          <p className="text-sm text-riskTextColor">
            - <FormattedMessage id="systemic_issues_paragraph_6" />
          </p>
          <p className="text-sm text-riskTextColor">
            - <FormattedMessage id="systemic_issues_paragraph_7" />
          </p>
        </ModuleTemplate>
        <ModuleTemplate
          title={intl.formatMessage({ id: 'crypto_trading_addiction' })}
        >
          <p className="text-sm text-riskTextColor mb-4">
            <FormattedMessage id="crypto_trading_addiction_paragraph_1" />
          </p>
          <p className="text-sm text-riskTextColor mb-4">
            <FormattedMessage id="crypto_trading_addiction_paragraph_2" />{' '}
          </p>
          <div className="overflow-hidden">
            <p
              onClick={() => {
                window.open(
                  'https://www.theguardian.com/technology/2022/jan/15/trading-is-gambling-no-doubt-about-it-how-cryptocurrency-dealing-fuels-addiction'
                );
              }}
              className="flex items-center hover:text-white cursor-pointer text-sm text-riskTextColor mb-4 float-left"
            >
              <FormattedMessage id="crypto_trading_addiction_paragraph_3" />
              <ExternalLinkIcon className="ml-2 flex-shrink-0"></ExternalLinkIcon>
            </p>
          </div>
          <div className="overflow-hidden">
            <p
              onClick={() => {
                window.open(
                  'https://www.vice.com/en/article/bvzz9a/i-lost-half-a-million-pounds-bitcoin'
                );
              }}
              className="flex items-center cursor-pointer text-sm text-riskTextColor hover:text-white mb-4 float-left"
            >
              <FormattedMessage id="crypto_trading_addiction_paragraph_4" />
              <ExternalLinkIcon className="ml-2 flex-shrink-0"></ExternalLinkIcon>
            </p>
          </div>
          <div className="overflow-hidden">
            <p
              onClick={() => {
                window.open(
                  'https://www.vice.com/en/article/8xe8jv/cryptocurrency-trading-addiction-gambling-castle-craig'
                );
              }}
              className="flex items-center cursor-pointer text-sm hover:text-white text-riskTextColor mb-4 float-left"
            >
              <FormattedMessage id="crypto_trading_addiction_paragraph_5" />
              <ExternalLinkIcon className="ml-2 flex-shrink-0"></ExternalLinkIcon>
            </p>
          </div>
          <div className="overflow-hidden">
            <p
              onClick={() => {
                window.open('https://www.bbc.co.uk/news/uk-scotland-57268024');
              }}
              className="flex items-center cursor-pointer text-sm text-riskTextColor float-left hover:text-white"
            >
              <FormattedMessage id="crypto_trading_addiction_paragraph_6" />
              <ExternalLinkIcon className="ml-2 flex-shrink-0"></ExternalLinkIcon>
            </p>
          </div>
        </ModuleTemplate>
      </div>
    </div>
  );
}

const ModuleTemplate = (props: any) => {
  const { title, children } = props;
  return (
    <div className="mb-5">
      <div className="relative">
        <ShapeTitleIcon></ShapeTitleIcon>
        <label className="text-chartBg text-lg font-medium absolute left-7 top-1.5 xs:text-base md:text-base">
          {title}
        </label>
      </div>
      <div className="bg-cardBg rounded-2xl px-7 py-5 relative -top-5 z-10 xs:px-5 md:px-5">
        {children}
      </div>
    </div>
  );
};
