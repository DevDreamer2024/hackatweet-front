import {useState} from 'react';
import styles from '../styles/SignUp.module.css';
import { useDispatch, useSelector} from 'react-redux';
import { login } from '../reducers/user';
import Image from 'next/image';

function SignUp() {

  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpFirstname, setSignUpFirstname] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [userExists, setUserExists] = useState(false);

  const dispatch = useDispatch();

//signup (inscription) d'un utilisateur
  const handleSignup = () => {
    fetch('http://localhost:3000/users/signup', {
      method : 'POST',
      headers: {'Content-Type' : 'application/json'},
      body : JSON.stringify({
        username : signUpUsername,
        firstname : signUpFirstname,
        password : signUpPassword
      })
    }).then(response => response.json())
        .then(data => {
          if (data.result  === true) {
            dispatch(login({username: signUpUsername, token: data.token}))
            setSignUpUsername('')
            setSignUpFirstname('')
            setSignUpPassword('')
            setUserExists(false);
          } else {
            setUserExists(true);
            //si l'utilisateur existe un message conditionnel apparait en return
          }
        });
          }
        

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerSection}>
        <Image src="/images/twiter-inverse.png" alt="twiter logo" width={70} height={70} />
        <p>Create your Hackatweet account</p>
        <input type="text" placeholder="Username"  id="signUpUsername" value={signUpUsername} onChange={(e) => setSignUpUsername(e.target.value)} />
        <input type="text" placeholder="Firstname" id="signUpFirstname" value={signUpFirstname} onChange={(e) => setSignUpFirstname(e.target.value)} />
        <input type="password" placeholder="Password" id="signUpPassword" value={signUpPassword} onChange={(e) => setSignUpPassword(e.target.value)} />
        <button onClick={handleSignup}>Sign Up</button>
        {userExists && <p>User already exists. Please login.</p>}
      </div>
    </div>
  );
}

export default SignUp;