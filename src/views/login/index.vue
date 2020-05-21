<template>
  <div class="login">
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
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" >登录</el-button>
        <el-button @click="reg">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
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
        pass: "",
        username: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        username: [{ validator: validatePass2, trigger: "blur" }],
      }
    };
  },
  computed: {
    ...mapState(['Status']),
  },
  watch:{
    Status (){
      if(this.Status === 200){
        localStorage.setItem('token',true)
        this.$message({
          message: '登录成功',
          type: 'success'
        });
        this.$router.push({path:'/'})
      }
    }
  },
  methods: {
     ...mapActions(['LOGIN_DATA_ACTION']),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this['LOGIN_DATA_ACTION'](this.ruleForm.username)
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    reg () {
      this.$router.push('/regs')
    }
  }
};
</script>

