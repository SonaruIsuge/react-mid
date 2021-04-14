import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { StoreProvider } from "./store";
import './App.css';
import Home from './pages/Home';
import Product from './pages/Product';
import ProductCustomize from './pages/ProductCustomize';

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path='/product' component={Product} />
          <Route path='/productCustomize/:productId' component={ProductCustomize} />
          <Route exact path="/:pageName" component={Home} />
        </Switch>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
