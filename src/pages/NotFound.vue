<template>
  <div class="not-found">
    <h2><span>!</span> Страница не найдена</h2>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  h2 {
    font-size: $fs-vlg;

    span {
      font-size: calc($fs-vlg * 2.1);
      color: $clr-danger;
      font-weight: 700;
    }
  }
}
</style>
