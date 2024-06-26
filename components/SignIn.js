import styles from '../styles/SignIn.module.css';
import { useState } from 'react';

function SignIn() {

  const[signInusername, setSignInusername] = useState('');
  const[signInPassword, setSignInPassword] = useState('');

	const handleConnection = () => {

		fetch('http://localhost:3000/users/signin', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username: signInUsername, password: signInPassword }),
		}).then(response => response.json())
			.then(data => {
				if (data.result) {
          console.log('La personne existe bien');
          // Changer de page
					setSignInUsername('');
					setSignInPassword('');
				}
			});
	};


  return (
    <div>
      <div className={styles.registerContainer}>
				<div className={styles.registerSection}>
					<p>Sign-in</p>
					<input type="text" placeholder="Username" id="signInUsername" onChange={(e) => setSignInUsername(e.target.value)} value={signInUsername} />
					<input type="password" placeholder="Password" id="signInPassword" onChange={(e) => setSignInPassword(e.target.value)} value={signInPassword} />
					<button id="connection" onClick={() => handleConnection()}>Connect</button>
				</div>
			</div>
    </div>
  );
}

export default SignIn;