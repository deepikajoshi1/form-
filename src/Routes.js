import { Switch, Route, Router } from "react-router-dom";
import App from './App';

import UserDetails from './UserDetails';

const Router = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/users/:userId" component={UserDetails} />
      </Switch>
    </Router>
  );
};


export default { Switch, Route, Router };
