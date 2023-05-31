<template>
  <div class="card">
    <div v-for="item in cardArr" :key="item.name" class="cards">
      <div class="pic">
        <img :src="item.img" alt="" width="60" />
      </div>

      <div class="info">
        <p>{{ item.name }}</p>
        <p class="infos">{{ item.money }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 第二步 父传子的方法 先去父组件定义要传过去的数据 再从子组件进行接收
  props: {
    // 第五步 父传子接收
    cardArr: {
      type: Array,
      default: [],
      require: true,
    },
  },
};
</script>

<style lang="less" scoped>
.card {
  width: 1200px;
  // background-color: aqua;
  display: flex;
  justify-content: space-around;

  .cards {
    width: 400px;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    margin-top: 20px;
    margin-left: 120px;
    border-radius: 4px;
    box-shadow: 0 0 4px #ccc;
    .pic {
      margin-left: 10px;
    }

    .info {
      font-size: 18px;
      margin-right: 5px;
      // background-color: red;
      text-align: center;
      color: orange;
      .infos{
        margin-top: 10px;
      }
    }
  }
}
</style>
