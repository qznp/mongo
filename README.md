# mongodb

_打开方式：先管理员 cmd(shift+ctrl+enter)命令行一个"mongob"，然后再管理员 cmd 命令行一个"mongo"。_

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
