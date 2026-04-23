import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import BASE_URL from "../config";

export default function Login() {

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // 🔥 LOGIN FUNCTION (FIXED)
  const login = async () => {
    try {

      const res = await axios.post(
        `${BASE_URL}/auth/login`,
        loginData
      );

      if (!res.data.user) {
        alert(res.data.message);
        return;
      }

      // 🔐 Save token
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user.role);

      // 🔄 Redirect
      if (res.data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }

    } catch (err) {
      console.log(err);
      alert("Login failed ❌");
    }
  };

  return (

    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: '#f4f6fb'
    }}>

      <div style={{
        background: 'white',
        padding: 40,
        borderRadius: 20,
        width: 380,
        boxShadow: '0 8px 25px rgba(0,0,0,.15)'
      }}>

        <h1 style={{ textAlign: 'center' }}>Login</h1>

        <input
          placeholder='Email'
          onChange={e =>
            setLoginData({
              ...loginData,
              email: e.target.value
            })
          }
          style={{
            width: '100%',
            padding: 14,
            marginTop: 20,
            borderRadius: 10
          }}
        />

        <input
          type='password'
          placeholder='Password'
          onChange={e =>
            setLoginData({
              ...loginData,
              password: e.target.value
            })
          }
          style={{
            width: '100%',
            padding: 14,
            marginTop: 15,
            borderRadius: 10
          }}
        />

        <button
          onClick={login}
          style={{
            width: '100%',
            padding: 14,
            marginTop: 20,
            background: '#111',
            color: 'white',
            borderRadius: 10
          }}
        >
          Login
        </button>

        <p style={{ marginTop: 20 }}>
          No account?
          <Link to='/register'> Register</Link>
        </p>

      </div>

    </div>

  );
}