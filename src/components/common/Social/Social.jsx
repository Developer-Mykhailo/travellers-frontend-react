import { Link } from 'react-router-dom';
import Facebook from '../../../assets/icons/facebook.svg?react';
import Instagram from '../../../assets/icons/instagram.svg?react';
import Twitter from '../../../assets/icons/twitter.svg?react';
import Youtube from '../../../assets/icons/youtube.svg?react';

import css from './Social.module.css';

const Social = () => {
  return (
    <>
      <ul className={css.list}>
        <li>
          <Link to="facebook">
            <Facebook />
          </Link>
        </li>
        <li>
          <Link to="instagram">
            <Instagram />
          </Link>
        </li>
        <li>
          <Link to="twitter">
            <Twitter />
          </Link>
        </li>
        <li>
          <Link to="yuotube">
            <Youtube />
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Social;
