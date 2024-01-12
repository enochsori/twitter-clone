import React, { useState } from 'react';
import styled from 'styled-components';
import { auth, db, storage } from '../firebase';
import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const PostTweetForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tweet, setTweet] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const user = auth.currentUser;

    if (!user || isLoading || tweet === '' || tweet.length > 180) return;

    try {
      setIsLoading(true);

      // update firestorage for tweet
      const doc = await addDoc(collection(db, 'tweets'), {
        tweet,
        createdAt: Date.now(),
        username: user.displayName || 'Anonymous',
        userId: user.uid,
      });

      // update photo to the storage
      if (file) {
        const locationRef = ref(
          storage,
          `tweets/${user.uid}-${user.displayName}/${doc.id}`
        );
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);

        // update the tweet with photo url
        await updateDoc(doc, {
          photo: url,
        });
      }

      // reset all the inputs
      setTweet('');
      setFile(null);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onTweetChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(event.target.value);
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files.length === 1) {
      setFile(files[0]);
    }
  };

  return (
    <Form onSubmit={(event) => onSubmit(event)}>
      <TextArea
        required
        rows={5}
        maxLength={180}
        placeholder='What is happening?!'
        value={tweet}
        onChange={(event) => onTweetChange(event)}
      />
      <AttachFileButton htmlFor='file'>
        {file ? 'Photo added' : 'Add photo'}
      </AttachFileButton>
      <AttachFileInput
        type='file'
        id='file'
        accept='image/*'
        onChange={(event) => onFileChange(event)}
      />
      <SubmitButton
        type='submit'
        value={isLoading ? 'Posting...' : 'Post Tweet'}
      />
    </Form>
  );
};

export default PostTweetForm;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TextArea = styled.textarea`
  width: 100%;
  resize: none;
  border: 2px solid white;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  background-color: black;
  color: white;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  &::placeholder {
    font-size: 16px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
      sans-serif;
  }
  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;
const AttachFileButton = styled.label`
  padding: 10px 0px;
  color: #1d9bf0;
  text-align: center;
  border: 1px solid #1d9bf0;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;
const AttachFileInput = styled.input`
  display: none;
`;
const SubmitButton = styled.input`
  background-color: #1d9bf0;
  color: white;
  border: none;
  padding: 10px 0px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 200ms ease-in;

  &:hover,
  &:active {
    opacity: 0.8;
  }
`;
