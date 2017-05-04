<template>
	<div>
		<div class="items">
			<a href="javascript:;" class="item" v-for="item in items" @click="refresh(item)">
				<div class="show">
					<img :src="item.pictures.img" alt="">
					<div class="txt">{{item.name}}</div>
				</div>
				<div class="name">
					<div class="left">{{item.userinfo.nickName}}</div>
					<div class="right">{{item.person_num | fixed}}</div>
				</div>
			</a>
		</div>
	</div>
</template>
<script>
	export default{
	  props:{
      items:{
        type: Array,
        default: [],
        required:true
      }
	  },
	  methods: {
	  	refresh (event) {
	      window.location.href = '#/room/'+event.id;
	      window.location.reload(); 
	    }
	  }
	}
</script>
<style lang="scss">
	.items{
    padding-right: .25rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    overflow: hidden;
    background-color: #fff;
    padding-top: .25rem;
  }
	.item{
		width: 50%;
    padding-left: .25rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    float: left;
    margin-bottom: .5rem;
	}
	.show{
		position:relative;
		border-radius:0.1rem;
		padding-top:56.2%;
		overflow:hidden;
		img{
			border-radius: .1rem;
    	width: 100%;
    	position: absolute;
    	top: 0;
    	left: 0;
		}
	}
	.txt{
		position: absolute;
    bottom: 0;
    border-bottom-right-radius: .1rem;
    border-bottom-left-radius: .1rem;
    height: .9rem;
    line-height: .9rem;
    font-size: .5rem;
    color: #fff;
    width: 100%;
    background-color: rgba(0,0,0,.6);
    padding-left: .25rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
	}
	.name{
		position: relative;
    overflow: hidden;
    font-size: .45rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    .left{
	   	width: 4.5rem;
	    float: left;
	    font-size: .5rem;
	    line-height: 1rem;
	    color: #2c2c2c;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
    }
    .right{
	   	position: absolute;
	    right: 0;
	    height: 100%;
	    max-width: 3rem;
	    padding-left: .75rem;
	    -webkit-box-sizing: border-box;
	    box-sizing: border-box;
	    font-size: .4rem;
	    line-height: 1rem;
	    color: #8d8d8d;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
    }
	}
</style>