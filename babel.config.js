module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src/'],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.svg'],
        alias: {
          // Src
          '@src': './src',

          // Assets
          '@assets': './src/assets',

          // Components
          '@components': './src/components',

          // Hooks
          '@hooks': './src/hooks',

          // Navigation
          '@navigation': './src/navigation',
          '@navStacks': './src/navigation/Stacks',

          // Redux
          '@redux': './src/redux',

          // Screens
          '@authScreens': './src/screens/Auth',
          '@appScreens': './src/screens/App',
          '@appIntroScreens': './src/screens/AppIntro',

          // Shared Theme & Utils
          '@shared': './src/shared',

          // Shared Assets
          '@appAssets': './src/shared/assets',

          // Theme
          '@theme': './src/shared/theme',

          // Utils
          '@utils': './src/shared/utils',
        },
      },
    ],

    'react-native-reanimated/plugin',
  ],
};
