import Button from 'react-bootstrap/esm/Button';
import './App.css';
import { useState, useEffect } from 'react';
import Headers from './Header';
import Container from 'react-bootstrap/Container';
import UserModal from './components/UserModal';
import UserTable from './components/UserTable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

	const [modalOpen, setModalOpen] = useState(false);
	const [rowToEdit, setRowToEdit] = useState(null);

	const handleCloseModal = () => {
		setRowToEdit(null);
		setModalOpen(false);
	}

	const handleEditRow = (user) => {
		setRowToEdit(user);

		setModalOpen(true);
	}

	const handleDeleteRow = (id) => {
		setRowToEdit(id);

		setModalOpen(true);
	}

	return (
		<div className="App">
			<Headers />
			<br />
			<Container>
				<Button variant="primary" className='d-flex align-items-end flex-column p-auto m-2 btn btn-sm btn-success' onClick={() => setModalOpen(true)}>Add User</Button>
				{modalOpen && (<UserModal closeModal={handleCloseModal} defaultData={rowToEdit} />)}
				<ToastContainer />
				<UserTable editRow={handleEditRow} deleteRow={handleDeleteRow} />
			</Container>
		</div>
	);
}

export default App;