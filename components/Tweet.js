import styles from "../styles/Tweet.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart , faTrash } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
function Tweet() {
  const dispatch = useDispatch();
  const usertoken = useSelector((state) => state.user.token);

  const [tweetslist, setTweetslist] = useState([]);
 
 
  const tweetslistStore = useSelector((state) => state.message);

  useEffect(() => {
    const fetchTweets = () => {
      fetch("http://localhost:3000/messages/")
        .then((res) => res.json())
        .then((data) => setTweetslist(data))
        .catch((error) => console.log(error));
    };
    console.log("voici la liste des tweet ", tweetslist);
    fetchTweets();

    console.log('--------------',data)
    dispatch(message(data));
    // const intervalId = setInterval(fetchTweets, 5000);
    // return () => clearInterval(intervalId);
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


  const dataFormatted = (date) => {

    const tweetDate = new Date(date);

    const now = new Date();
    const diff = now - tweetDate;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} days ago`;
    } else if (hours > 0) {
      return `${hours} hours ago`;
    } else if (minutes > 0) {
      return `${minutes} minutes ago`;
    } else {
      return `${seconds} seconds ago`;
    }
  };




  const likeTweet = (tweetId) => {
    // Optimistic UI update
    setTweetslist((prevTweets) =>
      prevTweets.map((tweet) =>
        tweet._id === tweetId ? { ...tweet, likecount: tweet.likecount + 1 } : tweet
      )
    );
  
    fetch(`http://localhost:3000/messages/togglelike/${tweetId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userToken: usertoken,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTweetslist((prevTweets) =>
          prevTweets.map((tweet) =>
            tweet._id === tweetId ? { ...tweet, ...data } : tweet
          )
        );
      })
      .catch((error) => {
        console.log(error);
        // Rollback UI update if API call fails
        setTweetslist((prevTweets) =>
          prevTweets.map((tweet) =>
            tweet._id === tweetId ? { ...tweet, likecount: tweet.likecount - 1 } : tweet
          )
        );
      });
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
                {tweet.userToken.firstname} {tweet.userToken.username}
                <span className={styles.date}>
                  {dataFormatted(tweet.date)}
                </span>
              </p>
            </div>
            <div className={styles.tweetText}>
              <p>
                {tweet.text}
                <span className={styles.hashtag}>{tweet.hashtag}</span>
              </p>
            </div>
            <div className={styles.tweetFooter}>
              <FontAwesomeIcon icon={faHeart} onClick={() => likeTweet(tweet._id)}/>
              <p>{tweet.likecount} likes</p>
              </div>
              {tweet.userToken.token === usertoken && (
                <div className={styles.deleteTweet}>
                <FontAwesomeIcon icon={faTrash} onClick={() => removeTweet(tweet._id)} />
              </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tweet;
