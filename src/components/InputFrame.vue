<template>
  <div class="md:max-w-sm xl:max-w-lg w-full flex flex-col">
    <div class="relative">
      <slot></slot>
      <div
        class="
          absolute
          inset-y-0
          right-0
          pr-4
          flex
          items-center
          pointer-events-none
        "
        v-if="error"
      >
        <svg
          class="h-5 w-5 text-red-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>
    <small
      :class="error ? 'opacity-100' : 'opacity-0'"
      class="
        mt-2
        ml-2
        transition
        duration-200
        ease-in-out
        text-red-500 text-sm
        text-left
      "
      v-text="error"
    ></small>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      required: true,
    },
  },
}
</script>