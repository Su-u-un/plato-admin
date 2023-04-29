<template>
  <div class="navBar">
    <div class="left"><slot/></div>
    <div><slot name="right"/></div>
  </div>
</template>

<script>
export default {
  name: "viewNavBar"
}
</script>

<style scoped lang="scss">
.navBar{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 40px;
  line-height: 40px;
  border-bottom: 2px solid #dcdfe6;
  padding-bottom: 10px;
  position: relative;
  .left{
    font-size: 20px;
  }
}
.navBar::after{
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 28px;
  height: 4px;
  background: #dcdfe6;
}
</style>
