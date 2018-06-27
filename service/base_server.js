/*
* Arquivo base de serviços
*
* (C) João Carlos Pandolfi Santana - 27/06/2018 
*/

//Libs
const request = require('request')
const config = require('../constants/config')
const globalf = require('../controller/utils/global')

const base_service = {

    make_request: (path,method,data) =>{
        return new Promise((resolve,reject)=>{
            request({
                url: `${config.server}${path}`,
                method: method,
                json: true,   // <--Very important!!!
                rejectUnauthorized: false,
                requestCert: true,
                agent: false,
                body: {
                    data: globalf.encode_data(data)
                }
            }, (error, response, body) => {
                if(!error){
                    if(body.data.success) resolve(body)
                    else reject(body):
                }
                else reject({success:false, message: "Internal route error", error:error})
            });
        });
    }
}


module.exports = base_service;