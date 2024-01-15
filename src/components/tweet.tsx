import { Tweet } from './time-line';
import styled from 'styled-components';

const Tweet = ({ username, photo, tweet }: Tweet) => {
  return (
    <Wrapper>
      <Column>
        <UserName>{username}</UserName>
        <Payload>{tweet}</Payload>
      </Column>

      {photo !== '' && (
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
