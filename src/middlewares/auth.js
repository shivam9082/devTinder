const adminAuth = (req,res,next) =>{
    const token = 'xyzabc';
    isAuthAdmin = token==='xyz';
    if(!isAuthAdmin){
        res.status(401).send('Unauthorized Admin');
    }
    else{
        next();
    }
}

const userAuth = (req,res,next) =>{
    const token = 'xyz';
    isUserAdmin = token==='xyz';
    if(!isUserAdmin){
        res.status(401).send('Unauthorized User');
    }
    else{
        next();
    }
}

module.exports = {adminAuth,userAuth};