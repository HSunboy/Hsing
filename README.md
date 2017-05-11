## 开始
```
添加配置文件到项目根目录
hsing.conf.js
```


## 格式：
```javascript
module.exports={
    entry:你的入口,
    sourceMap:true／false,
    vendor:公共第三方包数组，
    template:模版html路径
}
```




## 使用方法：

### 添加script:
```javascript
{
    'hsing-build':'hsing-build'
}
```



## 更新：
```
0.0.12:去除win32限制
0.0.15:加入联机构建
0.0.17:添加本地调试
0.0.18:更换核心，添加自定义loader
0.0.19:更新模版引擎
0.0.23:bug修复
```
