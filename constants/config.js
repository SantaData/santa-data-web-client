const config = {
    env: "dev",
    dev:{
        server: ""
    },

    prod: {
        server: ""
    },

    local:{
        server: ""
    }
}

module.exports = config.env === 'dev'? config.dev : config.env === 'local'? config.local : config.prod;