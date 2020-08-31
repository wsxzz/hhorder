<template>
	<radioM v-if="itemP.isHave&&itemP.type == 'radioM'" :title="itemP.title" :CODES="itemP.CODES" :fieldName="itemP.fieldName"  module="basic" :value="itemP.value" @radiosMFun="radioMFun"/>
		<selectM  v-if="itemP.isHave&&itemP.type == 'selectM' " :title="itemP.title" :CODES="itemP.CODES" :fieldName="itemP.fieldName" module="basic" :value="itemP.value" @PickMFun="PickMFun"/>
		<!-- <textM :title="itemP.title" :value="itemP.title"/> -->
				
			<inputM v-if="itemP.type == 'inputM'&& itemP.isHave" :title="itemP.title" :value="itemP.value" :Required="false" :unit="false"/>
</template>

<script>
</script>

<style>
</style>
