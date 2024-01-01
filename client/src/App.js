import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ClassRoom from "./pages/ClassRoom";
import Course from "./pages/Course";

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <div className="App">
      <>
        <ApolloProvider client={client}>
          <Router>
            <Header />
            <div className="container">
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path='/classRoom/:id' element={<ClassRoom/>}/>
                <Route path='/course/:id' element={<Course/>}/>
              </Routes>
            </div>
          </Router>
        </ApolloProvider>
      </>
    </div>
  );
}

export default App;
