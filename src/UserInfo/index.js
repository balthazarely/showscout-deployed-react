import React from 'react';
import {  Divider} from 'semantic-ui-react'



const UserInfo = (props) => {



    return(
        <div> 
            <Divider className="white" inverted horizontal><h3> User Info </h3></Divider>
            <p className="white">User: {props.name} <br/></p> 
            <p className="white">Location: {props.location} <br/></p>
            
        
        
  
        </div>
    )
}



export default UserInfo;
