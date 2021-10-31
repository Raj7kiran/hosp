import bcrypt from 'bcryptjs'


const users = [
	{
		name: 'Admin',
		email: 'admin@abc.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true,
		isClientAdmin: true
	},
	{
		name: 'ClientAdmin',
		email: 'cladmin@abc.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: false,
		isClientAdmin: true
	},
	{
		name: 'User1',
		email: 'user1@abc.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: false,
		isClientAdmin: false
	},
	{
		name: 'User2',
		email: 'user2@abc.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: false,
		isClientAdmin: false
	}
]


export default users