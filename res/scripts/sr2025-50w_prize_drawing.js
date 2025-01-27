// 星铁50万星穹抽奖最优解计算器
// By/ kdxiaoyi
// Copyright (C) 2025, kdxiaoyi. All right reserved.
// License see @ http://kdx233.github.io/licen

const n/*日均参与人数*/=12000000;
var fr/*“失败”星琼数量*/=100;
var precision/*每个组合尝试多少次，越大越准但越慢*/
  =10000000;

function /*此函数由AI参与优化防止爆栈*/ generate(n) {
  let way2 = [];
  let queue = [[]]; // 使用队列来存储当前的路径
  while (queue.length > 0) {
  let current = queue.shift(); // 从队列中取出一个路径
  if (current.length === n) {
    way2.push(current); // 如果路径长度等于n，将其加入结果数组
  } else {
    queue.push([...current, 0]); // 将0加入路径并加入队列
    queue.push([...current, 1]); // 将1加入路径并加入队列
  };
  };
  return way2;
};
let way/*0表示此日不参与，1表示此日参与*/ = generate(7);
console.log("已确定全部选择组合",way);
function play(choice) {
  let r=100;/*无论如何选择都会送100星穹*/
  let big_prized=false;
  choice.forEach((element,index)=>{
  //  console.log(element,index)
    if (element==0) {r+=100;return;};
    let v2=Math.floor(Math.random() * (10000000 - 0 )) + 0;
    let day_v=0;
    if (0<=index<=2) {day_v=2;};
    if (3<=index<=5) {day_v=3;};
    if (index==6) {day_v=5;};
  //  console.log(day_v)
    let v1=Math.floor(Math.random() * (n - 0 )) + 0;
    if ((v1<=day_v) && (v1!=0) && (!big_prized)) {
      r+=500000;/*成为万万里挑一的巨星*/
      big_prized=true;
      console.warn(`中大奖位于${element}组合的第${index+1}天`,v1,day_v)
    } else {
      /*今日未中头奖进入普池*/
      if ((v2<9000000)&&(v2>=8000000)) {
        /*600星琼*/r+=600;
  //      console.log(`600奖位于${element}组合的第${index+1}天`,v2)
      } else {
        /*50星琼*/r+=50;
  //      console.log(`50奖位于${element}组合的第${index+1}天`,v2)
      };
    };
  });
  return r;
};
var way_r=Array(way.length);
way.forEach((element,index)=>{
  let frequency = {};
  for (let i = 0; i < precision; i++) {
    let result = play(element);
    if (frequency[result]) {
      frequency[result]++;
    } else {
      frequency[result] = 1;
    };
  };
  way_r[index]=frequency;
});
var way_r2=Array(way_r.length);
way_r.forEach((element,index)=>{
  let ev=0;
  for (let key in element) {
    ev+=key*(element[key]/precision);
  };
  way_r2[index]=ev;
});
/*AI帮我写的寻找极值*/function findMaxMinIndices(n){if(0===n.length)return{maxIndices:[],minIndices:[]};let e=n[0],i=n[0],s=[0],t=[0];for(let c=1;c<n.length;c++)n[c]>e?(e=n[c],s=[c]):n[c]===e&&s.push(c),n[c]<i?(i=n[c],t=[c]):n[c]===i&&t.push(c);return{maxIndices:s,minIndices:t}}
var indices=findMaxMinIndices(way_r2);
var output=["",""];
indices.maxIndices.forEach((element)=>{
  output[0]+=`${way[element]}\n`;
});
indices.minIndices.forEach((element)=>{
  output[1]+=`${way[element]}\n`;
});
console.error(`模拟完成。\n\n以下方式获取星琼期望值最高：\n${output[0]}\n\n以下方式获取星琼期望值最低：\n${output[1]}`)