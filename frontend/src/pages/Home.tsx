import { Container, Jumbotron } from 'reactstrap';
import RequestBoardSummary from '../components/RequestBoardSummary';

export type HomeProps = {
}

export const Home = () => (
  <Container>
    <Jumbotron>
      <h1>捨て魚</h1>
      <p>捨てられる魚を活用し、SDGs を達成する</p>
    </Jumbotron>
    <h5>最近の投稿</h5>
    <RequestBoardSummary />
  </Container>
);

export default Home;
