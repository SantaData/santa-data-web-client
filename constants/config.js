/*
* Arquivo de configuração e credencial
*/

const config = {
    env: "dev",
    dev:{
        server: "https://31.220.54.251:8444"
    },

    prod: {
        server: "https://31.220.54.251:8443"
    },

    local:{
        server: "http://localhost:8444"
    }
}

module.exports = config.env === 'dev'? config.dev : config.env === 'local'? config.local : config.prod;