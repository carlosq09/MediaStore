import { Route, Switch, withRouter } from 'react-router-dom'
import React from 'react'
// Pages
import ProductDetails from './pages/ProductDetails'
import ProductList from './pages/ProductList'
// components
import Navbar from './components/Navbar'
// styles
import './App.scss'

function App () {
  return <>
    <Navbar />
    <Switch>
      <Route exact path="/product" render={() => <ProductList />} />
      <Route exact path="/product/:id" render={() => <ProductDetails />} />
      <Route component={ProductList} />
    </Switch>
  </>
}

export default withRouter(App)
