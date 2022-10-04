const STORE_BACKEND_HOST = "localhost";
const STORE_BACKEND_PORT = 8001;

const FRONT_HOST = "localhost";
const FRONT_PORT = 3000;

const SIGNATORY_BACKEND_HOST = "localhost";
const SIGNATORY_BACKEND_PORT = 8002;

const config = {
	url: `http://${STORE_BACKEND_HOST}:${STORE_BACKEND_PORT}`,
	port: STORE_BACKEND_PORT,
	appSecret: "",
	appTokenExpiration: "24h", // "1h", "1d" 
	front: {
		url: `http://${FRONT_HOST}:${FRONT_PORT}`,
	},
	db: {
			host: "localhost",
			port: 3306,
			username: "",
			password: "",
			dbname: "wallet_store"
	},
	signatoryNode: {
		url: `http://${SIGNATORY_BACKEND_HOST}:${SIGNATORY_BACKEND_PORT}`
	},
	tirURL: "https://api.preprod.ebsi.eu/trusted-issuers-registry/v3/issuers",
}

export default config;