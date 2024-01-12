import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { useEffect, useState } from 'react';
import { auth } from './firebase';

import Home from './routes/Home';
import Profile from './routes/Profile';
import Layout from './components/Layout';
import Login from './routes/Login';
import CreateAccount from './routes/CreateAccount';
import reset from 'styled-reset';
import LoadingScreen from './components/LoadingScreen';
import ProtectedRoute from './components/ProtectedRoute';

// router setting
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/create-account',
    element: <CreateAccount />,
  },
]);

// default styles
const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    background-color: black;
    color: white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }  
`;

function App() {
  // firebase use authentication
  const [isLoading, setIsLoading] = useState(true);

  const init = async () => {
    // wait for the firebase to check login status
    await auth.authStateReady();

    // for test using timeout
    // setTimeout(() => setIsLoading(false), 2000);
    setIsLoading(false);
  };

  // call init fn to login using firebase authentication
  useEffect(() => {
    init();
  }, []);

  return (
    <Wrapper>
      <GlobalStyles />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  height: 100vh;

  display: flex;
  justify-content: center;
`;
