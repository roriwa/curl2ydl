<script setup lang="ts">
import { Textarea } from "@/components/ui/textarea";
import { computed, ref } from "vue";
import shlex from "shlex";
import { LucideClipboardCheck, LucideClipboardCopy } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { useClipboard } from "@vueuse/core";

const badArguments = new Set([
    "--compressed",
]);

const inputCommand = ref<string>("");
const youtubeDlCommand = computed(() => {
  if (!inputCommand.value.length) return "";
  let args = shlex.split(inputCommand.value);
  if (args[0] === 'curl')
    args = ['youtube-dl', '--hls-prefer-native', ...args.slice(1)];
  args = args.filter(arg => !badArguments.has(arg));
  args = args.map(arg => arg === '-H' ? '--add-header' : arg);
  return shlex.join(args);
});

const { copy: doCopy, copied: recentlyCopied } = useClipboard({ source: youtubeDlCommand });
</script>

<template>
  <div class="min-h-screen flex flex-col gap-2 p-2">
    <h1 class="text-2xl font-bold text-center text-primary">
      curl2ydl
    </h1>
    <Textarea class="grow" v-model.trim="inputCommand" placeholder="paste the curl command here" />
    <div class="flex items-center justify-center gap-1">
      <Button size="icon" @click="doCopy()">
        <component :is="recentlyCopied ? LucideClipboardCheck : LucideClipboardCopy" class="size-10" />
      </Button>
    </div>
    <Textarea class="grow" readonly :value="youtubeDlCommand" placeholder="copy the youtube-dl command from here" />
  </div>
</template>
