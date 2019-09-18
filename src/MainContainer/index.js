import React, { Component} from 'react';
import ConcertContainer from '../ConcertContainer';
import SimilarArtistsContainer from '../SimilarArtistsContainer';
import 'semantic-ui-css/semantic.min.css';
import { Grid, Reveal, Image, Transition, Segment, Button, Icon, Input, Divider } from 'semantic-ui-react'
import TopSongs from '../TopSongs';
import EventContainer from '../EventContainer';
import Favorites from '../Favorites';
import SavedEvents from '../SavedEvents';
import Welcome from '../Welcome';
import LoaderIcon from '../LoaderIcon';
import LoaderIconPlaceholder from '../LoaderIconPlaceholder';
import ArtistBio from '../ArtistBio';
import UserInfo from '../UserInfo';




class MainContainer extends Component {
    
    constructor() {
        super()

        this.state = {
            artistData: [],
            concertData: [],
            searchTerm: '',
            simularAtist: '',
            fethchedArtistId: '',
            similarArtistsData: [],
            savedEvents: [],
            // favArtists: [],

            // location API data
            locationID: '',     
            locationData: [],
        
            //this is the user state stuff
            name: '',
            location: "Denver",

            //utility
            loading: true,
            savedEventsReady: false,
            ready: false,
            fetchCallfired: false
           
          
        }
        this.handleTermChange = this.handleTermChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    
     // this changes the state of the search 
    handleTermChange = (e) => {
        this.setState({[e.target.name] : e.target.value});
    }

    handelLocationSubmit = (e) => {
        e.preventDefault();
        this.locationAPICall();
        this.componentDidMount();
    }

    // function that allows the search function to work when enter is pressed
    handleSubmit = (e) => {
        if(e) {
            e.preventDefault();}
        this.setState({
          ready: false,
        fetchCallfired: true,
          simularAtist: this.state.searchTerm
        })
        this.GetUserInfomation();
        this.locationAPICall();
        this.componentDidMount();
    }


    clickedSimilarArtist = (e) => {
        // e.preventDefault();
        this.setState({
            searchTerm: e.target.innerHTML,
            ready: false,
            simularAtist: this.state.searchTerm
        },function(){
            // console.log(this.state)
             this.handleSubmit();
        }) 
    }

    addShowToList = (singleConcert, e) => {
        // e.preventDefault();
        // const recentAdd = singleConcert;
        // console.log(recentAdd)
        this.setState({
            // savedEvents: [... this.state.savedEvents, recentAdd],
            savedEvents: [... this.state.savedEvents, singleConcert],
        }, function() {
            this.setState({
                savedEventsReady: true
            })
            // console.log(this.state.savedEvents)
        })
    }
    
    // this should also be triggering adding the artist to the db.
    addArtistToList = async (e) => {
        e.preventDefault();
        
        this.setState({
            favArtists: [... this.state.favArtists, e.currentTarget.value]
            },function(){
        })
        console.log("you clicked ", e.currentTarget.value)
        const newFavObj = {
            newFav: e.currentTarget.value
        }
        try {
            const newFavArtist = await fetch(process.env.REACT_APP_BACKEND_URL + 'auth/home', {
                method: "POST",
                body: JSON.stringify(newFavObj),
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
            })
            const parsedResponse = await newFavArtist.json();
            // console.log(parsedResponse)
        } catch (err){

        }
    }


    // The delete route
    removeArtistFromList = async (fav, e) => {
    try {
        const deleteArtist = await fetch(process.env.REACT_APP_BACKEND_URL + `${fav.newFav}`,  {
            method: "PUT",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
        }) 
        const parsedResponse = await deleteArtist.json();
        console.log("delete ", fav)
        this.setState({
            favArtists: this.state.favArtists.filter((artist) => artist !== fav)
        })
    } catch(err) {
        console.log(err, ' error')
      
        }
    }

    
    GetUserInfomation = async (user) => {
        try {
            const userResponse = await fetch(process.env.REACT_APP_BACKEND_URL + 'auth/home', {
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
            })
            const userInfo = await userResponse.json();

            console.log(userInfo.data)
            this.setState({
                name: userInfo.data.username,
                favArtists: userInfo.data.favArtists
            })
        } catch(err){
            console.log(err)
            return err
        }
    }


    removeShowFromList = (event) => {
        this.setState({
            savedEvents: this.state.savedEvents.filter((events) => events !== event)
        })
        console.log("delete ", event)
    }
    

    clickArtistOnList = (e) => {
        console.log("you clicked ", [e.target.innerHTML])
        e.preventDefault();
        this.setState({
            searchTerm: e.target.innerHTML,
            ready: false,
            simularAtist: this.state.searchTerm
        },function(){
            // console.log(this.state)
             this.handleSubmit();
        }) 
    }

    // // api call to change location
    locationAPICall = () => {
        let url = (`https://api.songkick.com/api/3.0/search/locations.json?query=${this.state.location}&apikey=viaZLZfjblo2eWh5`)
        // //first api call to get city ID
        fetch(url)
            .then(response => response.json())
            .then((cityId) => {
                console.log(cityId.resultsPage.results.location[0].metroArea.id);
                this.setState({
                    locationID: cityId.resultsPage.results.location[0].metroArea.id
                })
            })
        }
    

    // Get the API data
    componentDidMount = async () => {
        //this is the artist data from the API
            const response = await fetch(`https://rest.bandsintown.com/artists/${this.state.searchTerm}?app_id=3668f547a226ff2fa06663c1ed8d39cc`);
            const json = await response.json();
        //BANDSINTOWN VERSION
            const response2 = await fetch(`https://rest.bandsintown.com/artists/${this.state.searchTerm}/events?app_id=3668f547a226ff2fa06663c1ed8d39cc&date=upcoming`);
            const json2 = await response2.json();
        //this is the last.fm api request
            const response3 = await fetch(` http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${this.state.simularAtist}&api_key=d6f78535b00f29193d52a517f0d13935&format=json`);
            const json3 = await response3.json();
            const response4 = await fetch(` http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${this.state.simularAtist}&api_key=d6f78535b00f29193d52a517f0d13935&format=json`);
            const json4 = await response4.json();           
        //fetch based on area
            const response6 = await fetch(`https://api.songkick.com/api/3.0/metro_areas/${this.state.locationID}/calendar.json?apikey=viaZLZfjblo2eWh5`);
            const json6 = await response6.json();
        //artist INFO last fm
            const response7 = await fetch(`http://ws.audioscrobbler.com//2.0/?method=artist.getinfo&artist=${this.state.searchTerm}&api_key=d6f78535b00f29193d52a517f0d13935&format=json`);
            const json7 = await response7.json();
            const bioinfo = json7.artist.bio.summary

        this.setState({
            artistData: json,
            topSongs: json4,
            concertData: [...json2],
            similarArtistsData: [json3],
            locationData: [json6],
            artitsBio: bioinfo,
            loading: false,
            fetchCallfired: false
        });
    }

  


   
    render() {

   

        
         return (
             <div className="bg">
                 
                
                <div className="content-holder fade-in">
                {/* <Logout /> */}
                    {/* <LogoHeader /> */}
                    <Grid stackable columns={3}>
                        <Grid.Column width={4}>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            {this.state.fetchCallfired  ? <LoaderIcon /> : <LoaderIconPlaceholder />}
                                <div>
                                    <div className="search-form">
                                        <form onSubmit={this.handleSubmit}>
                                            <Input action={{
                                                    color: 'orange',
                                                    icon: 'search',
                                                    }}  
                                                size='large' type="text" 
                                                name="searchTerm" 
                                                placeholder="Search Artist..." 
                                                value={this.state.searchTerm} 
                                                onChange={this.handleTermChange}/>
                                        </form>
                                    </div>
                                   
                                   
                                </div>
                            {this.state.loading ? <Segment><Welcome/></Segment> : null}
                        </Grid.Column>
                        <Grid.Column width={4}>
                        </Grid.Column>
                    </Grid>


                        

                    <div className={this.state.loading ? 'opacityON' : 'opacityOFF'}>
                    <Grid stackable columns={3}>
                        <Grid.Column width={4}>
                            <div>

                                <Reveal animated='move top'>
                                    <Reveal.Content visible>
                                    <Image className="artist-image" src={this.state.artistData.image_url}/>
                                    </Reveal.Content>
                                    <Reveal.Content hidden>
                                    {this.state.loading ? "Top Songs Loading..." : <TopSongs topSongs={this.state.topSongs} />}                                    </Reveal.Content>
                                </Reveal>



                                {/* <Image className="artist-image" src={this.state.artistData.image_url}/> */}
                                <h1 className="artist-name-display">{this.state.artistData.name}</h1>
                                
                                <Button inverted className="plus-icon" color="orange" icon value={this.state.artistData.name} onClick={this.addArtistToList}>
                                    <Icon name='plus'/>
                                </Button>

                            </div>
                            <div className="gray-card">
                                {this.state.loading ? "Similar Artist Loading..." : <SimilarArtistsContainer similarArtists={this.state.similarArtistsData} clickedSimilarArtist={this.clickedSimilarArtist} />}
                            </div>
                            {/* <div className="gray-card">
                                {this.state.loading ? "Top Songs Loading..." : <TopSongs topSongs={this.state.topSongs} />}
                            </div> */}
                            <div className="gray-card">
                                {this.state.loading ? "Top Songs Loading..." : <ArtistBio bio={this.state.artitsBio} />}
                            </div>
                        </Grid.Column>


                        <Grid.Column width={8}>
                            {this.state.concertData.length == 0 ? <h2 className="no-upcoming-show"> No Upcoming Events</h2> : <Segment>
                                <ConcertContainer concert={this.state.concertData} addShowToList={this.addShowToList}/>
                            </Segment>}
                        </Grid.Column>



                        <Grid.Column className={this.state.loading ? 'opacityON' : 'opacityOFF'} width={4}>
                            <div className="gray-card-nomargintop">
                                {this.state.loading ? "User Loading..." : <UserInfo name={this.state.name} location={this.state.location}/>}
                                <Divider/>
                                {/* <p className="white">Location: {this.state.location}</p> */}
                                
                                {this.state.loading ? null :
                                <Favorites removeArtistFromList={this.removeArtistFromList}
                                clickArtistOnList={this.clickArtistOnList} 
                                name={this.state.name} 
                                favArtists={this.state.favArtists}
                                location={this.state.location}/> }




                            </div>
                            <div >
                                {this.state.savedEvents.length == 0 ? null : <Segment>
                                <SavedEvents savedEvents={this.state.savedEvents} removeShowFromList={this.removeShowFromList} />  </Segment>}
                            </div>
                            <div className="gray-card"> 
                            <Divider className="white" inverted horizontal><h3> Events Nearby </h3></Divider>
                                <form onSubmit={this.handelLocationSubmit}>
                                            <Input action={{
                                                    color: 'orange',
                                                    icon: 'edit',
                                                    }}  
                                                size='mini' type="text" 
                                                name="location" 
                                                placeholder={this.state.location} 
                                                // value={this.state.searchTerm} 
                                                onChange={this.handleTermChange}/>
                                        </form>
                                        <br/>
                                {this.state.loading ? "Nearby Events Loading..." : <EventContainer event={this.state.locationData} />}
                            </div>
                        </Grid.Column>
                    </Grid>
                </div>
          
            </div>

         
        </div>
        )
    }
}

export default MainContainer;














// import React, { Component} from 'react';
// import ConcertContainer from '../ConcertContainer';
// import SimilarArtistsContainer from '../SimilarArtistsContainer';
// import 'semantic-ui-css/semantic.min.css';
// import { Grid, Image, Segment, Button, Icon, Input, } from 'semantic-ui-react'
// import LogoHeader from '../Header';
// import TopSongs from '../TopSongs';
// import EventContainer from '../EventContainer';
// import Favorites from '../Favorites';
// import SavedEvents from '../SavedEvents';
// import Welcome from '../Welcome';
// import LoaderIcon from '../LoaderIcon';
// import LoaderIconPlaceholder from '../LoaderIconPlaceholder';
// import ArtistBio from '../ArtistBio';
// import UserInfo from '../UserInfo';
// import Logout from '../Logout'


// class MainContainer extends Component {
    
//     constructor() {
//         super()

//         this.state = {
//             artistData: [],
//             concertData: [],
//             searchTerm: '',
//             simularAtist: '',
//             fethchedArtistId: '',
//             similarArtistsData: [],
//             locationID: '6404',
//             locationData: [],
//             savedEvents: [],
//             favArtists: [],
//             //this is the user state stuff
//             name: '',
//             location: "Boulder",
//             //utility
//             loading: true,
//             savedEventsReady: false,
//             ready: false,
//             fetchCallfired: false
           
          
//         }
//         this.handleTermChange = this.handleTermChange.bind(this);
//         this.componentDidMount = this.componentDidMount.bind(this);
//     }
    
//      // this changes the state of the search 
//      handleTermChange = (e) => {
//         this.setState({[e.target.name] : e.target.value});
//     }

//     // function that allows the search function to work when enter is pressed
//     handleSubmit = (e) => {
//         if(e) {
//             e.preventDefault();}
//         this.setState({
//           ready: false,
//         fetchCallfired: true,
//           simularAtist: this.state.searchTerm
//         })
//         this.componentDidMount();
//     }


//     clickedSimilarArtist = (e) => {
//         // e.preventDefault();
//         this.setState({
//             searchTerm: e.target.innerHTML,
//             ready: false,
//             simularAtist: this.state.searchTerm
//         },function(){
//             // console.log(this.state)
//              this.handleSubmit();
//         }) 
//     }

//     addShowToList = (singleConcert, e) => {
//         // e.preventDefault();
//         const recentAdd = singleConcert;
//         // console.log(recentAdd)
//         this.setState({
//             savedEvents: [... this.state.savedEvents, recentAdd],
//             savedEvents: [... this.state.savedEvents, singleConcert],
//         }, function() {
//             this.setState({
//                 savedEventsReady: true
//             })
//             // console.log(this.state.savedEvents)
//         })
//     }
    
//     // this should also be triggering adding the artist to the db.
//     addArtistToList = async (e) => {
//         e.preventDefault();
//         this.setState({
//             favArtists: [... this.state.favArtists, e.currentTarget.value]
//             },function(){
//         })
//         console.log("you clicked ", e.currentTarget.value)
//         const newFavObj = {
//             newFav: e.currentTarget.value
//         }
//         try {
//             const newFavArtist = await fetch('http://localhost:9000/auth/home', {
//                 method: "POST",
//                 body: JSON.stringify(newFavObj),
//                 credentials: 'include',
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//             })
//             const parsedResponse = await newFavArtist.json();
//             // console.log(parsedResponse)
//         } catch (err){

//         }
//     }


//     // The delete route
//     removeArtistFromList = async (fav, e) => {
//     try {
//         console.log(fav)
//         // i know that this fetch request is trying to bring up the item that i am trying to delete from the DB. but how to i ensure that i am selecting the correct one?
//         const deleteArtist = await fetch(`http://localhost:9000/auth/home/${fav}`,  {
//             method: "PUT",
//             credentials: 'include',
//             headers: {
//                 "Content-Type": "application/json"
//             },
//         }) 
        
//         const parsedResponse = await deleteArtist.json();
//         console.log("delete ", fav)
//         this.setState({
//             favArtists: this.state.favArtists.filter((artist) => artist !== fav)
//         })
//     } catch(err) {
//         console.log(err, ' error')
      
//         }
//     }
    


//     //this is the route that gives us the userinfomatino so that i can add it to the state.
//     // the problem seems to be that the data is coming in as NULL in the terminal
//     GetUserInfomation = async (user) => {
//         try {
//             const userResponse = await fetch('http://localhost:9000/auth/home', {
//                 credentials: 'include',
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//             })
//             const userInfo = await userResponse.json();
//             console.log(userInfo)
//             this.setState({
//                 name: userInfo.value.username
//             })
//         //     this.setState({movies: moviesParsed.data})
//         } catch(err){
//             console.log(err)
//             return err
//         }
//     }


//     removeShowFromList = (event) => {
//         this.setState({
//             savedEvents: this.state.savedEvents.filter((events) => events !== event)
//         })
//         console.log("delete ", event)
//     }

//     clickArtistOnList = (e) => {
//         console.log("you clicked ", [e.target.innerHTML])
//         e.preventDefault();
//         this.setState({
//             searchTerm: e.target.innerHTML,
//             ready: false,
//             simularAtist: this.state.searchTerm
//         },function(){
//             // console.log(this.state)
//              this.handleSubmit();
//         }) 
//     }


//     // Get the API data
//     componentDidMount = async () => {
//         this.GetUserInfomation();
//         //this is the artist data from the API
//             const response = await fetch(`https://rest.bandsintown.com/artists/${this.state.searchTerm}?app_id=3668f547a226ff2fa06663c1ed8d39cc`);
//             const json = await response.json();
//         //BANDSINTOWN VERSION
//             const response2 = await fetch(`https://rest.bandsintown.com/artists/${this.state.searchTerm}/events?app_id=3668f547a226ff2fa06663c1ed8d39cc&date=upcoming`);
//             const json2 = await response2.json();
//         //this is the last.fm api request
//             const response3 = await fetch(` http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${this.state.simularAtist}&api_key=d6f78535b00f29193d52a517f0d13935&format=json`);
//             const json3 = await response3.json();
//             const response4 = await fetch(` http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${this.state.simularAtist}&api_key=d6f78535b00f29193d52a517f0d13935&format=json`);
//             const json4 = await response4.json();           
//         //fetch based on area
//             const response6 = await fetch(`https://api.songkick.com/api/3.0/metro_areas/${this.state.locationID}/calendar.json?apikey=viaZLZfjblo2eWh5`);
//             const json6 = await response6.json();
//         //artist INFO last fm
//             const response7 = await fetch(`http://ws.audioscrobbler.com//2.0/?method=artist.getinfo&artist=${this.state.searchTerm}&api_key=d6f78535b00f29193d52a517f0d13935&format=json`);
//             const json7 = await response7.json();
//             const bioinfo = json7.artist.bio.summary
    

//         this.setState({
//             artistData: json,
//             topSongs: json4,
//             concertData: [...json2],
//             similarArtistsData: [json3],
//             locationData: [json6],
//             artitsBio: bioinfo,
//             loading: false,
//             fetchCallfired: false
//         });
//     }

    
    
//     render() {
//          return (
//              <div className="bg">
                
//                 <div className="content-holder fade-in">
//                 {/* <Logout /> */}
//                     {/* <LogoHeader /> */}
//                     <Grid stackable columns={3}>
//                         <Grid.Column width={4}>
//                         </Grid.Column>
//                         <Grid.Column width={8}>
//                             {this.state.fetchCallfired  ? <LoaderIcon /> : <LoaderIconPlaceholder />}
//                                 <div>
//                                     <div className="search-form">
//                                         <form onSubmit={this.handleSubmit}>
//                                             <Input action={{
//                                                     color: 'orange',
//                                                     icon: 'search',
//                                                     }}  
//                                                 size='small' type="text" 
//                                                 name="searchTerm" 
//                                                 placeholder="Search Artist..." 
//                                                 value={this.state.searchTerm} 
//                                                 onChange={this.handleTermChange}/>
//                                         </form>
//                                     </div>
//                                 </div>
//                             {this.state.loading ? <Segment><Welcome/></Segment> : null}
//                         </Grid.Column>
//                         <Grid.Column width={4}>
//                         </Grid.Column>
//                     </Grid>


//                     <div className={this.state.loading ? 'opacityON' : 'opacityOFF'}>
//                     <Grid stackable columns={3}>
//                         <Grid.Column width={4}>
//                             <div>
//                                 <Image className="artist-image" src={this.state.artistData.image_url}/>
//                                 <h1 className="artist-name-display">{this.state.artistData.name}</h1>
                                
//                                 <Button inverted className="plus-icon" color="orange" icon value={this.state.artistData.name} onClick={this.addArtistToList}>
//                                     <Icon name='plus'/>
//                                 </Button>

//                             </div>
//                             <div className="gray-card">
//                                 {this.state.loading ? "Similar Artist Loading..." : <SimilarArtistsContainer similarArtists={this.state.similarArtistsData} clickedSimilarArtist={this.clickedSimilarArtist} />}
//                             </div>
//                             <div className="gray-card">
//                                 {this.state.loading ? "Top Songs Loading..." : <TopSongs topSongs={this.state.topSongs} />}
//                             </div>
//                             <div className="gray-card">
//                                 {this.state.loading ? "Top Songs Loading..." : <ArtistBio bio={this.state.artitsBio} />}
//                             </div>
//                         </Grid.Column>


//                         <Grid.Column width={8}>
//                             {this.state.concertData.length == 0 ? <h2 className="no-upcoming-show"> No Upcoming Events</h2> : <Segment>
//                                 <ConcertContainer concert={this.state.concertData} addShowToList={this.addShowToList}/>
//                             </Segment>}
//                         </Grid.Column>



//                         <Grid.Column className={this.state.loading ? 'opacityON' : 'opacityOFF'} width={4}>
//                             <div className="gray-card-nomargintop">
//                                 {this.state.loading ? "User Loading..." : <UserInfo name={this.state.name}/>}
//                                 <p className="white">Location: {this.state.location}</p>
//                             </div>
                            
//                             <div className="gray-card">
//                                 <Favorites removeArtistFromList={this.removeArtistFromList}
//                                 clickArtistOnList={this.clickArtistOnList} 
//                                 name={this.state.name} 
//                                 favArtists={this.state.favArtists}
//                                 location={this.state.location}/>
//                             </div>
//                             <div >
//                                 {this.state.savedEvents.length == 0 ? null : <Segment>
//                                 <SavedEvents savedEvents={this.state.savedEvents} removeShowFromList={this.removeShowFromList} />  </Segment>}
//                             </div>
//                             <div className="gray-card">
//                                 {this.state.loading ? "Nearby Events Loading..." : <EventContainer event={this.state.locationData} />}
//                             </div>
//                         </Grid.Column>
//                     </Grid>
//                 </div>
//             </div>
//         </div>
//         )
//     }
// }

// export default MainContainer;


// // <div className="search-form">
// // <form onSubmit={this.handleSubmit}>
// //     <Input size='small' icon='search' type="text" 
// //         name="searchTerm" 
// //         id="IDK" focus
// //         placeholder="Search Artist..." 
// //         value={this.state.searchTerm} 
// //         onChange={this.handleTermChange}/>
// //     <Button className="mainButton" color="orange" >
// //         Submit
// //     </Button> 
// // </form>
// // </div>


