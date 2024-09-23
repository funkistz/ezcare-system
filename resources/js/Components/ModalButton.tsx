import { Modal, Group, Button } from '@mantine/core';

function ModalButton({ children, props }: any) {


  return (
    <>
      <Modal centered {...props}>
        {children}
      </Modal>
    </>
  );
}

export default ModalButton;