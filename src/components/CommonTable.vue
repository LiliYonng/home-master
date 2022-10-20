<template>
  <el-table ref="mytable" :data="showList" stripe max-height="450" style="width: 100%">
    <el-table-column
      v-for="item in tableLable"
      :key="item.name"
      :prop="item.name"
      :label="item.label"
      :width="item.width ? item.width : 180"
      :formatter='formatter'
    >      
    <template #default="scope" >
          <div v-if="item.name =='img'" style="display: flex; align-items: center">
               <el-image  style="width: 4.375rem; height: 4.375rem" :src="scope.row.img" alt="" :fit="fill" ></el-image>
          </div>
          <el-switch v-if="item.name =='on'" v-model="scope.row.onSale" active-color="#13ce66" inactive-color="#ff4949" 
          :active-value=1
          :inactive-value=0
          @change="$emit('changeSale',scope.row.id,scope.row.onSale)"
          ></el-switch>
    </template>
    <!-- <template #default="scope" v-if="item.name =='on'">

        </template> -->
     
    </el-table-column>

    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="primary" plain @click="$emit('edit', scope.row)">编辑</el-button>
        <el-button type="danger" plain @click="$emit('del', scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup>
import {ref,onMounted,watchPostEffect,computed} from 'vue'
const props = defineProps(["tableData", "tableLable","itemH"]);
const mytable = ref(null);
let scroll_wrap = ref(null);
let scrollTop = ref(0);
let tableView = ref(null);
let showList = ref(null);
watchPostEffect(() => {
  /* 在 Vue 更新后执行 */
  if(scroll_wrap.value)
    scroll_wrap.value.scrollTop = 0;
    //点击下一页时tableData的值改变，设置滚动条归零；
  if(tableView.value)
    {//根据数据设置table高度
      let h = props.tableData?.length * props.itemH;
      if(h)
      tableView.value.style.height = h +'px';}
  showList.value = props.tableData?.slice(0,8);
})

onMounted(()=>{
  scroll_wrap.value = document.querySelector('.el-scrollbar__wrap');
  tableView.value=document.querySelector('.el-scrollbar__view');
  tableView.value.style.height = '127.5625rem';
  let bar = scroll_wrap.value;
  const handleScroll = function(e){
   scrollTop.value = e.target.scrollTop;
   let start = Math.floor(scrollTop.value/49);
  showList.value = props.tableData.slice(0,start+8);
  }
  bar.addEventListener('scroll',handleScroll);
})
const formatter =	function(row, column, cellValue){
  if(column.property=='birth')
  {
    let date = new Date(cellValue);
    let y = date.getFullYear();
    let m = date.getMonth()+1;
    let d = date.getDate();
    m=m>9?m:'0'+m;
    d=d>9?d:'0'+d;
   return `${y}-${m}-${d}`
  }
    if(column.property=='type')
  {
    let data =['0','母婴','鞋包饰品','食品','数码家电','居家百货','其他'];
    return data[cellValue];
    
  }
  return cellValue
}

</script>

<style>
.wrap_div{
  height:127.5625rem;
  position:absolute;
  top:0;

}
</style>