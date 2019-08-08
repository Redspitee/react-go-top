import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
// import Gotop from 'react-go-top';

import Gotop  from './gotop';
import "./app.css"


class App extends Component{
  constructor(props){
    super(props);
  }

  render(){
    let list = [];
    for(let i=0;i<200;i++){
      list.push(i)
    }
    return(
      <div >
        {
          list.map(v => <div key={v}>这是第{v+1}行</div> )
        }
       <Gotop style={{width:"55px"}}  visibilityHeight={500} target={()=>document.getElementById('app')} />
      </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('app'));