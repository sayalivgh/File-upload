import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { regexPatterns, messages } from '../../utilities/constants';

const Login = ({ setPage }) => {
    const initialInputs = {
        email: '',
        password: ''
    }
    const { emailAddressErrorMsg, passwordErrorMsg } = messages;
    const [userInputs, setUserinputs] = useState(initialInputs)
    const [isEmailInValid, setIsEmailInValid] = useState(null)
    const [isPasswordInValid, setIsPasswordInValid] = useState(null)
    const handleSubmit = (event) => {
        const { email, password } = userInputs;
        event.preventDefault();
        const isEmailValid = regexPatterns.emailRegex.test(email);
        const isPasswordValid = password.length;
        setIsEmailInValid(!isEmailValid);
        setIsPasswordInValid(!isPasswordValid);

        if (isEmailValid && isPasswordValid) {
            //TODO: call login api
            window.alert('Successful login')
        }
    };

    const handleInputChange = (event, inputType) => {
        if (inputType === 'email' && isEmailInValid && regexPatterns.emailRegex.test(event.target.value)) {
            setIsEmailInValid(false);
        }
        if (inputType === 'password' && isPasswordInValid && event.target.value.length) {
            setIsPasswordInValid(false);
        }
        setUserinputs({
            ...userInputs,
            [inputType]: event.target.value
        });
    }
    
    return (
        <>
        <Form noValidate onSubmit={handleSubmit} className="form">
            <FloatingLabel
                controlId="emailInput"
                label="Email address"
                className="mb-3"
            >
                <Form.Control
                    isInvalid={isEmailInValid ?? false}
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
                    isInvalid={isPasswordInValid ?? false}
                    value={userInputs.password}
                    type="password"
                    placeholder="Password"
                    onChange={(event) => handleInputChange(event, 'password')}
                    required />
                <Form.Control.Feedback type="invalid">
                    {passwordErrorMsg}
                </Form.Control.Feedback>
            </FloatingLabel>
            <Button variant="primary" type="submit">
                Sign In
            </Button>
        </Form>
        {/* <div className="horizontal_line"><span class="dot" />OR<span class="dot" /></div>
                    <Button onClick={handleNewUser} className='new-user-button' variant="primary" type="submit">
                        New User
                    </Button> */}
        </>
    )
}

export default Login;