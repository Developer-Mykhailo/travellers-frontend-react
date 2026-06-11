import clsx from 'clsx';
import { Link } from 'react-router-dom';
import placeholder1 from '../../../../assets/images/placeholder1.png';

import ui from '/src/components/UI/ui.module.css';
import css from './TravellersList.module.css';

const TravellersList = ({ travellers }) => {
  // JSX
  return (
    <>
      <ul className={css.userList}>
        {travellers.map((user) => (
          <li key={user._id} className={css.userItem}>
            <div className={css.avatarWrap}>
              <img
                src={user?.avatar || placeholder1}
                alt="avatar"
                className={css.userAvatar}
              />
            </div>

            <h3 className={css.userName}>{user.name}</h3>
            <p className={css.userDescr}>{user.description}</p>
            <Link
              to={`/travellers/${user._id}`}
              className={clsx(ui.shared, ui.secondary, css.viewProfie)}
            >
              View Profile
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TravellersList;
