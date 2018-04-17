import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
      const res = await axios.get('/api/current_user');
      
      dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
    const res = await axios.post('/api/stripe', token);
    //  will update our UI automatically
    //  since it will enter the reducer with type FETCH_USER which
    //  we had already set up.
    dispatch({ type: FETCH_USER, payload: res.data });
};



