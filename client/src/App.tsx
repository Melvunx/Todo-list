import { ThemeProvider } from "./components/ThemeProvider";
import Home from "./pages/Home";

const App = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Home />
    </ThemeProvider>
  );
};
export default App;
