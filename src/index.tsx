import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material";
import store, { persistor } from "./Redux/Store/Store";
import { PersistGate } from "redux-persist/integration/react";

const theme = createTheme({
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
    fontWeightBold: "bold",
  },
  palette: {
    primary: {
      main: "#703578",
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}> {/* Provide the Redux store to the app */}
      <PersistGate loading={null} persistor={persistor}> {/* Delay rendering until persisted state is rehydrated */}
        <ThemeProvider theme={theme}> {/* Provide the Material-UI theme to the app */}
          <App />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
