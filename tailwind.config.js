const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: false,
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      xs: { min: '300px', max: '600px' },
      xsm: { min: '300px', max: '1023px' },
      md: { min: '600px', max: '1023px' },
      lg: { min: '1024px' },
      lg2: { min: '1092px' },
      xl: { min: '1280px' },
      '2xl': { min: '1536px' },
      '3xl': { min: '1792px' },
    },
    boxShadow: {
      '4xl': '0px 0px 10px 4px rgba(0, 0, 0, 0.35)',
      green: '0px 0px 2px rgba(0, 198, 162, 0.5)',
      dark: '0px 0px 10px rgba(0, 0, 0, 0.15)',
      blue: '0px 0px 20px rgba(0, 255, 209, 0.6)',
      withDrawColor: '0px 0px 20px rgba(0, 255, 240, 0.6)',
    },

    extend: {
      backgroundImage: (theme) => ({
        farmSearch: 'linear-gradient(106.25deg, #00FFD1 6.88%, #00BA98 81.93%)',
        veCardGradient: 'linear-gradient(0deg, #001320 -2.77%, #1D2932 100%)',
        poolDaoBanner: 'linear-gradient(0deg, #1D2932 0%, #00A385 100%)',
        redGradient: 'linear-gradient(270deg, #7F43FF 0%, #FF8B8B 97.06%)',
        veReverseGradient:
          'linear-gradient(270deg, rgba(127, 67, 255, 0.3) 0%, rgba(0, 198, 162, 0.3) 97.06%)',
        veCardGradientRight:
          'linear-gradient(270deg, #001320 0%, #1D2932 95.06%)',
        veUserCard: 'linear-gradient(270deg, #001320 0%, #1D2932 95.06%);',
        veVotingPowerCard: 'linear-gradient(90deg, #00FFD1 0%, #009277 100%)',
        veFarmBoostCard: 'linear-gradient(90deg, #7C47FD 0%, #34177C 100%)',
        veGradient: 'linear-gradient(270deg, #7F43FF 0%, #00977C 97.06%);',
        stableTab: 'linear-gradient(180deg, #00C6A2 0%, #008B72 100%)',
        primaryGradient: 'linear-gradient(180deg, #00C6A2 0%, #008B72 100%)',
        buttonGradientBg: 'linear-gradient(180deg, #00C6A2 0%, #008B72 100%)',
        darkGradientBg: 'linear-gradient(180deg, #1D2932 0%, #001320 100%)',
        grayBoderGradient:
          'linear-gradient(180deg, rgba(126, 138, 147, 0.2) 0%, rgba(3, 5, 5, 0.2) 100%)',
        grayBoderGradientReverse:
          'linear-gradient(0deg, rgba(126, 138, 147, 0.2) 0%, rgba(3, 5, 5, 0.2) 100%)',

        darkGradientHoverBg:
          'linear-gradient(180deg, #24313A 0%, #14212B 100%)',
        switchButtonGradientBg:
          'linear-gradient(90deg, #00C6A2 24.14%, #008B72 72.41%)',
        unLockedbg: 'linear-gradient(180deg, #FFB36D 0%, #D27E00 100%)',
        boostBg:
          'linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%)',
        v2boostBg:
          'linear-gradient(360deg, rgba(0, 19, 32, 0) 6.2%, #1D2932 100%)',
        boostUpBoxBg: 'linear-gradient(0deg, #273A46 0%, #15232D 100%)',
        bgGreyDefault: 'linear-gradient(180deg, #C0B1A3 0%, #92877D 100%)',
        bgGreyHover: 'linear-gradient(180deg, #E6D6C7 0%, #92877D 100%)',
      }),
      gridTemplateColumns: {
        farmSearch: '2fr 1fr',
        farmContainer: '1fr 4fr',
        farmContainerOther: '1.2fr 3fr',
        xrefColumn: '7fr 13fr',
      },
      gridTemplateRows: {
        xrefContainer: '7fr 18fr',
        xrefRowM: '2fr 3fr',
        xrefContainerM: '2fr 3fr',
      },
      colors: {
        primary: '#10B981',
        primaryScale: colors.green,
        secondary: '#F9FAFB',
        secondaryScale: colors.gray,
        darkText: colors.gray['600'],
        inputBg: colors.gray['100'],
        inputText: '#374151',
        hoverGray: '#F3F4F6',
        buttonBg: '#10B981',
        buttonText: '#F9FAFB',
        greenLight: '#00C08B',
        greenOpacity100: 'rgba(2, 109, 97, 1)',
        whiteOpacity85: 'rgba(255, 255, 255, 0.85)',
        blackLight: '#003648',
        greenLight1: '#01C08B',
        cardBg: '#1D2932',
        chartBg: '#001320',
        warn: '#DEA550',
        error: '#DE5050',
        gradientFrom: '#00c6a2',
        selectUIBg: 'rgba(58, 69, 77, 0.6)',
        selectUI: '#323E46',
        voteLabel: 'rgba(26, 35, 41, 0.6)',
        gradientTo: '#008b72',
        gradientFromHover: '#00D6AF',
        gradientToHover: '#00967B',
        poolRowHover: '#001320',
        primaryText: '#7E8A93',
        inputDarkBg: 'rgba(15, 13, 13, 0.2)',
        navHighLightBg: '#304452',
        navHighLightText: '#C6D1DA',
        slipBg: '#3e4e59',
        farmText: '#73818B',
        farmSplitLine: '#314351',
        farmDark: '#2B3A44',
        framBorder: '#00C6A2',
        farmSbg: '#2F3D47',
        farmRound: '#B3C2CC',
        transakBlue: '#2F8FFF',
        farmTopRight: '#008870',
        datebg: '#637684',
        xrefbg: '#0F1D27',
        greenColor: '#00C6A2',
        xrefTab: '#293741',
        borderColor: '#7e8a93',
        warnColor: '#DE9450',
        durationBg: '#445867',
        BTCColor: '#F38632',
        NEARBlue: '#418DFF',
        acccountTab: '#0F1D27',
        acccountBlock: '#293741',
        xREFColor: '#A7ABAD',
        purple: '#8c78ff',
        blueTip: '#0A7AFF',
        darkGreenColor: '#009A2B',
        riskTextColor: '#BEBEBE',
        senderHot: '#00FFD1',
        auroraGreen: '#70D44B',
        triPool: '#329DFF',
        refPool: '#00C6A2',
        lightGreenColor: '#00FFF0',
        tabChosen: '#4A5862',
        liqBtn: '#141D24',
        farmV2TabColor: '#4A5862',
        farmV2SmallTabCOlor: '#1A2329',
        farmV2BoxBg: '#141D24',
        farmV2WithDrawBg: '#151E29',
        farmV2TabColor: '#4A5862',
        farmV2SmallTabCOlor: '#1A2329',
        farmV2BoxBg: '#141D24',
        selectBorder: '#415462',
        farmV2WithDrawBg: '#151E29',
        maxBorderColor: '#373F45',
        darkBg: '#111518',
        lightBg: '#C4C4C4',
        lockedBg: '#323C43',
        redwarningColor: '#FF7575',
        deepBlue: '#4627FF',
        deepBlueHover: '#7176FB',
        searchBgColor: 'rgba(29, 41, 50, 0.5)',
        lightGreyColor: '#92877D',
        dashBorderColor: '#6e7c85',
        freeTitleBg: '#404F59',
        lockTitleBg: '#0094FF',
        priceBoardColor: '#172128',
        lightRedColor: '#FF7575',
        newpurple: '#7F43FF',
        purpleColor: '#BD9FFF',
        lightPurpleColor: 'rgba(126, 69, 255, 0.2)',
        darkGreenColor: '#00CEC2',
        purpleColor: '#BD9FFF',
        lightPurpleColor: 'rgba(126, 69, 255, 0.2)',
        lightBGreyColor: '#646464',
        pendingPurple: '#615EFF',
        mengColor: '#3A4D5B',
        lightGreenColor_p: '#70d44b',
        otherGreenColor: '#00E9BF',
        greyCircleColor: '#889FAE',
        farmBoostingGotoFarm: 'rgba(43, 23, 85, 0.7)',
        borderGreyColor: '#6E7C85',
        purpleColorF: 'gba(27, 27, 27, 0.24)',
        borderLightBlueColor: 'rgba(115, 129, 139, 0.5)',
        bgDarkColor: 'rgba(0, 19, 32, 0.5)',
        warnRedColor: 'rgba(255, 117, 117, 0.5)',
        darkBlackColor: '#111C24',
      },
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      width: {
        '25vw': '25vw',
        '35vw': '35vw',
        '40vw': '40vw',
        '95vw': '95vw',
        '580px': '580px',
        '560px': '560px',
        '1024px': '1024px',
        '360px': '360px',
        '80vw': '80vw',
        '90vw': '90vw',
        '30vw': '30vw',
        '480px': '480px',
        smartRoute: '292px',
        54: '13.5rem',
        34: '8.5rem',
      },
      maxWidth: {
        '200px': '200px',
      },
      minHeight: {
        8: '2rem',
      },
      minWidth: {
        20: '5rem',
        28: '7rem',
        72: '18rem',
        36: '9rem',
        24: '6rem',
        40: '10rem',
        32: '8rem',
      },
    },
    plugins: [],
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      borderWidth: ['hover'],
      backgroundImage: ['hover'],
      cursor: ['disabled'],
      padding: ['last'],
      display: ['hover'],
    },
  },
};
