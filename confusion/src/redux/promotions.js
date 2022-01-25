// import { PROMOTIONS } from "../shared/promotions";
import * as ActionTypes from './Actiontypes'

export const Promotions=(state={
    isLoading:true,
    errMess:null,
    promotions:[]
},action)=>{
    switch (action.type) {
        case(ActionTypes.ADD_PROMOS):
        return{...state,isLoading:false,errMess:null,promotions:action.payload}
    
    case(ActionTypes.PROMOS_LOADING):
        return{...state,isLoading:true,errMess:null,promotions:[]} //make some change to state


    case(ActionTypes.PROMOS_FAILED):
    return{...state,isLoading:false,errMess:action.payload,promotions:[]}

        default:return state;
    }
}