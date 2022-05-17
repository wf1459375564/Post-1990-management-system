<template>
  <div class="logins">
    <div class="container" :class="{ 'right-panel-active': registers }">
      <!-- Sign Up -->
      <div class="container__form container--signup">
        <form action="#" class="form" id="form1">
          <h2 class="form__title">九零后登录系统</h2>
          <el-input
            type="text"
            class="input"
            v-model="LogInputs.account"
            placeholder="输入账号"
          ></el-input>
          <el-input
            type="text"
            class="input"
            v-model="LogInputs.password"
            placeholder="请输入密码"
          ></el-input>
          <p>忘记密码?</p>
          <button @click="enter" class="btn">登录</button>
        </form>
      </div>
      <!-- Sign In -->
      <div class="container__form container--signin">
        <el-form
          :model="RegisterInputs"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm form"
        >
          <h2 class="form__title">账号注册</h2>
          <el-form-item label="账号" prop="account">
            <el-input
              type="text"
              v-model="RegisterInputs.account"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="RegisterInputs.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              type="password"
              v-model="RegisterInputs.checkPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="name">
            <el-input v-model.number="RegisterInputs.name"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input v-model.number="RegisterInputs.age"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-input v-model.number="RegisterInputs.sex"></el-input>
          </el-form-item>
          <button @click="submitForm('ruleForm')" class="btn">注册</button>
        </el-form>
      </div>
      <!-- Overlay -->
      <div class="container__overlay">
        <div class="overlay">
          <div class="overlay__panel overlay--left">
            <button @click="register" class="btn" id="signIn">注册</button>
          </div>
          <div class="overlay__panel overlay--right">
            <button @click="lefts" class="btn" id="signUp">登录</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      if (!Number.isInteger(value)) {
        callback(new Error("请输入数字值"));
      } else {
        if (value < 18) {
          callback(new Error("必须年满18岁"));
        } else {
          callback();
        }
      }
    };
    var checkAgeName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入昵称"));
      } else {
        callback();
      }
    };
    var checkAgeSex = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入性别"));
      } else {
        callback();
      }
    };
    var checkAgeAccount = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.RegisterInputs.pass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.RegisterInputs.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registers: true,
      LogInputs: {
        //登录的input
        account: "",
        password: "",
      },
      RegisterInputs: {
        account: "",
        password: "",
        checkPass: "",
        age: "",
        name: "",
        sex: "",
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        name: [{ validator: checkAgeName, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }],
        sex: [{ validator: checkAgeSex, trigger: "blur" }],
        account: [{ validator: checkAgeAccount, trigger: "blur" }],
      },
    };
  },
  methods: {
    async enter() {
      //登录
      let { account, password } = this.LogInputs;
      let res = await this.axios({
        url: "/login",
        methods: "post",
        data: { account, password },
      });
      this.message(res.msg, "error", 1000);
    },
    async regis() {
      //注册
      let { account, password, name, age, sex } = this.RegisterInputs;
      let res = await this.axios({
        url: "/register",
        methods: "post",
        data: { account, password, name, age, sex },
      });
      console.log(res.code);
      if (res.code == 1) {
        this.lefts();
        this.message(res.msg, "success", 1000);
      } else {
        this.message(res.msg, "error", 1000);
      }
    },
    async register() {
      this.registers = !this.registers;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.regis();
        } else {
          return false;
        }
      });
    },
    lefts() {
      this.registers = !this.registers;
      this.$refs["ruleForm"].clearValidate();
      this.$refs["ruleForm"].resetFields();
    },
  },
};
</script>

<style scoped>
@import "css/index.css";
</style>