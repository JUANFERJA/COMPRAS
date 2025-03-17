import '../styles/allStyle.scss';
import useFetch from "../helpers/useFetch";
import { PathServer } from '../helpers/path';
import { SideBar, NavBar, Content } from '../components';
import  {AuthContext} from '../auth/context/AuthContext';
import { Routes, Route } from 'react-router-dom';
import { LoginPage } from './LoginPage';
import { useContext } from 'react';
import { UpdateContext } from '../context/UpdateContext';


const Path = PathServer();
const Path2 = Path.ruta;
const rutaVersion = Path.routeVersion;

export const MasterPage = () => {
   const { logged } = useContext(AuthContext);
   const { flagAll } = useContext(UpdateContext);

   if (flagAll) {
    return (
      <>
        {logged === false ? (
          <Routes>
            <Route path={`/${rutaVersion}/Login`} element={<LoginPage />}></Route>
            <Route path={`/*`} element={<LoginPage />}></Route>
          </Routes>
        )
          : (
            <AllPage />
          )}  
      </>
    )  }else{
      return(
        <div>Loading.....</div>
      )   
    }

}
const AllPage = () => {

  const items = useFetch(
    `${Path2}/api/GetItemsSidebar?orden=`
  );

  const Tables = useFetch(
    `${Path2}/api/GetTables`
  );
  
  console.log("items para las rutas", items, Tables);
  return (
    
      <div className="allDom">       
            <div className='navBar'>
                <NavBar/>
            </div>
            <div className="d-flex flex-row content" >
            <div className='sidebar'>
                <SideBar/>
            </div>
            <div className='body'>
                <Content items = {items} Tables = {Tables}/>
            </div>               
            </div>                   
      </div>        
   
  )
}

