import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";


import './App.css';
import Header from './components/Header'
import NotePage from "./pages/NotePage";
import NotesListPage from './pages/NotesListPage'

function App() {
  return (
    <Router>
      <div className="container">
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={<NotesListPage/>} exact />
            <Route path="/note/:id" element={<NotePage/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
