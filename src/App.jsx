import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/home";
import Register from "./views/register.jsx";
import Edit from "./views/edit.jsx";

function App() {

  return (
    <>  
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="cadastrar/" element={<Register />} />
          <Route path="editar/:id" element={<Edit />} />
        </Routes>
      </BrowserRouter>      
        
    </>
  )
}

export default App
