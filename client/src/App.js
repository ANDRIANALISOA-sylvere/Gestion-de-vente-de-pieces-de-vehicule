import { useRoutes } from "react-router-dom";
import Themeroutes from "./routes/Router";
import UserProvider from "./context/checkauth";

const App = () => {
  const routing = useRoutes(Themeroutes);

  return (
    <UserProvider>
      <div className="dark">{routing}</div>
    </UserProvider>
  )
};

export default App;
