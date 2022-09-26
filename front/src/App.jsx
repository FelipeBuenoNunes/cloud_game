import Page404 from "./components/Page404";
import { LoginCadastro } from "./components/LoginCadastro";
import { Home } from "./components/Home";
import Table from "./components/Table";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import "./input.css";
import { useUser } from "./providers/user";

const Private = ({ children }) => {
  const user = useUser().bueno;
  if (user) {
    return children;
  }
  else {
    return <Navigate to="/" />
  }
};



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginCadastro />} />
        <Route path="*" element={<Page404 />} />
        <Route path="/home" element={<Private> <Home /> </Private>} />
        <Route path="/table" element={<Private> <Table /> </Private>} />
      </Routes>
    </Router>
  );
}

export default App;
