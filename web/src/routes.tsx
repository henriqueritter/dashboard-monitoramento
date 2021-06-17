import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import Map from './pages/Map';
import Form from './pages/Form';

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Map}/>
                <Route path="/form" exact component={Form}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;