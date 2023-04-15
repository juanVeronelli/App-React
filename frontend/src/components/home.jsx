import React, {useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import cookie from 'js-cookie'

// styles
import { Link } from 'react-router-dom';
import { Card, CardImg, CardTitle, CardText, CardDeck, CardSubtitle, CardBody } from 'reactstrap';

const Home = () => {

    const state = useLocation()
    const navigation = useNavigate()
    async function getUsers() {
        try{
            const response = await axios.get('http://localhost:3000/users', {
                method: 'GET',
                headers: {
                    'x-access-token': state.state.userData
                }
            })
            console.log(state.state);
        } catch (error){}
    }

    useEffect(()=> {
        try{
            const token = state.state.userData
            if(token){
                const decodedToken = jwt_decode(token)
                const currentTime = Date.now() / 1000 ;

                if(decodedToken.exp < currentTime) {
                    alert('la sesion a expirado seras redirigdo');
                    navigation('/login')
                }
            } else if (!token){
                navigation('/login')
            }
        } catch{
            navigation('/login')
        }
    }, [state])

    return (
        <>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/home">Llive <span className="fw-bold">JPG</span></Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">Profile</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="container mt-5">
           
          </div>
        </>
      );
}

export default Home;