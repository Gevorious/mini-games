import { createContext, useContext, useState, type ReactNode } from 'react';
import type { ModalConfig, ModalContextType, ModalType } from './types';
import './styles.scss';

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [config, setConfig] = useState<ModalConfig | null>(null);

  const openModal = (type: ModalType, cfg: ModalConfig) => {
    setModalType(type);
    setConfig(cfg);
  };

  const close = () => {
    config?.onClose?.();
    setModalType(null);
    setConfig(null);
  };

  const value: ModalContextType = {
    success: (cfg) => openModal('success', cfg),
    fail: (cfg) => openModal('fail', cfg),
    close,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      {modalType && config && (
        <div className="modal__overlay flex justify--center align--center fixed">
          <div className={`modal__content p--32 text--center ${modalType}`}>
            <h2 className="mb--16">{config.title}</h2>
            <div className="modal__body">{config.content}</div>
            <button onClick={close} className={`${modalType} px--24 py--8`}>
              {config.buttonText || 'OK'}
            </button>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used inside ModalProvider');
  return ctx;
};
