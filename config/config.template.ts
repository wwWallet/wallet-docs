const BACKEND_HOST = "localhost";
const BACKEND_PORT = 8001;

const FRONT_HOST = "localhost";
const FRONT_PORT = 3000;

const config = {
	url: `http://${BACKEND_HOST}:${BACKEND_PORT}`,
	port: BACKEND_PORT,
	appSecret: "dmvkkj34jo42rfkvdsfgerogmo3dsf",
	appTokenExpiration: "24h", // "1h", "1d" 
	front: {
		url: `http://${FRONT_HOST}:${FRONT_PORT}`,
	},
	db: {
			host: "localhost",
			port: 3306,
			username: "",
			password: "",
			dbname: ""
	},

}

export default config;