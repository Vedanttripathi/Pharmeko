import './App.css';
import {Route} from 'react-router-dom'
import { Switch } from 'react-router-dom';
import LoginPage from './pages/loginpage';
import dashboard from './pages/dashboard';
import Billing from './dashboard_pages/bill';
import Print from './dashboard_pages/print'


function App() {
  return (
    <div className="App">
        
        <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route path="/dashboard" exact component={dashboard} />
        <Route path="/print" exact component={Print} />
        <Route path="/billing" exact component={Billing} />
        </Switch>
    </div>
  );
}

export default App;
