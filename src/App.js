import logo from './logo.svg';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AdminPage } from './Admin'
import { UserPage } from './User'
import { Terms } from './Terms'
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC2jlpxmLSItDDhIYel_zOI66vHydJlqiM",
  authDomain: "betsven-be96c.firebaseapp.com",
  projectId: "betsven-be96c",
  storageBucket: "betsven-be96c.appspot.com",
  messagingSenderId: "441975053131",
  appId: "1:441975053131:web:c2c9628aff34f5a79426ce"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div style={{marginBottom:30}}>
          Bienvenido a Betsven!
        </div>
        <div className="paint">
            Edición PAINT
        </div>
        
        <br/>

        <BrowserRouter>
          <Routes>
            <Route path="/admins" element={<AdminPage/>}/>
            <Route path="/" element={<UserPage/>}/>
            <Route path="/terms" element={<Terms/>}/>
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
