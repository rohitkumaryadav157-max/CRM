import react from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Adviewenq from './Admin/Adviewenq'
import Adlayout from './Admin/Adlayout'
import Dashboard from './Admin/Dashboard'
import Center from './Admin/Center'
import Visitor from './Admin/Visitor'
import User from './Admin/User'
import Mandash from './Manager/Mandash'
import Counselordash from './Counselor/Counselordash'
import Manlayout from './Manager/Manlayout'
import Couviewenq from './Counselor/Couviewenq'
import Manaddenq from './Manager/Manaddenq'
import Manviewenq from './Manager/Manviewenq'
import Manvisitor from './Manager/Manvisitor'
import Adaddenq from './Admin/Adaddenq'
import Counselorlayout from './Counselor/Counselorlayout'
import Counvisitor from './Counselor/Counvisitor'
import CounAddenq from './Counselor/CounAddenq'
import { ToastContainer } from 'react-toastify'
import CounProfile from './Counselor/CounProfile'


function App() {
  

  return (
      <>
    <ToastContainer/>

   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

           {/* Admin Route work  */}
        <Route path='/admin/' element={ <Adlayout/>}>
            <Route path='' element={<Dashboard/>} />
            <Route path='viewenq' element={<Adviewenq/>} />
            <Route path='center' element={<Center/>} />
            <Route path='visitor' element={<Visitor/> } />
            <Route path='user' element={<User/> } />
            <Route path='addenq' element={<Adaddenq/>} />
        </Route>


        {/* Manger Route work  */}

          <Route path='/manager/' element={<Manlayout/>}>

            <Route path='' element={<Mandash/>} />
            <Route path='viewenq' element={<Manviewenq/>} />
            <Route path='visitor' element={<Manvisitor/> } />
           <Route path='addenq' element={<Manaddenq/>} />



          </Route>
           

        
        
        {/* Counceler Route work  */}
        <Route path='/counselor/' element={<Counselorlayout/>}> 

        <Route path='' element={<Counselordash/>} />
        <Route path='viewenq' element={<Couviewenq/>} />
        <Route path='visitor' element={<Counvisitor/>} />
        <Route path='addenq' element={<CounAddenq/>} />
        <Route path='Profile' element={<CounProfile/>} />
        
        
        </Route>
        
        
       
       
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
