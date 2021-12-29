import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navigation from "./layouts/Navigation";
import Posts from "./pages/Posts";
import SignIn from "./pages/SignIn";
import store from "./store";
import {Provider} from 'react-redux';
import checkForToken from "./helpers/checkForToken";



checkForToken();

function App() {
  return (
    <Provider store={store}>
      <Router>
      <div>
        <Navigation></Navigation>
      </div>
      <Container>
        <Routes>
          <Route exact path="/" element={<Posts/>}></Route>
          <Route exact path="/signin" element={<SignIn/>}></Route>
        </Routes>
      </Container>
    </Router>
    </Provider>
  );
}

export default App;

