const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hashMap = xObject || [
  { logo: "D", url: "https://developer.mozilla.org/zh-CN/docs/Web/HTML" },
  { logo:"F",url:"https://www.figma.com/"},
  { logo: "G",url:"https://github.com/"},
  { logo: "I", url: "https://www.iconfont.cn" }
];
// 剔除网站前缀
const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, ""); // 删除url/后的内容
  // 用到了正则表达式 推荐看三十分钟学完正则表达式
};

const render = () => {
  //把除了最后一个li给全部删除，进行重新渲染
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
      <div class="site">
        <div class="logo">${node.logo}</div>
        <div class="link">${simplifyUrl(node.url)}</div>
        <div class="close">
          <svg class="icon">
            <use xlink:href="#icon-close"></use>
          </svg>
        </div>
      </div>
    </li>`).insertBefore($lastLi);
    $li.on("click", () => {
      window.open(node.url,'_self');
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation(); // 阻止冒泡
      hashMap.splice(index, 1);
      // 删除hashMap里的一项 利用index为下标
      render();
    });
  });
};

render();

$(".addButton").on("click", () => {
  let url = window.prompt("请问你要添加的网址是啥？");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  console.log(url);
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    // UpperCase将他变为大写 也可以在css中修改 text-transform: uppercase;
    url: url,
  });
  render();
});

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  // stringify将对象转变为字符串
  localStorage.setItem("x", string);
  //在本地存一个x的字符串
};
// 键盘输入打开
$(document).on("keypress", (e) => {
  const { key } = e;
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url,'_self');
    }
  }
});
