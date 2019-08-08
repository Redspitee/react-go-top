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
            { imgSrc ? <img src={imgSrc} alt="go-to-top"/> : <svg fill="currentColor" t="1565238023329" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3613"><path d="M895.203125 675.4765625L530.80859375 310.99414062c-5.00976563-5.00976563-11.68945313-7.734375-18.80859375-7.73437499s-13.79882813 2.8125-18.80859375 7.734375L128.796875 675.4765625c-7.55859375 7.55859375-9.84375 18.984375-5.71289063 28.91601563 4.13085938 9.93164063 13.79882813 16.34765625 24.52148438 16.34765624h728.87695313c10.72265625 0 20.390625-6.50390625 24.52148437-16.34765624 4.04296875-9.93164063 1.84570313-21.35742188-5.80078125-28.91601563z" p-id="3614"></path></svg>}
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