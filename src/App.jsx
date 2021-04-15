import React, {useEffect} from 'react'
import './App.css'
import { Route, Switch } from 'react-router-dom'
import Index from './pages/index'
import Main from './pages/main'
import Upload from './pages/upload'
import Meeting from './pages/meeting'
import firebase from './firebase'

import { BrowserRouterHook } from './utils/use-router'
const messaging=firebase.messaging();
function App () {
  useEffect(()=>{
    
    Notification.requestPermission().then((token)=>{
      return messaging.getToken()
    }).then(token=>{
      console.log('Token: ',token)

    }).catch((error)=>{
      console.log(error);
    })

    
    
  },[])
  useEffect(()=>{
    messaging.onMessage((payload) => {
      console.log('Message received. ', payload);
      
    });
  },[])
  return (
    <BrowserRouterHook>
      <Switch>
      <Route exact path="/upload" component={Upload}></Route>
        <Route exact path="/meeting/:name" component={Meeting}></Route>
        <Route  path="/pastor" component={Index}></Route>
        <Route path="/" component={Main}></Route>
       
      </Switch>
    </BrowserRouterHook>
  )
}

export default App
