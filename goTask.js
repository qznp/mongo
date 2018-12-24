// 生命一个登录名
var userName = "yanyan";
// 声明登录时的时间戳
var timeStamp = Date.parse(new Date());
// 组成json字符串
var jsonDatabase = { loginUser: userName, loginTime: timeStamp };
// 链接数据库
var bd = connect("test");
// 插入数据
// db.login.insert(jsonDatabase);
// 批量插入数据
// db.test.insert([{ _id: 1 }, { _id: 2 }, { _id: 3 }]);

/*
// 循环批量插入
var tempArray = [];
for (let i = 0; i < 1000; i++) {
  tempArray.push({ num: i });
}
// 批量一次插入
db.test.insert(tempArray);
*/

/*
// 修改
var workmate1 = {
  name: "yanyan",
  age: 33,
  sex: 1,
  job: "前端",
  skill: {
    skillOne: "HTML+CSS",
    SkillTwo: "JavaScript",
    SkillThree: "PHP"
  },
  regeditTime: new Date()
};

var workmate2 = {
  name: "ShengLei",
  age: 30,
  sex: 1,
  job: "JAVA后端",
  skill: {
    skillOne: "HTML+CSS",
    SkillTwo: "J2EE",
    SkillThree: "PPT"
  },
  regeditTime: new Date()
};
var workmate3 = {
  name: "MinJie",
  age: 20,
  sex: 1,
  job: "UI设计",
  skill: {
    skillOne: "PhotoShop",
    SkillTwo: "UI",
    SkillThree: "Word+Excel+PPT"
  },
  regeditTime: new Date()
};
var workmateArray = [workmate1, workmate2, workmate3];
db.workmate.insert(workmateArray);
// 修改方法一：
var workmate3 = {
  name: "MinJie",
  age: 20,
  sex: 0,
  job: "UI设计",
  skill: {
    skillOne: "PhotoShop",
    SkillTwo: "UI",
    SkillThree: "Word+Excel+PPT"
  },
  regeditTime: new Date()
};
db.workmate.update({ name: "MinJie" }, workmate3);
*/
/*
// 修改方法二：
// $set修改器
bd.workmate.update({ name: "MinJie" }, { $set: { sex: 2, age: 21 } });
// 内嵌的修改方法
db.workmate.update(
  { name: "MinJie" },
  { $set: { "skill.skillThree": "word" } }
);
// $unset用于将key删除
bd.workmate.update({ name: "MinJie" }, { $unset: { age: "" } });
// $inc对数字进行计算
db.workmate.update({ name: "MinJie" }, { $inc: { age: -2 } });
// multi选项:批量修改添加
db.workmate.update(
  {},
  {
    $set: { interset: [{ hobby: "swim" }, { hobby: "run" }, { hobby: "sing" }] }
  },
  { multi: true }
);
// upsert选项:找不到值，直接插入这条数据
db.workmate.update(
  { name: "xiaoWang" },
  { $set: { age: 20 } },
  { upsert: true }
);
// $push追加数组/内嵌文档值
db.workmate.update({ name: "xiaoWang" }, { $push: { interest: "draw" } });
db.workmate.update(
  { name: "MinJie" },
  { $push: { "skill.skillFour": "draw" } }
);
// $ne查找是否存在: 检查一个值是否存在，如果不存在再执行操作，存在就不执行
db.workmate.update(
  { name: "xiaoWang", interest: { $ne: "playGame" } },
  { $push: { interest: "Game" } }
);
// $addToSet:升级版的$ne
db.workmate.update(
  { name: "xiaoWang" },
  { $addToSet: { interest: "readBook" } }
);
// $each 批量追加
var newInterset = ["Sing", "Dance", "Code"];
db.workmate.update(
  { name: "xiaoWang" },
  { $addToSet: { interest: { $each: newInterset } } }
);
// \$pop: 删除数组值: 只删除一次，并不是删除所有数组中的值。而且它有两个选项，一个是 1(从数组末端进行删除) 和 - 1(从数组开端进行删除) 。
db.workmate.update({ name: "xiaoWang" }, { $pop: { interest: 1 } });
// 数组定位修改:使用 interest.int 的形式
db.workmate.update({ name: "xiaoWang" }, { $set: { "interest.2": "Code" } });
*/
/*
// 状态返回与安全
// false是upsert的简写，代表没有此条数据时不增加;
// true是multi的简写，代表修改所有
// getLastError: 1 : 表示返回功能错误
// printjson：表示以json对象的格式输出到控制台。
db.workmate.update({ sex: 1 }, { $set: { money: 1000 } }, false, true);
var resultMessage = db.runCommand({ getLastError: 1 });
// var resultMessage = db.runCommand({ ping: 1 });
// db.listCommands();
printjson(resultMessage);
var myModify = {
  findAndModify: "workmate",
  query: { name: "yanyan" },
  update: { $set: { age: 18 } },
  new: true //更新完成，需要查看结果，如果为false不进行查看结果
};
var ResultMessage = db.runCommand(myModify);
printjson(ResultMessage);
*/

/*
// 查询
// var result = db.workmate.find();
// while (result.hasNext()) {
//   printjson(result.next()); //用json格式打印结果
// }
// forEach循环;
var result = db.workmate.find(); //声明变量result，并把查询结果赋值给result
//利用游标的hasNext()进行循环输出结果。
result.forEach(function(result) {
  printjson(result);
});
*/

// 索引
//生成随机数
// function GetRandomNum(min, max) {
//   let range = max - min; //得到随机数区间
//   let rand = Math.random(); //得到随机值
//   return min + Math.round(rand * range); //最小值+随机数取整
// }
// //生成随机用户名
// function GetRadomUserName(min, max) {
//   let tempStringArray = "123456789qwertyuiopasdfghjklzxcvbnm".split(""); //构造生成时的字母库数组
//   let outPuttext = ""; //最后输出的变量
//   //进行循环，随机生产用户名的长度，这里需要生成随机数方法的配合
//   for (let i = 1; i < GetRandomNum(min, max); i++) {
//     //随机抽取字母，拼装成需要的用户名
//     outPuttext =
//       outPuttext + tempStringArray[GetRandomNum(0, tempStringArray.length)];
//   }
//   return outPuttext;
// }
// db.workmate.drop();
// var tempInfo = [];
// for (let i = 0; i < 2000000; i++) {
//   tempInfo.push({
//     username: GetRadomUserName(7, 16),
//     regeditTime: new Date(),
//     randNum0: GetRandomNum(100000, 999999),
//     randNum1: GetRandomNum(100000, 999999),
//     randNum2: GetRandomNum(100000, 999999),
//     randNum3: GetRandomNum(100000, 999999),
//     randNum4: GetRandomNum(100000, 999999),
//     randNum5: GetRandomNum(100000, 999999),
//     randNum6: GetRandomNum(100000, 999999),
//     randNum7: GetRandomNum(100000, 999999),
//     randNum8: GetRandomNum(100000, 999999),
//     randNum8: GetRandomNum(100000, 999999)
//   });
// }
// db.workmate.insert(tempInfo);
var rs = db.randomInfo
  .find({ username: "7xwb8y3", randNum0: 565509 })
  .hint({ randNum0: 1 }); //根据用户名查找用户
rs.forEach(rs => {
  printjson(rs);
});
// 计算时间
var startTime = new Date().getTime();
var runTime = new Date().getTime() - startTime;

// 没有错误显示成功
print(runTime);
