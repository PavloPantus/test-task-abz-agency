import { connect } from 'react-redux';
import { Users } from './Users';
import { selectUsersFromServer,
  selectUsersInfoFromServer,
  loadUsersInfoFromServer } from '../../store/reducers/usersFromServerReducer';

function mapState2Props(state) {
  return {
    usersFromServer: selectUsersFromServer(state),
    usersInfoFromServer: selectUsersInfoFromServer(state),
  };
}

const mapDispatch2Props = {
  loadUsersInfoFromServer,
};

export default connect(mapState2Props, mapDispatch2Props)(Users);
