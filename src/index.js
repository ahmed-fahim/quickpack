import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import $ from 'jquery/src/jquery';

var itemList=[];
var cartList=[];
var ProductList=[];
var CartItem=[];
var searchCounter=0;
var changeInProducts=0;
var isloading=0;

class Item_In_Cart{
  constructor(name,price){
    this.name=name;
    this.price=price;
  }
};

class Item{
  constructor(id,name,price,image){
    this.id=id;
    this.name=name;
    this.price=price;
    this.image=image;
    this.addToCart = this.addToCart.bind(this);
  }
  addToCart(){
    var inCart=new Item_In_Cart(this.name, this.price);
    cartList.push(inCart);
    console.log(inCart.name);
  }
};

function appendProducts()
{
  if(itemList.length==0){
    if(searchCounter==0){
      var welcomeText=<h1 class="w3-center">{'Welcome to QuickPack'}</h1>;
      ProductList=[];
      ProductList.push(welcomeText);
    }
    else if(isloading == 1)
    {
      ProductList=[];
      var loadingIcon=(
        <div class="spinner">
          <div class="cube1"></div>
          <div class="cube2"></div>
        </div>
      );
      ProductList.push(loadingIcon);
    }
    else{
      var notFound=<h1 class="w3-center">{'Sorry, nothing mathced your query'}</h1>;
      ProductList=[];
      ProductList.push(notFound);
    }
  }
  else{
    if(changeInProducts==0){
      return;
    }
    ProductList=[];
    for(var i=0; i < itemList.length; i++){
      var truncatedname=itemList[i].name;
      if(truncatedname.length > 20){
        truncatedname=truncatedname.substring(0,20);
      }
      var itemPresentation = (
        <div class="w3-third w3-card w3-margin-bottom">
          <img src={itemList[i].image} class="productImage" />
          <div class="w3-container w3-center w3-margin-bottom">
            <h5 class="w3-center">{truncatedname+'  @'+itemList[i].price+' BDT'}<hr /></h5>
            <button class="w3-btn w3-center w3-green" onClick={itemList[i].addToCart}>Add to Cart</button>
          </div>
        </div>
      );
      ProductList.push(itemPresentation);
    }
    changeInProducts=0;
  }
}

function emptyCart(){
  cartList=[];
  CartItem=[];
}

function appendCart(){
  CartItem=[];
  var heading=(
    <div class="w3-panel w3-blue">
      <h1 class="w3-center">Your Shopping Cart </h1>
    </div>
  );
  CartItem.push(heading);
  if(cartList.length==0){
    var clearCartButton=(
      <div class="w3-container">
        <button class="w3-button w3-red w3-disabled w3-right">Empty Cart</button>
      </div>
    );
    var itemPresentation = (
      <div class="w3-card w3-leftbar">
        <h2 class="w3-center">{'Cart is empty'}</h2>
      </div>
    );
    CartItem.push(clearCartButton);
    CartItem.push(itemPresentation);
    return;
  }
  var clearCartButton=(
    <div class="w3-container">
      <button class="w3-button w3-red w3-right" onClick={emptyCart}>Empty Cart</button>
    </div>
  );
  CartItem.push(clearCartButton);
  var totalPrice=0;
  for(var i=0;i<cartList.length; i++){
    var truncatedname=cartList[i].name;
    totalPrice+=cartList[i].price;
    if(truncatedname.length > 20){
      truncatedname=truncatedname.substring(0,20);
    }
    var itemPresentation = (
      <div class="w3-panel w3-card w3-leftbar">
        <div class="w3-large w3-left">{truncatedname}</div>
        <div class="w3-large w3-right">{cartList[i].price+' BDT'}</div>
      </div>
    );
    CartItem.push(itemPresentation);
  }
  var checkOutPrice=(
    <div class="w3-panel w3-card w3-topbar w3-border-black">
      <div class="w3-large w3-left">{'Total Price'}</div>
      <div class="w3-large w3-right">{totalPrice+' BDT'}</div>
    </div>
  );
  CartItem.push(checkOutPrice);
}

class ProductPrinter extends React.Component{
  render(){
    appendProducts();
    appendCart();
    return(
      <div>
        <div class="w3-container w3-twothird ">
          {ProductList}
        </div>
        <div class="w3-container w3-rest">
          {CartItem}
        </div>
      </div>
    );
  }
};
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
    this.loadDoc = this.loadDoc.bind(this);
  }
  loadDoc(){
    isloading=1;
    itemList=[];
    searchCounter=searchCounter+1;
    var query=document.getElementById('searchId').value;
    var trunclimit=-1;
    for(var i=0;i<query.length;i++){
      if(query[i] == ';'){
        trunclimit=i;
        break;
      }
    }
    if(trunclimit != -1){
      query=query.substring(0,trunclimit);
    }
    const FIN_URL="http://es.backpackbang.com:9200/products/amazon/_search?q=" + query;
    //console.log(FIN_URL);
    $.ajax({
          url: FIN_URL,
          type: "get", //send it through get method
          success: function(response) {
              changeInProducts=1;
              if(response.hits.total == 0){
                itemList=[];
                isloading=0;
              }
              else{
                var hitsArray=response.hits.hits;
                itemList=[];
                //console.log(hitsArray[0]._id+' '+ hitsArray[0]._source.title+' '+hitsArray[0]._source.salePrice.toString()+' '+hitsArray[0]._source.images[0]);
                for(var ii=0;ii<hitsArray.length;ii++){
                  var newItem= new Item(hitsArray[ii]._id, hitsArray[ii]._source.title, hitsArray[ii]._source.salePrice,hitsArray[ii]._source.images[0]);
                  itemList.push(newItem);
                  console.log(itemList[ii].name);
                }
                isloading=0;
              }
          }.bind(this),
          error: function(xhr) {
            isloading=0;
            alert("Something went wrong");
          }
        });
  }
  render(){
    return(
        <div class="w3-bar w3-green w3-center centerform w3-margin-bottom w3-padding">
            <input type = "text" placeholder="Search for any item" class="w3-input w3-border w3-white w3-text-black" id='searchId' />
            <button onClick={this.loadDoc} class="fa fa-search w3-btn" id='searchBtn' />
        </div>
    );
  }
}

function tick(){
  ReactDOM.render(
    <div>
      <Navbar />
      <SearchBar />
      <ProductPrinter />
    </div>,
    document.getElementById('root')
  );
}
setInterval(tick, 1000);
