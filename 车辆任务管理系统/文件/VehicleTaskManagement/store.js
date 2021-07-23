//vuex
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state={
	mypopup:{},
}

const mutations={
	commit_mpopup(state,data){
		state.mypopup=data;
	},
}
export default new Vuex.Store({
	state:state,
	mutations:mutations
})