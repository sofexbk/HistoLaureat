import React, { createContext, useContext, useReducer, useEffect,useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext'
import { jwtDecode } from "jwt-decode";
// ... (your imports)

const initialState = {
  stages: [],
};

const actionTypes = {
  DELETE_STAGE: 'DELETE_STAGE',
  GET_DATA: 'GET_DATA', // New action type for fetching data
};

const stageReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.DELETE_STAGE:
      return {
        ...state,
        stages: state.stages.filter((stage) => stage._id !== action.payload),
      };
    case actionTypes.GET_DATA: // Reducer case for fetching data
      return {
        ...state,
        stages: action.payload,
      };
    default:
      return state;
  }
};

const StageContext = createContext();

const StageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(stageReducer, initialState);
  const { user } = useAuthContext(); 
  const userId = user ? jwtDecode(user.token)._id : null;
  const [laureatId, setLaureatId] = useState(null);

  useEffect(() => {
    const fetchProfileId = async () => {
      try {
        const response = await axios.get(`/api/profile/${userId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setLaureatId(response.data.profile._id);
      } catch (error) {
        console.error('Erreur lors de la requête :', error);
      }
    };

    if (userId) {
      fetchProfileId();
    }
  }, [userId, user]);

  const deleteStage = async (stageId) => {
    try {
      const response = await axios.delete(`/api/stageLaureat/${laureatId}/${stageId}/deleteStage`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
  
      if (response.status === 200) {
        dispatch({ type: actionTypes.DELETE_STAGE, payload: stageId });
  
        // Fetch the updated list of stages
        const updatedStagesResponse = await axios.get('/api/stageLaureat/getAllStages', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
  
        // Dispatch the GET_DATA action with the updated stages
        dispatch({ type: actionTypes.GET_DATA, payload: updatedStagesResponse.data.stages });
      } else {
        throw new Error(response.data.error);
      }
    } catch (error) {
      console.error('Error deleting stage:', error.message);
    }
  };
  

  return (
    <StageContext.Provider value={{ stages: state.stages, deleteStage }}>
      {children}
    </StageContext.Provider>
  );
};
const useStageContext = () => {
  const context = useContext(StageContext);
  if (!context) {
    throw new Error('useStageContext must be used within a StageProvider');
  }
  const { dispatch, ...rest } = context; // Extract dispatch from context
  return { dispatch, ...rest }; // Include dispatch in the returned context
};
export { StageProvider, useStageContext,actionTypes };
