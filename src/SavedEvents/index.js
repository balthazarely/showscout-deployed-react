import React from 'react';
import { Button, Popup, Divider } from 'semantic-ui-react'
import Moment from 'react-moment';



const SavedEvents = (props) => {



    // console.log(props.savedEvents[0].id)
    console.log(props.savedEvents[0])
    const eventlist = props.savedEvents.map((event, i) => {
        return(
            <div key={i} >
                <h4 className="saved-event-title">{event.lineup[0]}</h4>
                <div className="saved-event-p">
                    <p>{event.venue.name} <br/>
                    <Moment format="MMMM Do [,] YYYY">{event.datetime}</Moment><br/>
                    {event.venue.city}, {event.venue.country}</p>
               </div> <br/>
                <Button.Group  size='tiny'>
                    <Button onClick={props.removeShowFromList.bind(null, event)}icon='delete' />>
                    <Button>Tickets</Button>
                    
             
                </Button.Group>
                
                <Divider />
            </div> 
        )
    })

    





    return(
        <div>
             <h3>Saved Events:</h3>
             <Divider />
             {eventlist}
        </div>
    )
}


export default SavedEvents;
