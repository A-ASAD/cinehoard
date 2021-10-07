import React, { useState } from 'react'
import { Col, Container, Form, Row, Button, ToastContainer, Toast } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import jwt_decode from "jwt-decode"
import { userLogin } from '../store/auth/actions';

import '../styles/editProfile.css'
import { sendRequest } from '../wrappers/apiWrappers';


export default function EditProfile() {

    const auth = useSelector(state => state.auth);
    const [validated, setValidated] = useState(false);
    const [isErrorOnRegister, setIsErrorOnRegister] = useState(false);
    const [detailsUpdated, setDetailsUpdated] = useState(false);
    const dispatch = useDispatch();
    const [firstname, setFirstname] = useState(auth.firstname);
    const [lastname, setLastname] = useState(auth.lastname);
    const [email, setEmail] = useState(auth.email);


    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        // validate form data and then validate user
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        }
        else{
            event.preventDefault();
            const response = await sendRequest(
                `user/update/`,
                'post',
                auth.token,
                { username:auth.user, email, first_name:firstname, last_name:lastname }
                );
            // redirect to dashboard if valid user else show error message
            if(response.access){
                dispatch(userLogin({
                    access: response.access,
                    user: jwt_decode(response.access).user,
                    firstname: jwt_decode(response.access).firstname,
                    lastname: jwt_decode(response.access).lastname,
                    email: jwt_decode(response.access).email,
                }));
                setDetailsUpdated(true);
            }
            else{
                setIsErrorOnRegister(true);
            }
        }
    }

    return (
        <Container fluid>
            <Row className='justify-content-center edit-profile mt-4'>
                <div className='p-5 bg-secondary user-thumbnail'>
                    <i className="fas fa-user fa-4x"></i>
                </div>
                <div className='text-center mt-2'>{auth.user}</div>
                <Col md={8} lg={6} className='mt-4'>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>First Name:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Firstname"
                                value={firstname}
                                onChange={(e)=>setFirstname(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Last Name:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Lastname"
                                value={lastname}
                                onChange={(e)=>setLastname(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value.trim())}
                            />
                            <Form.Control.Feedback  type='invalid'>Email is required!</Form.Control.Feedback>
                        </Form.Group>
                        <div className='text-center pt-4'><Button variant='outline-light' type="submit">Save Changes</Button></div>
                        </Form>
                        {isErrorOnRegister &&
                            <div className='text-danger'>Email already exists!</div>
                        }
                </Col>
            </Row>
            <ToastContainer className="p-3" position={'middle-end'}>
                <Toast show={detailsUpdated} onClose={()=>setDetailsUpdated(false)} bg={'light'} delay={3000} autohide>
                    <Toast.Body className='text-dark'>Profile Updated</Toast.Body>
                </Toast>
            </ToastContainer>
        </Container>
    )
}
