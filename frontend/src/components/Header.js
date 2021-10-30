import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/userActions'


const Header = () => {

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }
  
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Name</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
           <Nav className='ml-auto'>
              { userInfo && !userInfo.isAdmin ? (
                  <NavDropdown title={userInfo.name} id='username'>
                      <LinkContainer to='/profile'>
                          <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                       <LinkContainer to='/addusers'>
                            <NavDropdown.Item>Add Users</NavDropdown.Item>
                      </LinkContainer>                     
                      <LinkContainer to='/userlist'>
                              <NavDropdown.Item>User List</NavDropdown.Item>
                          </LinkContainer>
                          <NavDropdown.Item onClick={logoutHandler} >
                            Logout
                          </NavDropdown.Item>                      
                  </NavDropdown>
                ) : userInfo && userInfo.isAdmin ? (
                       <NavDropdown title={userInfo.name} id='username'>
                          <LinkContainer to='/profile'>
                              <NavDropdown.Item>Profile</NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to='/admin/clientlist'>
                              <NavDropdown.Item>Clients</NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to='/admin/master'>
                              <NavDropdown.Item>Master</NavDropdown.Item>
                          </LinkContainer>  
                          <NavDropdown.Item onClick={logoutHandler} >
                            Logout
                          </NavDropdown.Item>                
                      </NavDropdown>
                ) : ('')  }   
                {/*<LinkContainer to='/'>
                    <Nav.Link>
                      <i className='fas fa-user'></i> Login
                    </Nav.Link>
                  </LinkContainer> */}                      
              
                
              
                {/*{ userInfo && userInfo.isAdmin ? (
                      <NavDropdown title='Admin Menu' id='adminmenu'>
                        <LinkContainer to='/admin/clientlist'>
                            <NavDropdown.Item>Clients</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/admin/master'>
                            <NavDropdown.Item>Master</NavDropdown.Item>
                        </LinkContainer>                  
                      </NavDropdown>
                  ) : ('') }*/}
                
             
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header