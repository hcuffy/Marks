import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'

const modalFooter = ({ dataId, subjectId, deleteAction, closeAction }) => (
	<ModalFooter>
		<Button
			data-id={dataId}
			name={subjectId}
			onClick={deleteAction}
			type="button"
			color="danger"
		>
			Delete
		</Button>

		<Button type="submit" color="primary">
			Update
		</Button>
		<Button onClick={closeAction} color="secondary">
			Close
		</Button>
	</ModalFooter>
)

export const modalFrame = (modalOpen, updateAction, examFormData, extras, footerData) => (
	<Modal isOpen={modalOpen} backdrop>
		<ModalHeader>Edit:</ModalHeader>
		<form onSubmit={updateAction} method="POST">
			<ModalBody>
				{examFormData}
				{extras}
			</ModalBody>
			{modalFooter(footerData)}
		</form>
	</Modal>
)
