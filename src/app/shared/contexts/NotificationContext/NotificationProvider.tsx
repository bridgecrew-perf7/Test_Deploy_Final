import React, { useState } from 'react';
import Notification from '../../components/notification/Notification';
import NotificationContext from './NotificationContext';

interface NotificationOptions {
  isSuccess: boolean;
  message: string;
}

const NotificationProvider = ({ children }: any) => {
  const [notification, setNotification] = useState(null);

  const showNotification = (notification: NotificationOptions) => {
    setNotification({
      isSuccess: notification.isSuccess,
      message: notification.message,
    });
  };

  const hideNotification = () => {
    setNotification(null);
  };

  const value = {
    showNotification,
    hideNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      <Notification notification={notification} />
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
