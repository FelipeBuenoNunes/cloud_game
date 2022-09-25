import Page404 from "./components/Page404";
import { LoginCadastro } from "./components/LoginCadastro";
import { Home } from "./components/Home";
import Table from "./components/Table";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import "./input.css";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginCadastro />} />
        {/* <Route path="/:personalWallet" element={<Home />} /> */}
        <Route path="/home/:userName" element={<Home />} />
        <Route path="/table" element={<Table />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
}

export default App;
