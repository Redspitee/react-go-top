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
      let time = 0;
      const fasetSpeed = (docuEle.scrollTop-100)/100 > 10 ? (docuEle.scrollTop -100)/100 : 10;
      
      let t = setInterval(()=>{
        const distance = docuEle.scrollTop;
        if(time < 50) docuEle.scrollTop = distance - 1;
        else if(docuEle.scrollTop < 50) docuEle.scrollTop = distance - 1;
        else docuEle.scrollTop = distance - fasetSpeed;
        docuEle.scrollTop <= 0 ? clearInterval(t) : null;
        time++;
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