<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Phone } from '../lib/Phone.types'
import PhoneComponent from '../lib/Phone.vue'
import new_background from '../assets/phone-light-background.jpg'
import PhoneActions from './PhoneActions.vue'

const phone_ref = ref<Phone | null>(null);
const is_mobile = ref(false)

function trigger_notification() {
    if (!phone_ref.value) 
      return;

    phone_ref.value.add_notification({
        title: 'New Message',
        description: 'You have a new notification!',
        duration: 3000,
    });
}

function add_popup() {
    if (!phone_ref.value) 
      return;

    phone_ref.value.add_popup(
        "This is a custom popup!",
        () => {
            alert("Popup closed!");
        }
    );
}

function trigger_shake() {
    if (!phone_ref.value) 
      return;

    phone_ref.value.shake_phone();
}

async function set_custom_background() {
    if (!phone_ref.value) 
      return;
  
    phone_ref.value.set_background(new_background);
}

function set_max_notifications(max: number) {
    if (!phone_ref.value) return;
    phone_ref.value.set_max_notifications(max);
}

function silence(enable: boolean, vibrate: boolean) {
    if (!phone_ref.value) return;
    phone_ref.value.silence(enable, vibrate);
}

function toggle_battery() {
    if (!phone_ref.value) return;
    phone_ref.value.toggle_battery();
}

function toggle_network() {
    if (!phone_ref.value) return;
    phone_ref.value.toggle_network();
}

function toggle_lock() {
    if (!phone_ref.value) return;
    phone_ref.value.toggle_lock();
}

function set_carrier(carrier: string) {
    if (!phone_ref.value) return;
    phone_ref.value.set_carrier(carrier);
}

function set_size(width: number, height: number) {
    if (!phone_ref.value) return;
    phone_ref.value.set_size(width, height);
}

function toggle_fullscreen() {
    if (!phone_ref.value) return;
    phone_ref.value.fullscreen();
}

function _handle_fullscreen() {
    is_mobile.value = window.innerWidth < 480;
}

onMounted(() => {
    _handle_fullscreen()
    window.addEventListener('resize', () => _handle_fullscreen());

    console.log(`User is on a ${is_mobile.value ? 'mobile' : 'desktop'} device`);
})
</script>

<template>
    <h1 v-if="!is_mobile" class="text-3xl font-bold m-4 text-center select-none">Phone Test Page</h1>

    <div :class="is_mobile ? 'overflow-hidden' : 'flex flex-row justify-center items-center w-full my-auto'">
        <div v-if="!is_mobile" class="mx-auto">
            <PhoneActions
                @notification="trigger_notification"
                @shake="trigger_shake"
                @background="set_custom_background"
                @popup="add_popup"
                @silence="silence"
                @toggle_battery="toggle_battery"
                @toggle_network="toggle_network"
                @toggle_lock="toggle_lock"
                @set_carrier="set_carrier"
                @set_size="set_size"
                @fullscreen="toggle_fullscreen"
            />
        </div>

        <div class="mx-auto drop-shadow-[0_0_10px_#000]">
            <PhoneComponent ref="phone_ref">
                <div class="p-4 text-white mx-auto my-auto">
                    <div v-if="!is_mobile">
                        <h1 class="text-xl text-center">My Phone App</h1>
                        <p class="text-center">This is a custom HTML passed as a slot.</p>
                    </div>

                    <div v-if="is_mobile" class="mt-10">
                        <PhoneActions
                            @notification="trigger_notification"
                            @shake="trigger_shake"
                            @background="set_custom_background"
                            @popup="add_popup"
                            @silence="silence"
                            @toggle_battery="toggle_battery"
                            @toggle_network="toggle_network"
                            @toggle_lock="toggle_lock"
                            @set_carrier="set_carrier"
                            @set_size="set_size"
                            @fullscreen="toggle_fullscreen"
                        />
                    </div>
                </div>
            </PhoneComponent>
        </div>
    </div>
</template>