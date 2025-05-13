export interface Notification {
    title: string;
    description: string;
    id?: number;
    muted?: boolean;
    x_icon?: boolean;
    removed?: boolean;
    duration?: number;
}

export interface Popup {
    content: string;
    callback: () => void;
    confirm: string;
}

export interface Phone {
    add_popup: (content: string, callback?: () => void, confirm?: string) => void;
    add_notification: (notification: Notification) => void;
    shake_phone: (sound?: boolean) => void;
    play_ping: () => void;
    set_background: (image_path: string) => void;
    fullscreen: (value?: boolean, screen?: boolean) => void;
    set_max_notifications: (max: number) => void;
    silence: (enable?: boolean, vibrate?: boolean) => void;
    toggle_battery: () => void;
    toggle_network: () => void;
    toggle_lock: () => void;
    set_carrier: (carrier: string) => void;
    set_size: (width: number, height: number) => void;
    clear_popup: () => void;
    clear_all_notifications: () => void;
}



