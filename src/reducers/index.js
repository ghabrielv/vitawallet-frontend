import { combineReducers } from 'redux'
import transactionsReducer from './transactionsReducer';
import uiReducer from './uiReducer';
 
const rootReducer = combineReducers({
     
    transactions: transactionsReducer,
    ui: uiReducer,
   
})
 
export default rootReducer;