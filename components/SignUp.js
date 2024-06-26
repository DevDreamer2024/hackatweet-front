import {useState} from 'react';
import styles from '../styles/SignUp.module.css';
import { useDispatch, useSelector} from 'react-redux';
import { login } from '../reducers/user';

function SignUp() {

  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpFirstname, setSignUpFirstname] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');

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
          } else {
            alert('Sign up failed');
          }
        });
          }
        

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerSection}>
        <p>Sign Up</p>
        <input type="text" placeholder="Username"  value={signUpUsername} onChange={(e) => setSignUpUsername(e.target.value)} />
        <input type="text" placeholder="Firstname"  value={signUpFirstname} onChange={(e) => setSignUpFirstname(e.target.value)} />
        <input type="password" placeholder="Password"  value={signUpPassword} onChange={(e) => setSignUpPassword(e.target.value)} />
        <button onClick={handleSignup}>Sign Up</button>
      </div>
    </div>
  );
}

export default SignUp;