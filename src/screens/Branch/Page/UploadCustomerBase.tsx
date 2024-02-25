import React, { useEffect, useState } from 'react';
import CSVReader from "react-csv-reader";
import { Modal, Toast, ProgressBar } from 'react-bootstrap';

import { FaUpload } from 'react-icons/fa';
import ModalHeader from '../../../components/Modal/ModalHeader';
import { GrUploadOption } from "react-icons/gr";
import { useAppDispatch, useAppSelector } from '../../../store/useStore';
import { reset, uploadBase } from '../../../features/Customer/customerSlice';
import { customId } from '../../../components/TableOptions';
import { toast } from 'react-toastify';



const UploadCustomerBase = () => {
	const dispatch = useAppDispatch();
	const { data, isError, message, isLoading, isSuccess } = useAppSelector((state: any) => state.customer);

	const [progress, setProgress] = useState(0)
	const [show, setShow] = useState(false)
	const handleClose = () => {
		setShow(false)
	}
	const handleShow = () => setShow(true)

	const [jsonData, setJSONData] = useState<any>([])

	console.log('jsonData', jsonData)
	console.log('jsonData', jsonData)

	const submitHandler = () => {
		const vaules = { jsonData, setProgress }
		// @ts-ignore
		dispatch(uploadBase(vaules));
	};



	const onClickReset = () => {
		setProgress(0)
		setJSONData([])
	}

	useEffect(() => {

		if (isSuccess) {
			setTimeout(() => {
				setProgress(0)
			}, 3000);
			toast.success("Base Uploaded!", {
				toastId: customId
			});
			setJSONData([]);
			dispatch(reset())
		} else if (isError) {
			toast.error(message, {
				toastId: customId
			});
			setProgress(0)

		}
	}, [dispatch, isError, isSuccess, message])

	return (
		<>
			<div className="btn-side-container" onClick={handleShow}>
				<button className="btn-side">
					Upload
				</button>
				<span className="btn-side-icon">
					<  GrUploadOption />
				</span>
			</div>

			<Modal
				show={show}
				size="lg"
				onHide={handleClose}

				backdrop="static"
				keyboard={false}
				centered
				className="logic-modal">
				<ModalHeader headerTitle={"Upload File"} setShow={setShow} />
				<Modal.Body>
					<form className="upload-form">
						{/* {error &&
							<Toast show={error}>
								<Toast.Body>
									<span><i className="fas fa-exclamation-circle" /></span>
									<p>{error}!</p>
									<span> <i className="fas fa-times" onClick={onClickReset} /></span>
								</Toast.Body>
							</Toast>
						} */}
						{/* {success &&
							<Toast show={success} className="success-toast" delay={5000} autohide >
								<Toast.Body>
									<span><i className="fas fa-exclamation-circle" /></span>
									<p>Upload customer base is successfull!</p>
									<span><i className="fas fa-times" /></span>
								</Toast.Body>
							</Toast>
						} */}
						<div className={progress === 0 ? "upload-icon" : "upload-icon-active"}>
							<i className="fas fa-cloud-upload-alt fa-4x" />
							<p>{progress === 0 ? "Drag and Drop file or click below" : `Uploading...`}</p>
						</div>
						<CSVReader
							onFileLoaded={data => setJSONData(data)}
							parserOptions={{ header: true }} />

						<ProgressBar animated className="upload-progress-bar" now={progress} />

					</form>
					<span className='btn-upload-container'>
						<button
							className='btn-upload-outline'
							type="reset"
							onClick={onClickReset}>
							Reset
						</button>
						<button
							type="submit"
							disabled={isLoading}
							className='btn-upload'
							onClick={submitHandler}  >
							{isLoading ? "Uploading..." : "Upload"}
						</button>
					</span>
				</Modal.Body>
			</Modal>
		</>
	)
}
export default UploadCustomerBase;
