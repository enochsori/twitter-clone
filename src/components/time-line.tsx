import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import styled from 'styled-components';
import Tweet from './tweet';
import { useState, useEffect } from 'react';

export interface Tweet {
  photo?: string;
  tweet: string;
  userId: string;
  username: string;
  createdAt: number;
  id: string;
}

const TimeLine = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);

  //   query to get tweets from firebase
  const fetchTweet = async () => {
    const tweetsQuery = query(
      collection(db, 'tweets'),
      orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(tweetsQuery);
    const tweets = snapshot.docs.map((doc) => {
      const { tweet, createdAt, userId, username, photo } = doc.data();

      return {
        tweet,
        createdAt,
        userId,
        username,
        photo,
        id: doc.id,
      };
    });

    setTweets(tweets);
  };

  useEffect(() => {
    fetchTweet();
  }, []);

  return (
    <Wrapper>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </Wrapper>
  );
};

export default TimeLine;

const Wrapper = styled.div``;
