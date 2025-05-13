<script setup lang="ts">
import '../style.css';
import { onMounted, ref, computed } from 'vue';
import type { Phone, Popup, Notification } from './Phone.types';
import FullScreen from './FullScreen.vue';

import wallpaper from './assets/wallpaper.jpg';

import vibrate from './assets/sounds/vibrate-sound.mp3';
import notification from './assets/sounds/notification-ping.mp3';

import battery from './assets/icons/battery.svg';
import network from './assets/icons/network.svg';
import lock from './assets/icons/lock.svg';

const full_screen = ref(false);
const notifications = ref<Notification[]>([]);
const max_notifications = ref(5);
const popup = ref<Popup | null>(null);
const background = ref(wallpaper);
const carrier = ref('waifai');
const is_shaking = ref(false);
const is_locked = ref(true);
const is_network_enabled = ref(true);
const is_battery_visible = ref(true);
const is_silenced = ref(false);
const is_vibration = ref(false);

const fullscreen_ref = ref<InstanceType<typeof FullScreen> | null>(null);

const phone_classes = computed(() => {
    console.log(full_screen.value);
    if (full_screen.value) {
        return "relative mx-auto bg-zinc-600 h-screen w-screen shadow-xl";
    }
    return "relative mx-auto border-zinc-800 bg-zinc-600 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl";
});

const screen_classes = computed(() => {
    if (full_screen.value) {
        return "overflow-hidden w-full h-full relative";
    }
    return "rounded-[1.5rem] overflow-hidden w-[272px] h-[572px] relative";
});

function fullscreen(value: boolean = false, screen: boolean = false) {
    full_screen.value = value;

    console.log('Triggered fullscreen', value, screen, new Date().toISOString());

    if (screen && value) 
        fullscreen_ref.value?.set();
    else if (screen && !value)
        fullscreen_ref.value?.exit();
}

function set_size(width: number, height: number) {
    const phone = document.querySelector('.phone') as HTMLElement;
    
    if (!phone) return;
    
    phone.style.width = `${width}px`;
    phone.style.height = `${height}px`;
}

function set_carrier(new_carrier: string) {
    carrier.value = new_carrier;
}

function toggle_lock() {
    is_locked.value = !is_locked.value;
}

function toggle_network() {
    is_network_enabled.value = !is_network_enabled.value;
}

function toggle_battery() {
    is_battery_visible.value = !is_battery_visible.value;
}

function silence(enable: boolean = false, vibrate: boolean = false) {
    is_silenced.value = enable;

    is_vibration.value = vibrate;
}

function add_popup(content: string, callback: () => void = () => {}, confirm: string = "Ok") {
    popup.value = {
        content,
        callback,
        confirm
    };
}

function clear_popup() {
    popup.value = null;
}

function set_max_notifications(max: number) {
    max_notifications.value = max;
}

function add_notification({ title, description, muted = false, x_icon = true, duration = 5000 }: { title: string, description: string, muted?: boolean, x_icon?: boolean, duration?: number }) {
    const id = Date.now();

    if (notifications.value.length >= max_notifications.value)
        remove_notification(notifications.value[0].id ?? 0); // notifications.value.shift();

    notifications.value.push({ id, title, description, x_icon, removed: false });

    if (!muted)
        play_ping();

    setTimeout(() => {
        remove_notification(id);
    }, duration);
}

function remove_notification(id: number) {
    const notification = notifications.value.find(n => n.id === id);

    if (notification) {
        notification.removed = true;
        setTimeout(() => {
            notifications.value = notifications.value.filter(n => n.id !== id);
        }, 300);
    }
}

function shake_phone(sound: boolean = true) {
    if (is_shaking.value) return;
    is_shaking.value = true;

    setTimeout(() => {
        is_shaking.value = false;
    }, 1000);

    if (!sound)
        return;
    const audio = new Audio(vibrate);
    audio.volume = 0.2;
    try {
        audio.play();
    } catch (error) {
        console.error(error);
    }
}

function play_ping() {
    const disabled = is_silenced.value && !is_vibration.value;
    if (disabled)
        return;

    const vibrate = is_silenced.value && is_vibration.value;

    if (vibrate)
        return shake_phone();

    const audio = new Audio(notification);
    audio.volume = 0.2;
    audio.play();
}

function set_background(image_path: string) {
    if (!image_path)
        return background.value = '';

    background.value = image_path;
}

function _handle_fullscreen() {
    const is_mobile = window.innerWidth < 480;
    console.log(is_mobile, new Date().toISOString(), window.innerWidth);
    
    fullscreen(is_mobile);
    
    if (!is_mobile)
        clear_popup();
    
    if (
        is_mobile &&
        fullscreen_ref.value?.can() &&
        !fullscreen_ref.value?.is()
    )
        add_popup(
            'Do you want to use the app in full screen mode?',
            () => {
                fullscreen(true, true);
            },
            'Yes'
        );
}

