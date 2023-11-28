import React from "react";

export interface User {
  email?: string,
  firstname?: string,
  lastname?: string,
  verified?: boolean,
  isloggedin: boolean
}

/**
 * Application state interface
 */
export interface AppState {
  user: User;
  updateState: (newState: Partial<AppState>) => void;
}

/**
 * Default application state
 */
const defaultState: AppState = {
  user: {
    isloggedin: false
  },
  updateState: (newState?: Partial<AppState>) => {},
};

/**
 * Creating the Application state context for the provider
 */
export const UserContext = React.createContext<AppState>(defaultState);