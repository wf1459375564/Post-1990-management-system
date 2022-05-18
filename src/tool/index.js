import Vue from "@vue";
import {
    Message
}
from 'element-ui'
Vue.prototype.$Submit = (FormDate, callback, err) => { //封装一下提交表单
    FormDate.validate(async value => {
        if (value) { //如果正确就调取回调函数
            callback()
        } else { //如果不是就一次就行弹窗提示
            let errors = FormDate.fields;
            console.log(FormDate)
            for (let error of errors) {
                if (error.validateState == "error") {
                    Message.warning({
                        message: error.validateMessage,
                        duration: 1000,
                    });
                    if (typeof err === 'function') {
                        err(error)
                    }
                    break;
                }
            }
        }

    })
}