//controla todo lo que tiene que ver con las notas
import { types } from "../Types/types";

const inicialState = {
    notes:[],
    active:null,
    lostData: false,
};


export const NoteReducer = (state =inicialState , action) => {
        switch (action.type) {
                
            case types.activeNote :
                return{
                    ...state,
                    active:{
                        ...action.payload
                    }
                };
          
            case types.setAllNotes:
                return{
                    ...state,
                    notes:[
                        ...action.payload
                    ]
                };
            
            case types.updateNote:
                return{
                    ...state,
                    notes: state.notes.map( 
                        note => note.id === action.payload.id
                            ?action.payload.note
                            : note 
                        )
                };

            case types.ErrorSavedata:
                    return{
                         ...state,
                         lostData:action.payload
                    }        


            case types.deletNote:
                 return{
                     ...state,
                     active: null,
                     notes: state.notes.filter(note => note.id !== action.payload)
                 }        

            case types.resetNotes:     
            return  inicialState;     

            default:
                 return state;
        }      
};