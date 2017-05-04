<template>
  <div>
    <div class="header">
      <div class="back" @click="history"></div>
      <div class="title-game">游戏</div>
    </div>
    <div v-show="show" class="img">
      <img src="../../assets/image/loading.gif"  alt="">
    </div>
    <div class="list-box">
      <router-link :to="{ name: 'game', params: { cate: list.ename, name:list.cname }}"  class="list-item" v-for="list in lists">
        <div class="img-box">
          <img :src="list.img" alt="">
        </div>
        <div class="list-name">{{list.cname}}</div>
      </router-link>
    </div>
  </div>
  	
</template>
<script>
  export default{
    data () {
      return{
        lists:[],
        show:true,
      }
    },
    created () {
      this.getIndexList();
    },
    methods:{
      getIndexList(){
        this.$http.jsonp('https://api.m.panda.tv/index.php',{params:{method:'category.list',type:'game'}},{name:'callback'})
          .then(response =>{
            let data = response.body;
            if(data.errno === 0){
              this.lists = data.data;
              this.show = false;
            }
          },(error) =>{
            console.log(error);
          }  
        )
      },
      history(){
        history.back();
      }
    }
  }
</script>
<style lang="scss">
  .header{
    height: 1.8rem;
    padding: 0 .4rem;
    text-align: center;
    position: relative;
    background-color: #fff;
  }
  .back{
    position: absolute;
    top: 0;
    left: 0;
    background: url(https://i.h2.pdim.gs/6cf04297e7c8972420dd2a319aabe879.png) center center no-repeat;
    background-size: .425rem .8rem;
    width: .9rem;
    height: 100%;
    padding-left: 1.75rem;
  }
  .title-game{
    display: inline-block;
    height: 1.8rem;
    line-height: 1.8rem;
    font-size: .65rem;
    color: #2b2b2b;
  }
  .list-box{
    margin-top: .4rem;
    background-color: #fff;
    padding-top: .3rem;
    padding-left: .25rem;
    overflow: hidden;
  }
  .list-item{
    display: block;
    width: 5rem;
    height: 8.05rem;
    float: left;
    margin-right: .25rem;
    margin-bottom: .3rem;
    -webkit-box-shadow: 0 5px 5px rgba(0,0,0,.1);
    box-shadow: 0 5px 5px rgba(0,0,0,.1)
  }
  .img-box{
    img{
      width:100%;
    }
  }
  .img{
    position:fixed;
    left:50%;
    top:50%;
    margin-top: -140px;
    margin-left: -120px;
  }
  .list-name{
    font-size: .5rem;
    line-height: 1rem;
    color: #4a4a4a;
    text-align: center;
    padding-top:.1rem;
  }
</style>