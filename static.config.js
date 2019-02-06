require("babel-polyfill");

import React from "react";
import path from 'path'
import { omit } from 'lodash'
import { readFileSync } from "fs";

const typescriptWebpackPaths = require('./webpack.config.js')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const readData = () => JSON.parse( readFileSync('public/data.json').toString("utf8") );

export default {
  entry: path.join(__dirname, 'src', 'index.tsx'),
  siteRoot: "https://portfolio.amir.cloud",
  getSiteData: async () => ({
    projects: await readData().projects.map((page) => omit(page, "images"))
  }),
  getRoutes: async () => {
    const data = await readData();
    return [
      {
        path: '/',
        component: 'src/containers/home',
      },
      ...data.projects.map((page) => ({
        path: `/${page.slug}`,
        component: 'src/containers/project',
        getData: () => ({
          project: page
        })
      })),
      {
        path: '/about',
        component: 'src/containers/about',
      },
      {
        is404: true,
        component: 'src/containers/404',
      },
    ]
  },
  Document: class CustomHtml extends React.Component {
    render() {
      const {
        Html, Head, Body, children, renderMeta,
      } = this.props;
      return (
        <Html lang={"en"}>
        <Head>
          <meta charSet="UTF-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          {renderMeta.styleTags}
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-129679487-2" />
          <script dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-129679487-2');`
          }}/>
        </Head>
        <Body>
        {children}
        </Body>
        </Html>
      )
    }
  },
  webpack: (config, { defaultLoaders }) => {
    // Add .ts and .tsx extension to resolver
    config.resolve.extensions.push('.ts', '.tsx')

    // Add TypeScript Path Mappings (from tsconfig via webpack.config.js)
    // to react-statics alias resolution
    config.resolve.alias = typescriptWebpackPaths.resolve.alias

    // We replace the existing JS rule with one, that allows us to use
    // both TypeScript and JavaScript interchangeably
    config.module.rules = [
      {
        oneOf: [
          {
            test: /\.(js|jsx|ts|tsx)$/,
            exclude: defaultLoaders.jsLoader.exclude, // as std jsLoader exclude
            use: [
              {
                loader: 'babel-loader',
              },
              {
                loader: require.resolve('ts-loader'),
                options: {
                  transpileOnly: true,
                },
              },
            ],
          },
          // defaultLoaders.cssLoader,
          {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
              fallback: "style-loader",
              use: "css-loader"
            })
          },
          defaultLoaders.fileLoader,
        ],
      },
    ]

    config.plugins = [ ...config.plugins, new ExtractTextPlugin("styles.css") ]
    return config
  },
}
