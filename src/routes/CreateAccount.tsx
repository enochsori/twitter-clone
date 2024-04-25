import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import {
  Form,
  Title,
  Wrapper,
  Input,
  ErrorMessage,
  Switcher,
} from '../components/auth-component';
import GithubButton from '../components/GithubButton';

const CreateAccount = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;

    if (target.name === 'name') {
    setName(target.value);
    } else if (target.name === 'email') {
      setEmail(target.value);
    } else if (target.name === 'password') {
      setPassword(target.value);
    }
  };

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (isLoading || name === '' || email === '' || password === '') return;

    try {
      setIsLoading(true);

      // 1.  create an account
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // set the name of the user.
      await updateProfile(credentials.user, { displayName: name });

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

  return (
    <Wrapper>
      <Title>Join into 𝕏 </Title>
      <Form onSubmit={onFormSubmit}>
        <Input
          name='name'
          required
          placeholder='Input your name'
          value={name}
          type='text'
          onChange={onInputChange}
        />
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
          value={isLoading ? 'Loading....' : 'Create Account'}
          type='submit'
        />
      </Form>

      {error !== '' && <ErrorMessage>{error}</ErrorMessage>}

      <Switcher>
        Already have an account? <Link to='/login'>Log in &rarr;</Link>
      </Switcher>

      <GithubButton />
    </Wrapper>
  );
};

export default CreateAccount;
