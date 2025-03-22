import { Link } from 'react-router-dom';
import css from './GoBackBtn.module.css';
const GoBackBtn = ({ backLink }) => {
  return (
    <Link to={backLink} className={css.link}>
      GoBackBtn
    </Link>
  );
};

export default GoBackBtn;
