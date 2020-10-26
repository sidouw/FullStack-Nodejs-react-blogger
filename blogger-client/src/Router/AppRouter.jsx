import React from 'react'
import {Router,Switch,Route} from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import UserProvider from '../Context/context'
import history from './history'
import Home from '../Components/Home.jsx'
import Header from '../Components/Header.jsx'
import Blogs from '../Components/Blogs.jsx'
import AboutUs from '../Components/AboutUs.jsx'
import ManagePost from '../Components/ManagePost'
import Profile from '../Components/Profile';
import ShowPost from '../Components/ShowPost';

const AppRouter = ()=> (
    <Router history= {history}>
    <UserProvider>
    <Header/>
    <div className = 'container'>
    <Switch>
    <Route path ='/' component = {Home} exact = {true}/>
    <Route path ='/Blogs' component = {Blogs} exact = {true}/>
    <Route path ='/AboutUs' component = {AboutUs} exact = {true}/>
    <Route path ='/post/:pid' component = {ShowPost} exact = {true}/>
    <PrivateRoute path = '/edit/:pid' component = {ManagePost} exact = {true}/>
    <PrivateRoute path = '/create' component = {ManagePost} exact = {true}/>
    <PrivateRoute path = '/profile' component = {Profile} exact = {true}/>
    <Route path ='*' component = {()=>(<h1>404</h1>)}/>
    </Switch>
    </div>
    </UserProvider>

    </Router>
)

export default AppRouter