import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Landing from "./pages/Landing";


export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="flex-grow px-2 md:px-20">
          <Routes>
            <Route
              path="/"
              element={
                <Landing />
              }
            ></Route>
          </Routes>
        </div>
      </div>
    </QueryClientProvider>
  );
}
