import React from 'react';
import ReactDOM from 'react-dom';
// import Gotop from 'react-go-top';

import Gotop  from './gotop';

let list = [];
for(let i=0;i<2000;i++){
  list.push(i)
}
ReactDOM.render(
  <div>
    {
      list.map(v =>  <div key={v}>这是第{v+1}行</div> )
    }
  <Gotop />
</div>, document.getElementById('app'));