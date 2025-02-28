# 💕 爱情信笺 - 情人节礼物 💕

这是一个浪漫的数字情书集，可以展示您与爱人之间交换的信件。项目呈现为一个交互式网页，有信封动画和时间轴效果，采用了可爱的线条小狗和Hello Kitty风格设计。

## 特点

- 精美的信封动画，点击后打开展示内容
- 浪漫的时间轴展示您和爱人之间的信件历程
- 可爱的线条小狗和Hello Kitty风格设计
- 漂浮的心形和装饰元素，增添浪漫氛围
- 点击互动效果和可爱的音效
- 响应式设计，可在手机、平板和桌面设备上良好显示
- 简单易用，无需服务器即可部署

## 使用方法

### 快速开始

1. 克隆或下载此仓库
2. 用文本编辑器打开 `script.js` 文件
3. 在 `letters` 数组中替换示例信件为您和爱人之间实际的信件内容
4. 通过浏览器打开 `index.html` 查看效果

### 部署到GitHub Pages（免费托管）

1. 确保您已经创建了GitHub仓库：`git@github.com:Curtis-Jiang/Love.git`
2. 将所有文件添加到仓库中：

```bash
# 初始化Git仓库（如果尚未初始化）
git init

# 添加远程仓库
git remote add origin git@github.com:Curtis-Jiang/Love.git

# 添加所有文件
git add .

# 提交更改
git commit -m "初始提交：爱情信笺项目"

# 推送到GitHub
git push -u origin main
```

3. 在GitHub仓库页面，点击"Settings"（设置）
4. 在左侧菜单中找到"Pages"
5. 在"Source"部分，选择"main"分支，然后点击"Save"
6. 几分钟后，您的网站将在 `https://curtis-jiang.github.io/Love/` 上线

## 自定义

### 修改信件内容

在 `script.js` 文件中找到 `letters` 数组，按照以下格式添加或修改信件：

```javascript
{
    date: '日期，例如：2022年2月14日',
    content: `信件内容，可以使用<br>标签添加换行`,
    icon: 'https://i.imgur.com/8kMfqIr.png' // 可选：Hello Kitty风格图标
}
```

### 修改颜色和样式

在 `styles.css` 文件中修改 `:root` 部分的变量来改变网站的主题颜色：

```css
:root {
    --primary-color: #ff85a2; /* 主要颜色 */
    --secondary-color: #ffc0cb; /* 次要颜色 */
    --background-color: #fff0f5; /* 背景颜色 */
    --text-color: #5a5a5a; /* 文字颜色 */
    --letter-bg: #fff; /* 信件背景颜色 */
    --envelope-color: #ffc0cb; /* 信封颜色 */
    --envelope-flap: #ff85a2; /* 信封盖颜色 */
    --accent-color: #87cefa; /* 强调颜色 */
    --border-color: #c71585; /* 边框颜色 */
}
```

### 添加照片

您可以在信件内容中添加照片，方法如下：

```javascript
content: `亲爱的，<br><br>
          今天是我们在一起的第一个情人节，这是我们一起的照片：<br>
          <img src="photos/your-photo.jpg" style="max-width:100%; margin:10px 0; border-radius:10px; border:2px solid var(--primary-color);"><br>
          希望未来的每一天，我们都能一起度过。<br><br>
          爱你的我`
```

将照片放在项目的 `photos` 文件夹中。

### 修改背景音乐

1. 在 `script.js` 文件中找到 `addBackgroundMusic()` 函数
2. 修改 `audio.src` 为您喜欢的音乐URL

```javascript
audio.src = 'https://example.com/your-romantic-music.mp3'; // 替换为您喜欢的音乐URL
```

## 进阶自定义（需要编程知识）

- 添加更多的互动元素，如点击信件显示全屏效果
- 添加密码保护，让这份礼物更加私密
- 添加更多的动画和过渡效果
- 添加照片幻灯片或照片墙功能

## 技术详情

- 纯HTML，CSS和JavaScript实现
- 不依赖任何外部框架或库
- 使用CSS动画和3D变换实现信封效果
- 使用JavaScript DOM操作创建动态时间轴
- 响应式设计适配各种设备

希望这个礼物能为您和爱人带来美好的回忆和感动！祝您情人节快乐！ 