import styles from "../styles/Tweet.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
function Tweet() {
  const dispatch = useDispatch();
  const usertoken = useSelector((state) => state.user.token);
  const [tweetslist, setTweetslist] = useState([]);

  useEffect(() => {
    const fetchTweets = () => {
      fetch("http://localhost:3000/messages/")
        .then((res) => res.json())
        .then((data) => setTweetslist(data))
        .catch((error) => console.log(error));
    };
    console.log("voici la liste des tweet ", tweetslist);
    fetchTweets();
    const intervalId = setInterval(fetchTweets, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const removeTweet = (tweetId) => {
    fetch(`http://localhost:3000/messages/${tweetId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setTweetslist(tweetslist.filter((tweet) => tweet._id !== tweetId));
        }
      })
      .catch((error) =>
        console.error("Erreur lors de la suppression du tweet:", error)
      );
  };

  return (
    <div>
      <div className={styles.tweetContainer}>
        {tweetslist.map((tweet) => (
          <div key={tweet._id} className={styles.tweet}>
            <div className={styles.tweetHeader}>
              <Image
                src="/images/egg.jpg"
                alt="Twitter logo"
                width={70}
                height={70}
              />
              <p>
                {tweet.userToken.firstname} {tweet.userToken.username}{" "}
                <span className={styles.date}>
                  {new Date(tweet.date).toLocaleString()}
                </span>
              </p>
            </div>
            <div className={styles.tweetText}>
              <p>
                {tweet.text}{" "}
                <span className={styles.hashtag}>{tweet.hashtag}</span>
              </p>
            </div>
            <div className={styles.tweetFooter}>
              <p>{tweet.likecount} likes</p>
              {tweet.userToken.token === usertoken && (
                <button onClick={() => removeTweet(tweet._id)}>Remove</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tweet;
