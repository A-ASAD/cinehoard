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
                    <PrivateRoute exact path="/"><Dashboard /></PrivateRoute>
                    <PrivateRoute path='/movie/:id' ><MovieDetails /></PrivateRoute>
                    <Route path="/login"><Login /></Route>
                    <Route path="/signup"><Signup /></Route>
                    <PrivateRoute path="/favourites"><Favourites /></PrivateRoute>
                    <PrivateRoute path="/watchlist"><Watchlist /></PrivateRoute>
                </Switch>
            </Router>
            </PersistGate>
        </Provider>
    );
}

export default App;
