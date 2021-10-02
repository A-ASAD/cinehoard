import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import { PersistGate } from 'redux-persist/integration/react'

import './styles/App.css'
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";
import PrivateRoute from "./components/privateRoute";
import MovieDetails from "./pages/movieDetails";
import Header from "./components/header";
import Favourites from "./pages/favourites";
import Watchlist from "./pages/watchlist";
import { store, persistor } from "./persistStore";


function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
            <Router>
                <PrivateRoute path="/">
                    <Header />
                </PrivateRoute>
                <Switch>
                    <Route exact path="/"><Dashboard /></Route>
                    <Route path='/movie/:id' ><MovieDetails /></Route>
                    <Route path="/login"><Login /></Route>
                    <Route path="/signup"><Signup /></Route>
                    <Route path="/favourites"><Favourites /></Route>
                    <Route path="/watchlist"><Watchlist /></Route>
                </Switch>
            </Router>
            </PersistGate>
        </Provider>
    );
}

export default App;
