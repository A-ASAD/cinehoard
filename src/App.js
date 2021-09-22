import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/App.css'
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";


function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/"><Dashboard /></Route>
                <Route path="/login"><Login /></Route>
                <Route path="/signup"><Signup /></Route>
            </Switch>
        </Router>
    );
}

export default App;
