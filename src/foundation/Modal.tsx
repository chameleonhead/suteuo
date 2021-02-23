import React from "react";

export type ModalProps = {
  children: React.ReactNode;
  open?: boolean;
  onClose: () => void;
};

export const Modal = (props: ModalProps) => {
  const { open, onClose, children } = props;
  const modalRef = React.useRef<HTMLDivElement>();

  React.useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOutsideClick = (e: MouseEvent) => {
    if (modalRef.current) {
      for (let i = 0; i < modalRef.current.childNodes.length; i++) {
        if (!modalRef.current.childNodes[i].contains(e.target as any)) {
          onClose();
          break;
        }
      }
    }
  };
  if (open) {
    return (
      <div className="fixed top-0 right-0 w-full h-full bg-black bg-opacity-30 z-50">
        <div ref={modalRef as any}>{children}</div>
      </div>
    );
  }
  return null;
};

export default Modal;
