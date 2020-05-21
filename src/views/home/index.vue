<template>
 <div class="home">
   <div class="ppp">
     <div>
     <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
   </div>
   <div class="search">
     <el-input
     v-model="searValue"
     @blur="sear"
    placeholder="请输入搜索内容"
    prefix-icon="el-icon-search"
   ></el-input>
   </div>
   </div>
    <el-table
    :data="data"
    border
    align="center"
    style="width: 100%">
    <el-table-column
      prop="id"
      label="id"
      width="100">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="msg"
      label="密码">
    </el-table-column>
      <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div>
    <el-dialog title="添加" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="姓名" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" :label-width="formLabelWidth">
      <el-input v-model="form.msg" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addSure">确 定</el-button>
  </div>
</el-dialog>
  </div>
 </div>
</template>

<script>
import './style.less'
import { mapState, mapActions } from 'vuex'
  export default {
   data () {
     return {
        formLabelWidth: '120px',
        dialogFormVisible:false,
        judge:0,
        searValue:'',
        editId:'',
        form: {
          name: '',
          msg: '',
        },
     }
   },
    created () {
      this['DEFAULT_DATA_ACTION']()
    },
    computed: {
       ...mapState(['data']),
    },
     methods: {
       ...mapActions(['DEFAULT_DATA_ACTION','ADD_DATA_ACTION','DELETE_DATA_ACTION',
       'SEAR_DATA_ACTION','EDIT_DATA_ACTION','ADD_DATA_ACTION']),
      handleEdit(index, row) { //修改
         this.dialogFormVisible = true;
         this.form.name = row.name;
         this.form.msg = row.msg;
         this.editId = row.id;
         this.judge = 1;
        console.log(index, row);
      },
      handleDelete(index, row) { //删除
        this['DELETE_DATA_ACTION'](row.id)
      },
      addSure(){
        this.dialogFormVisible = false;
         //添加
        if(this.judge === 0){
          this['ADD_DATA_ACTION'](this.form)
        }else if(this.judge === 1){ //确定修改
           this['EDIT_DATA_ACTION']({...this.form,id:this.editId})
            window.history.go(0)
        }
      },
      //搜索
      sear(){
        this['SEAR_DATA_ACTION'](this.searValue)
      }
    }
  }
</script>
