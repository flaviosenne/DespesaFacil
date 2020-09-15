import React from 'react';
import { Link } from 'react-router-dom'
import '../index.css';
import cifrao from '../icons/cifrao.png'
import Header from '../components/Header'
import relatorio from '../icons/relatorio.png'
import icon from '../icons/home.png'

const props = {
  icon, route: '/home'
}

export default Home => {

  return (
    <>
      <Header {...props} />
      <div className='landingPage'>
        <div>
          <p>
            Voce esta com muita divida e não sabe
            mais o que fazer? O Despesa Facil
            irá te dar uma mãozinha.
          </p>
          
          <Link to={
            window.localStorage.getItem('user')== undefined || 
            window.localStorage.getItem('user')== 0? '/login':
            '/fluxo-caixa'
          } className='button btn'> COMECE AGORA</Link>
        </div>


        <div>
            <img src={cifrao} alt="icone cifrão" />
          
          <p>
            O sistema possui um fluxo de caixa
            totalmente dinamico e intuitivo onde é
            possível ter uma visão mais clara do seu ciclo
            financeiro
        </p>
        </div>

        <div>
        

          <img src={relatorio} alt="icone relatorio" />

          <p>
            Com o relatório em mãos, é possível
            enxergar de forma mais sistemática e
            tomar melhores decisões
        </p>
        </div>


      </div>
    </>
  )
}