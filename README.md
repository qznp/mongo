# mongodb

_打开方式：先管理员 cmd(shift+ctrl+enter)命令行一个"mongod"，然后再管理员 cmd 命令行一个"mongo"。_

### 基础 shell 命令

show dbs：显示已有数据库
use admin：进入数据，使用数据库
db：显示当前位置，当前使用的数据库名称
use db(建立数据库)
db.集合.insert()：新建数据集合和插入文件（数据）
`db.user.insert({“name”:”yanyan”})`
db.集合.find()：查询所有数据
`db.user.find()`
db.集合.findOne( ):查询第一个文件数据
db.集合.update({查询},{修改}):修改文件数据，第一个是查询条件，第二个是要修改成的值。
`db.user.update({"name":"yanyan"},{"name":"yanyan","age":"18"})`
db.集合.remove(条件)：删除文件数据，注意的是要跟一个条件。
`db.user.remove({“name”:”yanyan”})`
db.集合.drop( )：删除整个集合
db.dropDatabase( )：删除整个数据库
show collections:来查看数据库中的集合

<!-- 查询 -->

简单查询
`db.user.find({"skill.skillOne":"HTML+CSS"})`
筛选字段:false 和 true，也可以用 0 和 1 表示

```
db.workmate.find(
    {"skill.skillOne":"HTML+CSS"},
    {name:true,"skill.skillOne":true,_id:false}
)
```

不等修饰符：小于($lt)、小于等于($lte)、大于($gt)、大于等于($gte)、不等于(\$ne)
$in修饰符
$nin 修饰符:查询除了\$in 条件以为的指

```
db.workmate.find({age:{$in:[25,33]}},
    {name:1,"skill.skillOne":1,age:1,_id:0}
)
```

\$or 修饰符:用来查询多个键值的情况,或者

```
db.workmate.find({$or:[
    {age:{$gte:30}},
    {"skill.skillThree":'PHP'}
]},
    {name:1,"skill.skillThree":1,age:1,_id:0}
)
```

\$and 修饰符:用来查找几个 key 值都满足的情况

```
db.workmate.find({$and:[
    {age:{$gte:30}},
    {"skill.skillThree":'PHP'}
]},
    {name:1,"skill.skillThree":1,age:1,_id:0}
)
```

\$not 修饰符:用来查询除条件之外的值

```
db.workmate.find({
    age:{
        $not:{
            $lte:30,
            $gte:20
        }
    }
},
{name:1,"skill.skillOne":1,age:1,_id:0}
)
```

基本数组查询

```
db.workmate.find({interest:['画画','聚会','看电影']},
    {name:1,interest:1,age:1,_id:0}
)
db.workmate.find({interest:'看电影'},
    {name:1,interest:1,age:1,_id:0}
)
```

\$all-数组多项查询(and)

```
db.workmate.find(
    {interest:{$all:["看电影","看书"]}},
    {name:1,interest:1,age:1,_id:0}
)
```

\$in-数组的或者查询(or)

```
db.workmate.find(
    {interest:{$in:["看电影","看书"]}},
    {name:1,interest:1,age:1,_id:0}
)
```

\$size-数组个数查询

```
db.workmate.find(
    {interest:{$size:5}},
    {name:1,interest:1,age:1,_id:0}
)
```

\$slice-显示选项,显示最后一项，可以直接使用 slice:-1

```
db.workmate.find(
    {},
    {name:1,interest:{$slice:2},age:1,_id:0}
)
```

find 的参数使用方法:

- query：这个就是查询条件，MongoDB 默认的第一个参数。
- fields：（返回内容）查询出来后显示的结果样式，可以用 true 和 false 控制是否显示。
- limit：返回的数量，后边跟数字，控制每次查询返回的结果数量。
- skip:跳过多少个显示，和 limit 结合可以实现分页。
- sort：排序方式，从小到大排序使用 1，从大到小排序使用-1。
  `db.workmate.find({},{name:true,age:true,_id:false}).limit(0).skip(2).sort({age:1});`

  \$where 修饰符:this 指向的是 workmate（查询集合）本身

```
db.workmate.find(
    {$where:"this.age>30"},
    {name:true,age:true,_id:false}
)
```

### js

修改：使用\$set 修改器，用来修改一个指定的键值（key）
`db.user.update({"name":"yanyan"},{"$set":{age:18}})`
修改内嵌文档：可以属性的形式进行修改
`db.user.update({"name":"yanyan"},{"$set":{"skil.work":"web"}})`

\$unset 用于将 key 删除
`db.user.update({"name":"yanyan"},{"$unset":{age:''}})`

\$unset 用于将 key 删除
`db.user.update({"name":"yanyan"},{$unset:{"age":''}})`

\$inc 对数字进行计算
`db.user.update({"name":"yanyan"},{$inc:{"age":-2}})`
multi 选项:批量修改添加
`db.user.update({},{$set:{interset:[]}})`
upsert 选项:找不到值，直接插入这条数据
`db.user.update({name:'xiaoWang'},{$set:{age:20}},{upsert:true})`

