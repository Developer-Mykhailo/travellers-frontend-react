import response from '../../../../temp/user.json'; // for a while

import css from './TravellerInfo.module.css';

const TravellerInfo = () => {
  const { _id, name, avatar, description } = response.data; // for a while

  // JSX
  return (
    <div className={css.travellerBlock}>
      <div className={css.imgWrap}>
        <img src={avatar} alt="avatar" />
      </div>
      <div className={css.contentWrap}>
        <h2 className={css.userName}>{name}</h2>

        <p className={css.userDescr}>{description}</p>
      </div>
    </div>
  );
};

export default TravellerInfo;
