import logo from './logo.svg';
import './App.css';
import { MasterPage } from './Pages/MasterPage';
import { AuthProvider } from './auth/context/AuthProvider';
import {BrowserRouter} from 'react-router-dom';
import { UpdateProvider } from './context/UpdateProvider';
function App() {
  return (
    <AuthProvider>  
      <UpdateProvider>  
      <BrowserRouter>
        <MasterPage/>  
      </BrowserRouter>
      </UpdateProvider>  
    </AuthProvider>
  );
}

export default App;
