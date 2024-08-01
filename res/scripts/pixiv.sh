#!/bin/bash

# 发布于https://kdxiaoyi.top/blogs/2024/24
# Copyright (C) 2024, kdxiaoyi.
# All right reserved.
# 详见https://rs.kdxiaoyi.top/licen.htm

# 帮助文本
if [ "1$(echo "$1" | grep "h")" != "1" ];then
  echo Pixiv 插画批量下载
  echo Beta 1.0.0
  echo "
 用法：
 pixiv.sh [id] [proxy] [getM]
     id - 插画车牌号：懂得都懂
  proxy - 代理模式：快速选择指定序号代理
   getM - 获取模式：存在此参数则下载全部，否则询问
 任何不合适的参数值都会在执行时重新请求
 下载的文件将保存在命令pwd获取到的目录下"
  exit 0
  fi

# ID获取
id=$1
path=$2
echo Pixiv 插画批量下载喵
if [[ $id =~ ^[0-9]+$ ]];then echo;else
  echo
  read -p "插画编号> " id
  if [[ $id =~ ^[0-9]+$ ]];then echo;else
      echo  → 那个编号…不可用的主人！输一个有效编号吧qaq~
      exit 400
    fi
  fi

# 代理模式
if [ "testr$(echo "$2" | tr -cd "[0-9]" )" != "testr" ];then proxy="$(echo "$2" | tr -cd "[0-9]" )"
else 
  echo " [1] re 代理（默认）"
  echo " [2] nl 代理"
  echo " [3] cat 代理"
  read -n 1 -p "主人想选择哪个代理服务呢喵~> " proxy
  echo
  fi
if [ 1$proxy -eq 13 ];then proxy=https://pixiv.cat/
  elif [ 1$proxy -eq 12 ];then proxy=https://pixiv.nl/
  else proxy=https://pixiv.re/
  fi
  
# 请求插画数据
echo URI: "${proxy}${id}.png"
echo 本喵正在努力请求…
echo
          #可以压缩到一行但是为了维护考虑就不压了
all=$(curl -s -L "${proxy}${id}-2147483649.png")
deleted=$(echo "$all" | grep -Poi "(deleted)|(restricted)")
all=$(echo "$all" | grep -Poi "作品只有[.\s][0-9]*")
all=$(echo "$all" | tr -cd "[0-9]" )

# 判断插画状态
if [ $(curl -L -I -m 10 -o /dev/null -s -w %{http_code} "${proxy}${id}-2147483649.png") -ne 404 ];then 
  echo  → 主人，坏！${id}不是一个有效的车牌号啊呜~
  exit 400
elif [ "testr$deleted" != "testr" ];then
  echo  → 主人真是变态…那里…那个…会…作品${id}不存在、已被删除或无法下载
  exit 404
  fi

# 下载模式选择
if [ "testr$3" == "testr" ];then 
      #没有检测到参数3则询问用户
  if [ "a$all" == "a" ];then 
      #单插图询问
    echo " → 作品${id}含有1张插图
 主人是想怎么狠狠的下载呢？
 [1] 下载（默认）
 [0] 取消下载"
    read -n 1 -p "选择下载方式> " choice
    if [ "a$choice" == "a0" ];then exit 0;else mode=all;fi
    echo
    else
      #多插图询问
    echo " → 作品${id}含有${all}张插图
 主人是想怎么狠狠的下载呢？
 [1] 全部下载（默认）
 [2] 指定下载部分
 [0] 取消下载"
    read -n 1 -p "选择下载方式> " choice
    if [ "a$choice" == "a0" ];then exit 0;
    elif [ "a$choice" == "a2" ];then mode=part;
    else 
      mode=all
      fi
    fi
    echo
      #问询部分结束
  echo
  else
  mode=all
  fi

# 下载
cd $(pwd)
if [ "$mode" == "part" ];then
      #选择部分下载
  echo 目标路径：$(pwd)/${id}/*.png
  echo todo:暂不支持
  elif [ "a$all" == "a" ];then
      #全部下载（单张）
  echo 目标路径：$(pwd)/${id}.png
  curl -L --output "$(pwd)/${id}.png" "${proxy}${id}.png"
  else
      #全部下载（多张）
  echo 目标路径：$(pwd)/${id}/*.png
  echo
  mkdir "$(pwd)/${id}/"
  let i=0
  while true;do
    i=$(($i+1))
    echo ✲ 正在下载第${i}张，共计${all}张…
    curl -L --output "$(pwd)/${id}/$i.png" "${proxy}${id}-$i.png"
    if [ $i -eq $all ];then break;fi
    done
  fi
echo
echo 下载已完成了喵~
echo 无论主人是想prpr还是鉴赏细节，都可以准备好纸巾了呢~
echo 记得关注下原作者哦！
echo https://space.bilibili.com/1987247870
exit 0