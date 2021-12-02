import { BrowserRouter, Route, Routes  } from 'react-router-dom'
import Home from './components/Home';
import Login  from './components/Login';
import Register from './components/Register';
import User from './components/User';
import PageNotFound from "./components/PageNotFound"


function App() {
    return (
        <BrowserRouter>
            <Routes >
                <Route path="/" exact element={<Home />}></Route>
                <Route path="/login" exact element={<Login/>}></Route>
                <Route path="/register" exact element={<Register />}></Route>
                <Route path="/user" exact element={<User />}></Route>
                <Route path="*" element={<PageNotFound/>}/>
            </Routes >
        </BrowserRouter>
    );
}

export default App;
