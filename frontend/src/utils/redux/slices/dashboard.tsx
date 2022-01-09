import { createSlice } from '@reduxjs/toolkit'
import { AppDispatch } from 'utils/redux/store'

const initialState = {
  currentUser: {
    id: '',
    firstName: '',
    lastName: '',
    avatarUrl: '',
    profile: {
      id: '',
      freelancerRate: 0,
      annualCompensation: 0,
      availabilityType: [],
      freelancerType: {
        id: '',
        name: '',
      },
      totalExperience: 0,
      textIntroduction: '',
    },
    userSkills: [],
    timezone: '',
  },
  contracts: {
    nodes: [],
    totalCount: 0,
  },
}

const slice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    // SET GRAPHQL DATA
    setData(state, action) {
      state.currentUser = action.payload.currentUser
      state.contracts = action.payload.contracts
    },
    clearData(state) {
      state.currentUser = {
        id: '',
        firstName: '',
        lastName: '',
        avatarUrl: '',
        profile: {
          id: '',
          freelancerRate: 0,
          annualCompensation: 0,
          availabilityType: [],
          freelancerType: {
            id: '',
            name: '',
          },
          totalExperience: 0,
          textIntroduction: '',
        },
        userSkills: [],
        timezone: '',
      }
      state.contracts = {
        nodes: [],
        totalCount: 0,
      }
    },
  },
})

// Reducer
export default slice.reducer

// ----------------------------------------------------------------------

// export function setGraphqlData(gData: IGraphql) {
//   // eslint-disable-next-line
//   return async (dispatch: AppDispatch) => {
//     dispatch(slice.actions.setData({
//       currentUser: gData.currentUser,
//       contracts: gData.contracts,
//     }))

//     return true
//   }
// }

export function clearGraphqlData() {
  // eslint-disable-next-line
  return async (dispatch: AppDispatch) => {
    dispatch(slice.actions.clearData())
    return true
  }
}
