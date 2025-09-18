import type { DashboardCardProps } from './types';
import { Link } from 'react-router-dom';
import './styles.scss';

const DashboardCard = ({ title, to }: DashboardCardProps) => {
  return (
    <Link
      to={to}
      className="dashboard-card flex p--24 justify--center align--center text--center"
    >
      <h3 className="dashboard-card__title">{title}</h3>
    </Link>
  );
};

export default DashboardCard;
