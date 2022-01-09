import { createSlice } from '@reduxjs/toolkit'
import { AppDispatch } from 'utils/redux/store'

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  apiKey: '',
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true
    },

    // INITIALISE
    getInitialize(state, action) {
      state.isLoading = false
      state.isAuthenticated = action.payload.isAuthenticated
      state.apiKey = ''
    },

    // AUTH SUCCESS
    authSuccess(state, action) {
      state.isAuthenticated = true
      state.apiKey = action.payload.apiKey
    },

    // LOGOUT
    logoutSuccess(state) {
      state.isAuthenticated = false
      state.apiKey = ''
    },
  },
})

// Reducer
export default slice.reducer

// ----------------------------------------------------------------------

const isValidKey = (apiKey: string) => {
  if (!apiKey || apiKey.length === 0) {
    return false
  }

  return true
}

const setSession = (apiKey: string) => {
  if (apiKey && apiKey.length > 0) {
    localStorage.setItem('apiKey', apiKey)
  } else {
    localStorage.removeItem('apiKey')
  }
}

// export function login(params: ILogin) {
//   // eslint-disable-next-line
//   return async (dispatch: AppDispatch) => {
//     setSession(params.apiKey)

//     dispatch(slice.actions.authSuccess({ apiKey: params.apiKey }))

//     return true
//   }
// }

// export function logout() {
//   // eslint-disable-next-line
//   return async (dispatch: AppDispatch) => {
//     setSession('')

//     dispatch(slice.actions.logoutSuccess())
//     return true
//   }
// }

export function getInitialize() {
  // eslint-disable-next-line
  return async (dispatch: AppDispatch) => {
    dispatch(slice.actions.startLoading())

    try {
      const apiKey = localStorage.getItem('apiKey')
      if (apiKey && isValidKey(apiKey)) {
        setSession(apiKey)
        dispatch(slice.actions.authSuccess({ apiKey }))
      } else {
        dispatch(
          slice.actions.getInitialize({
            isAuthenticated: false,
            apiKey: '',
          }),
        )
      }
    } catch (error) {
      dispatch(
        slice.actions.getInitialize({
          isAuthenticated: false,
          apiKey: '',
        }),
      )
    }
  }
}
