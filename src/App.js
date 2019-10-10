import React, {PureComponent} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

//Import Components
import MainContainer from './components/MainContainer'
import apiKey from './config.js';

import NotFound from './components/NotFound';


class App extends PureComponent{
  state={
    images:[],
    loading: true,
    text: '',
    value: 'people',
    oceanImages:[],
    flowerImages:[],
    cityImages:[],
  }

  componentDidMount(){
    this.search();
    this.searchOceans();
    this.searchFlowers();
    this.searchCities();
  }

  searchOceans = (query="oceans", page=4)=>{
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

  searchCities = (query="cities", page=20)=>{
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

  render(){
    if(this.state.images){
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
    }
  };
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
)

export default App;
