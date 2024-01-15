import styled from 'styled-components';
import PostTweetForm from '../components/PostTweetForm';
import TimeLine from '../components/time-line';

const Home = () => {
  return (
    <Wrapper>
      <PostTweetForm />
      <TimeLine />
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  display: grid;
  gap: 50px;
  overflow-y: auto;
  grid-template-rows: 1fr 5fr;
`;
