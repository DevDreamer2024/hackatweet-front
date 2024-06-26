import styles from '../styles/Login.module.css';
import { useState } from 'react';
import{ Button, Modal } from "antd";

import  SignIn from './SignIn';
import  SignUp from './SignUp';
import Image from 'next/image';


function Login() {

    const [modal1Open, setModal1Open] = useState(false);
    const [modal2Open, setModal2Open] = useState(false);
    const[size, setSize] = useState('large');

  return (
    <div className={styles.containerLogin}>
  <Image
          src="/images/twiter-inverse.png" 
          alt="twiter logo"
          width={70}
          height={70} 
  />
    <h1>See what's <br />happening</h1>
    <h2>Join Hacktweet today.</h2>
    <Button type="primary" size={size} shape="round" onClick={() => setModal1Open(true)}> SignIn </Button>
      <Modal title="Basic Modal" 
        open={modal1Open}
        onOk={() => setModal1Open(false)}
        onCancel={() => setModal1Open(false)}
       >
        <SignIn />
      </Modal>
      <p>allready have an account?</p>
      
      <Button type="primary" size={size} shape="round" ghost  onClick={() => setModal2Open(true)}>
        SignUp
      </Button>
      <Modal
        title="Vertically centered modal dialog"
        centered
        open={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
      >
        <SignUp />
      </Modal>
    </div>
  );
}

export default Login;