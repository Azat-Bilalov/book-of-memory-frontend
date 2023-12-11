import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import { Provider } from "react-redux";
import { store } from "@/app/store";

import "./styles/index.scss";

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
