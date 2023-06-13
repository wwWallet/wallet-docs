---
sidebar_position: 1
---

# Getting started


## Prerequisites

- Docker & Docker Compose
- Visual Studio Code
- Docker VSCode extension
- Dev Containers VSCode extension


# Start the ecosystem

1. Clone wallet-start repository
```sh
git clone git@github.com:gunet/wallet-start.git
```
2. Launch VSCode in the newly created `wallet-start` folder
3. Initialize and update submodules

```sh
git submodule init
git submodule update --remote
```
4. Launch the ecosystem:

```sh
chmod +x ecosystem.sh
./ecosystem.sh up
```

The `up` command will build and start the containers with a default configuration for local development.

To shut down the ecosystem run the following command:

```sh
./ecosystem.sh down
```

5. After the containers are up, enter a container using `Ctrl+Shift+P >Dev Containers: Attach to Running Container` vscode command and selecting a dev container
6. Move new VSCode workspace to the Work Directory folder (evident in development.Dockerfile), usually `/home/node/app`.
