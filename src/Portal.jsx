import {useState} from "react";
import {createPortal} from "react-dom";

function Modal({onClose}) {
    throw new Error();
    return createPortal(<>
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{display: 'block'}}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button onClick={onClose} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        ...
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={onClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </>, document.body)
}

export function PortalCard() {

    const [modal, setModal] = useState(false)

    const showModal = () => {
        setModal(true)
    }

    const hideModal = () => {
      setModal(false)
    }

    const style = {
        transform: "translateY(1px)"
    }

    return <div className="card" style={style}>
        <div className="card-body">
            <h5 className="card-title">Special title treatment</h5>
            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
            <button onClick={showModal} className="btn btn-primary">Go somewhere</button>
        </div>
        {modal && <Modal onClose={hideModal} />}
    </div>
}