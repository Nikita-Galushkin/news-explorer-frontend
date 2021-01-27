import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import githubIcon from '../../images/git_icon.svg';
import faceBookIcon from '../../images/f_icon.svg';

function Footer() {
  return (
    <div className="footer">
      <p className="footer__copyright">&copy; 2020 Galushkin Nikita</p>
      <nav className="footer__navigation">
        <div className="footer__navigation-column-link">
          <Link className="footer__link" to="/">
            Главная
          </Link>
          <a href="https://praktikum.yandex.ru/" target="blank" className="footer__link">
            Яндекс.Практикум
          </a>
        </div>
        <div className="footer__social-links">
          <a href="https://github.com" target="blank" className="footer__link">
            <img className="footer__link-icon" alt="Иконка Гитхаба" src={githubIcon} />
          </a>
          <a href="https://facebook.com" target="blank" className="footer__link">
            <img className="footer__link-icon" alt="Иконка Гитхаба" src={faceBookIcon} />
          </a>
        </div>
      </nav>
    </div>
  );
}

export default Footer;