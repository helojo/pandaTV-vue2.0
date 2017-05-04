<template>
	<div>
		<HeaderNav :header="'首页'" :game="'游戏'" :recreation="'娱乐'"></HeaderNav>
    <yd-slider autoplay="3000">
      <yd-slider-item v-for="image in images">
          <a href="http://www.ydcss.com">
            <img :src="image.bigimg">
          </a>
      </yd-slider-item>
    </yd-slider>
    <div class="wrap">
      <div class="list" v-for="list in lists">
        <div class="title">
         <img :src="list.type.icon" alt="" class="title-img">
         <div class="title-name">{{list.type.cname}}</div>
         <a href="" class="title-link">更多</a>
        </div>
        <items :items="list.items"></items>
      </div>
    </div>
	</div>
</template>
<script>
	import HeaderNav from '../../components/header.vue'
  import items from '../../components/items.vue'
  export default{
    data (){
      return {
        lists:[],
        images:[]
      }
    },
    created () {
      this.getIndexList()
      this.getIndexImg()
    },
    methods:{
      getIndexList(){
        this.$http.jsonp('https://api.m.panda.tv/ajax_rmd_ads_get',{name:'callback'})
          .then(response =>{
            let data = response.body;
            if(data.errno === 0){
              this.images = data.data;
            }
          },(error) =>{
            console.log(error);
          }  
        )
      },
      getIndexImg(){
        this.$http.jsonp('https://api.m.panda.tv/ajax_get_live_list_by_multicate?hotroom=1&__plat=h5',{name:'callback'})
          .then(response =>{
            let data = response.body;
            if(data.errno === 0){
              this.lists = data.data;
            }
          },(error) =>{
            console.log(error);
          }  
        )
      },
    },
    components: {
      HeaderNav,items
    }
  }
</script>
<style lang="scss">
  .wrap{
    margin-top: .25rem;
    background-color: #f2f2f2;
  }
  .title{
    height: 2.1rem;
    font-size: .7rem;
    line-height: 2.1rem;
    padding-left: .25rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-top: .4rem;
    color: #2b2b2b;
    background-color: #fff;
    .title-img{
      vertical-align: middle;
      width: .68rem;
      display:inline-block;
      height: auto;
    }
    .title-name{
      display: inline-block;
      padding-left: .25rem;
    }
  }
  .title-link{
    float: right;
    display: inline-block;
    margin-right: .25rem;
    padding-right: .48rem;
    background: url(https://i.h2.pdim.gs/349ccf93357d3ecaa39c70fe6142f581.png) right center no-repeat;
    background-size: .26rem .46rem;
    color: #606060;
    font-size: .55rem;
  }
</style>