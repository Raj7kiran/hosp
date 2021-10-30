
const users = [
	{
		name: 'Admin',
		email: 'admin@abc.com',
		password: '123456',
		isAdmin: true,
		isClientAdmin: true
	},
	{
		name: 'ClientAdmin',
		email: 'cladmin@abc.com',
		password: '123456',
		isAdmin: false,
		isClientAdmin: true
	},
	{
		name: 'User1',
		email: 'user1@abc.com',
		password: '123456',
		isAdmin: false,
		isClientAdmin: false
	},
	{
		name: 'User2',
		email: 'user2@abc.com',
		password: '123456',
		isAdmin: false,
		isClientAdmin: false
	}
]


export default users