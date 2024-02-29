import { ModalProps } from "../types";
import st from "./components.module.sass";

export const Modal = ({ onClose, children }: ModalProps) => (
  <div onClick={onClose} className={st.modal}>
    <div onClick={(e) => e.stopPropagation()}>{children}</div>
  </div>
);
