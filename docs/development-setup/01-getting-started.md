---
sidebar_position: 1
---

# Getting started

## Browser and OS compatibility

You can consult the [PRF compatibility matrix](https://github.com/wwWallet/wallet-frontend#prf-compatibility) regarding browser support and supported operating systems.

## Development on docker containers

### Prerequisites

- Docker & Docker Compose
- An SSH key added to GitHub

### Clone the repositories

1. Clone wallet-ecosystem repository
```sh
git clone git@github.com:wwWallet/wallet-ecosystem.git
```
2. Launch VSCode in the newly created `wallet-ecosystem` folder
3. Initialize and update submodules

```sh
git submodule init
git submodule update --remote
```


4. Create a github token using the [guide to install ssi-sdk](#a---how-to-generate-a-github-access-token-to-download-the-ssi-sdk-npm-package)


5. Configure `wallet-frontend`'s environment:

```sh
cd wallet-frontend
cp .env.template .env
```

You can leave the `.env` file as is but if you have set up a firebase project, you can fill in the variables according to your own configuration. Below is an explanation for each variable:

	 - HOST: The IP address where your app will be running (default is '0.0.0.0').
	 - PORT: The port on which your app will run (default is 3000).
	 - VAPIDKEY: Your Vapid key (public key for cloud messaging firebase) for push notifications.
	 - REACT_APP_WS_URL: The URL of the websocket service.
	 - REACT_APP_WALLET_BACKEND_URL: The URL of your backend service.
	 - REACT_APP_LOGIN_WITH_PASSWORD: A Boolean value which show/hide the classic login/signup.
	 - REACT_APP_FIREBASE_API_KEY: Your API key for Firebase. 
	 - REACT_APP_FIREBASE_AUTH_DOMAIN: Your Firebase authentication domain.
	 - REACT_APP_FIREBASE_PROJECT_ID: Your Firebase project ID.
	 - REACT_APP_FIREBASE_STORAGE_BUCKET: Your Firebase storage bucket.
	 - REACT_APP_FIREBASE_MESSAGING_SENDER_ID: Your Firebase Messaging Sender ID.
	 - REACT_APP_FIREBASE_APP_ID: Your Firebase App ID. 
	 - REACT_APP_FIREBASE_MEASUREMENT_ID: Your Firebase Measurement ID.

6. Setting Up Firebase (Optional) using the [guide to set up Firebase](#b---how-to-set-up-firebase-cloud-messaging-for-push-notfications)

7. Configure `/etc/hosts`

Add the following lines in the /etc/hosts file:

```sh
127.0.0.1 wallet-frontend
127.0.0.1 wallet-backend-server
127.0.0.1 wallet-enterprise-vid-issuer
127.0.0.1 wallet-enterprise-diploma-issuer
127.0.0.1 wallet-enterprise-acme-verifier
```

8. Start the ecosystem

For demonstrative purposes, we are going to set up a small ecosystem with:
- 1 Wallet Provider
- 1 Credential Issuer (University of Athens)
- 1 Credential VID Issuer (Gov Issuer)

The initial configuration of the legal entities takes place once we start the ecosystem:

```sh
node ecosystem.js up -t
```

For more options, see:

```sh
node ecosystem.js up --help
```

To shut down the ecosystem run the following command:

```sh
node ecosystem.js down
```

## Supported Flows

#### Wallet-initiated Issuance Flow (Authorization Code Grant)
- Start the issuing from the wallet: [http://localhost:3000/add](http://localhost:3000/add)
- Redirect to the issuing platform and select a method of authentication
- Fetch, review and select a credential
- Return to the wallet with the received credential

#### Issuer-initiated Issuance Flow (Pre-authorized Code Flow)
- Start the issuing from the issuer's platform
  - VID Issuer: [http://wallet-enterprise-vid-issuer:8003/](http://wallet-enterprise-vid-issuer:8003/)
  - Diploma Issuer: [http://wallet-enterprise-diploma-issuer:8000/](http://wallet-enterprise-diploma-issuer:8003/)
- Select a method of authentication
- Fetch, review and select a credential
- Scan QR to receive credential on the wallet

#### Verifier-initiated Presentation Flow
- Start from the verifier's platform: [http://wallet-enterprise-acme-verifier:8005/](http://wallet-enterprise-acme-verifier:8005)
- Apply for a Software Engineer's job
- Scan the QR to present your VC

## References

### A - How to generate a Github access token to download the ssi-sdk npm package

Generate a Git Personal Access Token in order to install GUnet's `ssi-sdk` npm package:

  a. Go to https://github.com/settings/tokens
  
  b. Generate a new token with `read:packages` scope
  
  c. Save the token on a `.github-token` file on the root of the `wallet-ecosystem` local repository

  ### B - How to set up Firebase Cloud Messaging for Push Notfications

a. Create a Firebase Project
  - Go to the Firebase Console (https://console.firebase.google.com/).
  - Click "Add Project" to create a new Firebase project.
  - Configure your project settings.
  
b. Configure Firebase for Web
  - After creating the project, Add app and select "Web."
  - Register your app with a name (e.g., "MyApp").
  - Firebase will provide you with a configuration `firebaseConfig` object; keep this handy.

c. Get Service Account Key
- Navigate to "Project settings" > "Service accounts."
- Under the "Firebase Admin SDK" section, click "Generate new private key" to download the JSON file.
- in root of wallet-backend paste this file inside the `keys/` folder if the folder does not exist, then create it with name "firebaseConfig.json"
- The file name should be the same with the `notifications.serviceAccount` JSON attribute on the configuration of the wallet-backend-server which is located on the `config/` folder. That being said, the `notifications.serviceAccount` JSON attribute should be set to `firebaseConfig.json`
- The `notifications.enabled` JSON attribute on the wallet-backend-server configuration should be set to `"true"`



d. Generate VAPID Key
- Navigate to "Project settings" > "Service accounts > Cloud Messaging." 
- Scroll down to the "Web configuration" section.
- You should see an option to generate a new VAPID key. Click the "Generate" button.
- After generating the VAPID key, you'll see it displayed on the screen.
- Save this VAPID key securely, as you'll need it in your frontend.

e. Fill config variables in Frontend
- With your `firebaseConfig` and the VAPID KEY now you can fill the wallet-frontend `.env`.
- Also navigate to `wallet-frontend/public/firebase-messaging-sw.js` and replace the `firebaseConfig` with yours. 
