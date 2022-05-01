import { Route, Routes } from 'react-router-dom';
import './assets/css/App.css';
import Home from './page/Home';
import Login from './page/Login';
import Register from './page/Register';

function App() {
    return (
        <div className="h-screen dark:bg-gray-900 dark:text-white">
            <Routes>
                <Route index element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </div>
    );
}

export default App;
