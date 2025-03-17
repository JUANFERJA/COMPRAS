import { UpdateContext } from "./UpdateContext";
import { useState } from "react";

export const UpdateProvider = ({children}) => {

    const [flagAll, setflagAll] = useState(true);
   

  return (
    <UpdateContext.Provider value={{
         flagAll, setflagAll   
        }}>
        {children}
    </UpdateContext.Provider>
  )
}