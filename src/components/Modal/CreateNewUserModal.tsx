import { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'

import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { getallRoles, getsupervisors, reset, userRegistration } from '../../features/Registration/registrationSlice';
import { toast } from 'react-toastify';
import { customId } from '../TableOptions';
import ModalHeader from './ModalHeader';
import { FiPlusCircle } from 'react-icons/fi';

const CreateNewUserModal = () => {
	// @ts-ignore
	const userInfo = JSON.parse(localStorage.getItem("mwanga"));
	const createdBy = userInfo.firstname + " (" + userInfo.role + ")";
	const dispatch = useAppDispatch()

	const { isError, isSuccess, message, isLoading } = useAppSelector((state) => state.reg)
	const { rolesdata } = useAppSelector((state: any) => state.reg)
	const { getsupervisorsdata } = useAppSelector((state: any) => state.reg);
	const supervisor = getsupervisorsdata?.data
	const role = rolesdata?.roles
	const [show, setShow] = useState(false)
	const handleShow = () => {
		setShow(true)
	}
	const [input, setInput] = useState<any>({
		firstname: "",
		lastname: "",
		middlename: "",
		email: "",
		userId: "",
		contactNo: "",
		password: "123456",
		reportsTo: "",
		lob: "",
		role: "",
		createdBy: createdBy,
		profilePic: "",
	})


	useEffect(() => {
		dispatch(getsupervisors());
		dispatch(getallRoles());
	}, [dispatch]);


	const createUserHandler = (e: { preventDefault: () => void; }) => {
		e.preventDefault();
		// @ts-ignore 
		dispatch(userRegistration(input))
	}

	useEffect(() => {
		if (isError) {
			toast.error(message, { toastId: customId });
		} else if (isSuccess) {
			setShow(false)
			toast.success("User Created!", { toastId: customId });
		}
		dispatch(reset())
	}, [dispatch, isError, isSuccess, message]);


	const handleOnChange = (input: any, value: any) => {
		setInput((prevState: any) => ({
			...prevState,
			[input]: value,
		}));
	};




	return (
		<div>
			<div className="btn-side-container" onClick={handleShow}>
				<button className="btn-side">
					Create User
				</button>
				<span className="btn-side-icon">
					<  FiPlusCircle />
				</span>
			</div>

			<Modal
				size="lg"
				show={show}
				backdrop="static"
				keyboard={false}
				centered
				className="disposition-modal logic-modal">
				<ModalHeader setShow={setShow} headerTitle={"Registration"} />
				<Modal.Body>
					<form onSubmit={createUserHandler}>

						<div className="create-user-form-grid">
							<div className="form-ctrl">
								<label>First name</label>
								<input
									type="text"
									placeholder="Enter user's first name"
									required
									value={input?.firstname}
									onChange={(e) => handleOnChange("firstname", e.target.value)}
								/>
							</div>
							<div className="form-ctrl">
								<label>Last Name</label>
								<input
									type="text"
									placeholder="Enter user's last name"
									required
									value={input?.lastname}
									onChange={(e) => handleOnChange("lastname", e.target.value)}
								/>
							</div>
							<div className="form-ctrl">
								<label>Middle Name</label>
								<input
									type="text"
									placeholder="Enter user's middle name"
									value={input?.middlename}
									onChange={(e) => handleOnChange("middlename", e.target.value)}
								/>
							</div>
							<div className="form-ctrl">
								<label>Agent ID</label>
								<input
									type="text"
									placeholder="Enter user's ID"
									required
									value={input?.userId}
									onChange={(e) => handleOnChange("userId", e.target.value)}
								/>
							</div>
							<div className="form-ctrl">
								<label>Email Address</label>
								<input
									type="email"
									placeholder="Enter user's email address"
									required
									value={input?.email}
									onChange={(e) => handleOnChange("email", e.target.value)}
								/>
							</div>
							<div className="form-ctrl">
								<label>Contact No</label>
								<input
									type="text"
									placeholder="Enter user's phone number"
									required
									value={input?.contactNo}
									onChange={(e) => handleOnChange("contactNo", e.target.value)}
								/>
							</div>
							<div className="form-ctrl">
								<label>Role</label>
								<select
									value={input?.role}
									onChange={(e) => handleOnChange("role", e.target.value)}
									required>
									<option>Select user's role</option>
									{role?.map((item: any) => (
										<option key={item?._id} value={item?._id}>
											{item?.roleDescription}
										</option>
									))}
								</select>
							</div>
							<div className="form-ctrl">
								<label>LOB</label>
								<select
									value={input?.lob}
									onChange={(e) => handleOnChange("lob", e.target.value)}
									required>
									<option>Select user's LOB</option>
									<option value="Branch">Branch</option>
								</select>
							</div>
							<div className="form-ctrl">
								<label>Supervisor</label>
								<select
									value={input?.reportsTo}
									onChange={(e) => handleOnChange("reportsTo", e.target.value)}
									required>
									<option>Select user's supervisor</option>
									{supervisor?.map((item: any) => (
										<option key={item?._id} value={item?._id}>
											{item?.firstname} {item?.lastname}
										</option>
									))}
								</select>
							</div>
							<div className="form-ctrl">
								<label>Default Password</label>
								<input
									type="text"
									placeholder="Enter user's default password"
									required
									value={input?.password}
									onChange={(e) => handleOnChange("password", e.target.value)}
								/>
							</div>
						</div>

						<div className="disposition-btn">
							<button
								className='btn-upload mt-5'
								type="submit"
								disabled={isLoading && true}
							>
								{isLoading ? "Creating..." : "Create"}
							</button>
						</div>
					</form>
				</Modal.Body>
			</Modal>
		</div>
	)
}

export default CreateNewUserModal
