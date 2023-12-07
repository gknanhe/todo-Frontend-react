import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  Outlet,
  useNavigate,
} from "react-router-dom";
import { useSnapshot } from "valtio";
import state from "./store";

//FOR AUTHENTICATION
const PrivateRoute = () => {
  const snap = useSnapshot(state);
  // console.log("app", snap.loggedUser);
  //If authorized , return an outlet that will render child element
  //If not, return element that will navigate to login page
  // console.log("From App", snap.loggedUser);
  return snap.loggedUser ? <Outlet /> : <Navigate to="/login" />;
};

function App() {
  // const navigate = useNavigate();
  const snap = useSnapshot(state);

  // useEffect(() => {
  //   // Check if the user is not authenticated, then redirect to login
  //   if (!snap.loggedUser) {
  //     navigate("/login");
  //   }
  // }, [snap.loggedUser, navigate]);

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          {/* PRIVATE ROUTE */}
          <Route exact path="/" element={<PrivateRoute />}>
            <Route exact path="/" element={<Home />} />
          </Route>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
