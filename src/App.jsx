import "./App.css";
import { Web3ContextProvider } from "./Web3";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import IndexComponent from "./IndexComponent";
import MainLayout from "./MainLayout";
import Dashboard from "./Dashboard";
import Summary from "./Summary";
import Summaries from "./Summaries";
import { ResumeFormPopupProvider } from "./ResumeFormPopup";

function App() {
  return (
    <BrowserRouter>
      <ResumeFormPopupProvider>
        <Web3ContextProvider>
          <Navbar />
          <MainLayout>
            <Routes>
              <Route index element={<IndexComponent />}></Route>
              <Route
                path="/vacancies/:vacancyAddress"
                element={<IndexComponent />}
              ></Route>
              <Route path="/dashboard" element={<Dashboard />}></Route>
              <Route path="/summaries" element={<Summaries />}></Route>
              <Route
                path="/summaries/:summaryAddress"
                element={<Summary />}
              ></Route>
              <Route path="*" element={<h1>Not found</h1>}></Route>
            </Routes>
          </MainLayout>
        </Web3ContextProvider>
      </ResumeFormPopupProvider>
    </BrowserRouter>
  );
}

export default App;
