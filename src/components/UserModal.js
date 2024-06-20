import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserModal({ closeModal, defaultData }) {
    const [validated, setValidated] = useState(false);
    const [formState, setFormState] = useState(defaultData || {
        firstname: "",
        lastname: "",
        email: "",
        avatar: ""
    });

    const refreshPage = () => {
        window.location.reload();
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
        if (form.checkValidity()) {
            event.preventDefault();
            const formData = new FormData();
            formData.append("firstname", formState.firstname);
            formData.append("lastname", formState.lastname);
            formData.append("email", formState.email);
            if (defaultData?._id != undefined) {
                formData.append("avatar", formState.avatar);
                /**
                 * Update User
                */
                axios.put('http://localhost:4000/api/user/' + defaultData?._id, formData)
                    .then(response => {
                        closeModal(true);
                        refreshPage();
                        toast("User updated successfully");
                    })
                    .catch(error => {
                        console.error(error);
                    });
            } else {
                formData.append("avatar", formState.avatar);
                /**
                 * Create User
                */
                axios.post('http://localhost:4000/api/user', formData)
                    .then(response => {
                        refreshPage();
                        toast("User created successfully");
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        }
    };

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    const handleFileChange = (e) => {
        setFormState({
            ...formState,
            "avatar": e.target.files[0]
        })
    }

    return (
        <Modal show={closeModal}>
            <Modal.Header>
                <Modal.Title>Add User</Modal.Title>
            </Modal.Header>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="userForm.firstname">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" name="firstname" placeholder="Enter firstname" value={formState.firstname} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="userForm.lastname">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" name="lastname" placeholder="Enter lastname" value={formState.lastname} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="userForm.email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Enter email" value={formState.email} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="userForm.avatar">
                        <Form.Label>Avatar</Form.Label>
                        {
                            (defaultData?._id != undefined)
                                ?
                                <Form.Control type="file" name="avatar" placeholder="Select Avatar" onChange={handleFileChange} />
                                :
                                <Form.Control type="file" name="avatar" placeholder="Select Avatar" onChange={handleFileChange} required />
                        }
                        {formState?.avatar && <img src={formState.avatar} width={100} height={100} className="rounded m-2" />}
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        {(defaultData?._id != undefined) ? 'Update' : 'Submit'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default UserModal;