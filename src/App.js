import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Register from './pages/register';
import Add from './pages/addemployees';
import Edit from './pages/edit';
import Upload from './pages/upload';

function App() {
  return (
    <div className="App">
      
      <Router>
        <Switch>
          <Route exact path="/" component ={Login} />
          <Route path="/dashboard" component ={Dashboard}/>
          <Route path="/register" component ={Register}/>
          <Route path="/addemployee" component ={Add} />
         <Route path="/edit" component={Edit}/>
         <Route path="/upload" component={Upload}/>



          
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
