import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';


import { Routes, Route } from 'react-router-dom';

import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShippingScreen from './screens/ShippingScreen';
import PrivateRoute from './components/routes/PrivateRoute';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrderListScreen from './screens/admin/OrderListScreen';
import ProductListScreen from './screens/admin/ProductListScreen';
import ProductEditScreen from './screens/admin/productEditScreen';
import UserListScreen from './screens/admin/UserListScreen';
import UserEditScreen from './screens/admin/UserEditScreen.';


const App = () => {
  return (
    <>  
     <ToastContainer />
      <Header />
      <main className='py-3'>
        <Routes>
          <Route path="/" element={<Container><HomeScreen/></Container>} />
          <Route path='/product/:id' element={<ProductScreen />} />
          <Route path='/cart' element={<CartScreen />} />
          <Route path='/login' element={<LoginScreen/>} />
          <Route path='/register' element={<RegisterScreen/>} />
          
          {/* protected routes */}
          <Route path='' element={<PrivateRoute/>} />
          <Route path='/shipping' element={<ShippingScreen/>} />
          <Route path='/payment' element={<PaymentScreen/>}/>
          <Route path='/placeorder' element={<PlaceOrderScreen />} />
          <Route path='/order/:id' element={<OrderScreen/>}/>
          <Route path='/profile' element={<ProfileScreen />} />
          <Route path='/admin/orderlist' element={<OrderListScreen />} />
          <Route path='/admin/productlist' element={<ProductListScreen />} />
          <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
          <Route path='/admin/userlist' element={<UserListScreen />} />
          <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
