import React,{ PureComponent } from 'react';
import PropTypes from 'prop-types';
import './gotop.css';
import img from './gotop.png';

const docuEle = document.documentElement;

class Gotop extends PureComponent{
  constructor(props){
    super(props)
    this.state={
      show: false,
      visibilityHeight: props.visibilityHeight ? props.visibilityHeight : 400,
      target:  props.target ? props.target() : window
    }
    this.handleScroll = this.handleScroll.bind(this);
    this.goTop = this.goTop.bind(this);
  }
  componentDidMount(){
    this.state.target.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount() {
    this.state.target.removeEventListener('scroll', this.handleScroll);
  }
  handleScroll(){
    let scrolltop = docuEle.scrollTop;
    const minHei = this.state.visibilityHeight;
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

      this.props.onClick ?  this.props.onClick() : null;
  }
  render(){
    const { show } = this.state;
    const { style, imgSrc } = this.props;
    const imgpic = imgSrc ? imgSrc : img;
    const styles = style ? style: {};


    return(
      <div style={styles} className={`Gotop ${show?"active":""}`} onClick={this.goTop}>
        <div className="go-top-inner">
            <img src={imgpic} alt="go-to-top"/>
        </div>
      </div>
    )
  }
}
Gotop.propTypes = {
  style: PropTypes.object,
  imgSrc: PropTypes.string,
  visibilityHeight: PropTypes.number,
  onClick: PropTypes.func
}
export default Gotop;