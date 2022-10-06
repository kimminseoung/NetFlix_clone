import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    red: string;
    blue: string;
    mobile?: string;
    tablet?: string;
    desktop?: string;
    bigdesktop?: string;
    black: {
      veryDark: string;
      darker: string;
      lighter: string;
    };
    white: {
      darker: string;
      lighter: string;
    };
  }
}
