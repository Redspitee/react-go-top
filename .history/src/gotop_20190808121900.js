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
    const styles = style ? style: {};

    return(
      <div style={styles} className={`Gotop ${show?"active":""}`} onClick={this.goTop}>
        <div className="go-top-inner">
            { imgSrc ? <img src={imgSrc} alt="go-to-top"/> : <svg t="1565237509044" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1103" width="45" height="45"><path d="M468.36 243.447 20.797 691.009c-24.753 24.753-24.753 64.788 0 89.541 24.681 24.682 64.788 24.753 89.541 0l402.792-402.792L915.922 780.55c24.682 24.682 64.787 24.753 89.541 0 24.752-24.753 24.68-64.788 0-89.541L557.9 243.447C533.148 218.766 493.113 218.766 468.36 243.447z" p-id="1104" fill="#bfbfbf"></path></svg>}
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