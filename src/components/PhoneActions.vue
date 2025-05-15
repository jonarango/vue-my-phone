<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits([
    'notification',
    'shake',
    'background',
    'popup',
    'silence',
    'toggle_battery',
    'toggle_network',
    'toggle_lock',
    'set_carrier',
    'set_size',
    'fullscreen'
]);

const carrier = ref('waifai');
const is_silenced = ref(false);
const is_vibration = ref(false);
const max_notifications = ref(5);
const phone_width = ref(300);
const phone_height = ref(600);
</script>

<template>
    <div class="flex flex-col gap-2 p-4 bg-black/50 backdrop-blur-sm rounded-xl border border-white/10 select-none">
        <h2 class="text-lg font-semibold mb-2">Phone Controls</h2>
        
        <!-- Notifications -->
        <div class="space-y-2">
            <h3 class="text-sm font-medium">Notifications</h3>
            <button @click="$emit('notification')" class="w-full px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 rounded-md cursor-pointer border border-white/10">
                Add Notification
            </button>
            <div class="flex items-center gap-2">
                <label class="text-sm">Max Notifications:</label>
                <input 
                    type="number" 
                    v-model="max_notifications" 
                    min="1" 
                    max="10"
                    class="w-16 px-2 py-1 bg-white/10 rounded-md"
                />
            </div>
        </div>

        <!-- Sound & Vibration -->
        <div class="space-y-2">
            <h3 class="text-sm font-medium">Sound & Vibration</h3>
            <div class="flex gap-2">
                <button 
                    @click="is_silenced = !is_silenced; $emit('silence', is_silenced, is_vibration)" 
                    :class="is_silenced ? 'bg-red-500/20' : 'bg-green-500/20'"
                    class="flex-1 px-3 py-1 rounded-md cursor-pointer border border-white/10"
                >
                    {{ is_silenced ? 'Unmute' : 'Mute' }}
                </button>
                <button 
                    @click="is_vibration = !is_vibration; $emit('silence', is_silenced, is_vibration)"
                    :class="is_vibration ? 'bg-blue-500/20' : 'bg-gray-500/20'"
                    class="flex-1 px-3 py-1 rounded-md cursor-pointer border border-white/10"
                >
                    {{ is_vibration ? 'Vibration On' : 'Vibration Off' }}
                </button>
            </div>
        </div>

        <!-- Phone Features -->
        <div class="space-y-2">
            <h3 class="text-sm font-medium">Phone Features</h3>
            <div class="flex gap-2">
                <button @click="$emit('toggle_battery')" class="flex-1 px-3 py-1 bg-yellow-500/20 hover:bg-yellow-500/30 rounded-md cursor-pointer border border-white/10">
                    Toggle Battery
                </button>
                <button @click="$emit('toggle_network')" class="flex-1 px-3 py-1 bg-green-500/20 hover:bg-green-500/30 rounded-md cursor-pointer border border-white/10">
                    Toggle Network
                </button>
            </div>
            <button @click="$emit('toggle_lock')" class="w-full px-3 py-1 bg-purple-500/20 hover:bg-purple-500/30 rounded-md cursor-pointer border border-white/10">
                Toggle Lock
            </button>
        </div>

        <!-- Carrier & Size -->
        <div class="space-y-2">
            <h3 class="text-sm font-medium">Customization</h3>
            <div class="flex gap-2">
                <input 
                    v-model="carrier" 
                    @change="$emit('set_carrier', carrier)"
                    placeholder="Carrier name"
                    class="flex-1 px-3 py-1 bg-white/10 rounded-md"
                />
            </div>
            <div class="flex gap-2">
                <input 
                    v-model="phone_width" 
                    type="number"
                    @change="$emit('set_size', phone_width, phone_height)"
                    placeholder="Width"
                    class="w-20 px-2 py-1 bg-white/10 rounded-md"
                />
                <input 
                    v-model="phone_height" 
                    type="number"
                    @change="$emit('set_size', phone_width, phone_height)"
                    placeholder="Height"
                    class="w-20 px-2 py-1 bg-white/10 rounded-md"
                />
            </div>
        </div>

        <!-- Actions -->
        <div class="space-y-2">
            <h3 class="text-sm font-medium">Actions</h3>
            <div class="flex gap-2">
                <button @click="$emit('shake')" class="flex-1 px-3 py-1 bg-orange-500/20 hover:bg-orange-500/30 rounded-md cursor-pointer border border-white/10">
                    Shake Phone
                </button>
                <button @click="$emit('background')" class="flex-1 px-3 py-1 bg-indigo-500/20 hover:bg-indigo-500/30 rounded-md cursor-pointer border border-white/10">
                    Set Background
                </button>
            </div>
            <div class="flex gap-2">
                <button @click="$emit('popup')" class="flex-1 px-3 py-1 bg-pink-500/20 hover:bg-pink-500/30 rounded-md cursor-pointer border border-white/10">
                    Show Popup
                </button>
                <button @click="$emit('fullscreen')" class="flex-1 px-3 py-1 bg-purple-500/20 hover:bg-purple-500/30 rounded-md cursor-pointer border border-white/10">
                    Toggle Fullscreen
                </button>
            </div>
        </div>
    </div>
</template>