
import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Header } from './components/Header';
import  Footer  from './components/Footer';
import { Login } from './pages/Login';
import { Singup } from './pages/Singup';
import ProfileSection from './pages/ProfileSection';
import { ServiceList } from './pages/ServiceList';
import ServiceProviderForm from './components/ServiceProviderForm';
import  ServiceDetails  from './pages/ServiceDetails';
import  Cart from './pages/Cart';
import AdminDashboard from './Admin/AdminDashboard';
import OrderList from './pages/OrderList';
import { DashBoard } from './Provider/DashBoard';
function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/singup' element={<Singup/>}></Route>
      <Route path='/profile'element={<ProfileSection/>}></Route>
      <Route path='/:id' element={<ServiceList/>}></Route>
      <Route path='/application' element={<ServiceProviderForm/>}></Route>
      <Route path='/service-details/:id' element={<ServiceDetails/>}></Route>
       <Route path='/cart' element={<Cart/>}></Route>
       <Route path='/admindashboard' element={<AdminDashboard/>}></Route>
       <Route path='/myorder' element={<OrderList/>}></Route>
       <Route path='/providerdashboard' element={<DashBoard/>}></Route>
    </Routes>
    <Footer/>
    </BrowserRouter>
    
  );
}

export default App;
