import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import Map from './pages/Map';

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Map}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;