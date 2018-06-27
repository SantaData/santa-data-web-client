/*
* Users router
*/

const bCrypt = require('bcryptjs');
const user_service = require('../service/user_service')


// Generates hash using bCrypt
const createHash = (password) => {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null)
};


const isValidPassword = (user, password) => {
    return bCrypt.compareSync(password, user.password)
};

const validaData = (data) => {
    let {name, password, email} = data;
    return !(!name || !password || !email);
};

exports.logout = (req, res, next) => {
    delete req.session.user;
    db.query('DELETE FROM user_session_data WHERE sid=$1', [req.session.id]).then(result => {
        res.clearCookie('Stonehenge', {
            path: '/',
            secure: false,
            httpOnly: true,
        });
        res.redirect('/login')
    }).catch(e => {
        console.error(e);
        res.status(500).send('Not ok')
    })
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

//ROTAS

exports.login = (req, res) => {
    if (req.session.user) res.send({success:true});
    else{
        let data = {}
        data.password = req.body.password;
        data.email = req.body.email;

        if(!data.password || ! data.email)
            return res.send({success:false, message:'Give me email and password'})


        user_service.login(data)
            .then(result=>{
                req.session.user = result.data;
                res.send({success:true})
            })
            .catch(result=>{
                res.send(result)
            })
    }
};
