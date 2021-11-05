import React from 'react'
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LocationScreen from './screens/LocationScreen'
import LoginScreen from './screens/LoginScreen'
import AddUsersScreen from './screens/AddUsersScreen'
import AdminAddUsersScreen from './screens/AdminAddUsersScreen'
import ClientScreen from './screens/ClientScreen'
import ProfileScreen from './screens/ProfileScreen'
import UpdateProfileScreen from './screens/UpdateProfileScreen'
import AddLocationScreen from './screens/AddLocationScreen'





function App() {
  return (
    <Router>
        <Header />
            <main className='py-3'>
                <Container>
                    
                    <Route path='/' component={LoginScreen} exact />
                    <Route path='/addusers' component={AddUsersScreen} />
                    <Route path='/profile' component={ProfileScreen} />                    
                    {/*<Route path='/admin/addusers' component={AdminAddUsersScreen} />*/}
                    <Route path='/clientlist' component={ClientScreen} />  
                    <Route path='/admin/locations' component={LocationScreen} />
                    <Route path='/admin/addlocation' component={AddLocationScreen} />
                    <Route path='/updateprofile' component={UpdateProfileScreen} />  


                
                </Container>
            </main>
        <Footer />
      </Router>
  );
}

export default App;
