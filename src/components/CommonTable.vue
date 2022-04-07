<template>
  <el-table :data="tableData" stripe height="450" style="width: 100%">
    <el-table-column
      v-for="item in tableLable"
      :key="item.name"
      :prop="item.name"
      :label="item.label"
      :width="item.width ? item.width : 180"
    />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="primary" plain @click="$emit('edit', scope.row)">编辑</el-button>
        <el-button type="danger" plain @click="$emit('del', scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup>
const props = defineProps(["tableData", "tableLable"]);

// defineExpose({
//   scrollTarget,
// });
</script>
