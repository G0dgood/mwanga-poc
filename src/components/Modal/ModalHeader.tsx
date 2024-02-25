import { AiOutlineClose } from 'react-icons/ai'

const ModalHeader = ({ setShow, headerTitle }: any) => {
	return (
		<div className='modal-close'>
			<h3>{headerTitle}</h3>
			<AiOutlineClose size={25} onClick={() => setShow(false)} className='close-span-icon' />
		</div>
	)
}

export default ModalHeader
