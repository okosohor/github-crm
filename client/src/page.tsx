import API from 'api';
import React, { useState } from 'react';

function Page() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [url, setUrl] = useState('');

  const handleEmailChange = (e:any) => {
    setEmail(e.target.value);
  };

  const handleUrlChange = (e:any) => {
    setUrl(e.target.value);
  };

  const handlePasswordChange = (e:any) => {
    setPassword(e.target.value);
  };

  // Register User
  const handleRegister = async (e:any) => {
    e.preventDefault();


    try {
      await API.register({email, password})
    } catch (error) {
      console.log(error)
    }

    // fetch(`${apiUrl}/user/register`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     email,
    //     password,
    //   }),
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error('Registration failed');
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     setSuccessMessage('Registration successful!');
    //     setErrorMessage('');
    //   })
    //   .catch((error) => {
    //     setErrorMessage(error.message);
    //     setSuccessMessage('');
    //   });
  };

  // Login User
  const handleLogin = async (e:any) => {
    e.preventDefault();
    try {
      const { data } = await API.login({email, password})
      const {accessToken, refreshToken} = data


      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      // const {refreshToken, accessToken} = {data}
      console.log(data)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  };

  const handleRefresh = async (e:any) => {
    
    try {
      const { data } = await  API.refreshTokens();
      const {accessToken, refreshToken} = data

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

    } catch (error) {
      console.log(error)
    }
  };

  const handleCreate = async (e:any) => {
    e.preventDefault();

    try {
      await API.createOrUpdateProject(url)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="container">
      <h2>Registration Form</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>

      <h2>Login Form</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      <h2>URL Form</h2>
      <form onSubmit={handleCreate}>
        <div>
          <label>URL </label>
          <input
            type="text"
            value={url}
            onChange={handleUrlChange}
            placeholder="Enter URL"
            required
          />
        </div>
        <button type="submit">Create Project</button>
      </form>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <button onClick={handleRefresh}>refresh</button>
    </div>
  );
}

export default Page;
