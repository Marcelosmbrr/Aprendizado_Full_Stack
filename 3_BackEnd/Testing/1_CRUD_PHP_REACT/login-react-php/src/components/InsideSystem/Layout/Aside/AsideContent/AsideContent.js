import style from './AsideContent.module.css';
import logoReact from '../../../../../assets/images/logo.png';

// ==== Importação dos componentes do roteamento ==== //
import { Link } from 'react-router-dom';

// ==== Importação do Hook useState ==== //
import { useState } from 'react';

// ==== Importação do Hook personalizado usePager para acesso ao state global da paginação ==== //
// ==== Seu provider está no Sistema.js ==== //
import { usePager } from '../../../../../context/Page/PageContext';

// ==== Hook personalizado para acesso ao state global da largura do documento ==== //
// ==== Seu provider está no index.js ==== //
import { useDevice } from '../../../../../context/Device/DeviceContext';

// ==== Importação do hook useRouteMatch da lib de roteamento ==== //
// Será usado para fazer rotas encadeadas // https://reactrouter.com/web/example/nesting
import { useRouteMatch } from "react-router-dom";

// ==== Importação dos componentes do Material UI ==== //
import IconButton from '@material-ui/core/IconButton';
import ArrowIcon from '@material-ui/icons/ReplyAll';

export function AsideContent({AsideState, setAsideState}){

    //==== Resgate do state ActualPage criado e inicializado no contexto PageContext //Por padrão ele é "Dashboard" ==== //
    const {ActualPage, setActualPage} = usePager();

    // ==== Criação do state de item selecionado no menu //Por padrão ele é 'null' (string) ==== //
    const [ItemSelected, setItemSelected] = useState('null');

    // ==== State da largura do documento ==== //
    const {DeviceWidth, setDeviceWidth} = useDevice();

    // ==== Hook useRouteMatch ==== //
    let { path, url } = useRouteMatch();

    //Função para alterar os states que se relacionam com a troca da página
    function ChangePage(e){

        //Primeiro é alterado o state de item selecionado no menu
        ChangeSelectedItem(e.target);

        //Agora é alterado o state global da página atual
        if(e.target.text != ActualPage){

            setActualPage(e.target.text);

        }

    }

    //Função para alterar o estado do item selecionado no menu
    function ChangeSelectedItem(target){

        //Se o item atual for null, quer dizer que o usuário, até agora, não tinha alterado a página
        if(ItemSelected == 'null'){

            //O elemento clicado recebe a classe selected
            target.classList.add(`${style.selected}`);

            //O elemento clicado se torna o novo valor do state
            setItemSelected(target);
        
        //Se o state de item selecionado não for null, e for diferente de target
        }else if(ItemSelected != 'null' && ItemSelected != target){

            //O elemento atualmente selecionado perde a classe selected
            ItemSelected.classList.remove(`${style.selected}`);

            //O elemento clicado recebe a classe selected
            target.classList.add(`${style.selected}`);

            //O elemento clicado se torna o valor do state
            setItemSelected(target);

        }

    }

    return(

        <>
            <div className = {style.aside_center}>
                <div className = {style.aside_top}>
                    <img src = {logoReact} className = {style.logo_react} alt = "logo"/>
                </div>
                <nav>
                <ul className = {style.page_menu}>
                        {DeviceWidth < 1000 && (
                            <li onClick = {() => {setAsideState(!AsideState)}} className = {style.close_button}><IconButton aria-label="close" style={{color: "#fff"}}><ArrowIcon /></IconButton></li>
                        )}
                        <li onClick = {ChangePage} className = {style.aside_menu_li}><Link to={`${url}`}><i class="fas fa-tachometer-alt"></i> Dashboard</Link></li>
                        <li onClick = {ChangePage} className = {style.aside_menu_li}><Link to = {`${url}/users`}><i class="fas fa-users"></i> Usuários </Link></li>
                        <li onClick = {ChangePage} className = {style.aside_menu_li}><Link to = {`${url}/products`}><i class="fas fa-box"></i> Produtos</Link></li>
                        <li onClick = {ChangePage} className = {style.aside_menu_li}><Link to = {`${url}/newproduct`}><i class="fas fa-box-open"></i> Novo Produto</Link></li>
                        <li onClick = {ChangePage} className = {style.aside_menu_li}><Link to = {`${url}/orders`}><i class="fas fa-shopping-cart"></i> Ordens</Link></li>
                    </ul>
                </nav>
            </div>
        </>
        
    )
}