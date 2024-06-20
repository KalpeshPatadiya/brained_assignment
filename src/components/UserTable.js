import axios from 'axios';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/esm/Button';
import DataTable from 'react-data-table-component';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserModal from './UserModal';


function UserTable({ editRow, deleteRow }) {


	const [users, setUsers] = useState([]);
	/**
	 * Retrieve User Data
	 */
	useEffect(() => {
		axios.get('http://localhost:4000/api/user')
			.then(response => {
				setUsers(response.data?.data);
			})
			.catch(error => {
				console.error(error);
			});
	}, []);

	const handleDelete = (id) => {

		/**
		 * Delete User
		*/
		axios.delete('http://localhost:4000/api/user/' + id)
			.then(response => {
				window.location.reload();
				toast("User deleted successfully");
			})
			.catch(error => {
				console.error(error);
			});
	};
	const columns = [
		{
			name: 'ID',
			selector: users => users._id,
			sortable: true,
		},
		{
			name: 'First Name',
			selector: users => users.firstname,
			sortable: true,
		},
		{
			name: 'Last Name',
			selector: users => users.lastname,
			sortable: true,
		},
		{
			name: 'Email',
			selector: users => users.email,
			sortable: false,
		},
		{
			name: 'Avatar',
			selector: (users) => <img src={users.avatar} height={50} width={50} onError={({ currentTarget }) => {
				currentTarget.onerror = null;
				currentTarget.src = "http://localhost:4000/user.png";
			}} />
		},
		{
			name: 'Action',
			selector: (users) => {
				return <>
					<Button className='btn btn-sm btn-warning' onClick={() => editRow(users)}>Edit</Button>&nbsp;&nbsp;
					<Button className='btn btn-sm btn-danger' onClick={() => handleDelete(users._id)}>Delete</Button>
				</>
			}

		},
	];

	return (
		<DataTable
			columns={columns}
			data={users}
			pagination
			fixedHeader
		/>
	);
};

export default UserTable;