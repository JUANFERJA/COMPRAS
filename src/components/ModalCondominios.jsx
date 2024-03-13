import { useContext, useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export const ModalCondominios = ({actionTrue, actionFalse, idBtn, titleModal,
                               modalBody, txtActiontrue, txtActionFalse}) => {
        
    

    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const SelecTrue = () =>{

        handleClose();
        actionTrue();

    }

    const SelecFalse = () =>{

        handleClose();
        actionFalse();

    }

  return (
    <>


                    <Button variant="primary" onClick={handleShow} id={idBtn} className="btnSave" style={{display:"none"}}>
                        <span className="spanSave"> Guardar</span>
                    </Button>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>{titleModal}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{modalBody}</Modal.Body>
                        <Modal.Footer>
                        <Button className='btnModalSave' onClick={SelecTrue}>
                        {txtActiontrue}
                        </Button>
                        {txtActionFalse && <Button className='btnModalCancel' onClick={SelecFalse}>
                        {txtActionFalse}
                        </Button>}
                        </Modal.Footer>
                    </Modal>                                    
    </>
  )
}

