import { useEffect, useState } from 'react';
import CSVReader from "react-csv-reader";
import { Modal, ProgressBar } from 'react-bootstrap';
import { FaCloudDownloadAlt } from "react-icons/fa";
import ModalHeader from '../../../components/Modal/ModalHeader';
import { GrUploadOption } from "react-icons/gr";
import { useAppDispatch, useAppSelector } from '../../../store/useStore';
import { customId } from '../../../components/TableOptions';
import { toast } from 'react-toastify';
import { reset, uploadBase } from '../../../features/Customer/customerSlice';



const UploadCustomerBase = () => {
	const dispatch = useAppDispatch();
	const { isError, message, isLoading, isSuccess } = useAppSelector((state: any) => state.customer);

	const [progress, setProgress] = useState(0)
	const [show, setShow] = useState(false)
	const handleClose = () => {
		setShow(false)
	}
	const handleShow = () => setShow(true)

	const [jsonData, setJSONData] = useState<any>([])



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
			toast.error(message, { toastId: customId });
			setTimeout(() => {
				setProgress(0);
				dispatch(reset());
			}, 3000);
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


						<div className={progress === 0 ? "upload-icon" : "upload-icon-active"}>
							<FaCloudDownloadAlt size={80} color='#e2522e' />
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
