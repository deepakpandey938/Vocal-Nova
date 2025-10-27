import './App.css';
import './css/navbar.css';
import Nav from './Nav';
import SignUp from './SignUp';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import PrivetComponents from './Components/PrivetComponents';
import Login from './Components/Login';
import Addproduct from './Components/Addproduct';
import UpdateProduct from './Components/UpdateProduct';
import ProductList from './Components/ProductList';
import Topbar from './Topbar.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
    <Topbar/>
     <Nav/>
     <Routes>
      <Route element={<PrivetComponents/>}>
        <Route path='/' element={<ProductList/>}></Route>
        <Route path='/add' element={<Addproduct/>}></Route>
        <Route path="/update/:id" element={<UpdateProduct/>}></Route>
        <Route path='/logout' element={<h1>Logout Component</h1>}></Route>
        <Route path='/profile' element={<h1>profile Component</h1>}></Route>
        </Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/login' element={<Login/>}/>
     </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
