<template>
  <div class="reg">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model.number="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input type="password" v-model="ruleForm.pwd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button  type="primary" @click="submitForm('ruleForm')">注册</el-button>
        <el-button @click="reg" >登录</el-button>
        
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import axios from 'axios';
import { mapState, mapActions } from 'vuex'
import "./style.less";
export default {
  data() {
   
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      }  else {
        callback();
      }
    };
    return {
      ruleForm: {
        pwd: "",
        username: "",
      },
      rules: {
        pwd: [{ validator: validatePass, trigger: "blur" }],
        username: [{ validator: validatePass2, trigger: "blur" }],
      }
    };
  },computed: {
    ...mapState(['regStatus']),
  },
  watch:{
    regStatus (){
      if(Number(this.regStatus) == 200){
        this.$message({
          message: '注册成功',
          type: 'success'
        });
        this.$router.push({path:'login'})
      }else{
         this.$message({
          message: '注册失败',
          type: 'success'
        });
      }
    }
  },
  methods: {
    ...mapActions(['REG_DATA_ACTION']),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this['REG_DATA_ACTION'](this.ruleForm)
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    reg () {
      this.$router.resolve({path:'/login'})
    }
  }
};
</script>

