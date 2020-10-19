import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import power from '../icons/power.png'
import info from '../icons/about.png'
import { useAlert } from 'react-alert'

import '../CSS/Header.css';


export default Header => {
    const alert = useAlert()
    const history = useHistory()

    const [cont, setCont] = useState('')
    function off(e) {
        e.preventDefault()

        alert.show('Tchau ' + window.localStorage.getItem('name'))

        window.localStorage.setItem('user', 0)
        window.localStorage.setItem('name', '')
        history.push('/')
    }
    function menu() {
        const theme = window.localStorage.getItem('userTheme')==undefined?
        'usuario-light':
        window.localStorage.getItem('userTheme')
        
        return `menu ${theme}`
    }
    function displayOptions(e) {
        if (e != undefined) {
            e.preventDefault()
            if (cont.props != undefined) {
                setCont('')
            } else {

                setCont(<div className={menu()}>
                    <p>
                        <Link className='user' to={`/usuario/${window.localStorage.getItem('user')}`}>
                            Minha conta
                        </Link>
                    </p>

                    <div>
                        <Link to='/sobre'>
                            <img className="icon-user"
                                src={info} alt="icone sobre" /> Sobre
                        </Link>
                    </div>
                    <div>
                        <Link onClick={e => off(e)}>
                        
                        <img className="icon-user" 
                            src={power} alt="icone sair" />Logout 
                        </Link>
                    </div>

                </div>)
            }
        }
        return (cont)

    }

    return (
        <>
            <div className="header">
                <h1 className="logo">Despesa Facil</h1>

                <Link to={Header.route}>
                    <img className="icon-menu" src={Header.icon} alt="icone home" />
                </Link>
                {Header.icon_user != undefined ?
                    <>
                        <label className="icon-user" onClick={e => displayOptions(e)}>
                            {window.localStorage.getItem('name')}
                        </label>
                        <div>
                            {displayOptions()}
                        </div>
                    </>
                    : null}


            </div>
            <hr className={window.localStorage.getItem('border')} />
        </>
    )
}