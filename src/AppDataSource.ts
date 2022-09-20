import { DataSource } from "typeorm";
import config from "../config/config.dev";


// Initialize DB connection
const AppDataSource: DataSource = new DataSource({
    type: "mysql",
    host: config.db.host,
    port: config.db.port,
    username: config.db.username,
    password: config.db.password,
    database: config.db.dbname,
    entities: [__dirname + "/entities/*.entity.js"],
    synchronize: true
});


AppDataSource.initialize()
  .then(() => {
      console.log("App Data Source has been initialized!")
  })
  .catch((err) => {
      console.error("Error during Data Source initialization", err)
  })




export default AppDataSource;