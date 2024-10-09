// Modal.js
import React from 'react';
import './Modal.css'; // Ensure you create this CSS file for styling

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>Close</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
