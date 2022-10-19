<template>
    <operate-table
    :tableLable ="tableLable"
    :tableData = "tableData"
    :rules = "rules"
    :operate_formLable = "operate_formLable"
    :itemH = 88
    @search="getData"
    @add="handleAdd"
    @update="handleEdit"
    @delete="handleDelete"
    @changeSale ='handleChange'
    ></operate-table>
</template>

<script setup>
import operateTable from '@/components/operateTable'
import { ref, watch, onMounted,computed} from "vue";
import { getMallData,addMall,delMall,editMall,changeState } from "../../api/data";

const tableLable =  ref([
  {
    name: 'img',
    label: '',
    width: 120
  },
    {
    name: 'name',
    label: '商品名称',
    width:200
  },
  {
    name: 'price',
    label: '价格'
  },
  {
    name: 'type',
    label: '分类',
  },
  {
    name: 'stock',
    label: '库存',
  },
  {
    name: 'sales',
    label: '销量',
    width:100,
  },
  {
    name: 'on',
    label: '上架',
    width:80,
  },
]);
const rules = ref({
  name: [
    { required: true, message: "请输入商品名", trigger: "blur" },
    { min: 2, max: 50, message: "请输入有效名字，不超过20个字符", trigger: "blur" },
  ],
  price: [
    { required: true, message: "请输入商品价格" },
  ],
  type: [{ required: true, message: "请选择分类" }],
});
const operate_formLable = ref([
    {
    name: 'name',
    label: '商品名称',
    type:'input',
  },
  {
    name: 'price',
    label: '价格',
    type:'input',
    requiredType: "num",
  },
  {
    name: 'type',
    label: '分类',
    type:'select',
    options:[
      {
        label: "1：母婴",
        value: "1",
      },
      {
        label: "2：鞋包饰品",
        value:"2",
      },
      {
        label: "3：食品",
        value:"3",
      },
      {
        label: "4：数码家电",
        value:"4",
      },      
      {
        label: "5：居家百货",
        value:"5",
      },
      {
        label: "6：其他",
        value:"6",
      },
    ],
  },
  {
    name: 'stock',
    label: '库存',
    type:'input',
    requiredType: "num",
  },
  {
    name: 'sales',
    label: '销量',
    type:'input',
    requiredType: "num",
  },
  {
    name: 'img',
    label: '图片链接',
    type:'text'
  },
]);
const tableData = ref(null);

const getData = (name = "") => {
  return getMallData({name})
    .then((res) => {
      let data= JSON.parse(res);
      console.log(data);
      tableData.value = data.mallData;
    })
    .catch((err) => console.log(err));
};
const handleAdd = (form)=>{
    addMall(form).then(res=>{
           ElMessage({
              type: "success",
              message: "添加成功",
            });
      })
    .catch(err=>alert(err));
    getData();
}
const handleEdit=(form)=>{
      editMall(form)
      .then((res) =>{            
        return(res);
      })
      .catch(alert);
       getData();
}
const handleDelete=(id)=>{
        delMall(id)
        .then((res) => {
            ElMessage({
              type: "success",
              message: "删除成功",
            });
            getData();
        })
        .catch((err) => {
          console.log(err);
        });
}
const handleChange=(id,onSale)=>{
 changeState({id,onSale}).then(res=>{
  ElMessage({              type: "success",
              message: "操作成功",})
 }).catch(alert)
}
onMounted(()=>{
    getData();
})
</script>