function clear_all_notifications() {
    notifications.value.forEach(notification => {
        notification.removed = true;
    });
    
    setTimeout(() => {
        notifications.value = [];
    }, 300);
}

defineExpose<Phone>({
    add_popup,
    add_notification,
    shake_phone,
    play_ping,
    set_background,
    fullscreen,
    set_max_notifications,
    silence,
    toggle_battery,
    toggle_network,
    toggle_lock,
    set_carrier,
    set_size,
    clear_popup,
    clear_all_notifications,
});

onMounted(() => {
    _handle_fullscreen()
    window.addEventListener('resize', () => _handle_fullscreen());
});

</script>

<template>
    <FullScreen ref="fullscreen_ref" />
    <div
        :class="[phone_classes, { 'animate-shake': is_shaking }]"
    >
        <!-- Notch -->
        <div class="w-[148px] h-[18px] bg-zinc-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute z-10">
            <div class="absolute left-2 w-3 h-3 bg-zinc-900 rounded-full"></div>
            <div class="absolute left-8 w-3 h-3 bg-zinc-900 rounded-full"></div>

            <div class="absolute left-1/2 -translate-x-1/2 top-1 w-8 h-2 bg-zinc-700 rounded-full"></div>

            <div class="absolute right-8 w-3 h-3 bg-zinc-700 rounded-full"></div>
            <div class="absolute right-9 top-1 w-1 h-1 bg-zinc-500 rounded-full"></div>

            <div class="absolute right-2 w-3 h-3 bg-zinc-900 rounded-full"></div>
        </div>
        
        <div class="h-[46px] w-[3px] bg-zinc-700 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
        <div class="h-[46px] w-[3px] bg-zinc-700 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
        <div class="h-[64px] w-[3px] bg-zinc-700 absolute -end-[17px] top-[142px] rounded-e-lg"></div>

        <div v-if="carrier.length" class="absolute top-[3px] left-[20px] w-[20px] h-[20px] z-10 text-white text-xs font-semibold">{{carrier}}</div>

        <img v-if="is_battery_visible" :src="battery" alt="battery" class="absolute top-[3px] right-[15px] w-[20px] h-[20px] z-10">
        <img v-if="is_network_enabled" :src="network" alt="network" class="absolute top-[5px] right-[40px] w-[15px] h-[15px] z-10 animate-pulse">

        <img v-if="is_locked" :src="lock" alt="lock" class="absolute top-[5%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[20px] h-[20px] z-10 drop-shadow-[0_0_10px_#000]">
        <div :class="screen_classes">
            <!-- Background Image -->
            <img v-if="background.length" :src="background" class="w-full h-full absolute inset-0" alt="wallpaper">

            <!-- Slot content, naturally layered on top -->
            <div class="relative w-full h-full">
                <slot></slot>
            </div>

            <!-- Notifications -->
            <div
                v-if="notifications.length"
                class="absolute bottom-3 left-0 w-full p-4 space-y-2">
                <div
                    v-for="notification in notifications"
                    :key="notification.id"
                    class="bg-white/50 backdrop-blur-sm border border-zinc-200/40 p-2 rounded-xl shadow-md flex justify-between items-center cursor-pointer"
                    :class="{ 'notification-enter': !notification.removed, 'notification-exit': notification.removed }"
                    @click="remove_notification(notification.id ?? 0)"
                >
                    <div
                        class="select-none">
                        <h3 class="font-bold">{{ notification.title }}</h3>
                        <p>{{ notification.description }}</p>
                    </div>
                </div>
            </div>

            <!-- PopUp -->
            <div
                v-if="popup"
                class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/50 border border-zinc-200/40 backdrop-blur-sm rounded-xl shadow-md text-nowrap">
                <div class="p-2 text-wrap">
                    {{popup.content}}
                </div>
                <div class="flex justify-center space-x-2 py-1 border-t border-zinc-200/40">
                    <button
                        @click="popup?.callback(); popup = null"
                            class=" text-blue-500 rounded-md w-full h-full">{{ popup.confirm }}</button>
                </div>
            </div>

            <div class="absolute bottom-2 flex w-full justify-center items-center">
                <div class="w-1/3 h-1 bg-zinc-100 rounded-full animate-bounce"></div>
            </div>
        </div>
    </div>
</template>

<style>
.animate-shake {
    animation: shake 0.3s ease-in-out;
}

@keyframes shake {
    0%, 100% { transform: rotate(0deg) scale(1); }
    25% { transform: rotate(-3deg) scale(1); }
    50% { transform: rotate(3deg) scale(1); }
    75% { transform: rotate(-3deg) scale(1); }
}

.notification-enter {
    opacity: 0;
    transform: translateY(20px);
    animation: fade-in-up 0.3s ease forwards;
}

.notification-exit {
    animation: fade-in-out 0.3s ease forwards;
}

@keyframes fade-in-up {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fade-in-out {
    to {
        opacity: 0;
        transform: translateX(-10%);
    }
}
</style>