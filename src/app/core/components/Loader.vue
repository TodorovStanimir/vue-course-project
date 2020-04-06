<template>
  <div class="body">
    <div class="loading">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.loading {
  background-color: white;
  position: absolute;
  right: 10px;
  top: 5px;
}
body {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: #222;
}

.loading {
  $colors: #d0fBce, #72d572, #2baf2b, #0a8f08, #056f00;
  display: flex;
  animation-delay: 1s;

  .dot {
    position: relative;
    width: 0.8em;
    height: 0.8em;
    margin: 0.8em;
    border-radius: 50%;

    &::before {
      position: absolute;
      content: "";
      width: 100%;
      height: 100%;
      background: inherit;
      border-radius: inherit;
      animation: wave 2s ease-out infinite;
    }

    @for $i from 1 through 5 {
      &:nth-child(#{$i}) {
        background: nth($colors, $i);

        &::before {
          animation-delay: $i * 0.2s;
        }
      }
    }
  }
}

@keyframes wave {
  50%,
  75% {
    transform: scale(2.5);
  }

  80%,
  100% {
    opacity: 0;
  }
}

@media only screen and (max-width: 768px) {
  .loading {
    width: 60%;
  }
    .dot {
    width: 0.9em;
    height: 0.9em;
  }
}
</style>>
