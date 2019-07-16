import {ActionType} from '../../data';

const initialState = {
  isAuthorizationRequired: false,
  credentials: {}
};

const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: status,
    };
  },

  sendCredentials: (status) => {
    return {
      type: ActionType.SEND_CREDENTIALS,
      payload: status
    };
  }
};

const Operation = {
  // CheckAuth at the end of the game, if credentials is empty,
  // then Authorization is required
  sendCredentials: (submitData) => (dispatch, _getState, api) => {
    return api.post(`/login`, submitData)
      .then((response) => {
        if (response === 400) {

          // If authorization is required and id: null, then => display error
          dispatch(ActionCreator.sendCredentials({id: null}));
          dispatch(ActionCreator.requireAuthorization(true));
        } else {

          dispatch(ActionCreator.sendCredentials(response.data));
          dispatch(ActionCreator.requireAuthorization(false));
        }

      });
  }
};

// User operation is here to make server requests

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRE_AUTHORIZATION:
      return Object.assign({}, state, {
        isAuthorizationRequired: action.payload,
      });

    case ActionType.SEND_CREDENTIALS:
      return Object.assign({}, state, {
        credentials: action.payload
      });
  }

  return state;
};


export {
  ActionCreator,
  reducer,
  Operation
};
