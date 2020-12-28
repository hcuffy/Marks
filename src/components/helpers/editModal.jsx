import React from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap';

function modalFooter(t, {dataId, nameId, closeId, deleteAction, closeAction}) {
    return (
        <ModalFooter>
            <Button
                data-id={dataId}
                name={nameId}
                onClick={deleteAction}
                type='button'
                color='danger'
            >
                {t('general.delete')}
            </Button>

            <Button type='submit' color='primary' formNoValidate>
                {t('general.update')}
            </Button>

            <Button onClick={closeAction} data-id={closeId} color='secondary'>
                {t('general.close')}
            </Button>
        </ModalFooter>
    );
}

export function modalFrame(t, modalOpen, updateAction, formData, extras, footerData) {
    return (
        <Modal isOpen={modalOpen} backdrop>
            <ModalHeader>{t('general.edit')}:</ModalHeader>
            <form onSubmit={updateAction} method='POST'>
                <ModalBody>
                    {formData}

                    {extras}
                </ModalBody>
                {modalFooter(t, footerData)}
            </form>
        </Modal>
    );
}
