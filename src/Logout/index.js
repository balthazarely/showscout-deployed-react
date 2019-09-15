import React from 'react';
import { Button } from 'semantic-ui-react';
import Instructions from '../Instructions';



const Logout = () => {
   
    
        return(
            <div className="push-right">
              <div className="padding-please">
              <Instructions />
                <Button basic inverted color="orange" className="logout-btn" href="/">Logout</Button>
              </div>
                         
            </div>
        )
}
 
        
    
export default Logout;