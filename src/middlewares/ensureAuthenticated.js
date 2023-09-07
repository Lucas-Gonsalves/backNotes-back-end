const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../config/auth");
const { request } = require("express");


function ensureAuthenticated() {
  const authHeader = request.headers.authorization;

  
  if(!authHeader) {
    throw new AppError("Token de identificação inválido", 401);
  }


  const [ , token ] = authHeader.split(" ");


  try {
    const { sub : user_id } = verify(token, authConfig.jwt.secret);

    request.user = {
      id: Number(user_id)
    };

    return next;
  
  } catch {
    throw new AppError("Token de identificação inválido.", 401);
  };
};


module.exports = ensureAuthenticated;