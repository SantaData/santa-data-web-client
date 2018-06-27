/*
* Serviço do usuário
*
* (C) João Carlos Pandolfi Santana - 27/06/2018 
*/
var service = require('./base_server')

//Herança
const user_service = Object.create(service)

/*
* Efetua login do usuário
* @param data {email, password}
* @return Promisse {result}
*/
user_service.login = (data) =>{
    return user_service.make_request('/auth/login','POST',data)
}

module.exports = user_service;