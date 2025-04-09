import { defineConfig } from 'cypress'

export default defineConfig({
  video: false,
  component: {
    specPattern: './tests/**/*.cy.{ts,tsx}',
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
      webpackConfig: {
        mode: 'test',
        devtool: false,
        module: {
          rules: [
            {
              test: /\.(ts|tsx)$/,
              use: [
                {
                  loader: 'babel-loader', // Transpile ES6+ to ES5
                  options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                    plugins: [
                      [
                        '@babel/plugin-transform-modules-commonjs',
                        { loose: true },
                      ],
                    ],
                  },
                },
                {
                  loader: 'ts-loader', // Compile TypeScript to JavaScript
                  options: {
                    transpileOnly: true, // Enable transpilation only mode
                  },
                },
              ],
            },
          ],
        },
        resolve: {
          extensions: ['.tsx', '.ts', '.js', '.jsx', '.json', '.scss'],
        },
      },
    },
  },
})
