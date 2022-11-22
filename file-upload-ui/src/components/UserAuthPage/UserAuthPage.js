import { useState } from 'react';
import './UserAuthPage.css';
import loginImg from '../../images/login.svg';
import Login from './LoginPage';
import SignUpPage from './SignUpPage';
import Button from 'react-bootstrap/Button';

const UserAuthPage = () => {
 const [page, setPage] = useState(false);
 const handleNavigation = () => {
    setPage(!page)
 }  
    return (
        <div className='login-form-parent'>
            <div className='login-image-container'>
                <img src={loginImg} alt="login-image" />
            </div>
            <div className='login-form'>
                    <h2 className='mb-3'>Welcome to App</h2>
                    { !page ?
                        <Login />:
                        <SignUpPage/>
                    }
                    <div className="horizontal_line"><span className="dot" />OR<span className="dot" /></div>
                    <Button onClick={handleNavigation} className='new-user-button' variant="primary" type="submit">
                       {page ? "Sign In" : "New User"}
                    </Button>
            </div>
        </div>
    );
}

export default UserAuthPage