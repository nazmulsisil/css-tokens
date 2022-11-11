# Static Assets

This repository hosts the static assets, e.g. CSS tokens that are used across the Agosh applications

## How to use these static assets from an application

In the head tag the asset can be linked, e.g. in this case the CSS tokens,

```
<link rel="stylesheet" href="https://fe-static.agosh.com/tokens/main.css">
```

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
