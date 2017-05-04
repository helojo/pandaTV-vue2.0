<template>
  <div>
  	<HeaderNav :header="''" :game="''" :recreation="''"></HeaderNav>
  	<div class="container">
  		<div class="live">
  			<div class="video">
  				<div class="videoplayer">
  					<!-- <video id="roomVideo" webkit-playsinline playsinline preload="none" width="100%" height="100%"  controls="controls" :poster="imgUrl.img" >
  						<source :src="video.address" type="application/x-mpegURL">
  						<span>您的手机版本，网页版暂未能支持！</span>
  					</video> -->
            <video id="roomVideo"  :poster="imgUrl.img">
              <source :src="video.address"  type="application/x-mpegURL">
            </video>
            <div class="play" @click="getVideo">
              <img src="../assets/image/12N91K52260-504Q2.png" height="256" width="256" alt="">
            </div>
  				</div>
  			</div>
  			<div class="live-name">
  				<div class="live-image">
  					<span :style="'background-image:url('+hostinfo.avatar+')'"></span>
  				</div>
  				<div class="live-room-name">
  					<h2>{{hostinfo.name}}</h2>
  					<p>{{roominfo.name}}</p>
  				</div>
  				<div class="count">{{roominfo.person_num | fixed}}</div>
  			</div>
  		</div>

  		<div class="content">
  			<div class="table">
  				<a href="javascript:;" class="table-chat" @click="chat" :class="{'active':show}">
  					<span>聊天</span>
  				</a>
  				<a href="javascript:;" class="table-recommend" @click="recommend" :class="{'active':!show}">
  					<span>精彩推荐</span>
  				</a>
  			</div>
  			<div class="table-content">
  				<div class="chat" v-show="show">聊天</div>
  				<div class="recommend" v-show="!show">
  					<items :items="items"></items>
  				</div>
  			</div>
  		</div>
  	</div>
  </div>
</template>
<script>
	import videojs from 'video.js'
	import HeaderNav from "./header.vue"
	import items from './items.vue'
  import videohls from 'videojs-contrib-hls'
	export default{
		created() {
      this.getLive(this.$route.params.id)
      this.getItems()
      this.getWebSocket(this.$route.params.id)
    },
    data () {
    	return {
    		video:{},
    		items:[],
    		roominfo:{},
    		hostinfo:{},
    		imgUrl:"",
    		show:false
    	}
    },
    methods: {
    	getLive(id){
    		this.$http.jsonp('https://room.api.m.panda.tv/index.php',{params:{method:'room.shareapi',roomid:id}},{name:'callback'})
          .then(response =>{
          	let data = response.body;
            if(data.errno == 0){
              this.video = data.data.videoinfo;
              this.hostinfo = data.data.hostinfo;
              this.roominfo = data.data.roominfo;
              this.imgUrl = data.data.roominfo.pictures;
            }
          },(error) =>{
            console.log(error);
          }  
        )
    	},
    	getItems(){
    		this.$http.jsonp('https://api.m.panda.tv/index.php',{params:{method:'room.alllist','pageno':1,'pagenum':6}},{name:'callback'})
          .then(response =>{
          	let data = response.body;
            if(data.errno == 0){
              this.items = data.data.items;
            }
          },(error) =>{
            console.log(error);
          }  
        )
    	},
    	getWebSocket(id){
    		this.$http.get('/chatroom/getinfo?roomid='+id)
          .then(response =>{
          	let data = response.body;
            if(data.errno == 0){
            }
          },(error) =>{
            console.log(error);
          }  
        )
    	},
      getVideo(){
        var myPlayer = videojs('roomVideo')
        myPlayer.play();
      },
    	chat(){
    		this.show = true;
    	},
    	recommend(){
    		this.show = false;
    	}
    },
	  components: {
      HeaderNav,items
    }
	}
</script>
<style lang="scss">
	.container{
		max-width: 16rem;
    margin: 0 auto;
    height: 100%;
	}
	.live{
		width: 100%;
    background-color: #383838;
    min-height: 9rem;
	}
	.video{
		position: relative;
    height: 9rem;
	}
	.videoplayer{
    position:relative;
		video{
			background: #000;
    	height: 9rem;
    	vertical-align: top;
		}
	}
  .play{
      width:3rem;
      height:3rem;
      position:absolute;
      top:50%;
      right:50%;
      margin-top:-1.5rem;
      margin-right: -1.5rem;
      img{
        width:3rem;
        height:3rem;
      }
    }
	.live-name{
		width: 100%;
    height: 2.35rem;
    padding: .225rem;
    background-color: #fff;
    border-bottom: 1px solid #e2e2e2;
    display: flex;
	}
	.live-image{
		overflow: hidden;
    border-radius: 2rem;
    width: 2rem;
    height: 2rem;
    span{
	   	border-radius: 1.9rem;
	    border: .05rem solid #e1e1e1;
	    width: 1.9rem;
	    height: 1.9rem;
	    background-size: cover;
	    background-repeat: no-repeat;
	    background-position: center;
	    display: block;
    }
	}
	.live-room-name{
		-webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    margin: 0 .3rem;
    width: 10.75rem;
    h2{
    	margin: 0;
	    padding: 0;
	    height: 1.1rem;
	    line-height: 1.1rem;
	    font-size: .75rem;
	    color: #333;
	    font-weight: 400;
    }
    p{
    	margin: 0;
	    padding: 0;
	    height: .75rem;
	    line-height: .75rem;
	    font-size: .5rem;
	    color: #ababab;
	    overflow: hidden;
	    white-space: nowrap;
	    text-overflow: ellipsis;
    }
	}
	.count{
		font-size: .55rem;
    margin-top: 1.1rem;
    height: .75rem;
    line-height: .75rem;
    padding: 0 .5rem 0 .7rem;
    color: #1cd39b;
    position: relative;
	}
	.content{
		position:relative;
	}
	.table{
		text-align: center;
		height: 1.5rem;
    line-height: 1.5rem;
    background-color: #fff;
    padding: 0 .45rem;
    -webkit-box-shadow: 0 0.125rem 0.25rem #e6e6e6;
    box-shadow: 0 0.125rem 0.25rem #e6e6e6;
    a{
	    font-size: .6rem;
	    margin: 0 2%;
	    width: 46%;
	    float: left;
    }
    span{
    	height: 1.5rem;
    	line-height: 1.5rem;
    	display: block;
    	text-align: center;
    }
	}
	.table-chat{

	}
	.active{
		color:#1cd39b;
		span{
			border-bottom: .05rem solid #1cd39b;
		}
	}
</style>
