import React from 'react';
import { Divider } from 'semantic-ui-react'



// const similarPhotos = (props) => {
   
//     const artist = props.similarArtists[0].similarartists.artist.slice(0, 5).map((photo, i) => {
//         console.log(props.photos, " <-- similar photos in SimilarPhotos container")
        
//         import React, { Component } from 'react';



const TopSongs = (props) => {
    // console.log(props.similarArtists, "< SimularArtists inside similarArtistsContainer")
    // console.log(props.photos, "< SIMILAR PHOTOS")
    // console.log(json3.similarartists.artist[0].image[0] , " WHTAT THE FUCK, in the similar photo container")
    // console.log(props.photo[0].similarartists.artist[0].image[0])
    // const artist = props.similarArtists[0].similarartists.artist[0].name

    // console.log(props.topSongs.toptracks.track, " < top tracks")
    const songs = props.topSongs.toptracks.track.slice(0, 8).map((song, i) => {


    // console.log(props.photo[0].similarartists)
    // const photos = props.photo[0].similarartists.artist.slice(0, 5).map((song, i) => {
    //     // console.log(photos, " <-- similar artists in container")
    

        return (
            <div className="push-left" key={i}>
             <li className="white">{song.name}</li>
            </div> 
        )  
    })
        
        
    
        return(
            <div>
                 <Divider className="white" inverted horizontal><h4> Top Songs </h4></Divider>
                <ol>{songs}</ol>
            </div>
        )
}
 
        
        
export default TopSongs;