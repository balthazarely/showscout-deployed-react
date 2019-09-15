import React from 'react';
import { Button, Divider } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';





const SimilarArtistsContainer = (props) => {
    // console.log(props.similarArtists, "< SimularArtists inside similarArtistsContainer")
    // console.log(props.similarArtists[0].similarartists.artist[0])
    // const artist = props.similarArtists[0].similarartists.artist[0].name
    const artist = props.similarArtists[0].similarartists.artist.slice(0, 12).map((artist, i) => {
        // console.log(props.similarArtists[0].similarartists.artist)

        return (
            
                <Button key={i} basic inverted color="orange" className="ui color1 button btn" value={artist.name} onClick={props.clickedSimilarArtist}>{artist.name}</Button>
          
        )  
    })
    
    return(
        <div>
            
            <Divider className="white" inverted horizontal><h3> sounds like </h3></Divider>
            {artist}      
           
        </div>
    )
}






export default SimilarArtistsContainer;