\$push 追加数组/内嵌文档值
`db.user.update({name:'xiaoWang'},{$push:{interest:'draw'}})`

`db.user.update({name:'yanyan'},{$push:{"skill.skillFour":'draw'}})`

\$ne 查找是否存在,检查一个值是否存在，如果不存在再执行操作，存在就不执行
`db.user.update({name:'xiaoWang',"interest":{$ne:'playGame'}},{$push:{interest:'Game'}})`

$addToSet:升级版的$ne
`db.user.update({name:"xiaoWang"},{$addToSet:{interest:"readBook"}})`

\$each:批量追加
`var newInterset=["Sing","Dance","Code"]; db.user.update({name:"xiaoWang"},{$addToSet:{interest:{$each:newInterset}}})`

\$pop:删除数组值:只删除一次，并不是删除所有数组中的值。而且它有两个选项，一个是 1(从数组末端进行删除) 和-1(从数组开端进行删除)。
`db.user.update({name:'xiaoWang'},{$pop:{interest:1}})`
数组定位修改:使用 interest.int 的形式
`db.user.update({name:'xiaoWang'},{$set:{"interest.2":"Code"}})`
应答式写入
`db.runCommand()`
db.listCommands( ):查看所有的 Commad 命令
查看是否和数据库链接成功了,返回 ok：1 就代表链接正常。
`db.runCommand({ping:1})`
findAndModify:查找并修改

```
var myModify={
    findAndModify:"workmate",//所在集合
    query:{name:'JSPang'},//需要查询的条件/文档
    update:{$set:{age:18}},//没有这个值是否增加。
    new:true    //更新完成，需要查看结果，如果为false不进行查看结果,[boolean]返回更新前的文档还是更新后的文档。
    //sort: 进行排序
    //remove：[boolean]是否删除查找到的文档，值填写true，可以删除。
    //fields：需要返回的字段
}
var ResultMessage=db.runCommand(myModify);
printjson(ResultMessage)
```

<!-- 查询 -->

hasNext 循环结果：

```
var result = db.workmate.find() //声明变量result，并把查询结果赋值给result
//利用游标的hasNext()进行循环输出结果。
while(result.hasNext()){
    printjson(result.next())  //用json格式打印结果
}
```

forEach 循环:

```
var result = db.workmate.find() //声明变量result，并把查询结果赋值给result
//利用游标的hasNext()进行循环输出结果。
result.forEach(function(result){
    printjson(result)
})
```

<!-- 索引 -->

建立索引
`db.user.ensureIndex({username:1})`
查看索引
`db.user.getIndexes()`

指定索引查询（hint）：
`var rs= db.user.find({username:'7xwb8y3',randNum0:565509}).hint({randNum0:1});`
删除索引:
`db.user.dropIndex('randNum0_1');//索引的唯一ID`
全文索引查找 建立好了全文索引就可以查找了，查找时需要两个关键修饰符:

- \$text:表示要在全文索引中查东西。
- \$search:后边跟查找的内容。
  `db.info.find({$text:{$search:"programmer"}})`
  查找多个词,希望不查找出来有 drink 这个单词的记录，我们可以使用“-”减号来取消。
  `db.info.find({$text:{$search:"programmer family diary -drink"}})`
  转义符：
  `db.info.find({$text:{$search:"\"love PlayGame\" drink"}})`

<!-- 创建用户 -->

```
db.createUser({
    user:"yanyan",
    pwd:"123456",
    customData:{
        name:'岩岩',
        age:18,
    },
    roles:[
        {
            role:"readWrite",
            db:"company"
        },
        'read'
    ]
})
```

内置角色：
1、数据库用户角色：read、readWrite；
2、数据库管理角色：dbAdmin、dbOwner、userAdmin;
3、集群管理角色：clusterAdmin、clusterManager、clusterMonitor、hostManage；
4、备份恢复角色：backup、restore；
5、所有数据库角色：readAnyDatabase、readWriteAnyDatabase、userAdminAnyDatabase、dbAdminAnyDatabase
6、超级用户角色：root
7、内部角色：\_\_system
查找用户信息：
`db.system.users.find()`
删除用户：
`db.system.users.remove({user:"jspang"})`
建权：验证用户的用户名密码是否正确
`db.auth("jspang","123456")`
建权登录：
`mongod --auth`

`mongo -u yanyan -p 123456 127.0.0.1:27017/admin`

<!-- 数据备份 -->

```
mongodump
    --host 127.0.0.1
    --port 27017
    --out c:/Desktop
    --collection myCollections
    --db test
    --username yanyan
    --password 123456
```

`mongodump --host 127.0.0.1 --port 27017 --out D:/databack/`

<!-- 数据恢复 -->

```
mongorestore
    --host 127.0.0.1
    --port 27017
    --username username
    --password password
    <path to the backup>
```

`mongorestore --host 127.0.0.1 --port 27017 D:/databack/`
