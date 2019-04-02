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
imgSrc              string       ""                 组件里箭头的图片链接
style               object       null               CSS样式
target              func         ()=>window         监听滚动事件的父节点
visibilityHeight    number       400                滚动条距顶多少 显示回到顶部按钮
onClick             func         callback           点击回到顶部后的回调函数
```
