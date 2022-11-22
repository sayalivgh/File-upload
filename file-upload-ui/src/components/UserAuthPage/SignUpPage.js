import { useState } from 'react'
import './UserAuthPage.css';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { regexPatterns, messages } from '../../utilities/constants';
import axios from 'axios';

const SignUpPage = () => { 
    const initialInputs = {
        name: '',
        sirName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }
    const { emailAddressErrorMsg, passwordErrorMsg, useSirNameErrorMsg, userNameErrorMsg, passwordNoMatchErrMsg } = messages;
    const [userInputs, setUserinputs] = useState(initialInputs)
    const [isSubmitButtonClicked, toggleSubmitButton] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        toggleSubmitButton(true);
        const { name, email, password } = userInputs;
        if(name.length
            && !validateEmailField()
            && !validateEmailField().isInvalid){
            const payload = {
                name,
                email,
                password
            }

            axios.post('http://localhost:3500/register', payload)
            .then((response) => {
                console.log("Resp", response);
            }).catch((error) => {
                console.log("Error: ", error.message);
            })
        }
    }

    const handleInputChange = (event, inputType) => {
        setUserinputs({
            ...userInputs,
            [inputType]: event.target.value
        });
    }

    const validateEmailField = () => {
        return !userInputs.email.length || (userInputs.email.length && !regexPatterns.emailRegex.test(userInputs.email) )
    }
    const validateConfirmPassword = () => {
        const noCnfPassword = !userInputs.confirmPassword.length
        const isInvalid = noCnfPassword || 
        ( userInputs.password.length && 
          userInputs.confirmPassword.length && 
          userInputs.password !== userInputs.confirmPassword
        )
        return {
            isInvalid,
            reason: isInvalid?  noCnfPassword ? passwordErrorMsg : passwordNoMatchErrMsg : ''
        }
    }
     return (
        <>
        <Form noValidate onSubmit={handleSubmit} className="form">
            <FloatingLabel
                controlId="nameInput"
                label="User Name"
                className="mb-3"
            >
                <Form.Control
                    isInvalid={isSubmitButtonClicked && !userInputs.name.length}
                    value={userInputs.name}
                    placeholder="User Name"
                    onChange={(event) => handleInputChange(event, 'name')}
                    required />
                <Form.Control.Feedback type="invalid">
                    {userNameErrorMsg}
                </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel
                controlId="lastNameInput"
                label="Last Name"
                className="mb-3"
            >
                <Form.Control
                    isInvalid={isSubmitButtonClicked && !userInputs.sirName.length}
                    value={userInputs.sirName}
                    placeholder="Last Name"
                    onChange={(event) => handleInputChange(event, 'sirName')}
                    required />
                <Form.Control.Feedback type="invalid">
                    {useSirNameErrorMsg}
                </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel
                controlId="emailInput"
                label="Email address"
                className="mb-3"
            >
                <Form.Control
                    isInvalid={isSubmitButtonClicked && validateEmailField()}
                    value={userInputs.email}
                    type="email"
                    placeholder="Email address"
                    onChange={(event) => handleInputChange(event, 'email')}
                    required />
                <Form.Control.Feedback type="invalid">
                    {emailAddressErrorMsg}
                </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel
                controlId="passwordInput"
                label="Password"
                className="mb-3"
            >
                <Form.Control
                    isInvalid={isSubmitButtonClicked && !userInputs.password.length}
                    value={userInputs.password}
                    type="password"
                    placeholder="Password"
                    onChange={(event) => handleInputChange(event, 'password')}
                    required />
                <Form.Control.Feedback type="invalid">
                    {passwordErrorMsg}
                </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel
                controlId="confirmPasswordInput"
                label="Confirm Password"
                className="mb-3"
            >
                <Form.Control
                    isInvalid={isSubmitButtonClicked && validateConfirmPassword()}
                    value={userInputs.confirmPassword}
                    type="password"
                    placeholder="Confirm Password"
                    onChange={(event) => handleInputChange(event, 'confirmPassword')}
                    required />
                <Form.Control.Feedback type="invalid">
                    {validateConfirmPassword().reason}
                </Form.Control.Feedback>
            </FloatingLabel>
            <Button variant="primary" type="submit">
               Register
            </Button>
        </Form>
        </>
     )
}
export default SignUpPage;