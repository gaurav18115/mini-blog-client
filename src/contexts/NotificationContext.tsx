// components/NotificationProvider.js

import React, { createContext, useState, useContext } from 'react';
import {Notification} from "@/types/posts";

interface NotificationContextType {
    showNotification: (message: string, type: string) => void;
    notification: Notification | null | undefined;
}

export const NotificationContext = createContext<NotificationContextType>({
    showNotification: () => {},
    notification: null
});

// @ts-ignore
export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState<Notification|null>();

    const showNotification = (message: string, type: string) => {
        setNotification({ message, type });
        setTimeout(() => {
            setNotification(null);
        }, 3000);
    };

    return (
        <NotificationContext.Provider value={{ showNotification, notification }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);
