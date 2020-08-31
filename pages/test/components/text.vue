<template>
	<view>
		<view class="textM" v-if="type=='text'">
			<view class="textMin row">
				<view class="textMinL" :class="{'Required':Required}">
					<text v-if="Required" class="Required-star">*</text>
					{{title}}
				</view>
				<view class="textMinR right " v-if="!ISnumber" :class="{'unit':unit}">
					<text v-if="unit" class="icon-unit">{{unitIcon}}</text>
					{{value}}
				</view>
				<view class="textMinR right " v-if="ISnumber" :class="{'unit':unit}">
					<text v-if="unit" class="icon-unit">{{unitIcon}}</text>
					{{valueNum}}
				</view>
			</view>
		</view>
		<view class="textMtlt" v-if="type=='textMtlt'">
			<view class="textMtltin">
				{{title}}
			</view>
		</view>
		<view class="characterTitle row" v-if="type=='textcharacter'">
			<view class="characterTitlein row">
				<image class="character" :src="character" mode="widthFix"></image>
				<view class="name">
					{{value}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {//
				type: String,
				default:""
			},
			value: {//
				type: String,
				default:""
			},
			Required: {//
				type: Boolean,
				default:true
			},
			type:{//
				type: String,
				default:"text"
			},
			valueNum: {//
				type: Number,
				default:0
			},
			ISnumber: {//
				type: Boolean,
				default:true
			},
			unit: {//
				type: Boolean,
				default:false
			},
			unitIcon: {//
				type: String,
				default:""
			},
		},  
		data() {
			return {
				character:'../../static/images/icons/character.png',
			}
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
	.textM .unit{
		padding-right: 44upx;
	}
</style>