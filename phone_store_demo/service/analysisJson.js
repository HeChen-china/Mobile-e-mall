//把goods.json文件内容提纯加工成newGoods.json
const fs = require('fs');
fs.readFile('./data_json/goods.json','utf-8',(err,data)=>{
    //把字符串包装成JSON格式
    let newData = JSON.parse(data);
    let pushData = [ ];
    let i = 0;
    //newData.RECORDS在goods.json中是一个数组
    newData.RECORDS.map((val,index)=>{
        if(val.IMAGE1 != null){
            i++
            pushData.push(val)
        }
    })
    fs.writeFile("./data_json/newGoods.json",JSON.stringify(pushData),(err)=>{
        if(err) console.log("写入失败");
        else console.log(`写入成功，共计${i}条`);
    })
})