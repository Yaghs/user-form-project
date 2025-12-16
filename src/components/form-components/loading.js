
    export const Modal = ({isOpen, onClose, children}) => {
        if (!isOpen) return null;
        return (
        <div onClick={onClose}style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            >
            
            <div style={{
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.5)',
            }}>
                {children}
            </div>

        </div>
    );
    };
    
