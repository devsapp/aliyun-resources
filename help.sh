#!/bin/bash

if [ $# -gt 1 ]; then
    echo "all args: $@"
    if [ "$1" = "build" ]; then
      cd $2 && npm run build && cd -
    elif [ "$1" = "publish" ]; then
      cd $2 && npm run build && s registry publish && cd -
    else
      cd $2/examples && s deploy && cd -
    fi
    exit 0
fi

echo "all args: $@"

folders=$(ls -d aliyun_* 2>/dev/null)
if [ -z "$folders" ]; then
  echo "没有找到以 aliyun_ 开头的文件夹"
  exit 1
fi

if [ "$1" = "build" ]; then
  for folder in $folders; do
      echo "$folder is building ..."
      cd $folder && npm run build && cd -
  done
fi

if [ "$1" = "format" ]; then
  for folder in $folders; do
      echo "$folder is formating ..."
      cd $folder && npm run format && cd -
  done
fi

if [ "$1" = "test" ]; then
  for folder in $folders; do
    if [ "$folder" != "aliyun_base" ]; then
      echo "$folder is testing ..."
      cd $folder/examples && s deploy && cd -
    fi
  done
fi

if [ "$1" = "publish" ]; then
  for folder in $folders; do
    if [ "$folder" != "aliyun_base" ]; then
      echo "$folder is publishing ..."
      cd $folder && npm run build && s registry publish && cd -
    fi  
  done
fi

if [ "$1" = "ut-test" ]; then
  for folder in $folders; do
    if [ "$folder" != "aliyun_base" ]; then
      echo "$folder is test ut ...."
      cd $folder  && npm run test && cd -
    fi
  done
fi