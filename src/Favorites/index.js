import React from 'react';
import { Button, Divider} from 'semantic-ui-react'


const Favorites = (props) => {
    const artistList = props.favArtists.map((fav, i) => {
        // console.log(props.favArtists, " <-- adding artist to the favoriteList")
    return(
        <div key={i}>
                <Button basic color="orange" onClick={props.clickArtistOnList}>{fav.newFav}</Button>
                <Button.Group basic size='small'>
                    <Button basic color="orange" onClick={props.removeArtistFromList.bind(null, fav)} icon='delete' />
                </Button.Group>
        </div> 
        )
    })


    return(
        <div> 
            <Divider className="white" inverted horizontal><h4> My Artists </h4></Divider>
            {/* <p className="white">Location: {props.location}</p> */}
          {/* <p className="white">Username: {props.name}</p>
          <p className="white">Location: {props.location}</p>
      
        
          <p className="white">Favorite Artists:</p> */}
          {artistList}
        </div>
    )
}



export default Favorites;
