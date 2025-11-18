import styled from "@emotion/styled";
import { Login } from "./pages/Login/Login";
import { Student } from "./pages/Student/Student";
import { Admin } from "./pages/Admin/Admin";

const Text = styled.h1`
  font-size: 3em;
  color: #c73333ff;
`;

function App() {
  return (
    <>
      <Text>app</Text>
      <Login />
      <Student />
      <Admin />
    </>
  );
}

export default App;
