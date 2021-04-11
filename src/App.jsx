import React from 'react'
import './App.css'
import { Route, Switch } from 'react-router-dom'
import Index from './pages/index'
import Main from './pages/main'
import Upload from './pages/upload'
import Meeting from './pages/meeting'
import { BrowserRouterHook } from './utils/use-router'
function App () {
  return (
    <BrowserRouterHook>
      <Switch>
        <Route exact path="/upload" component={Upload}></Route>
        <Route exact path="/meeting/:name" component={Meeting}></Route>
        <Route path="/pastor" component={Index}></Route>
        <Route path="/" component={Main}></Route>

      </Switch>
    </BrowserRouterHook>
  )
}

export default App
