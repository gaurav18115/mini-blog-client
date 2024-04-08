// components/Notification.js

import React, { useState, useEffect } from 'react';
import {Notification} from "@/common/types";
import {useNotification} from "@/contexts/NotificationContext";


interface NotificationProps {
}

const NotificationComponent : React.FC<NotificationProps> = () => {

    const { notification } = useNotification();
    // const [notification, setNotification] = useState<Notification | null | undefined>(null);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        console.log("[Notification.tsx]", notification);

        setVisible(true);
        const timer = setTimeout(() => {
            setVisible(false);
        }, 30000);

        return () => clearTimeout(timer);
    }, [notification]);


    if (notification && notification.type && notification.message) {
        return (
            <div className={`notification ${notification.type} ${visible ? 'show-notification' : 'hide-notification'}`}>
                {notification.message}
            </div>
        );
    } else {
        return <></>;
    }

};

export default NotificationComponent;
