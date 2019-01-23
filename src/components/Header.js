/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

const Header = () => {
  return (
    <div className="header-comp ui container">
      <div className="header ui segment">
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
        <a href="#" className="active item">new</a> 
        <a href="#" className="item">hot</a>
        <a href="#" className="item">5 - 7</a>
        <a href="#" className="item">7 - 10</a>
        <a href="#" className="item">10 - 15</a>
        <a href="#" className="item">30+</a>
      </div>
    </div>
  );
}

export default Header;