export type NavItemProps = {
  text: string;
  active: boolean;
  onClick: () => void;
  modal?: boolean;
};

export type ModalProps = {
  onClose: () => void;
  children: React.ReactNode;
};
