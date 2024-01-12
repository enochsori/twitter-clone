import { useState } from 'react';
import { auth } from '../firebase';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import {
  Wrapper,
  Title,
  Form,
  Input,
  ErrorMessage,
  Switcher,
  FindPassword,
} from '../components/auth-component';
import GithubButton from '../components/GithubButton';

const Login = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const onInputChange = (event) => {
    const { target } = event;

    if (target.name === 'email') {
      setEmail(target.value);
    } else if (target.name === 'password') {
      setPassword(target.value);
    }
  };

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (isLoading || email === '' || password === '') return;

    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);

      // redirect to the home page.
      navigate('/');
    } catch (error) {
      // setError(error);
      if (error instanceof FirebaseError) {
        console.log(error.code, error.message);
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onResetPassword = () => {};

  return (
    <Wrapper>
      <Title>Log into 𝕏 </Title>
      <Form onSubmit={onFormSubmit}>
        <Input
          onChange={onInputChange}
          required
          name='email'
          value={email}
          placeholder='Input your Email'
          type='email'
        />
        <Input
          onChange={onInputChange}
          required
          name='password'
          value={password}
          placeholder='Input your password'
          type='password'
        />
        <Input
          required
          value={isLoading ? 'Loading....' : 'Log in'}
          type='submit'
        />
      </Form>

      {error !== '' && <ErrorMessage>{error}</ErrorMessage>}

      <FindPassword onClick={onResetPassword}>Find my password</FindPassword>

      <Switcher>
        Don't have an account?{' '}
        <Link to='/create-account'>Create One &rarr;</Link>
      </Switcher>
      <GithubButton />
    </Wrapper>
  );
};

export default Login;
