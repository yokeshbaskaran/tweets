import "./App.css";
import { AppContextProvider } from "./context/AppContext";
import { Toaster } from "react-hot-toast";

const App = () => {
  const isLoading = false;

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="loader"></div>
        Loading...
      </div>
    );
  }

  return (
    <>
      <AppContextProvider>
        <Toaster />
      </AppContextProvider>
    </>
  );
};

export default App;
