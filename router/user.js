/*
* Users router
*/

const bCrypt = require('bcryptjs');
// var Util = require('./utils')

// Generates hash using bCrypt
const createHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null)
};


const isValidPassword = function (user, password) {
    return bCrypt.compareSync(password, user.password)
};

const validaData = (data) => {
    let {name, password, email} = data;
    return !(!name || !password || !email);
};


var checkPermission = (req, res, next, level) =>{ 
    if (process.env.NODE_ENV == 'dev') next() 
    else{ 
        if (req.session.user){ 
            let permission = req.session.user.permission; 
            if (permission === 1 || permission === level) next(); 
            else res.redirect('/login') 
        } 
        else res.redirect('/login') 
    } 
} 
 

exports.checkPermissionLvl2 = (req, res, next) =>{
    return checkPermission(req,res,next,2)
};

exports.checkPermissionLvl3 = (req, res, next) =>{
    return checkPermission(req,res,next,3)
};


exports.isLoggedIn = (req, res, next) =>{
    // if(true) next()
    // else
        // Caso esteja em modo dev
        if (process.env.NODE_ENV === 'dev') next();
        else{
            if (req.session.user){
                res.locals.user = req.session.user;
                next()
            }
            else res.redirect('/login')
        }
};


exports.login = (req, res) => {
    if (req.session.user) res.send('Success!');
    else{
        let { password, email } = req.body;
        //ACESSA ROUTER E VERIFICA O LOGIN
        //db.query('SELECT * FROM users WHERE email=$1', [email]).then(result => {
            if (result.rowCount) {
                let user = result.rows[0];
                if(isValidPassword(user, password)){
                    // CREATE SESSION
                    delete user.password;
                    req.session.user = user;
                    res.send('Success!')
                }
                else{
                    res.status(400).send('Invalid password.')
                }
            }
            else res.status(404).send('User not found.')
        //})
    }
};
