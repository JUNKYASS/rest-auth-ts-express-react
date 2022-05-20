import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import cn from 'classnames';

import styles from './Links.module.scss';
import { linksData } from './data';
import { ILink } from '../../../types/commonTypes';
import AuthContext from '../../../store/Auth/AuthContext';

interface ILinksProps {
  className?: string,
}

const Links: React.FC<ILinksProps> = props => {
  const { className } = props;

  const { user } = useContext(AuthContext);

  const links: ILink[] | undefined = linksData
    .find(group => group.auth === !!user)?.links  // Get links for auth or not auth user
    .filter(link => !link.adminOnly ? true : !!user?.is_admin); // If the user is not admin then dont use links with the flag adminOnly 

  return (
    <div className={cn(styles.root, className)}>
      {links?.map(link => (
        <Link className={styles.link} key={link.to} to={link.to}>{link.text}</Link>
      ))}
    </div>
  );
};

export default Links;