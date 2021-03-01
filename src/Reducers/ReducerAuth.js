import { types } from "../Types/types";

export const ReducerAuth = (state ={ } , action ) => {

    switch (action.type) {
        case types.login:
                   return {
                       id: action.payload.id,
                       name: action.payload.userName,
                   };
                    
        case types.logout:
                  return { };

        default:
            return state;
    }
}
