import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  palette: {
    main: {
      CARPET_BLACK: '#19191E',
      DARK_BLACK: '#000000',
    },
    grey: {
      '1': '#2E2E30',
      '2': '#646464',
      '3': '#949494',
      '4': '#DCDCDC',
      '5': '#EFEFEF',
      '6': '#F6F6F6',
      WHITE: '#FFFFFF',
    },
    state: {
      RED: '#E60000',
      YELLOW: '#FFC600',
      ORANGE: '#FE7E08',
      BLUE: '#107EFF',
    },
    social: {
      KAKAO: '#FFE812',
      NAVER: '#72D85D',
      GOOGLE: '#F8F8F8',
      FACEBOOK: '#3C5A9A',
      APPLE: '#000000',
    },
  },
  typography: {
    size: {
      heading1: 24,
      heading2: 20,
      heading3: 18,
      heading4: 16,
      heading5: 14,
      heading6: 12,
      body1: 16,
      body2: 14,
      body3: 12,
      body4: 10,
    },
  },
};

export default theme;
