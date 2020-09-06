export const CONSTANTS = {
  UPDATE_USER_INFO: 'UPDATE_USER_INFO'
};

export const updateUserInfo = data => {
  return {
    type: CONSTANTS.UPDATE_USER_INFO,
    data
  };
};
