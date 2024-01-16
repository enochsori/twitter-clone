import { useState } from 'react';
import { auth, db, storage } from '../firebase';
import { Tweet } from './time-line';
import styled from 'styled-components';
import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';

const Tweet = ({ username, photo, tweet, userId, id }: Tweet) => {
  const [isLoading, setIsLoading] = useState(false);
  const user = auth.currentUser;

  const onDelete = async () => {
    // Check user's intention
    const isConfirmed = confirm(
      'This is permanent action, Are you sure to delete this tweet?'
    );

    if (!isConfirmed || user?.uid !== userId) return;

    try {
      setIsLoading(true);

      // query for delete the tweet
      await deleteDoc(doc(db, 'tweets', id));
      // delete photo
      if (photo !== undefined) {
        const photoRef = ref(storage, `tweets/${user?.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <Column>
        <UserName>{username}</UserName>
        <Payload>{tweet}</Payload>
        {user?.uid === userId && (
          <Button onClick={onDelete}>
            {isLoading ? 'Deleting...' : 'Delete'}
          </Button>
        )}
      </Column>

      {photo !== undefined && (
        <Column>
          <Photo src={photo} />
        </Column>
      )}
    </Wrapper>
  );
};

export default Tweet;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid white;
  border-radius: 15px;
  background-color: transparent;

  margin-bottom: 10px;
`;
const Column = styled.div``;
const UserName = styled.span`
  font-weight: 600;
  font-size: 15px;
`;
const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;
const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;
const Button = styled.button`
  background-color: tomato;
  color: white;
  font-weight: 600;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;
