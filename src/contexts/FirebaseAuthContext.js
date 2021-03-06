import React, { createContext, useEffect, useReducer } from 'react';
import SplashScreen from 'src/components/SplashScreen';
import firebase from 'src/lib/firebase';
import { userReader } from 'src/hooks/firestoreRead';

const initialAuthState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'AUTH_STATE_CHANGED': {
      const { isAuthenticated, user } = action.payload;

      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user
      };
    }
    default: {
      return { ...state };
    }
  }
};

const AuthContext = createContext({
  ...initialAuthState,
  method: 'FirebaseAuth',
  createUserWithEmailAndPassword: () => Promise.resolve(),
  signInWithEmailAndPassword: () => Promise.resolve(),
  signInWithGoogle: () => Promise.resolve(),
  logout: () => Promise.resolve()
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialAuthState);

  const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  };

  const signInWithGoogle = val => {
    let provider;
    switch (val) {
      case 'Facebook':
        provider = new firebase.auth.FacebookAuthProvider();
        return firebase.auth().signInWithPopup(provider);
      case 'Google':
        provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(provider);
      default:
        provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(provider);
    }
  };

  const createUserWithEmailAndPassword = async (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return firebase.auth().signOut();
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        // Here you should extract the complete user profile to make it available in your entire app.
        // The auth state only provides basic information.

        const userData = await userReader.getOne(user.email);
        // console.log(userData);

        dispatch({
          type: 'AUTH_STATE_CHANGED',
          payload: {
            isAuthenticated: true,
            user: {
              id: user.uid,
              avatar: user.photoURL,
              email: user.email,
              fullName: user.displayName,
              name: user.displayName.split(' ')[0],
              tier: 'Premium',
              careerChoice: 'Hotel Manager'
            }
          }
        });
      } else {
        dispatch({
          type: 'AUTH_STATE_CHANGED',
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    });

    return unsubscribe;
  }, [dispatch]);

  if (!state.isInitialised) {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'FirebaseAuth',
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signInWithGoogle,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
