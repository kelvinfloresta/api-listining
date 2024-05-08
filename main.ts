import { App } from "./app/app";
import { config } from "./config";


const { server } = new App()

server.listen(config.port, () => {
    console.log("listening on port:", config.port)
})