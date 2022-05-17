
export  default  function axios() {
    let {methods,url,data} = arguments[0];
   return  new Promise((resolve,reject)=>{
       let xhr = new  XMLHttpRequest();//实例化一个对象.
       xhr.open(methods,'/api'+url);
       xhr.withCredentials = true;
       xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
       var str = '';
       for (let i in data){
           str+=i+'='+data[i]+ (Object.keys(data)[Object.keys(data).length-1] == i?'':'&');
       }
       xhr.onreadystatechange = function () {//监听请求的状态
           if(this.readyState === 4 && this.status === 200){
               let testString = this.getResponseHeader('content-type');
               let testRegex = /application\/json/;
               if(testRegex.test(testString)){//说明是Json格式
                   resolve(JSON.parse(this.response))
               }else{
                   reject(this.response)
               }
           }else{
               console.log('!!!')
            reject(this.response)
           }
       };
       xhr.send(str);
    })

}