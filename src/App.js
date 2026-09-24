
import './App.css';
import React from "react";
import TodoList from './TodoList';
import ProtectedRoute from "./component/ProtectedRoute";
import Login from "./component/Login";
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import HomePage from "./component/HomePage";
import AddTodo from "./component/AddTodo";
import TodoDetails from "./component/todoDetails";
function App() {
  return (
      <Router>
          <>
              <Routes>
                  <Route path="/" element={<HomePage/>}></Route>
                  <Route path="/login" element={<Login/>}></Route>

                  <Route path="/todos" element={<ProtectedRoute><TodoList/></ProtectedRoute>}></Route>
                  <Route path="/todos/:id" element={<ProtectedRoute><TodoDetails/></ProtectedRoute>}></Route>
                  <Route path="/addTodo" element={<ProtectedRoute><AddTodo/></ProtectedRoute>}></Route>
              </Routes>
          </>
      </Router>

  );
}

export default App;
