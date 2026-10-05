
import './App.css';
import TodoList from './TodoList';
import ProtectedRoute from "./component/ProtectedRoute";
import Login from "./component/Login";
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import HomePage from "./component/HomePage";
import CreateTodo from "./component/CreateTodo"
import TodoDetails from "./component/todoDetails";

function App() {
  return (
      <Router>
          <>
              <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/todos" element={<ProtectedRoute><TodoList /></ProtectedRoute>} />
                  <Route path="/todos/:id" element={<ProtectedRoute><TodoDetails /></ProtectedRoute>} />
                  <Route path="/addTodo" element={<ProtectedRoute><CreateTodo /></ProtectedRoute>} />
                  <Route path="*" element={<h1>404 Not Found</h1>} />
              </Routes>
          </>
      </Router>

  );
}

export default App;
