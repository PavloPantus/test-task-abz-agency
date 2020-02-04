import React from 'react';
import './about-me-section.scss';

export const AboutMe = () => (
  <section className="about-me section">
    <div className="container">
      <div className="about-me__content">
        <p className="about-me__heading">
            Let&apos;s get acquainted
        </p>
        <div className="about-me__container">
          <img
            src="./images/man-laptop-v1.svg"
            alt="logo"
            className="about-me__logo"
          />
          <article className="about-me__description">
            <h1 className="about-me__article-heading">
              I am cool frontend developer
            </h1>
            <p className="about-me__article-description">
              We will evaluate how clean your approach to writing CSS and
              Javascript code is. You can use any CSS and Javascript 3rd party
              libraries without any restriction.
              <br />
              <br />
              If 3rd party css/javascript libraries are added to the project
              via bower/npm/yarn you will get bonus points. If you use any task
              runner (gulp/webpack) you will get bonus points as well. Slice
              service directory page P​SD mockup​ into HTML5/CSS3.
            </p>
            <a
              href="#register-section"
              className="about-me__sign-up-button flat-button"
            >
              Sing up now
            </a>
          </article>
        </div>
      </div>

    </div>
  </section>
);
