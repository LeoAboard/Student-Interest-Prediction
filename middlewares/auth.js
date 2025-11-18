const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateToken(id){

  let token = jwt.sign(
    {id: id},
    process.env.JWT_SECRET,
    {expiresIn: '5d'}
  );

  return token;
}

function authToken(req, res, next){             

  console.log(req.cookies)
  const token = req.cookies.token;

  if(!token) return res.status(403).json({ error: `Usuário não autênticado` });

  const payload = jwt.verify(token, process.env.JWT_SECRET);
  req.id = payload;
  
  next();
}

module.exports = { generateToken, authToken }