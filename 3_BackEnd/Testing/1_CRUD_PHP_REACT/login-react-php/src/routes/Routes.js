import React from "react";
import { BrowserRouter, Route, Switch, Redirect, useRouteMatch } from "react-router-dom";

// ==== Componente cujo valor de retorno é o fator condicional para acesso ao sistema ==== //
import { Authentication } from "./Authentication";

// ==== Componentes das páginas externas do sistema ==== //
import { Login } from "../pages/OutsideSystem/Login/Login";
import { Registro } from "../pages/OutsideSystem/Registro/Registro";
import { RecuperarSenha } from "../pages/OutsideSystem/RecuperarSenha/RecuperarSenha";
import { Sistema } from "../pages/OutsideSystem/Sistema/Sistema";
import { NotFound } from "../pages/OutsideSystem/NotFound/NotFound";

//==== Importação das páginas internas do sistema ==== //
import { Dashboard } from '../pages/InsideSystem/Dashboard/Dashboard';
import { Users } from '../pages/InsideSystem/Users/Users';
import { Products } from '../pages/InsideSystem/Products/Products';
import { ProductRegistration } from '../pages/InsideSystem/ProductRegistration/ProductRegistration';
import { MyProfile } from '../pages/InsideSystem/MyProfile/MyProfile';
import { Orders } from "../pages/InsideSystem/Orders/Orders";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
        Authentication() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

export function Routes(){ 

    return(

        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/registrar" component={Registro} />
                <PrivateRoute path = "/sistema" component={Sistema} />
                <Route path="/recuperarsenha" component={RecuperarSenha} />
                <Route exact path="*" component={NotFound} />
            </Switch> 
        </BrowserRouter>
        
        
    )

};

export function InsideRoutes(){

    // ==== Hook useRouteMatch ==== //
    let { path, url } = useRouteMatch();

    // Os componentes que formam a parte interna do sistema estão dentro do componente "Sistema"
    // O componente Sistema é carregado pelo componente de rotas Route, que possui um BrowserRouter
    // Então, o InsideRoutes não precisa e não pode ter outro "BrowserRouter" 
    // O roteamento, para ser assíncrono, deve sempre ser feito com apenas um BrowserRouter embrulhando toda a aplicação

    return (
        
        <Switch>
            <Route exact path = {`${path}`} component = {Dashboard}/>
            <Route path = {`${path}/users`} component = {Users} />
            <Route path = {`${path}/products`} component = {Products} />
            <Route path = {`${path}/newproduct`} component = {ProductRegistration} />
            <Route path = {`${path}/orders`} component = {Orders} />
            <Route path = {`${path}/user/mydata`} component = {MyProfile} />
        </Switch>

    )
    
    
}