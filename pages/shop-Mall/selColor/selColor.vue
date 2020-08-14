<template>
	<view>
		<view class="submitorder-content">
			<view class="marB20 commom-content">
				<view class="content">
					<view class="list">
			<view class="cell row">
				<view class="notesL">
					颜色
				</view>
				<view v-if="colorName.length>0" class="notesR right turntootherpage">
					<image class="icon-next" src="../../../static/images/icons/icon-public-next.png" mode="widthFix"></image>
					<picker @change="PickChangecolor" :value="coloridIndex" :range="colorName">
						<view class="uni-input">{{colorName[coloridIndex]}}</view>
					</picker>
				</view>
			</view>
			<view class="cell row">
				<view class="notesL">
					内饰
				</view>
				<view v-if="Interior.length>0" class="notesR right turntootherpage">
					<image class="icon-next" src="../../../static/images/icons/icon-public-next.png" mode="widthFix"></image>
					<picker @change="PickChangeInterior" :value="InteriorIndex" :range="Interior">
						<view class="uni-input">{{Interior[InteriorIndex]}}</view>
					</picker>
				</view>
			</view>
			</view>
			</view>
			</view>
			
			<button style="width: 80%;margin-bottom: 10px;" type="default">重置</button>
			
			<button style="width: 80%;margin-bottom: 10px;"  type="primary" @click="comfirm">	确定</button>
			
			
		</view>
		
		
	</view>
</template>

<script>
	import {mapMutations,mapState,mapGetters} from 'vuex'
	export default {
		data() {
			return {
				goodsID:null,
				colorName:[],//颜色
				colorId:[],//颜色
				coloridIndex:0,//颜色
				Interior:[],//内饰
				InteriorID:[],//内饰//内饰
				InteriorIndex:0,//内饰
			};
		},
		onLoad(ope) {
			this.getColorInner('1','nzIAAAAAaYHINe3g','nzIAAAAAhH9a2qc+');
			this.getColorInner('2','nzIAAAAAaYHINe3g','nzIAAAAAhH9a2qc+');
			this.goodsID = ope.goodsID
		},
		methods:{
			//获取颜色和内饰
			async getColorInner(Type, BrandFID, SeriesFID) {
				uni.showToast({
				    icon: 'loading'
				});
				let self_ = this;
				let param = {
					Type: Type,
					BrandFID: BrandFID,
					SeriesFID: SeriesFID
				}
				await self_.$api.HHPlatForm_P_GetColorInner(param).then(res => {
					if (res.length > 0) {
						
						if (Type == "1") { //颜色
							for (let data of res) {
								self_.colorName.push(data.FNAME)
								self_.colorId.push(data.FNUMBER)
								
							}
							 
							//回填详情信息
							let carinfoobj = {
								"color_id":res[0].FNUMBER, //内饰ID
								"color_name":res[0].FNAME
							}
							
							self_.$store.dispatch('setcarinfoall',carinfoobj)
							self_.$store.dispatch('setcarinfo',carinfoobj)
						} else if (Type == '2') { //内饰
							for (let data of res) {
								self_.Interior.push(data.FNAME)
								self_.InteriorID.push(data.FNUMBER)
							}
							//回填详情信息
							
							let carinfoobj = {
								"trim_id":res[0].FNUMBER, //内饰ID
								"trim_name":res[0].FNAME
							}
							
							self_.$store.dispatch('setcarinfoall',carinfoobj)
							self_.$store.dispatch('setcarinfo',carinfoobj)
						}
						
						
						uni.hideToast();
					}
				}).catch(res => {
					console.log(res)
					// 失败进行的操作
				})
			},
			PickChangecolor(e){
				this.coloridIndex = e.target.value //切换样式
				let carinfoobj = {
					"color_id":this.colorId[e.target.value], //内饰ID
					"color_name":this.colorName[e.target.value]
				}
				
				this.$store.dispatch('setcarinfoall',carinfoobj)
				this.$store.dispatch('setcarinfo',carinfoobj)
				
			},
			PickChangeInterior(e){
				this.InteriorIndex = e.target.value //切换样式
				let carinfoobj = {
					"color_id":this.InteriorID[e.target.value], //内饰ID
					"color_name":this.Interior[e.target.value]
				}
				
				this.$store.dispatch('setcarinfoall',carinfoobj)
				this.$store.dispatch('setcarinfo',carinfoobj)
			},
			comfirm(){
				// 跳转
				uni.navigateTo({
				    url: '../detailed/detailed?goodsID='+this.goodsID
				});
			}
		
		}
	}
</script>

<style lang="scss">

</style>
