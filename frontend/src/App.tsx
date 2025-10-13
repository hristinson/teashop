import "./App.css";
import ItemList from "./pages";
import { AuthProvider } from "./context";

function App() {
  return (
    <>
      <AuthProvider>
        <ItemList />
      </AuthProvider>
    </>
  );
}

export default App;
