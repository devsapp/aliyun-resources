#!/bin/bash
S_BIN=/Users/songluo/work/Serverless-Devs/bin/s

if [ $# -gt 0 ]; then
    echo "第一个参数为: $1"
    cd $1/examples && $S_BIN deploy && cd -
    exit 0
fi

# 获取当前目录下以 aliyun_ 开头的文件夹名字
folders=$(ls -d aliyun_* 2>/dev/null)

# 如果没有找到任何文件夹，则输出提示信息并退出
if [ -z "$folders" ]; then
  echo "没有找到以 aliyun_ 开头的文件夹"
  exit 1
fi

# 使用 for 循环遍历文件夹名字，并输出
for folder in $folders; do
    if [ "$folder" != "aliyun_base" ]; then
      echo "$folder is testing ..."
      cd $folder/examples && $S_BIN deploy && cd -
    fi
done