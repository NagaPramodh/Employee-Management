import "./Modal.css";

export default function Modal({ children, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-container">{children}</div>
    </div>
  );
}
