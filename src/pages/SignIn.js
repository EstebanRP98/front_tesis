import React, {useEffect, useState}from 'react'
import { Card, Container, Row,Col} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import SignInForm from '../components/forms/SignInForm'
import validator from 'validator';
import { isObjEmpty } from '../helpers/helpers';
import { loginUser } from '../actions/authActions';
import {useNavigate} from 'react-router-dom'

export default function SignIn() {

    const [errors, setErrors] = useState({});
    const dispatch = useDispatch()
    const loggedIn = useSelector(state => state.auth.loggedIn);
    const navigate  = useNavigate();

    useEffect(() => {
        if(loggedIn){
            navigate('/');
        }
        
    });

    const login = ({email,password}) => {
        const errors = {}
        setErrors(errors);

        if(!validator.isEmail(email)){
            errors.email="El correo electronico es invalido";
        }
        if(validator.isEmpty(password)){
            errors.password="La contraseña no puede estar vacia"
        }
        if(!isObjEmpty(errors)){
            console.log("erorrss")
            setErrors(errors);
            return ;
        }

        dispatch(loginUser({email,password}))
        .then(response => {

        }).catch(error => {

        });

    }



    return (
        <Container className="mt-5">
            <Row>
                <Col sm="12" md={{span:8,offset:2}} lg={{span:6, offset:3}}>
                    <Card body>
                        <h3>Iniciar Sesion </h3><hr/>
                        <SignInForm errors={errors} onSubmitCallback={login}></SignInForm>
                        <div className="mt-4">
                            <Link to={"/signup"}>No tienes una cuenta? Registrate aqui</Link>
                        </div>
                    </Card>
                </Col>
            </Row>

        </Container>
    )
}
