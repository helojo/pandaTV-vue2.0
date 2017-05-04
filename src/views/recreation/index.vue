<template>
	<div>
		<HeaderNav :header="'首页'" :game="'游戏'" :recreation="'娱乐'"></HeaderNav>
    <div class="cate_list">
      <div class="cate_items">
        <a  class="link" @click="getIndexList(item.id)" v-for = "item in items" :class="{'active': item.id == active }">
          {{item.name}}
        </a>
      </div>
    </div>
    <div v-show="!show" class="img">
      <img src="../../assets/image/loading.gif"  alt="">
    </div>
    <div v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-immediate-check = "true"
        infinite-scroll-distance="10">
        <items :items="lists" v-show="show"></items>
        <div class="loading" v-show="!loading">加载中...</div>
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
          {name:'熊猫星秀',id:'yzdr'},
          {name:'户外直播',id:'hwzb'},
          {name:'音乐专区',id:'music'},
        ],
        show:true,
        active:false,
        page: 1,
        loading:false,
        sort:'yzdr',
        total:0
      }
    },
    created () {
      this.getIndexList('yzdr');
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
              }
            }
          },(error) =>{
            console.log(error);
          }  
        )
      },
      loadMore(sort) {
        this.loading = true;
        this.getserver(this.page,this.sort)
      }
    },
    components: {
      HeaderNav,items
    }
  }
</script>
<style lang="scss">
  .cate_list{
    position: relative;
    height: 1.75rem;
    line-height: 1.75rem;
    color: #f5f5f5;
    -webkit-box-shadow: 0 1px 0.075rem 0 rgba(0,0,0,.1);
    box-shadow: 0 1px 0.075rem 0 rgba(0,0,0,.1);
  }
  .cate_items{
    .link{
      display: block;
      float: left;
      width: 33%;
      color: #676767;
      font-size: .6rem;
      text-align: center;
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
</style>