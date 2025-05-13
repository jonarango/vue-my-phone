<script setup lang="ts">
import { ref, defineExpose, onMounted } from "vue";

const can = function() {
  const el = document.documentElement;

  return el.requestFullscreen || (el as any).webkitRequestFullscreen || (el as any).msRequestFullscreen;
}

const is = function() {
  return document.fullscreenElement || (document as any).webkitFullscreenElement || (document as any).msFullscreenElement;
}

const set = function() {
  const el = document.documentElement;
  if (el.requestFullscreen) {
    el.requestFullscreen();
  } else if ((el as any).webkitRequestFullscreen) {
    // Safari
    (el as any).webkitRequestFullscreen();
  } else if ((el as any).msRequestFullscreen) {
    // IE11
    (el as any).msRequestFullscreen();
  } else {
    console.log("Full screen not supported on this browser");
  }
}

const exit = function() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if ((document as any).webkitExitFullscreen) {
    (document as any).webkitExitFullscreen();
  } else if ((document as any).msExitFullscreen) {
    (document as any).msExitFullscreen();
  }
}

defineExpose({
  can,
  is,
  set,
  exit,
});
</script>
