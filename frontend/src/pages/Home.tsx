import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Jumbotron } from 'reactstrap';
import RequestBoardSummary from '../components/RequestBoardSummary';
import { ApplicationState, selectors } from '../store';

export type HomeProps = ReturnType<typeof mapStateToProps>;

export const Home = (props: HomeProps) => {
  const { user } = props
  if (user) {
    return (
      <div>
        <div className="mb-3">
          <h5>自分の投稿</h5>
          <RequestBoardSummary owner={user} />
        </div>
        <div className="mb-3">
          <h5>コメント中</h5>
          <RequestBoardSummary commenter={user} />
        </div>
        <div className="mb-3">
          <h5>注目</h5>
          <RequestBoardSummary featured />
        </div>
      </div>
    )
  }
  return (
    <div>
      <Jumbotron>
        <h1>捨て魚</h1>
        <p>捨てられる魚を活用し、SDGs を達成する</p>
      </Jumbotron>
      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-baseline">
          <h5>最近の投稿</h5>
          <small><Link to="/requests#latest" className="text-secondary">もっと見る</Link></small>
        </div>
        <RequestBoardSummary latest />
      </div>
    </div>
  )
}

const mapStateToProps = (state: ApplicationState) => ({
  user: selectors.selectUser(state)
})

export default connect(
  mapStateToProps
)(Home);
