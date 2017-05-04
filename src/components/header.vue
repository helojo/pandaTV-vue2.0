<template>
  <div class="header">
    <router-link to="/index" class="logo">
      <img src="../assets/image/7c36bb2ee9dad01d312b921ed3384f09.png" height="47" width="79" alt="">
    </router-link>
    <div class="header-link" v-if="header">
      <router-link to="/index" class="home link">
        {{header}}
      </router-link>
      <router-link to="/game" class="game link">
       	{{game}}
      </router-link>
      <router-link to="/recreation" class="recreation link">
        {{recreation}}
      </router-link>
    </div>
    <div class="search" v-if="header">
    	<yd-icon name="search"></yd-icon>
    </div>
  </div>
</template>
<script>
	export default{
	  props:{
	      header:{
	        type: String,
	        default: '',
	        required:true
	      },
	      game: {
	        type: String,
	        default: '',
	        required:true
	      },
	      recreation: {
	        type: String,
	        default: '',
	        required:true
	      }
	  }
	}
</script>
<style lang="scss">
	a{
		color:#606060;
	}
	.header{
		position: relative;
	    height: 1.75rem;
	    width: 100%;
	    line-height: 1.75rem;
	    background-color: #fff;
	}
	.logo{
		display: block;
    margin-left: .5rem;
    width: 1.975rem;
    height:1.45rem;
    padding-top: .2875rem;
    float: left;
    img{
    	width:100%;
    	height:1.25rem;
    }
	}
	.header-link{
    display: inline-block;
    .link{
    	text-align: center;
	    display: inline-block;
	    width: 2.7rem;
	    font-size: .65rem;
	    height: 1.75rem;
    }
	}
	.router-link-active{
		color: #1cd39b;
    border-bottom: .075rem solid #1cd39b;
	}
	.search{
		position:absolute;
		right: 0;
		top:0;
		height:1.75rem;
		width:1.75rem;
		text-align:center;
		box-shadow: -0.05rem 0 0.15rem 0 rgba(0,0,0,.1);
	}
</style>
