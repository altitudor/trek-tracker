import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import TrailsIndexContainer from "../containers/TrailsIndexContainer";
import TrailsNewContainer from "../containers/TrailsNewContainer";
import TrailShowContainer from "../containers/TrailShowContainer";

export const App = (props) => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={TrailsIndexContainer} />
          <Route exact path="/trails" component={TrailsIndexContainer} />
          <Route exact path="/trails/new" component={TrailsNewContainer} />
          <Route exact path="/trails/:id" component={TrailShowContainer} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
