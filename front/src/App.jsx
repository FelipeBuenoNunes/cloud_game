import Page404 from "./components/Page404";
import { LoginCadastro } from "./components/LoginCadastro";
import { Home } from "./components/Home";
import Table from "./components/Table";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import "./input.css";
import { useUser } from "./providers/user";
import { get } from "./functions/req";

const Private = ({ children }) => {
  const user = useUser().bueno;
  if (user) {
    return children;
  }
  else {
    return <Navigate to="/" />
  }
};

const Public = ({ children }) => {
  if(document.cookie.split("=")[1]) {
    const { setBueno } = useUser();
    get("/infos").then(res => setBueno(res))
    return <Navigate to="/home" />
  }
  return children
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Public> <LoginCadastro /> </Public>} />
        <Route path="*" element={<Page404 />} />
        <Route path="/home" element={<Private> <Home /> </Private>} />
        <Route path="/table" element={<Private> <Table /> </Private>} />
      </Routes>
    </Router>
  );
}

export default App;
