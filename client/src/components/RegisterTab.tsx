import { useState } from 'react';
import Button from 'ui/Button';
import Input from 'ui/Input';
import API from 'api';

export default function RegisterTab() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [registerMessage, setRegisterMessage] = useState('');


  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async function handleRegister(event: React.FormEvent) {
    event.preventDefault();

    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setRegisterError('');
    setRegisterMessage('')
;

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
    }

    if (password.length < 4) {
      setPasswordError('Password must be at least 4 characters');

    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');

    }
    
    if(emailError || passwordError || confirmPasswordError || registerError ) {
      return
    }
 
    try {
      const { data } = await API.register({ email, password });
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      setRegisterMessage(data.message)
    } catch (error: any) {
      console.log(error);
      setRegisterError(error.response?.data?.message || 'Registration failed');
    }
  }

  return (
    <form className="flex justify-between flex-col h-full" onSubmit={handleRegister}>
      <div className="gap-5 flex flex-col">
        <Input type="email" name="email" value={email} handleChange={setEmail} error={emailError} />
        <Input type="password" name="password" value={password} handleChange={setPassword} error={passwordError} />
        <Input
          type="password"
          name="confirm password"
          value={confirmPassword}
          handleChange={setConfirmPassword}
          error={confirmPasswordError}
        />
      </div>

      {registerError && <p className="text-red-500 mt-1">{registerError}</p>}
      {registerMessage && <p className="text-green-500 mt-1">{registerMessage}</p>}

      <div>
        <Button type="submit" text="register" handleClick={() => {}} />
      </div>
    </form>
  );
}
