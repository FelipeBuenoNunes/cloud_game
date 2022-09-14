import Table from "./components/Table";
import LoginPage from "./BaseLoginPage/LoginPage";
import Login from "./BaseLoginPage/elements/ContainerLogin";
import { Home } from "./components/Home";
import { LoginCadastro } from "./components/LoginCadastro";

import "./input.css";

function App() {
  return (
    <div className=" w-screen h-screen">
      {/* <Table /> */}
      {/* <LoginPage /> */}
      {/* <Login /> */}
      {/* <Home /> */}
      <LoginCadastro />
    </div>
  );
}

export default App;
