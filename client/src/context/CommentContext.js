// CommentContext.js
import { createContext, useContext, useReducer } from 'react';

const CommentContext = createContext();

const commentReducer = (state, action) => {
  switch (action.type) {
    case 'SET_COMMENTS':
      return action.payload;
    case 'ADD_COMMENT':
      return [...state, action.payload];
    case 'DELETE_COMMENT':
      return state.filter((comment) => comment.commentId !== action.payload);
    default:
      return state;
  }
};

const CommentProvider = ({ children }) => {
  const [comments, dispatch] = useReducer(commentReducer, []);

  const value = { comments, dispatch };

  return <CommentContext.Provider value={value}>{children}</CommentContext.Provider>;
};

const useCommentContext = () => {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error('useCommentContext must be used within a CommentProvider');
  }
  return context;
};

export { CommentProvider, useCommentContext };
