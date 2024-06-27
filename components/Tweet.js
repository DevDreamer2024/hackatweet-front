import styles from '../styles/Tweet.module.css';
import { useState , useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';

function Tweet() {

    const dispatch  = useDispatch();
    const usertoken = useSelector((state) => state.user.token);
    const [tweetslist, setTweetslist] = useState([]);
    const [mytweets, setMytweets] = useState([]);

    useEffect(() => {
      const fetchTweets = () => {
        fetch('http://localhost:3000/messages/')
          .then((res) => res.json())
          .then((data) => setTweetslist(data))
          .catch((error) => console.log(error));
      };
      console.log('voici la liste des tweet ',tweetslist)
      fetchTweets()
      const intervalId = setInterval(fetchTweets, 5000)
      return () => clearInterval(intervalId);
    }, []);

    const removeTweet = (tweetId) => {
      
      fetch(`http://localhost:3000/messages/${tweetId}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (response.ok) {
          setTweetslist(tweetslist.filter(tweet => tweet._id !== tweetId));
        }
      })
      .catch(error => console.error('Erreur lors de la suppression du tweet:', error));
    };

    return (
      <div>
        <h1>Tweets</h1>
        <div className={styles.tweetContainer}>
          {tweetslist.map((tweet) => (
            <div key={tweet._id} className={styles.tweet}>
              <p> {tweet.userToken.profilepic} {tweet.userToken.firstname} {tweet.userToken.username} {tweet.date}  </p>
              <p> {tweet.text} {tweet.hashtag} </p>
              <p> {tweet.likecount}</p>
              {tweet.userToken.token === usertoken && (
                <button
                  onClick={() => {
                    removeTweet(tweet._id);
                  }} >
                </button>
              )}
            </div>
          ))}
      </div>
      </div>
    );
  }
  
  export default Tweet;