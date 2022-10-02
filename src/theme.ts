import { DefaultTheme } from "styled-components";
const size = {
  mobile: "767px",
  tablet_min: "768px",
  tablet_max: "1439px",
  desktop: "1440px",
};
export const theme: DefaultTheme = {
  red: "#E51013",
  blue: "dodgerblue",
  mobile: `all and (max-width:${size.mobile})`,
  tablet: `(min-width:${size.tablet_min}) and (max-width:${size.tablet_max})`,
  desktop: `(min-width:${size.desktop})`,
  black: {
    veryDark: "#141414",
    darker: "#181818",
    lighter: "#2F2F2F",
  },
  white: {
    lighter: "#fff",
    darker: "#e5e5e5",
  },
};
