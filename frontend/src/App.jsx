import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import Navbar from "./component/Navbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Box minH={"100vh"}>
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
