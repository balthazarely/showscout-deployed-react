import React from 'react'
import { Header } from 'semantic-ui-react'


const LogoHeader = () => (
  <Header className="header " as='h2'>
   
    <div className="header-text" >
        <div>
          <img className="logoPlacer" src="Logo.png" alt="alt"/>
      </div>      
    </div>
    
  </Header>
)

export default LogoHeader;


