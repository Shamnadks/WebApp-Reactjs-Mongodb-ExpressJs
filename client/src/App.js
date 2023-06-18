import HomePage from "./Pages/Home";
import LoginPage from "./Pages/Login";
import SignUpPage from "./Pages/SignUp";
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import UserprofilePage from "./Pages/Userprofile";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignUpPage/>}/>
          <Route path="/profile" element={<UserprofilePage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
