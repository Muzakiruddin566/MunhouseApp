import React, { useState, useEffect } from 'react';

const Notification = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 1000); 

    return () => clearTimeout(timer);
  }, [onClose]);

  const notificationStyle = {
    position: 'fixed',
    top: '10px',
    right: '10px',
    backgroundColor: '#4caf50',
    color: 'white',
    padding: '15px',
    borderRadius: '5px',
    zIndex: '1',
    display: isVisible ? 'block' : 'none',
  };

  return <div style={notificationStyle}>{message}</div>;
};

export default Notification;
