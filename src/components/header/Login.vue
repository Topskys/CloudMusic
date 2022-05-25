<template>
  <div class="login">
    <el-row :gutter="10">
      <el-col :span="6">ggghh</el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  /*在script里面*/
  data() {
    /*插入form方法*/
    var checkNum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
          if (!myreg.test(value)) {
            callback(new Error("请输入正确的手机号码"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    /*插入form方法*/

    return {
      loginPower: false,
      /*插入form方法*/
      /*设定规则指向*/
      ruleForm2: {
        pass: "",
        num: "",
        delivery: false,
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: "blur" }],

        num: [{ validator: checkNum, trigger: "blur" }],
      },

      /*插入form方法*/

      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //提交成功做的动作
          dialogFormVisible = false;
          /* alert('submit!') ; */
          this.$message({
            type: "success",
            message: "提交成功",
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.el-button{
    border: none;
    background: none;
}
.dialog-footer{
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
}
</style>




