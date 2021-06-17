import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.less';
import CardHolderPage from './Pages/CardHolder';
import ConductorPage from './Pages/Conductor';
import ForgottenPasswordPage from './Pages/ForgottenPassword';
import LoginPage from './Pages/Login';
import MerchantPage from './Pages/Merchant';
import StaffManagmentPage from './Pages/StaffManagment';
import TransactionPage from './Pages/Transaction';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
      <Switch>
        <Route path="/login" >
          <LoginPage />
        </Route>
        <Route path="/forgotten-password" >
          <ForgottenPasswordPage/>
        </Route>
        <Route path="/conductors">
          <ConductorPage />
        </Route>
        <Route path="/cardHolders">
          <CardHolderPage />
        </Route>
        <Route path="/staffManagment">
          <StaffManagmentPage />
        </Route>
        <Route path="/merchants">
          <MerchantPage />
        </Route>
        <Route path="/">
          <TransactionPage/>
        </Route>

      </Switch>

    </Router>
  
    </QueryClientProvider>
    
  );
}

export default App;
