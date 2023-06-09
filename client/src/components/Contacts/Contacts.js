import { useState } from "react";
import { useNavigate } from "react-router-dom";


import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { useForm } from "../../hooks/useForm";



export const Contacts = () => {

    const [msg, Setmsg] = useState(false);
    const [error, setError] = useState(false);
    const {formValues, onChangeHandler} = useForm({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const navigate = useNavigate()

    const onSubmitClick = (e) => {
        e.preventDefault();
        if(formValues.name === '' || formValues.email === '' || formValues.phone === '' || formValues.message === ''){
            setError(true);
        } else {
            Setmsg(true);
        }
    }

    const onOkErrorClick = () => {
        setError(false);
    }

    const onOkClick = () => {
        Setmsg(false);
        navigate('/')
    }

    return (
        <>
            <Header />
            <section className="contact_section">
                <div className="container-fluid">
                    <div className="row">
                        <div className="offset-lg-2 col-md-10 offset-md-1">
                            <div className="heading_container">

                                <h2>
                                    Request A call back
                                </h2>
                            </div>
                        </div>
                    </div>
                    {error && (<div className="error_overlay">
            <div className="error_overlay_content">
                <div className="error_message">All fields are required!
                    <div className="error-bidding-button" >
                        <Button variant="primary" type="button" onClick={onOkErrorClick}>
                            OK
                        </Button>
                    </div>
                </div>
            </div>
        </div>)}
                    {msg && (<Modal.Dialog className="contact-dialog" style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "50%",
                        margin: "0 auto",
                        zIndex: '99',
                    }}>
                        <Modal.Body>
                            <p>Your request was submitted!</p>
                        </Modal.Body>
                        <Modal.Footer style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                            <Button variant="info" style={{ margin: 'auto' }} onClick={onOkClick}>Ok</Button>
                        </Modal.Footer>
                    </Modal.Dialog>)}
                    <div className="layout_padding2-top">
                        <div className="row">
                            <div className="col-lg-4  offset-md-1">
                                <form onSubmit={onSubmitClick}>
                                    <div className="contact_form-container">
                                        <div>
                                            <div>
                                                <input type="text" name="name" placeholder="Full Name" value={formValues.name} onChange={onChangeHandler} />
                                            </div>
                                            <div>
                                                <input type="email" name="email" placeholder="Email" value={formValues.email} onChange={onChangeHandler} />
                                            </div>
                                            <div>
                                                <input type="text" name="phone" placeholder="Phone Number" value={formValues.phone} onChange={onChangeHandler} />
                                            </div>
                                            <div>
                                                <input type="text" name="message" className="message_input" placeholder="Message" value={formValues.message} onChange={onChangeHandler} />
                                            </div>
                                            <div>
                                                <button type="submit">
                                                    Send
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="col-lg-6 col-md-6 map_container float-right">

                                <div className="map-responsive">
                                    <iframe title="maps" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10895.574270390416!2d7.4486901!3d46.9441309!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478e39cf99e59a59%3A0x575a14a02644f196!2sMuseum%20of%20Communication!5e0!3m2!1sbg!2sbg!4v1679944543007!5m2!1sbg!2sbg" width="600" height="300" frameBorder="0" style={{ border: "0", width: "100%", height: "100%" }} allowFullScreen></iframe>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}