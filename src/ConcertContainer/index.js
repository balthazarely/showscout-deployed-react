import React from 'react';
import { Grid, Button, Popup, Modal, Divider, Image, Header } from 'semantic-ui-react'
import Moment from 'react-moment';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { whileStatement } from '@babel/types';


const mapStyles = {
    width: '220px',
    height: '220px',
    left: "-20px",
    top: "-100px",
  };


const style = {
    borderRadius: 0,
    opacity: 0.7,
    padding: '1em',
  }


const moreMapStyle = {

    opacity: 1
   
  }


  



const ConcertContainer = (props) => {
    const concertList = props.concert.map((singleConcert, i) => {
    console.log(singleConcert, " < concert info in ConcertContainer") 
    console.log(singleConcert.venue.latitude , " <LAT")
    console.log(singleConcert.venue.longitude , " <LONG")
    // console.log(props.concert[0].lineup)

   
      
    
    const artistLoop = props.concert[i].lineup.map((artist, i) => {
        return (
            <div key={i}>
                {artist}
            </div>
        )
    })


        return (
            
            <Grid.Row key={singleConcert.id} verticalAlign='middle'  columns={2}>
                <div></div>
                    
                    <Grid.Column width={3} verticalAlign='middle' >
                        <Button inverted color="orange" icon='plus' onClick={props.addShowToList.bind(this, singleConcert)}/>
                         {/* <Button inverted name={singleConcert.datetime} value={singleConcert} onClick={props.addShowToList.bind(this, singleConcert)} color="orange" size='small'>+</Button> */}
                    </Grid.Column>

                    
                    <Grid.Column width={10} className="push-left">
                        <h4 className="push-left lineup3">{singleConcert.venue.name}</h4>
                            <p className="push-left"><Moment format="h:mm a[,] ">{singleConcert.datetime}</Moment> <Moment format="MMMM Do [,] YYYY">{singleConcert.datetime}</Moment></p>
                            {/* <p className="push-left"><Moment format="MMMM Do [,] YYYY">{singleConcert.datetime}</Moment></p> */}
                            <h4 className="push-left lineup2">{singleConcert.venue.city}, {singleConcert.venue.region} {singleConcert.venue.country}</h4>
                            <div className="push-left">
                            {/* {typeof singleConcert.offers[0].url == "undefined" ? null : <h4>hi</h4> } */}
                            <Button.Group  size='tiny'>
                                <Button target='BLANK' href={singleConcert.url}>Tickets</Button>
                            <Popup
                                content={artistLoop}
                                on='click'
                                style={style}
                                position='right center'
                                pinned
                                inverted
                                trigger={<Button content='Full Lineup' />}
                            />    
                             <Popup
                                content={<Map
                                    google={props.google}
                                    zoom={13}
                                    style={mapStyles}
                                    initialCenter={{ 
                                        lat: singleConcert.venue.latitude, 
                                        lng: singleConcert.venue.longitude
                                    }}
                                    >
                                    <Marker 
                                        position={{ 
                                            lat: singleConcert.venue.latitude, 
                                            lng: singleConcert.venue.longitude,
                                            }} 
                                        >
                                       
                                    </Marker>
                                    
                                </Map>} 
                                on='click'
                                style={moreMapStyle}
                                position='right center'
                                trigger={<Button content='Map' />}
                            />                         
                            
                           
                        </Button.Group>{/* <p>{artistLoop}</p> */}
                        </div>
                         <Divider />
                    </Grid.Column>
                  
                
                </Grid.Row>
            )   
        })

    return(
        <Grid stackable columns={2}>
     
            {concertList}
        </Grid>
    )
}


export default GoogleApiWrapper({
    apiKey: 'AIzaSyBHLett8djBo62dDXj0EjCimF8Rd6E8cxg'
  })(ConcertContainer);



// import React from 'react';
// import { Grid, Button, Popup, Divider } from 'semantic-ui-react'
// import Moment from 'react-moment';
// import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';


// const mapStyles = {
   
//     width: '100px',
//     height: '100px'
//   };


// const style = {
//     borderRadius: 0,
//     opacity: 0.7,
//     padding: '1em',
//   }


// const ConcertContainer = (props) => {
//     const concertList = props.concert.map((singleConcert, i) => {
//     console.log(singleConcert, " < concert info in ConcertContainer") 
//     console.log(singleConcert.venue.latitude , " <LAT")
//     console.log(singleConcert.venue.longitude , " <LONG")
//     // console.log(props.concert[0].lineup)

   
      
    
//     const artistLoop = props.concert[i].lineup.map((artist, i) => {
//         return (
//             <div>
//                 {artist}
//             </div>
//         )
//     })


//         return (
            
//             <Grid.Row key={singleConcert.id} verticalAlign='middle'  columns={2}>
//                 <div></div>
//                     <Grid.Column width={3} >
//                     <Grid.Column width={4} verticalAlign='middle' >
//                         <Button inverted color="orange" icon='plus' onClick={props.addShowToList.bind(this, singleConcert)}/>
//                          {/* <Button inverted name={singleConcert.datetime} value={singleConcert} onClick={props.addShowToList.bind(this, singleConcert)} color="orange" size='small'>+</Button> */}
//                     </Grid.Column>
//                     </Grid.Column>

                    
//                     <Grid.Column width={10} className="push-left">
//                         <h4 className="push-left lineup3">{singleConcert.venue.name}</h4>
//                             <p className="push-left"><Moment format="h:mm a[,] ">{singleConcert.datetime}</Moment> <Moment format="MMMM Do [,] YYYY">{singleConcert.datetime}</Moment></p>
//                             {/* <p className="push-left"><Moment format="MMMM Do [,] YYYY">{singleConcert.datetime}</Moment></p> */}
//                             <h4 className="push-left lineup2">{singleConcert.venue.city}, {singleConcert.venue.region} {singleConcert.venue.country}</h4>
//                             <div className="push-left">

//                             {/* {typeof singleConcert.offers[0].url == "undefined" ? null : <h4>hi</h4> } */}

//                             <Button.Group  size='tiny'>
//                                 <Button target='BLANK' href={singleConcert.url}>Tickets</Button>
//                             <Popup
//                                 content={artistLoop}
//                                 on='click'
//                                 style={style}
//                                 position='right center'
//                                 pinned
//                                 inverted
//                                 trigger={<Button content='Full Lineup' />}
//                             />                         
//                              <Map
//                                     google={props.google}
//                                     zoom={8}
//                                     style={mapStyles}
//                                     initialCenter={{ 
//                                         lat: 47.444, 
//                                         lng: -122.176
//                                     }}
//                                     >
//                                     <Marker position={{ lat: 47.444, lng: -122.176}} />
//                                     </Map>
                           
//                         </Button.Group>{/* <p>{artistLoop}</p> */}
//                         </div>
//                          <Divider />
                                    



//                     </Grid.Column>
//                 </Grid.Row>
//             )   
//         })

//     return(
//         <Grid stackable columns={2}>
     
//             {concertList}
//         </Grid>
//     )
// }


// export default GoogleApiWrapper({
//     apiKey: 'AIzaSyBHLett8djBo62dDXj0EjCimF8Rd6E8cxg'
//   })(ConcertContainer);

