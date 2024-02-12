import Layout from "./layouts/Layout";
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Register from "./pages/Register";
import Login from "./pages/Login";
function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><h1>Home Page</h1></Layout>} />
        <Route path="/search" element={<Layout>Search Page</Layout>} />
        <Route path='/register' element={<Layout><Register /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/*" element={<Navigate to={'/'} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
