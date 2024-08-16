import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Landing from "./pages/Landing";
import Brand from "./components/Brand";


export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex justify-center items-center h-screen bg-gray-900 overflow-hidden">
        <Brand />
        <Routes>
          <Route
            path="/"
            element={
              <Landing />
            }
          ></Route>
        </Routes>
      </div>
    </QueryClientProvider>
  );
}
