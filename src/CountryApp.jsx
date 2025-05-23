
import { AppRouter } from "./router/AppRouter";
import { AuthProvider } from "./auth/context/AuthProvider";
import { BrowserRouter } from 'react-router-dom'

export const CountryApp = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
          <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  );
}

