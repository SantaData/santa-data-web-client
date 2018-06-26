// BASE 64 FUNCIONS
if (typeof btoa === 'undefined') {
    global.btoa = function (str) {
      return new Buffer(str, 'binary').toString('base64');
    };
  }
  
  if (typeof atob === 'undefined') {
    global.atob = function (b64Encoded) {
      return new Buffer(b64Encoded, 'base64').toString('binary');
    };
  }
  


module.exports = {
    encode_data: (data)=>{
        return btoa(JSON.stringify(data))
    },

    decode_data: (data)=>{
        return JSON.parse(atob(data))
    }
}