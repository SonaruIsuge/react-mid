import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { StoreProvider } from "./store";
import './App.css';
import Home from './pages/Home';
import Product from './pages/Product';

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path='/product' component={Product} />
          <Route exact path="/:pageName" component={Home} />
        </Switch>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
