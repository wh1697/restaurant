<template>
  <!-- 复制了Element ui 里面的卡片 -->
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <slot name="title"></slot>
    </div>
    <!-- 这里的插槽content 就会放到页面的上面例如放到TurnPassword.vue这个页面里面我必须给一个div或者一个<template>起名字为<template slot="content"> -->
    <slot name="content"></slot>
  </el-card>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.box-card {
  .clearfix {
    text-align: left;
  }
}
</style>
