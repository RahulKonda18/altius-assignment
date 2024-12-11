import { Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./Components/Register";

function App() {
  return (
    <Routes>
      <Route path="/" Component={Register} />
    </Routes>
  );
}

export default App;
