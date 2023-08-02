通过该组件配合 ros-transformer 组件，快速通过 ROS 完成日志 project 部署

- [测试](#测试)
- [完整配置](#完整配置)
  - [参数详情](#参数详情)
- [命令相关](#命令相关)
  - [Deploy 命令](#Deploy命令)
  - [Remove 命令](#Remove命令)

## 测试

1. 在本地创建`s.yaml`

    ```yaml
    edition: 3.0.0 
    name: test-sls-pro
    access: test 

    resources:
      xl_test_project_1: 
        component: aliyun_sls_project
        props:
          name: xl-test-project
          description: "xiliu test log project"
    ```

2. 可以通过`s deploy`快速进行部署：

    注意：该组件只是完成向 ROS 模版语法的转变， 需要将自己的输出借助 ros-transformer 组件完成 ros 的部署， 比如

    ```yaml
    edition: 3.0.0
    name: testing-stack
    access: "xiliu"

    resources:
      xl_test_project_1: 
        component: aliyun_sls_project
        props:
          name: xl-test-project
          description: "xiliu test log project"

      ros-res:
        component: ros-transformer
        props:
          region: ${vars.region}
          name: test
          ref:
            xl_test_project_1: ${xl_test_project_1.output.resource}
    ```

### 参数详情

参数详情见[publish.yaml](publish.yaml) 中 Properties 中的定义

## 命令相关

- [Deploy 命令](#Deploy命令)
- [Remove 命令](#Remove命令)

### Deploy 命令


| 参数全称  |  参数缩写  | Yaml 模式下必填 | 参数含义|                                 
|-------|---------------------|---------------------|---------------------|
| assume-yes | y        | 选填            | 在交互时，默认选择`y`|
| access     | a        | 选填            | 本次请求使用的密钥，可以使用通过[config 命令](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#config-add-命令) 配置的密钥信息，以及[配置到环境变量的密钥信息](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#通过环境变量配置密钥信息) |
| debug      | -        | 选填            | 打开`debug`模式，将会输出更多日志信息|
| help       | h        | 选填            | 查看帮助信息|

### Remove 命令

空指令