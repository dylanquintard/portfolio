import React, { useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import '../styles/Login.scss';

function Login() {
  useEffect(() => {

    const token = localStorage.getItem('token');
    
    if (token) {
      window.location.href = '/dashboard';
    }
  }, []);

  return (
    <div className='login'>
      <div>
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;