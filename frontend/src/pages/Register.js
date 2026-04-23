import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BASE_URL from "../config";

export default function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // 🔥 REGISTER FUNCTION (FIXED)
  const register = async () => {
    try {

      const res = await axios.post(
        `${BASE_URL}/auth/register`,
        formData
      );

      alert(res.data.message);

      // 🔄 Redirect to login after register
      navigate('/login');

    } catch (err) {
      console.log(err);
      alert("Registration failed ❌");
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

        <h1 style={{ textAlign: 'center' }}>
          Register
        </h1>

        <input
          placeholder='Name'
          onChange={e =>
            setFormData({
              ...formData,
              name: e.target.value
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
          placeholder='Email'
          onChange={e =>
            setFormData({
              ...formData,
              email: e.target.value
            })
          }
          style={{
            width: '100%',
            padding: 14,
            marginTop: 15,
            borderRadius: 10
          }}
        />

        <input
          type='password'
          placeholder='Password'
          onChange={e =>
            setFormData({
              ...formData,
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
          onClick={register}
          style={{
            width: '100%',
            padding: 14,
            marginTop: 20,
            background: '#111',
            color: 'white',
            borderRadius: 10
          }}
        >
          Register
        </button>

        <p style={{ marginTop: 20 }}>
          Already have account?
          <Link to='/login'> Login</Link>
        </p>

      </div>

    </div>
  );
}