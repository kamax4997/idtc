import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from './slices/auth'
import dashboardReducer from './slices/dashboard'

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['settings'],
}

const authPersistConfig = {
  key: 'auth',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['isAuthenticated', 'apiKey'],
}

const dashboardPersistConfig = {
  key: 'dashboard',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['currentUser', 'contracts'],
}

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  dashboard: persistReducer(dashboardPersistConfig, dashboardReducer),
})

export { rootPersistConfig, rootReducer }
