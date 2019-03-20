import React,{ PureComponent } from 'react';
import './gotop.css';

const docuEle = document.documentElement;

class Gotop extends PureComponent{
  constructor(props){
    super(props)
    this.state={
      show: false,
    }
    this.handleScroll = this.handleScroll.bind(this);
    this.goTop = this.goTop.bind(this);
  }
  componentDidMount(){
    window.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  handleScroll(){
    let scrolltop = docuEle.scrollTop;
    let minHei = docuEle.clientHeight / 2;
    let show = false;
    scrolltop > minHei ? show = true : show = false;
    this.setState({show})
  }
  goTop(){
      const origin_distance = docuEle.scrollTop;
      const Time = 80;
      const v = origin_distance/Time;
      let t = setInterval(()=>{
        const distance = docuEle.scrollTop;
        docuEle.scrollTop = distance - v;
        if(docuEle.scrollTop <= 0) { clearInterval(t)} 
      },1);

      // firfox,ie
      document.addEventListener('DOMMouseScroll',()=>clearInterval(t),false)
      // google
      window.onmousewheel = ()=>{
        clearInterval(t)
      }

  }
  render(){
    const { show } = this.state;
    return(
      <div className={`Gotop ${show?"active":""}`} onClick={this.goTop} >
        &#9650;
      </div>
    )
  }
}
export default Gotop;