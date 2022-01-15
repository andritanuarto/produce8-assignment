import React from 'react';
import Image from 'next/image';
import styles from './Header.module.scss';
import MenuIcon from '@material-ui/icons/Menu';

const Header = (): JSX.Element => {
  return (
    <header className={styles.header}>
      <Image src="/p8Wordmark_sm.svg" alt="Produce8 Logo" width={152.5} height={59} />
      <MenuIcon className={styles.menu} fontSize="large"/>
    </header> 
  );
};

export default Header;
