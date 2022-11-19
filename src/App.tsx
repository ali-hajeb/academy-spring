import React from 'react';
import UserProtectedRoutesProvider from './features/UserAuthentication';
import NotFoundPage from './pages/404';
import routes from './routes';

function App() {
  return (
    <UserProtectedRoutesProvider
      authenticationRoutes={routes.authenticationRoutes}
      protectedRoutes={routes.protectedRoutes}
      publicRoutes={routes.publicRoutes}
      notFoundPage={<NotFoundPage />}
      fallbackComponent={<h1>loading ...</h1>}
    />
  );
}
// 1234
export default App;
