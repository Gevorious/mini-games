import type { ReactNode } from 'react';

export type ModalType = 'success' | 'fail' | null;

export type ModalConfig = {
  title: string;
  content: string | ReactNode;
  buttonText?: string;
  onClose?: () => void;
};

export type ModalContextType = {
  success: (config: ModalConfig) => void;
  fail: (config: ModalConfig) => void;
  close: () => void;
};
