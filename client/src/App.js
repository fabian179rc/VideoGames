import {Route, Switch} from 'react-router-dom';

import Landing from './components/Landing';
import Home from './components/Home';
import GameDetail from './components/GameDetail';
import CreateGame from './components/CreateGame';
import InvalidPage from './components/InvalidPage';
// import About from './components/About';
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function App() {
  return (    
      <>
        <Switch>
          <Route exact path='/' component={Landing}/>
          <Route exact path='/home' component={Home}/>
          <Route path='/videogame/:id' component={GameDetail}/>
          <Route path='/videogame' component={CreateGame}/>
          {/* <Route path='/about' component={About}/> */}
          <Route path='/invalidpage' component={InvalidPage}/>      
          <Route path='/*' component={InvalidPage}/>      
        </Switch>
      </>
  );
}

export default App;
