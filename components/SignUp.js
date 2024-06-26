import {useState} from 'react';
import styles from '../styles/SignUp.module.css';
import { useDispatch } from 'react-redux';


function SignUp() {

  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpFirstname, setSignUpFirstname] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');

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
            //si il y'a besoin d'un dispatch le placer ici 
            setSignUpUsername('')
            setSignUpFirstname('')
            setSignUpPassword('')
          } else {
            alert('Sign up failed');
          }
        });
          }
        

  return (
    <div classname={styles.registerContainer}>
      <div classname={styles.registerSection}>
        <p>Sign Up</p>
        <input type="text" placeholder="Username" id="signUpUsername" value={signUpUsername} onChange={(e) => setSignUpUsername(e.target.value)} />
        <input type="text" placeholder="Firstname" id="SignUpFirstname" value={signUpFirstname} onChange={(e) => setSignUpFirstname(e.target.value)} />
        <input type="password" placeholder="Password" id="" value={signUpPassword} onChange={(e) => setSignUpPassword(e.target.value)} />
        <button onClick={handleSignup}>Sign Up</button>
      </div>
    </div>
  );
}

export default SignUp;