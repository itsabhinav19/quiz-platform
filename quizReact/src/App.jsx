import { Routes, Route, Navigate } from "react-router-dom";
import Quiz from "./components/Quiz/Quiz";
import LoginSignup from "./components/Auth/LoginSignup.jsx";

const isAuthenticated = () => {
  return localStorage.getItem("token");
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginSignup />} />

      <Route
        path="/quiz"
        element={
          <PrivateRoute>
            <Quiz />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
