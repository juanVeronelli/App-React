import jwt from 'jsonwebtoken';
const config = require('../../../../config')

export default function isUserAuthenticated(token) {
    if (token) {
      try {
        const decodedToken = jwt.verify(token, config.SECRET); 
        const now = Math.floor(Date.now() / 1000); 
        if (decodedToken.exp > now) { 
          return true; // El JWT es válido y activo
        }
      } catch (error) {
        console.log(error); 
      }
    }
    return false; // El JWT no está activo o no existe
  }

