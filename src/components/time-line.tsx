import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from '../firebase';
import styled from 'styled-components';
import Tweet from './tweet';
import { useState, useEffect } from 'react';
import { Unsubscribe } from 'firebase/auth';

export interface TweetInterFace {
  photo?: string;
  tweet: string;
  userId: string;
  username: string;
  createdAt: number;
  id: string;
}

const TimeLine = () => {
  const [tweets, setTweets] = useState<TweetInterFace[]>([]);

  //   query to get tweets from firebase
  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;

    const fetchTweet = async () => {
      // query - db, collection name, options for sorting and limit for pagination.
      const tweetsQuery = query(
        collection(db, 'tweets'),
        orderBy('createdAt', 'desc'),
        limit(25)
      );

      // QUERY LISTENER onSnapshot for real time communication with firebase server!
      unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
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
      });
    };

    fetchTweet();

    // clean up to save resource
    return () => {
      unsubscribe && unsubscribe();
    };
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

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  overflow-y: scroll;
`;
