import { CONSTANTS } from './actions';

const initialState = {
  user: {
    emailId: '',
    userId: ''
  }
};
const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.UPDATE_USER_INFO:
      return {
        ...state,
        user: {
          ...state.user,
          userId: action.data.userId,
          emailId: action.data.emailId
        }
      };
    default:
      return state;
  }
};

export default LoginReducer;
