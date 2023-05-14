import jwt_decode from "jwt-decode";


const expired = (token) => {
    try {
        if (token) {
  
          const decodedToken = jwt_decode(token);
          const currentTime = Date.now() / 1000;
  
          if (decodedToken.exp < currentTime) {
            return true
          }
        } else if (!token) {
          return true
        }
        return false
      } catch {
        return true
      }
}

export default expired;