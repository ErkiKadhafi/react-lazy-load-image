import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import NavbarCustom from "./components/Navbar";
import Drink from "./pages/Drink";


function App() {
    return (
        <Router>
            <NavbarCustom />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/drink/:id" component={Drink} />
            </Switch>
        </Router>
    );
}

export default App;
