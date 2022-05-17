let message = function () {
    let [message,type,duration] =arguments;
    return this.$message({message,type,duration});
};
export  default  message
