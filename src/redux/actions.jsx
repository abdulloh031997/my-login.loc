import { GetAuthInstance } from '../helpers/httpClient';

export const examplePostApi = (post) => {
  return (dispatch) => {
    GetAuthInstance()
      .post(`/api_here`, post)
      .then((res) => {
        dispatch({
          type: 'SET_EXAMPLE',
          payload: res.data,
        });
      })
      .catch((error) => {
        dispatch({
          payload: error,
        });
      });
  };
};
