import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import './App.css';
import SignUpPage from "./components/UserAuthPage/SignUpPage";
import UserAuthPage from "./components/UserAuthPage/UserAuthPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={ <UserAuthPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
