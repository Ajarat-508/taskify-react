import { Route,  Routes} from "react-router-dom";
import TodoDashboard from "./pages/TodoDashboard";
import TaskPreview from "./pages/TaskPreview";


// APP ENTRY POINT
function App() {
return (
  <Routes>
    <Route path="/" element={<TodoDashboard />}/>
    <Route path="/task/:task_id" element={<TaskPreview />}/>
    
  </Routes>

  );
}



export default App;
