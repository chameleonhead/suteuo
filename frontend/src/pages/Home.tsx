import { Link } from 'react-router-dom';
import { Jumbotron } from 'reactstrap';
import RequestBoardSummary from '../components/RequestBoardSummary';

export type HomeProps = {
}

export const Home = () => (
  <div>
    <Jumbotron>
      <h1>捨て魚</h1>
      <p>捨てられる魚を活用し、SDGs を達成する</p>
    </Jumbotron>
    <div className="d-flex justify-content-between align-items-baseline">
      <h5>最近の投稿</h5>
      <small><Link to="/requests#recent" className="text-secondary">もっと見る</Link></small>
    </div>
    <RequestBoardSummary />
  </div>
);

export default Home;
