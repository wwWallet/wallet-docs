
# 1. Development
## Install

```
yarn install
```

## Change configuration

Edit `config/config.dev.ts` file to change the configuration of the app.
## Run in dev mode 

```
yarn dev
```


# 2 Production

## Package the pre-built source code

```
yarn paketo
```

## Install and Build for production

This step must run on a VirtualBox identical to the production system (same OS version, etc)

```
yarn build:prod
```

After this step you can create a tar with the following files:
```
dist/
node_modules/
package.json
```
and transfer it to the production system.

## Start

```
yarn start
```
