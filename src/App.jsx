import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import $ from 'jquery/src/jquery';

import registerServiceWorker from './registerServiceWorker';

var cartsize=0;
class Products extends React.Component{
  constructor(props){
    super(props);
    this.state={
      prodList:[],
      matchedSize:0
    };
  }

}
class Navbar extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      date: new Date()
    }
  }
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
  tick() {
    this.setState({
      date: new Date()
    });
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  render(){
    return(
      <div class="w3-center w3-bar w3-green w3-padding-16">
        <html class="w3-xxlarge w3-center">QuickPack</html> <html class="w3-small w3-center">{' '+this.state.date.toLocaleTimeString()}</html>
      </div>
    );
  }
};
class SearchBar extends React.Component{
  constructor(props){
    super(props);
    this.state={
      prods:[]
    }
    //this.loadApi = this.loadApi.bind(this);
  }
  loadApi(){
    const Query='http://es.backpackbang.com:9200/products/amazon/_search?q='+document.getElementById('searchId').value;
    fetch(Query, {method: 'GET'})
    .then(response => response.json())
    .then(parsedJson=>console.log(parsedJson.hits))
    .catch(error => console.log('failed'))

  }
  render(){
    return(
      <div class="w3-bar w3-green">
        <form class="w3-container w3-center centerform">
          <input type = "text" placeholder="Search for any item" class="w3-input w3-border w3-white w3-text-black" id='searchId' />
          <button class="fa fa-search w3-btn" id='searchBtn' onClick={this.loadApi}/>
        </form>
      </div>

    );
  }

}
class App extends React.Component{
  render(){
    return(
      <div>
        <Navbar />
        <SearchBar />
      </div>
    );
  }
}
export default App;
