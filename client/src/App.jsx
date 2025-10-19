import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './router/AppRoutes'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className="h-screen overflow-auto scrollbar-hide">
      <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* <Navbar />   */}
        <AppRoutes />
      </BrowserRouter>
    </div>
  )
}

export default App