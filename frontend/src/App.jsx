import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import Products from './pages/Products/Products';



import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';


function App() {

  return (
    <>
     <Router>
        <Routes>
         <Route path="/" element={<Home />}/>
          <Route path="/products" element={<Products />}/>
          <Route path="/contact" element={<Contact />}/>

        </Routes>
     </Router>
    </>
  )
}

export default App
