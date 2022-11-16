# Static Assets

This repository hosts the static assets, e.g. CSS tokens that are used across the Agosh applications

## How to use these static assets from an application

In the head tag the asset can be linked, e.g. in this case the CSS tokens,

```
<link rel="stylesheet" href="https://fe-static.agosh.com/tokens/main.css">
```

## Generating Tokens and deploying

Tokens are generated in `src/tokens` folder. It is needed to copy and paste the design token file at `src/tokens/m3.tokens.json` that we get from Figma. After that we need to run `npm run build-tokens` to generate the tokens as javascript files and then we need to run `np run build-css` to transform those tokens from javascript to CSS according to our configuration specified on `src/tokens/transform-css.js` file. Both these npm commands are included on the `npm run prebuild` command.

To deploy the tokens, we need to run `npm i && npm run build`. This will create a css file on the dist folder at the project root.

## Deployment

We need to deploy some static assets from this repository's dist folder, but before that we need to run a build command. Here are the commands,

- Install command

```
npm install
```

- Build command

```
npm run build
```

- Output directory

```
dist
```
