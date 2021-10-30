import React from 'react'
import FormContainer from '../components/FormContainer'
import AddUser from '../components/AddUser'



const AdminAddUsersScreen = () => {
	return(
		<FormContainer >
			<AddUser admin='1' />
		</FormContainer>

		)
}

export default AdminAddUsersScreen