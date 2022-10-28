
import { createAsyncThunk } from '@reduxjs/toolkit'
import ApiAuth from '../../Authentication/ApiAuth'

export const userLogin = createAsyncThunk('usuarios/login',  
  async (datos) => {
        const data=await ApiAuth().post('/auth/token',datos).then(response => {
        /**
         * console log para mostrar la respuesta
         */
          //console.log("response userAction Login:")
        //console.log(response);
        return response.data;
    })
      const token = `Bearer ${data['access_token']}`;
      localStorage.setItem('bearertoken',token);  
      return data
  }
)

export const checkLoggedIn = createAsyncThunk('usuarios/checkloggedin',  
  async (datos) => {
        const data=await ApiAuth().post('/auth/islogged',).then(response => {
        console.log("response userAction isLogged:")
        console.log(response);
        return response.data;
    })
      return data
  }
)

export const logOutSession = createAsyncThunk('usuarios/logOutSession',  
  async (datos) => {
        const data=await ApiAuth().post('/auth/logout',).then(response => {
        console.log("response userAction isLoggedOut:")
        console.log(response);
        return response.data;
    })
      return data
  }
)



/*
export const userLogin = createAsyncThunk('user/login',  
  async (datos, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      
      const {data}=await ApiAuth().post('/auth/token',datos).then(response => {
        console.log("response Login:")
        console.log(response);
        console.log("tokenlogin:" + token);
        return response;
    })

      /*const { data } = await axios.post(
           '/api/user/login',
        { email, password },
        config
      )

      // store user's token in local storage
      const token = `Bearer ${data['access_token']}`;
      localStorage.setItem('bearertoken',token);  

      return data
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)
*/
export const registerUser = createAsyncThunk(
  'user/register',
  async ({ firstName, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const getUserDetails = createAsyncThunk(
  'user/getUserDetails',
  async (arg, { getState, rejectWithValue }) => {
    try {
      // get user data from store
      const { user } = getState()

      // configure authorization header with user's token
      const config = {
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
      }

    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

