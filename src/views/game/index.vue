<template>
	<div>
		<HeaderNav :header="'首页'" :game="'游戏'" :recreation="'娱乐'"></HeaderNav>
    <div class="cate-list">
      <div class="cate-items">
        <a  class="link" @click="getIndexList(item.id)" v-for = "item in items" :class="{'active': item.id == active }">
          {{item.name}}
        </a>
      </div>
      <router-link to="/game/catelist" class="icon"><yd-icon name="type"></yd-icon></router-link>
    </div>
    <div v-show="!show" class="img">
      <img src="../../assets/image/loading.gif"  alt="">
    </div>
    <div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <div v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-immediate-check = "true"
          infinite-scroll-distance="10">
          <items :items="lists" v-show="show"></items>
      </div>
      <div class="loading" v-show="loadings">
        <mt-spinner type="fading-circle"></mt-spinner>
        拼命加载中...
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
        items:[
          {name:'英雄联盟',id:'lol'},
          {name:'风暴英雄',id:'heroes'},
          {name:'炉石传说',id:'hearthstone'},
          {name:'守望先锋',id:'overwatch'},
        ],
        show:true,
        active:false,
        page: 1,
        loading:false,
        loadings:false,
        sort:'lol',
        total:0,
        allLoaded: false,
        wrapperHeight: 0
      }
    },
    created () {
      let cate = this.$route.params.cate;
      let name = this.$route.params.name;
      if(cate && name){
        this.getIndexList(cate);
        for (var i = 0; i < this.items.length; i++) {
          if(this.items[i].name == name){
            return; 
          } else {
            this.items = [{name:name,id:cate},...this.items];
            return;
          }
        }
      }else{
        this.getIndexList('lol');
      }
    },
    methods:{
      getIndexList(sort){
        this.lists = [];
        this.show = false;
        this.page = 1;
        this.active = sort;
        this.sort = sort;
        this.loadMore(sort);
      },
      getserver(pageno,sort){
        this.$http.jsonp('https://api.m.panda.tv/ajax_get_live_list_by_cate',{params:{cate:sort,pageno:pageno,pagenum:10,__plat:'h5'}},{name:'callback'})
          .then(response =>{
            let data = response.body;
            if(data.errno === 0){
              this.show = true;
              this.page++;
              this.loading = false;
              this.lists = [...this.lists,...data.data.items];
              this.total = data.data.total;
              if(this.total <  pageno * 10){
                this.loading = true;
                this.loadings = false;
              }
            }
          },(error) =>{
            console.log(error);
          }  
        )
      },
      loadMore(sort) {
        this.loading = true;
        this.loadings = true;
        this.getserver(this.page,this.sort)
      }
    },
    mounted() {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    },
    components: {
      HeaderNav,items
    }
  }
</script>
<style lang="scss">
  .cate-list{
    position: relative;
    height: 1.75rem;
    line-height: 1.75rem;
    color: #f5f5f5;
    -webkit-box-shadow: 0 1px 0.075rem 0 rgba(0,0,0,.1);
    box-shadow: 0 1px 0.075rem 0 rgba(0,0,0,.1);
    .icon{
      display: inline-block;
      position: absolute;
      top: 0;
      right: 0;
      color:#aaa;
      height: 1.75rem;
      width: 1.75rem;
      text-align:center;
      line-height:1.75rem;
    }
  }
  .cate-items{
    position: absolute;
    width: 100%;
    padding-right: 1.75rem;
    overflow:hidden;
    height:2rem;
    .link{
      display: inline-block;
      width: 24%;
      color: #676767;
      font-size: .6rem;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
    }
    .active{
    color: #1cd39b;
  }
  }
  
  .img{
    position:fixed;
    left:50%;
    top:50%;
    margin-top: -140px;
    margin-left: -120px;
  }
  .cate-items .router-link-active{
    color: #1cd39b;
    border: 0
  }
  .loading {
    text-align: center;
    height: 50px;
    line-height: 50px;
    div {
      display: inline-block;
      vertical-align: middle;
      margin-right: 5px;
    }
  }
</style>