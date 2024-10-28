module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@/components": "./src/components",
            "@/pages": "./src/pages",
            "@/helpers": "./src/helpers",
            "@/assets": "./src/assets",
          },
        },
      ],
      "nativewind/babel",
      'react-native-reanimated/plugin'
    ],
  };
};
