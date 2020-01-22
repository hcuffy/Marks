import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'

const modalFooter = (
	t,
	{ dataId, nameId, closeId, deleteAction, closeAction }
) => (
	<ModalFooter>
		<Button
			data-id={dataId}
			name={nameId}
			onClick={deleteAction}
			type="button"
			color="danger"
		>
			{t('general.delete')}
		</Button>

		<Button type="submit" color="primary">
			{t('general.update')}
		</Button>

		<Button onClick={closeAction} data-id={closeId} color="secondary">
			{t('general.close')}
		</Button>
	</ModalFooter>
)

export const modalFrame = (
	t,
	modalOpen,
	updateAction,
	examFormData,
	extras,
	footerData
) => (
	<Modal isOpen={modalOpen} backdrop>
		<ModalHeader>{t('general.edit')}:</ModalHeader>
		<form onSubmit={updateAction} method="POST">
			<ModalBody>
				{examFormData}

				{extras}
			</ModalBody>
			{modalFooter(t, footerData)}
		</form>
	</Modal>
)
