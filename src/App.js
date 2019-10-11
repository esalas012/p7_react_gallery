import React, {PureComponent} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

//Import Components
import MainContainer from './components/MainContainer';
import NotFound from './components/NotFound';

//Import config file
import apiKey from './config.js';

//The app component contains all routes and is responsible for fetching the photos.

class App extends PureComponent{
  state={
    images:[],
    loading: true,
    text: '',
    value: 'animals',
    oceanImages:[],
    flowerImages:[],
    cityImages:[],
  }
/*
  When the application is loaded for the first time it requests all images for all routes
*/
  componentDidMount(){
    this.search();
    this.searchOceans();
    this.searchFlowers();
    this.searchCities();
  }

  //Api request for ocean images
  searchOceans = (query="oceans", page=18)=>{
    this.setState({loading:true});
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&page=${page}&per_page=24&api_key=${apiKey}&tags=${query}&format=json&nojsoncallback=1`)
      .then(response=>response.json())
      .then(responseData =>{
          this.setState(()=>{
            return{
              oceanImages: responseData.photos.photo
            }
          })
        }
      )
      .catch(err=>{
        console.log("Error fetching and parsing data", err);
      });
  }

//Api request for flower images
  searchFlowers = (query="flowers", page=1)=>{
    this.setState({loading:true});
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&page=${page}&per_page=24&api_key=${apiKey}&tags=${query}&format=json&nojsoncallback=1`)
      .then(response=>response.json())
      .then(responseData =>{
          this.setState(()=>{
            return{
              flowerImages: responseData.photos.photo
            }
          })
        }
      )
      .catch(err=>{
        console.log("Error fetching and parsing data", err);
      });
  }

//Api request for cities images
  searchCities = (query="cities", page=22)=>{
    this.setState({loading:true});
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&page=${page}&per_page=24&api_key=${apiKey}&tags=${query}&format=json&nojsoncallback=1`)
      .then(response=>response.json())
      .then(responseData =>{
          this.setState(()=>{
            return{
              cityImages: responseData.photos.photo
            }
          })
        }
      )
      .catch(err=>{
        console.log("Error fetching and parsing data", err);
      });
  }

//This method searches for animal photos when the site is first loaded and is also invoked everytime the user submits a search request.
//the loading state is set to false after the program fetches the data it needs.
  search = (query = this.state.value, page = 1) => {
    this.setState({loading:true});
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&page=${page}&per_page=24&api_key=${apiKey}&tags=${query}&format=json&nojsoncallback=1`)
      .then(response=>response.json())
      .then(responseData =>{
          this.setState(()=>{
            return{
              images: responseData.photos.photo,
              loading:false,
              text: query
            }
          })
        }
      )
      .catch(err=>{
        console.log("Error fetching and parsing data", err);
      });
  }

  /*
    Creates 5 routes ("/", "search/...", "/oceans", "/flowers", "/cities")
    Loads MainContainer with the corresponding images
  */
  render(){

      return(
        <BrowserRouter>
            <Switch>
              <Route exact path = "/" render = {(route)=>{
                return(
                  (this.state.loading)
                    ?<p>Loading...</p>
                    :<MainContainer
                        images={this.state.images}
                        text={this.state.text}
                        search={this.search}
                        route={route}
                      />

                )
              }}/>
              <Route path = {`/search/${this.state.text}`} render = {(route)=>{
                return(
                  (this.state.loading)
                    ?<p>Loading...</p>
                    :<MainContainer
                      images={this.state.images}
                      text={this.state.text}
                      search={this.search}
                      route={route}
                    />
                )
              }}/>

              <Route path = "/oceans" render = {(route)=>{
                return(
                  (this.state.loading)
                    ?<p>Loading...</p>
                    :<MainContainer
                      images={this.state.oceanImages}
                      search={this.search}
                      route={route}
                      text="oceans"
                    />
                )
              }}/>
              <Route path = "/flowers" render = {(route)=>{
                return(
                  (this.state.loading)
                    ?<p>Loading...</p>
                    :<MainContainer
                      images={this.state.flowerImages}
                      search={this.search}
                      route={route}
                      text="flowers"
                    />
                )
              }}/>
              <Route path = "/cities" render = {(route)=>{
                return(
                  (this.state.loading)
                    ?<p>Loading...</p>
                    :<MainContainer
                      images={this.state.cityImages}
                      search={this.search}
                      route={route}
                      text="cities"
                    />
                )
              }}/>

              <Route render={(route)=>{
                return(
                  (this.state.loading)
                    ?<p>Loading...</p>
                    :<NotFound
                      search={this.search}
                      route={route}
                    />
                )

              }}/>
            </Switch>
        </BrowserRouter>
      )

  };
}


export default App;
