import { useContext, useState } from "react";
import "../styles/Login.scss";
import { AuthContext } from "../auth/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { helpHttp } from "../helpers/hepHttp"; 
import { PathServer } from "../helpers/path";

const Path = PathServer();
const Path2 = Path.ruta;
let  api = helpHttp();

export const LoginPage = () => {

  const navigate = useNavigate();
  const {login} = useContext(AuthContext);
  

  const [usuario, setUsuario] = useState("");
  const [pass, setPass] = useState("");
  const [auth, setAuth] = useState(false)
  
  const onAddUsuario = ({target}) =>{

    setUsuario(target.value);
  }

  const onAddPass = ({target}) =>{

    setPass(target.value)
  }


  const onLogin = async() =>{
    if(usuario =="" || pass ==""){
        alert("Error en la autenticación", "Debes llenar todos los campos")
        return;
    }
    let url = `${Path2}/api/GetUsuarios?usuario=${usuario}&pass=${pass}`;
    console.log("esta es la peticion", url);
    let response = JSON.parse(await api.get(`${url}`));
    console.log("estos son los valores", usuario, pass,  response)

    let data =  response.data[0];
    
    if(response.data.length > 1){ 
        alert('Error al autenticarse ' + response.data);
        return;
    }else{
            login( usuario,
                   pass,                 
                    data.UserEmail, 
                    data.UserPhone, 
                    data.UserDni,
                    data.UserRol,  
                    data.UserGender)
            console.log("esta es la data desde la base de datos", data[0])
            
    }


    

  }

 /*  window.onkeydown = function (event, index){
    if (event.keyCode === 13) {
        document.getElementById('login').classList.add('loading');
        $("#btnLogin").click();
        }
    } */

  return (
    <>
        <div className="wrapper" style = {{height:"calc(100vh)"}}>
            {/* <h1 className="titleLogin">SPC</h1> */}
            <div className="login" id = "login">
                <p className="title">Log in</p>
                <input type="text" placeholder="Username" autoFocus onChange={onAddUsuario}/>
                <i className="fa fa-user"></i>
                <input type="password" placeholder="Password" onChange={onAddPass} />
                <i className="fa fa-key"></i>
                <button onClick={onLogin} id = "btnLogin">
                <i className="spinner"></i>
                    <span className="state">Log in</span>
                </button>
                
            </div>  
                  
        </div>
    </>
  )
}



