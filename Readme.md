## Install

```
npm i react-go-top
or
yarn add react-go-top
```

## Usage

```
import Gotop from 'react-go-top';
<Gotop 
  style={{width:"55px", height:"55px"}}
  imgSrc={imgsrc} 
  visibilityHeight={500} 
  target={()=>document.getElementById('app')} 
  />
```

## API

```
imgSrc              string       "" 
style               object       null
target              func         ()=>window
visibilityHeight    number       400
onClick             func         callback
```