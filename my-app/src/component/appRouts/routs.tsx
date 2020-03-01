  import {  Route} from "react-router-dom";
import React from "react";
import HiOrderCommponent from './hComponent'



export const AppRoutes = (props:any) => {
    const { routes } = props
    const result = routes.map((route:any) =>
    <HiOrderCommponent {...route}>

        <Route {...route} /> 
        
</HiOrderCommponent>
    
    )
    return <>{result}</>
}