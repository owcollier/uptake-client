import React from 'react';

export default function NavHeader(props) {

  return (
    <div className="nav-header-div">
      <header className="nav-header">
        <div className="nav-name">
          <img src="../../images/logo.png" alt="logo"/>
          <h1 className="nav-title">The Uptake</h1>
        </div>
        <div className="nav-desc">
          <h3>Your Insights, Our World</h3>
        </div>
      </header>
    </div>
  );
}