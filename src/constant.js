/*展示金额规则*/
function showMoney(money){
  const regexp = /(?:\.0*|(\.\d+?)0+)$/;
  //对应整数部分扩展单位
  let cnIntUnits = new Array('', '万', '亿', '兆');
  //金额整数部分
  let integerNum;
  //金额小数部分
  let decimalNum;
  //最大处理的数字
  let maxNum = 999999999999999.99;
  //分离金额后用的数组，预定义
  let parts;
  if (money === '') {
    return '';
  };
  money = parseFloat(money);
  if (money >= maxNum) {
    //超出最大处理数字
    return '1000兆';
  }
  if (money === 0) {
    return money;
  }
  //转换为字符串
  money = money.toString();
  if(money.indexOf('.') === -1){
    integerNum = money;
    decimalNum = '';
  }else{
    parts = money.split('.');
    integerNum = parts[0];
    decimalNum = parts[1].substr(0, 4);
  }
  //获取整型部分转换
  if (Number(integerNum) > 0) {
    let IntLen = integerNum.length;
    let q;
    let k = IntLen%4;
    if(k===0){
      q = Math.floor(IntLen/4)-1;
    }else{
      q = Math.floor(IntLen/4)
    }
    let p = q*4;
    let n = integerNum.slice(IntLen-p)+decimalNum;
    let frontNum = integerNum.slice(0,IntLen-p);//放在前面的整数位数
    let endNum = n.slice(0,2);//小数点后两位
    let numStr = frontNum + '.' + endNum;
    let showNum = numStr.replace(regexp,'$1')+cnIntUnits[q];
    return showNum
  }else{
    let endZeroNum = decimalNum.slice(0,2);//小数点后两位
    let numZeroStr = integerNum + '.' + endZeroNum;
    let showZeroNum = numZeroStr.replace(regexp,'$1');
    return showZeroNum
  }
}
function showTime(time){//默认date格式为字符串"2018-06-22 19:50:09"
  let distanceTime;

  let seconds_of_1minute = 60;                    //一分钟
  let seconds_of_30minutes = 30 * 60;             //半小时
  let seconds_of_1hour = 60 * 60;                 //一小时
  let seconds_of_1day = 24 * 60 * 60;             //一天
  let seconds_of_7day = seconds_of_1day * 7;      //一周
  let seconds_of_15day = seconds_of_1day * 15;    //半个月
  let seconds_of_30day = seconds_of_1day * 30;    //一个月
  let seconds_of_6mouths = seconds_of_30day * 6;  //半年前
  let seconds_of_1year = seconds_of_30day * 12;   //一年前
  let ChinaDay = ['一','两','三','四','五','六','七','八','九','十','十一','十二'];

  let minTime = time.replace(new RegExp("-","gm"),"/");
  let startTime = (new Date(minTime)).getTime();//后台给的时间转换毫秒数
  let endTime = new Date().getTime();//获取现在时间的毫秒数
  let processTime = (endTime - startTime)/1000;
  if(Math.floor(processTime/seconds_of_1year)>0){
    distanceTime = Math.floor(processTime/seconds_of_1year) + '年前'
  }else if(Math.floor(processTime/seconds_of_6mouths)>0){
    distanceTime = '半年前'
  }else if(Math.floor(processTime/seconds_of_30day)>0){
    distanceTime = ChinaDay[Math.floor(processTime/seconds_of_30day)-1] + '个月前'
  }else if(Math.floor(processTime/seconds_of_15day)>0){
    distanceTime = '半个月前'
  }else if(Math.floor(processTime/seconds_of_7day)>0){
    distanceTime = ChinaDay[Math.floor(processTime/seconds_of_7day)-1] + '周前'
  }else if(Math.floor(processTime/seconds_of_1day)>0){
    distanceTime = ChinaDay[Math.floor(processTime/seconds_of_1day)-1] + '天前'
  }else if(Math.floor(processTime/seconds_of_1hour)>0){
    distanceTime = Math.floor(processTime/seconds_of_1hour) + '个小时前'
  }else if(Math.floor(processTime/seconds_of_30minutes)>0){
    distanceTime = '半小时前'
  }else if(Math.floor(processTime/seconds_of_1minute)>0){
    distanceTime = Math.floor(processTime/seconds_of_1minute) + '分钟前'
  }else{
    distanceTime = "刚刚"
  }

  return distanceTime
}
const constant = {
    //baseUrl:'http://192.168.1.254:8070/zuul/ajgsapp',//有token
    //baseUrl:'http://192.168.1.254:8080/ajgsapp', //开发环境
    //baseUrl:'http://120.78.199.132:8080/ajgsapp',//*18628973363  988327*/ //测试环境
    //baseUrl:'http://192.168.1.148:8080',//思维
    //baseUrl:'http://192.168.1.240:8769/ajgsapp',//老衡
    //baseUrl:'https://apitest.godteam.net',//测试
    //baseUrl:'http://192.168.1.12:8080',//廖宏宇
    
    // baseUrl:'https://zuul.ajgs.cn/ajgsapp',//正式鉴权
    // wxRzUrl:'https://m.ajgs.cn/',
    // codeUrl:'https://m.ajgs.cn',
    
    baseUrl:'https://zuultest.godteam.net/ajgsapp',//鉴权测试
    wxRzUrl:'https://yqltest.godteam.net/',
    codeUrl:'https://yqltest.godteam.net',
    convertCurrency:showMoney,   
    showTime:showTime
};
export default constant;