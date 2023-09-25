## 简介

假设我有如下场景

![](https://img.alicdn.com/imgextra/i4/O1CN01FGYh0O1BzpZiqUkPc_!!6000000000017-0-tps-1434-272.jpg)

除了 fc 组件可以创建 fc 资源外， 另外的 oss bucket 和 ots instance 和 table 无法创建， 因此我们有 ros 组件借助 ros 的能力完成部署，但是对用户要求较高，需要学习了解 ROS 语法， 并且 ROS 的驼峰语法和 s.yaml 的语法风格不一致。为了实现对用户简单易上手，体感一致， 我们定义了自己的组件， 这些组件会将对应的属性转为 ROS 的属性， 最后将这些组件的 output 中的 ros 语法合并成一个 ros template， 调用 ROS 组件， 完成非 FC 资源的 IAC 部署。

比如:

```yaml
edition: 3.0.0
name: testing-stack
access: "xiliu"

resources:
  xl_bucket1:
    component: aliyun_oss_bucket
    props:
      bucket: xl_bucket1
      acl: private

  ots-inst1:
    component: aliyun_ots_instance
    props:
      name: ots-inst1
      instance_type: HighPerformance

  app-table:
    component: aliyun_ots_table
    props:
      instance_name: ${resources.ots-inst1.props.name}
      table_name: app-table
      primary_key:
        - type: String
          name: id

  ros-res:
    component: ros-transformer
    props:
      region: ${vars.region}
      name: test
      ref:
        xl_bucket1: ${resources.xl_bucket1.output.resource}
        ots-inst1: ${resources.ots-inst1.output.resource}
        app-table: ${resources.app-table.output.resource}
```

更加复杂示例可以参考[s-example.yaml](ros_transformer/examples/s.yaml)

## 如何开发一个新的类似组件

比如开发新的阿里云产品 mns topic

1. 可以直接 `copy -r aliyun_oss_bucket aliyun_mns_topic`
2. 将 publish.yaml 相关属性更正为 mns topic， 其中最重要的属性值是 Properties

   - 建议直接参考 terraform https://registry.terraform.io/providers/aliyun/alicloud/latest/docs/resources/mns_topic
   - 从 terraform 挑选出必要重要参数即可，并且这个参数在 ROS 有对应的值

3. 修改函数代码:
   - 将 impl 中的 oss.ts 重命名为 mns_topic.ts, 同时修改 mns_topic.ts 中 class 名字
   - 修改 index.ts 中引入的类名以及相关代码
   - 修改 mns_topic.ts 中的 getRosParamMap（完成 s.yaml 属性 key 到 ROS 属性 key 的转变）和 getRosInitTemplateResource

> 有特殊情况的可以参考, 比如:
>
> - terraform 中 value 值和 ROS 的值不一样的情况 [ots_instance](./aliyun_ots_instance/src/impl/instance.ts)
> - kafka 实例属性在 ROS 那边有一个新的属性调整 [kafka_instance](./aliyun_kafka_instance/src/impl/kafka_instance.ts)

4. 开发调试

   在 aliyun_mns_topic 目录， 首先执行

   `$ npm run build`

   如果一直动态调试， 可以开一个终端执行， 保持代码更新之后即时编译， 不需要每次重新执行 npm run build

   `$ npm run watch`

   之后在新终端直接进入 example, 将 s.yaml 中属性值改成 publish.yaml 中定义的对应这个云产品的属性值， 直接执行

   `$ s deploy`

   最后修改 `__tests__` 中的测试文件代码， 在 aliyun_mns_topic 目录执行 `npm run test`， test pass

   **Tips:** 比如可以先进入 aliyun_oss_bucket 目录先完成这个体验
