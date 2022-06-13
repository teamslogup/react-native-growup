import 'styled-components';

declare module 'styled-components' {
  interface DefaultTheme {
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
}
