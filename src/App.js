import React, { Component } from 'react';
import './App.css';

//CSS for inactive card
const cardStyleInactive ={
  backgroundColor: '#FF0000',
  width: '250px',
  height: '350px',
  display: 'inline-block'
}

//CSS for active card
const cardStyleActive ={
  backgroundColor: '#00FF00',
  width: '250px',
  height: '350px',
  fontSize : '50px',
  textAlign: 'left',
  verticalAlign :'text-top',
  display: 'inline-block'
}

//CSS for  button
const buttonStyle={
  width: '200px',
  height: '100px',
  fontSize : '10px',
  textAlign: 'center'
}

//CSS for image
const imageStyle={
  width: '150px',
  height: '250px',
}

class App extends Component {
  constructor(props){
    super(props);
    this.state ={ 
      showID: [],
      totalCard: 6,
      selected: []
    }
    this.displayID = this.displayID.bind(this);
    this.addCard = this.addCard.bind(this);
    this.displayImg = this.displayImg.bind(this);
  }
  componentWillMount(){
    for(let i = 0; i < this.state.totalCard; i++)
    {
      let cardDetail = {
        ID : i,
        num : i +1,
        active : false,
        showImg : false,
        imgSrc : 'http://placekitten.com/'+(i*100+200)+'/'+(i*100+300)
      }
      this.state.showID.push(cardDetail);
    }
  }

  //Show the card num when click to inactive card
  //Turn active card into inactive when active card selected 
  //Turn active card into inactive when inactive card selected
  displayID(ID){
    const arr = this.state.showID;
    //case when no card active
    if (this.state.selected.length === 0)
    {
      arr[ID].active = true;
      this.setState({
      selected :[ID],
      showID: arr
    })
    }
    //case when there is card active and click again
    else if (this.state.selected.length === 1 && this.state.selected[0] === ID)
    {
      arr[ID].active = false;
      this.setState({
      selected :[],
      showID: arr
    })
    }
    else{
      const temp = this.state.selected[0];
      arr[temp].active = false;
      arr[ID].active = true;
      this.setState({
      selected :[ID],
      showID: arr
    })

    }
  }
  //Add card during game
  addCard() {
    const arr = this.state.showID;
    let cardDetail = {
      ID : this.state.totalCard,
      num : this.state.totalCard + 1,
      active : false,
      showImg : arr[0].showImg,
      imgSrc : 'http://placekitten.com/'+(this.state.totalCard*100+200)+'/'+(this.state.totalCard*100+300)
    }
    //console.log(cardDetail.ID);
    //console.log(cardDetail.num);
    this.state.showID.push(cardDetail);
    this.setState({
      totalCard: this.state.totalCard+1
    });
    
  }
  //Display card image from placekitten when click
  //and remove image when click when image is show
  displayImg() {
    const arr = this.state.showID;
    if (arr[0].showImg === false)
    {
      for (let i = 0; i < this.state.totalCard; i++){
        arr[i].showImg = true;
      }
    }
    else
    {
      for (let i = 0; i < this.state.totalCard; i++){
        arr[i].showImg = false;
      }
    }
    this.setState({
      showID: arr
    });
  }


  render() {
    
    return (
      <div>
        <h1 style={{color : '#0000FF'}}>
          Card Game
        </h1>
        {this.state.showID.map((card) => {
          if(card.active === true && card.showImg === false){
            return(
              <div
              key={card.ID} 
              style={cardStyleActive}
              onClick={() => this.displayID(card.ID)}>
                {card.num}
                <br/>
              </div>
            );
          }
          else if (card.active === true && card.showImg === true){
            return(
              <div
              key={card.ID} 
              style={cardStyleActive}
              onClick={() => this.displayID(card.ID)}>
                {card.num}
                <br/>
                <img src={card.imgSrc} style={imageStyle} alt="Kitten"/>
              </div>
            );
          }
          else{
            return(
              <div
              key={card.ID} 
              style={cardStyleInactive}
              onClick={() => this.displayID(card.ID)}>
              <br/>
              </div>
            );
          }
        })}
        <div>
          <br/>
          <button style={buttonStyle} onClick={this.displayImg}>Show Image</button>
          <br/>
          <button style={buttonStyle} onClick={this.addCard}>Add Card</button>
        </div>
      </div>
    );
  }
}

export default App;
