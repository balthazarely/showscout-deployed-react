
import React from 'react';
import { Divider, Button, Card, Icon } from 'semantic-ui-react'


const ArtistBio = (props) => {
    // console.log(props.bio, " < concert info in ConcertContainer") 

    return(
        <div>
        <Divider className="white" inverted horizontal><h3>BIO </h3></Divider>
        <p className='white word-wrap'>{props.bio}</p>
        </div>
    )
}


export default ArtistBio;

