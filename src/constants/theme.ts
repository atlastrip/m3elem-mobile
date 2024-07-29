import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const COLORS = {
  primary: "#3a7f41",
  secondary: "#321a47",
  black: {
    dark: "#141721",
    med: "#202534",
    light: "#34394A",
  },
  logo: {
    primary:
      "https://github.com/WalidMoultamiss/WalidMoultamiss/assets/77829205/bb9c3738-5627-47cc-801e-b39efd382bbf",
    sign: {
      black:
        "https://github.com/WalidMoultamiss/WalidMoultamiss/assets/77829205/b783c820-9444-4639-8f5c-5f2b3b55864e",
      orange:
        "https://github.com/WalidMoultamiss/WalidMoultamiss/assets/77829205/a405f4fc-5b64-454a-b21c-39e49d1e4029",
    },
  },
  white: "#fff",
};
export const SIZES = {
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  largeTitle: 40,
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  h5: 12,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};

export const SHADOWS = {
  small: {
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 1,
    primary: {
      shadowColor: COLORS.primary,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.05,
      shadowRadius: 3.84,
      elevation: 1,
    },
  },
  xl: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    primary: {
        shadowColor: COLORS.primary,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
  },
};

export const FONTS = {
  largeTitle: { fontSize: SIZES.largeTitle },
  h1: { fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontSize: SIZES.h4, lineHeight: 22 },
  h5: { fontSize: SIZES.h5, lineHeight: 22 },
  body1: {
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: {
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
  body5: {
    fontSize: SIZES.body5,
    lineHeight: 22,
  },
};

export const appTheme = { COLORS, SIZES, FONTS };
