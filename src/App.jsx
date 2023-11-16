import { Route, Routes } from "react-router-dom";
import TodoDashboard from "./pages/TodoDashboard";

// APP ENTRY POINT
function App() {
return (
  <Routes>
    {/* <Route path="/" element={<TodoDashboard />}/> */}
    <Route path="/" element={<TodoDashboard />}/>
  
  </Routes>

  );
}


export default App;
