/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { connect } from 'react-redux';
import { 
  fetchNewVideos, 
  fetchHotVideos,
  fetchFiveSevenVideos,
  fetchSevenTenVideos,
  fetchTenFifteenVideos,
  fetchHalfHourVideos
} from '../actions';

class Header extends React.Component {
  
  changeActiveTab = (event) => {
    event.stopPropagation();
    this.removeActiveTab();
    if(!event.target.classList.contains('active')) {
      event.target.classList.add('active')
    }
  }

  removeActiveTab = () => {
    let active = document.querySelectorAll('.active')[0]; 
    active.classList.remove('active');
  }

  renderTabs = () => {
    // const tabValues = ['new', 'hot', '5 - 7', '7 - 10', '10 - 15', '30+'];
    const tabValues = [
      {'func': this.props.fetchHotVideos, 'val': 'hot'},
      {'func': this.props.fetchFiveSevenVideos, 'val': '5 - 7'},
      {'func': this.props.fetchSevenTenVideos, 'val': '7 - 10'},
      {'func': this.props.fetchTenFifteenVideos, 'val': '10 - 15'},
      {'func': this.props.fetchHalfHourVideos, 'val': '30+'}
    ];

    return tabValues.map(obj => {
      return (
        <a
          key={obj['val']}
          className="item" 
          href="#" 
          onClick={(event) => {
            this.changeActiveTab(event)
            obj['func']()
          }}>
          {obj['val']}
        </a> 
      );
    });
  }


  render() {
    return (
      <div className="header-component ui">
        <div className="header-container header ui segment">
          <h1>ChowTime TV</h1>
          <i className="fas fa-utensils"></i>
          <i className="fas fa-tv"></i>
          <div className="ui toggle checkbox">
            <input type="checkbox" name="public"/>
            <label>Night Mode</label>
          </div>
        </div>
        <div className="ui secondary pointing menu">
          {/* add active classname to change pointer */}
          <a 
            className="active item"
            href="#" 
            onClick={(e) => {
              this.changeActiveTab(e)
              this.props.fetchNewVideos()
            }}>
              new
          </a> 
          {this.renderTabs()}
        </div>
      </div>
    );
  }
}


export default connect(null, 
  { 
    fetchNewVideos, 
    fetchHotVideos,
    fetchFiveSevenVideos,
    fetchSevenTenVideos,
    fetchTenFifteenVideos,
    fetchHalfHourVideos
  })(Header);