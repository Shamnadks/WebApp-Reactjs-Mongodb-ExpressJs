import DashPage from "./Pages/Dash";
import LoginPage from "./Pages/Login";
import UsersManagementPage from "./Pages/UsersManagement";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserUpdatePage from "./Pages/UpdateUser";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />}/>
          <Route path="/dash" element={<DashPage />}/>
          <Route path="/users" element={<UsersManagementPage />}/>
          <Route path="/updateUser/:id" element={<UserUpdatePage />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
