import React from "react";

export type DropdownProps = {
  trigger: React.ReactNode;
  children: React.ReactNode;
  open?: boolean;
  onClose: () => void;
};

export const Dropdown = (props: DropdownProps) => {
  const { open, onClose, trigger, children } = props;
  const dropdownRef = React.useRef<HTMLDivElement>();

  React.useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOutsideClick = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as any)) {
      onClose();
    }
  };
  return (
    <div className="relative" ref={dropdownRef as any}>
      {trigger}
      {open && (
        <div className="absolute origin-top-right right-0">{children}</div>
      )}
    </div>
  );
};

export default Dropdown;
