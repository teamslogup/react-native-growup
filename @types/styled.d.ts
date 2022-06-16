import 'styled-components';

declare module 'styled-components' {
  interface Palette {
    main: {
      CARPET_BLACK: string;
      DARK_BLACK: string;
    };
    grey: {
      1: string;
      2: string;
      3: string;
      4: string;
      5: string;
      6: string;
      WHITE: string;
    };
    state: {
      RED: string;
      YELLOW: string;
      ORANGE: string;
      BLUE: string;
    };
    social: {
      KAKAO: string;
      NAVER: string;
      FACEBOOK: string;
      GOOGLE: string;
      APPLE: string;
    };
  }

  interface FontSize {
    heading1: number;
    heading2: number;
    heading3: number;
    heading4: number;
    heading5: number;
    heading6: number;
    body1: number;
    body2: number;
    body3: number;
    body4: number;
  }

  interface DefaultTheme {
    palette: Palette;
    typography: {
      size: FontSize;
    };
  }
}
