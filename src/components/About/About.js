import React from 'react';
import './About.css';
import aboutPhoto from '../../images/avatar.jpg';

function About() {
  return (
    <div className="about">
      <img alt="Фото автора" src={aboutPhoto} className="about__image" />
      <div className="about__info">
        <h2 className="about__title">Об авторе</h2>
        <p className="about__description">
          Это блок с описанием автора проекта. Здесь следует указать, как вас зовут, чем вы
          занимаетесь, какими технологиями разработки владеете.
        </p>
        <p className="about__description">
          Также можно рассказать о процессе обучения в Практикуме, чему вы тут научились, и чем
          можете помочь потенциальным заказчикам.
        </p>
      </div>
    </div>
  );
}

export default About;