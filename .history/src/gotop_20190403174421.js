import React,{ PureComponent } from 'react';
import PropTypes from 'prop-types';
import img from './gotop.png';
import './gotop.css';

const docuEl = document.documentElement;
class Gotop extends PureComponent{
  constructor(props){
    super(props)
    this.state = {
      show: false,
      visibilityHeight: props.visibilityHeight ? props.visibilityHeight : 400,
      target: props.target && props.target() ?  props.target(): window ,
      ele: props.target && props.target() ? props.target(): docuEl
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
    const minHei = this.state.visibilityHeight;
    let scrolltop = this.state.ele.scrollTop;
    let show = false;
    scrolltop > minHei ? show = true : show = false;
    this.setState({show})
  }
  goTop(){
      const origin_distance = this.state.ele.scrollTop;
      const Time = 80;
      const v = origin_distance/Time;
      let t = setInterval(()=>{
        const distance = this.state.ele.scrollTop;
        this.state.ele.scrollTop = distance - v;
        if(this.state.ele.scrollTop <= 0) { clearInterval(t)} 
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
  target: PropTypes.func,
  onClick: PropTypes.func
}
export default Gotop;