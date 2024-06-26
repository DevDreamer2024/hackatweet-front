import styles from '../styles/Home.module.css';
import Login from './Login.js';
import { Col, Row } from 'antd';
import Image from 'next/image';

function Home() {
  return (
    <div className='main'>
    <div className={styles.container}>
      <div className={styles.columnLeft}>
        <Image
          src="/images/twiter-bg.jpg" 
          alt="Twiter intro"
          layout="fill" 
          object-fit="cover" 
        />
      </div>
      <div className={styles.columnRight}>
      <Login />
      </div>
    </div>
    </div>
  );
}

export default Home;
