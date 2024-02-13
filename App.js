import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import Authentication from "./src/components/navigation/Authentication";
import { store } from "./src/redux/Store";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistStore(store)}>
        <PaperProvider>
          <Authentication />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
