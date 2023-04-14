import React, {useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

const Home = () => {

    const state = useLocation()
    const navigation = useNavigate()
    async function getUsers() {
        try{
            console.log(state.state.userData.token)
            const response = await axios.get('http://localhost:3000/users', {
                method: 'GET',
                headers: {
                    'x-access-token': state.state.userData.token
                }
            })
            console.log(response.data);
        } catch (error){
            console.log(error);
        }
    }

    useEffect(()=> {
        const token = state.state.userData.token
        if(token){
            const decodedToken = jwt_decode(token)
            const currentTime = Date.now() / 1000 ;

            if(decodedToken.exp < currentTime) {
                alert('la sesion a expirado seras redirigdo');
                navigation('/login')
            }
        }
    }, [state])

    return <>
        <h1> hola  </h1>
        <button onClick={getUsers}> ENVIAR PAPI</button>
    </>
}

export default Home;