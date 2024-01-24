import React from 'react';
import {NavLink} from 'react-router-dom';
import errorPage from '../../assets/img/404-page.svg';

export const NotFoundPage: React.FC = () => (
  <div className="has-text-centered">
    <img src={errorPage} alt="errorPage" style={{maxWidth: '600px'}} />

    <p className="title">Ooops... Something went wrong</p>

    <NavLink to="/">
      <button className="button is-light is-info">Take me home</button>
    </NavLink>
  </div>
);
