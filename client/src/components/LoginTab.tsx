import API from 'api';
import { useState } from 'react';
import Button from 'ui/Button';
import Input from 'ui/Input';
import { useNavigate } from 'react-router-dom';

export default function LoginTab() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async function handleLogin(event: React.FormEvent) {
    setLoginError('');
    setPasswordError('');
    setEmailError('');

    event.preventDefault();
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      return;
    }

    if (password.length < 4) {
      setPasswordError('Password must be at least 4 characters');
      return;
    }

    try {
      const { data } = await API.login({ email, password });
      const { accessToken, refreshToken } = data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      navigate('/projects');
    } catch (error: any) {
      setLoginError(error?.response?.data?.message || 'Login error');
    }
  }

  return (
    <form className="flex justify-between flex-col h-full" onSubmit={handleLogin}>
      <div className="gap-5 flex flex-col">
        <Input type="email" error={emailError} name="email" value={email} handleChange={setEmail} />
        <Input
          type="password"
          error={passwordError}
          name="password"
          value={password}
          handleChange={setPassword}
        />
      </div>

      {loginError && <p className="text-red-500 mt-1">{loginError}</p>}

      <div>
        <Button type="submit" text={'login'} />
      </div>
    </form>
  );
}
