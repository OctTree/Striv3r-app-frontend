import { BrowserRouter, Route, Routes  } from 'react-router-dom'
import Home from './components/Home';
import Login  from './components/Login';
import Register from './components/Register';
import User from './components/User';


function App() {
    return (
        <BrowserRouter>
            <Routes >
                <Route path="/" exact element={<Home />}></Route>
                <Route path="/login" exact element={<Login/>}></Route>
                <Route path="/register" exact element={<Register />}></Route>
                <Route path="/user" exact element={<User />}></Route>
            </Routes >
        </BrowserRouter>
    );
}

export default App;
