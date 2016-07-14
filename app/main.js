import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import App from './App.js';
import Help from './components/pages/Help.jsx';
import Home from './components/pages/Home.jsx';
import NotFound from './components/pages/NotFound.jsx';

injectTapEventPlugin();
render((<MuiThemeProvider muiTheme={getMuiTheme()}>
          <Router history={browserHistory}>
            <Route component={App} path="/">
              <IndexRoute component={Home}/>
              <Route component={Help} path="/help"/>
              <Route component={NotFound} path="*"/>
            </Route>
          </Router>
        </MuiThemeProvider>),
        document.getElementById('root'));
