import styles from "../styles/Home.module.css";
import Image from "next/image";
import { useState } from "react";
import { useDispatch , useSelector } from "react-redux";
import { addMessage } from "../reducers/message";
import Tweet from "./Tweet";
import LastTweets from "./LastTweets";
import Trends from "./Trends";

function Home() {
  const dispatch  = useDispatch();
  const userName = useSelector((state) => state.user.username);
  const userFirstname = useSelector((state) => state.user.firstname);
  const userToken = useSelector((state) => state.user.token);
  console.log("voici le contenu du store : " , userFirstname , userName, userToken); 
  const [tweetText, setTweetText] = useState("");
  const [tweets, setTweets] = useState([]);
  const [count, setCount] = useState(0);
  console.log('this is the token' , userToken);
  const handleTweetSubmit = () => {
    if (tweetText === "") {
      return;
    }
    console.log(userToken);
    fetch("http://localhost:3000/messages/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: tweetText,
        userToken: userToken,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(text);
          });
        }
        return res.json();
      })
      .then((data) => {
        console.log('----------------------',data);
        // dispatch(addMessage({data}))
        // dispatch(addhashtag({data.hashtag}))
        setTweets([...tweets, data]);
        setTweetText("");
        setCount(0);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleChange = (e) => {
    const text = e.target.value;
    setTweetText(text);
    setCount(text.length);
  };


  return (
    <div className={styles.main}>
      <div className={styles.leftColumn}>
        <Image
          src="/images/twiter-inverse.png"
          alt="twiter logo"
          width={70}
          height={70}
          className={styles.twitterImage}
        />
        <Image
          src="/images/egg.jpg"
          alt="Profile"
          width={70}
          height={70}
          className={styles.profileImage}
        />
      </div>
      <div className={styles.middleColumn}>
        <div className={styles.addTweet}>
          <p>Home</p>
          <textarea
            maxLength="280"
            value={tweetText}
            onChange={handleChange}
            placeholder="What's up?"
            className={styles.tweetInput}
          />
          <div className={styles.count}>{count}/280</div>
          <button onClick={handleTweetSubmit} className={styles.tweetButton}>
            Tweet
          </button>
        </div>
        <div className={styles.lastTweet}>
          <LastTweets />
        </div>
        <div className={styles.tweet}>
          <Tweet />{" "}
        </div>
      </div>
      <div className={styles.rightColumn}>
        <div className={styles.trends}>
          <Trends />
        </div>
      </div>
    </div>
  );
}

export default Home;
