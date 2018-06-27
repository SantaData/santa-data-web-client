/*
* Arquivo de controle dos pacientes
*/

var service = require('./base_server')

//Herança
const patient_service = Object.create(service)

/*
* Busca de pacientes por nome
* @param data {name}
* @return Promise {result}
*/
patient_service.search = (data,userId,hash) =>{
    return patient_service.make_request(`/gen/search/patient/${userId}/${hash}/`,'POST',data);
}

/*
* Recupera dado do paciente
* @param data {patientId}
* @return Promise {result}
*/
patient_service.search = (data,userId,hash) =>{
    return patient_service.make_request(`/gen/get/patient/${data.patientId}/${userId}/${hash}/`,'POST',{});
}


module.exports = patient_service