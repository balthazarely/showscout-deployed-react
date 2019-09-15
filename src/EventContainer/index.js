import React from 'react';
import { Divider, Button, Card, Input } from 'semantic-ui-react'



const EventContainer = (props) => {
    // console.log(props.event[0].resultsPage.results.event, " < props in eventContainer")
    

        const events = props.event[0].resultsPage.results.event.slice(0, 20).map((event, i) => {
           
        // if(typeof event.uri == 'undefined'  ) {
        //     alert("there is an undefined here")
        // }




        // console.log(event, " < concert info in ConcertContainer") 


            return (
            <Card key={i}>
            <Card.Content>

                <Card.Description><h5 className="event-header">{event.displayName}</h5></Card.Description>
                   
                    <Card.Description>{event.venue.displayName}</Card.Description>
                    <Card.Description>{event.venue.metroArea.displayName}</Card.Description>
                    <Card.Meta>{event.start.date}</Card.Meta>


                <Button target="BLANK" href={event.uri} size="mini">tickets</Button>

                
            </Card.Content>
          </Card>
        )   
    })
    return(
        <div>
            
            
            <Card.Group >
                {events}
            </Card.Group>
        </div>
    )
}

export default EventContainer;


