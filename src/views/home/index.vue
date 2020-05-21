<template>
 <div class="home">
    <el-table
    :data="data"
    border
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
 </div>
</template>

<script>
import './style.less'
import { mapState, mapActions } from 'vuex'
  export default {
   
    created () {
      this['DEFAULT_DATA_ACTION']()
    },
    computed: {
       ...mapState(['data'])
    },
     methods: {
       ...mapActions(['DEFAULT_DATA_ACTION']),
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
  }
</script>
