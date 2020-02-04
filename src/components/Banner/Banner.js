import React from 'react';
import './Banner.scss';
import { Button } from '../button/button';

export const Banner = () => (
  <section
    className="banner section"
  >
    <div className="container">
      <div className="banner__content">
        <h1 className="banner__heading">
          Test assignment
          for Frontend Developer position
        </h1>
        <p className="banner__message">
          We kindly remind you that your test assignment should
          be submitted as a link to github/bitbucket repository.
          Please be patient, we consider and respond to every application
          that meets minimum requirements. We look forward to your submission.
          Good luck! The photo has to scale in the banner area on the different
          screens
        </p>
        <a href="#register-section">
          <Button
            className="banner__sing-up-button"
            value="Sing up now"
          />
        </a>
      </div>
    </div>
  </section>
);
