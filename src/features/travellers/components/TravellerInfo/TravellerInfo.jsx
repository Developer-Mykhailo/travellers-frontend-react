import css from './TravellerInfo.module.css';

const TravellerInfo = ({ userData }) => {
  const { name, avatar, description } = userData;

  // JSX
  return (
    <div className={css.travellerBlock}>
      <div className={css.imgWrap}>
        <img src={avatar} alt={description} />
      </div>
      <div className={css.contentWrap}>
        <h2 className={css.userName}>{name}</h2>

        <p className={css.userDescr}>{description}</p>
      </div>
    </div>
  );
};

export default TravellerInfo;
