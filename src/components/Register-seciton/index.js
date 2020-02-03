import { connect } from 'react-redux';
import { RegisterSection } from './Register-seciton';
import {
  loadUsersInfoFromServer,
} from '../../store/reducers/usersFromServerReducer';

const mapState2Props = state => ({

});

const mapDispatch2Props = {
  loadUsersInfoFromServer,
};

export default connect(
  mapState2Props, mapDispatch2Props
)(RegisterSection);
