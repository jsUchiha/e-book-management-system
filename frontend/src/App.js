import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';


function UserRoute({children}){

const token=
localStorage.getItem('token');

if(!token){

return <Navigate to='/login' />

}

return children;

}


function AdminRoute({children}){

const token=
localStorage.getItem('token');

const role=
localStorage.getItem('role');

if(!token){

return <Navigate to='/login' />

}

if(role!=='admin'){

return <Navigate to='/user' />

}

return children;

}



export default function App(){

return(

<BrowserRouter>

<Routes>

<Route
path='/'
element={<Home/>}
/>

<Route
path='/login'
element={<Login/>}
/>

<Route
path='/register'
element={<Register/>}
/>

<Route
path='/user'
element={
<UserRoute>
<UserDashboard/>
</UserRoute>
}
/>

<Route
path='/admin'
element={
<AdminRoute>
<AdminDashboard/>
</AdminRoute>
}
/>

</Routes>

</BrowserRouter>

)

}