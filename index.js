
console.log('Hello there');
const config = require('./config');
const { urlList, duration, count } = config;
const puppeteer = require('puppeteer');
// 函数实现，参数单位秒；
const wait = (s) => {
  return new Promise(resolve => setTimeout(() => resolve(), 1000 * s));
};
const formatDate = (time, format = 'YYYY-MM-DD hh:mm:ss') => {
  let timeStamp = time;
  let formatStamp = format;
  if (typeof time === 'string') {
    timeStamp = time.replace(/-/g, '/');
  }
  if (typeof time === 'number') {
    timeStamp = time * 1000;
  }
  const date = new Date(timeStamp);

  const patch0 = (num) => (String(num).padStart(2, '0'));

  formatStamp = formatStamp.replace('YYYY', `${date.getFullYear()}`).replace('MM', patch0(date.getMonth() + 1))
    .replace('DD', patch0(date.getDate()))
    .replace('hh', patch0(date.getHours()))
    .replace('mm', patch0(date.getMinutes()))
    .replace('ss', patch0(date.getSeconds()));
  return formatStamp;
};
// 调用方法
const open = async () => {
  const time = formatDate(new Date(),'MM-DD hh:mm');
  const browser = await puppeteer.launch({
    headless: false,
    waitUntil: 'load',
    timeout: 0,
    ignoreHTTPSErrors: true,
  });
  let pageList = [];
  for (let i = 0; i < urlList.length; i ++) {
    pageList[i] = await browser.newPage();
    console.log('打开网页'+(i+1));
    await pageList[i].goto(urlList[i]);
    await pageList[i].waitForSelector('title');
    let title = await pageList[i].$eval('title', n => n.innerText);
    const playNum = await pageList[i].$eval('meta[itemprop="interactionCount"]', n => n.content);
    if(title.match(/《.*?》/)){
      title = title.match(/《.*?》/)[0];
    }else{
      title = title.replace(' - YouTube','');
    }
    console.log(time, title, '播放次数', playNum);
    
    setTimeout(async () => {
      const button = await pageList[i].$('.ytp-ad-skip-button');
      button && button.click();
    }, 5000);
  };
  await wait(duration);
  for (let i = 0; i < urlList.length; i ++) {
    await pageList[i].close();
  }
  await browser.close();
};
(async () => {
  for (let index = 0; index < count; index++) {
    console.log(`第${index+1}次打开浏览器`);
    open();
    await wait(duration);
  }
})();
