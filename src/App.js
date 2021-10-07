import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import { PersistGate } from 'redux-persist/integration/react'

import './styles/App.css'
import { store, persistor } from "./store/persistStore";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";
import PrivateRoute from "./components/privateRoute";
import MovieDetails from "./pages/movieDetails";
import Header from "./components/header";
import Favourites from "./pages/favourites";
import Watchlist from "./pages/watchlist";
import NotFound from "./pages/notFound";
import EditProfile from "./pages/editProfile";


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
                    <PrivateRoute exact path='/movie/:id' ><MovieDetails /></PrivateRoute>
                    <PrivateRoute exact path="/favourites"><Favourites /></PrivateRoute>
                    <PrivateRoute exact path="/watchlist"><Watchlist /></PrivateRoute>
                    <PrivateRoute exact path="/edit-profile"><EditProfile /></PrivateRoute>
                    <Route exact path="/login"><Login /></Route>
                    <Route exact path="/signup"><Signup /></Route>
                    <PrivateRoute path="*"><NotFound /></PrivateRoute>
                </Switch>
            </Router>
            </PersistGate>
        </Provider>
    );
}

export default App;
