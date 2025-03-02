document.addEventListener('DOMContentLoaded', function() {
    // 添加调试信息
    console.log('页面加载完成，开始初始化...');
    
    // 加载动画和进度条
    const pageLoader = document.getElementById('page-loader');
    const progressBar = document.getElementById('progress-bar');
    
    // 更新进度条
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress > 100) progress = 100;
        progressBar.style.width = progress + '%';
        
        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                pageLoader.classList.add('hidden');
                setTimeout(() => {
                    pageLoader.remove();
                    console.log('加载动画已移除');
                }, 500);
            }, 500);
        }
    }, 200);
    
    // 主要元素
    const envelope = document.getElementById('envelope');
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainContent = document.getElementById('main-content');
    const mobileNav = document.getElementById('mobile-nav');
    const musicToggle = document.getElementById('music-toggle');
    const backgroundMusic = document.getElementById('background-music');
    
    // 信件容器
    const myLettersContainer = document.getElementById('my-letters');
    const yourLettersContainer = document.getElementById('your-letters');
    
    // 照片墙容器
    const galleryContainer = document.querySelector('.gallery-container');
    
    // 灯箱元素
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxVideo = document.getElementById('lightbox-video');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    
    // 内容区域
    const contentSections = document.querySelectorAll('.content-section');
    
    // 标签页按钮
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    // 全局变量
    let photos = [];
    let currentPhotoIndex = 0;
    let backgroundImages = [];
    
    // 点击信封事件
    envelope.addEventListener('click', function() {
        console.log('信封被点击，开始打开动画');
        this.querySelector('.envelope').classList.add('open');
        
        // 播放可爱的音效
        playSound('https://www.soundjay.com/buttons/sounds/button-09.mp3');
        
        // 延迟显示主内容
        setTimeout(() => {
            welcomeScreen.style.opacity = '0';
            setTimeout(() => {
                welcomeScreen.style.display = 'none';
                mainContent.style.display = 'block';
                mobileNav.style.display = 'flex';
                
                setTimeout(() => {
                    mainContent.classList.add('visible');
                    console.log('开始加载内容...');
                    loadContent();
                    
                    // 默认激活第一个部分
                    contentSections[0].classList.add('active');
                    document.querySelector('.nav-links li').classList.add('active');
                    document.querySelector('.nav-item').classList.add('active');
                    
                    // 添加装饰元素
                    addDecorativeElements();
                    
                    // 自动播放背景音乐
                    // backgroundMusic.play().catch(e => console.log("背景音乐播放失败:", e));
                }, 100);
            }, 500);
        }, 1500);
    });
    
    // 导航点击事件
    document.querySelectorAll('.nav-links li, .nav-item').forEach(item => {
        item.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            console.log('导航切换至:', targetSection);
            
            // 移除所有active类
            document.querySelectorAll('.nav-links li, .nav-item').forEach(el => el.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
            
            // 添加active类到当前选中项和对应内容
            document.querySelectorAll(`[data-section="${targetSection}"]`).forEach(el => el.classList.add('active'));
            document.getElementById(targetSection).classList.add('active');
            
            // 播放音效
            playSound('https://www.soundjay.com/buttons/sounds/button-19.mp3');
        });
    });
    
    // 标签切换事件
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            console.log('标签切换至:', tabId);
            
            // 移除所有active类
            tabButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            
            // 添加active类到当前选中项和对应内容
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
            
            // 播放音效
            playSound('https://www.soundjay.com/buttons/sounds/button-10.mp3');
        });
    });
    
    // 背景音乐控制
    musicToggle.addEventListener('click', function() {
        if (backgroundMusic.paused) {
            backgroundMusic.play().then(() => {
                this.classList.add('playing');
                this.innerHTML = '<i class="fas fa-music"></i>';
                console.log('背景音乐开始播放');
            }).catch(e => console.log("背景音乐播放失败:", e));
        } else {
            backgroundMusic.pause();
            this.classList.remove('playing');
            this.innerHTML = '<i class="fas fa-music-slash"></i>';
            console.log('背景音乐已暂停');
        }
    });
    
    // 关闭灯箱
    closeLightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
        lightboxVideo.pause();
    });
    
    // 点击灯箱背景关闭
    lightbox.addEventListener('click', function(e) {
        if (e.target === this) {
            lightbox.classList.remove('active');
            lightboxVideo.pause();
        }
    });
    
    // ESC键关闭灯箱
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            lightboxVideo.pause();
        }
    });
    
    // 播放音效函数
    function playSound(url) {
        const audio = new Audio(url);
        audio.volume = 0.3;
        audio.play().catch(e => {
            console.log("音频播放失败:", e);
        });
    }
    
    // 加载内容函数
    async function loadContent() {
        try {
            console.log('开始加载信件...');
            // 加载信件
            await loadLetters();
            
            console.log('开始加载照片墙...');
            // 加载照片墙
            loadGallery();
            
            console.log('开始加载时间轴...');
            // 加载时间轴
            loadTimeline();
            
            console.log('所有内容加载完成');
        } catch (error) {
            console.error('内容加载失败:', error);
            // 使用示例数据
            useExampleContent();
        }
    }
    
    // 从MD文件加载信件
    async function loadLetters() {
        try {
            // 尝试直接使用硬编码的文件列表，避免fetch请求
            console.log('使用硬编码的文件列表');
            const files = [
                "致璟涵小姐.md",
                "TO_安定剂.md",
                "TO_21首.md",
                "TO_猫狗.md",
                "TO_onlyone.md",
                "考试规划两则.md",
                "考试规划一则.md",
                "新鲜感.md",
                "梦.md",
                "念你千千万万.md",
                "小狗与姐姐.md",
                "西安随笔.md",
                "我爱你.md",
                "表白.md",
                "新年快乐.md",
                "葡萄成熟时.md",
                "矛盾一则.md",
                "两人走进的过程.md",
                "情人节随笔2️⃣.md",
                "情人节随笔一则.md",
                "情人节特辑.md",
                "香港随笔1.md",
                "小猫🐱小狗🐶.md",
                "璟涵的第一次未来规划.md",
                "见面前的最后一封.md",
                "第一次约会计划.md",
                "恋爱第一课.md"
            ];
            
            console.log(`找到 ${files.length} 个文件`);
            
            // 初始化计数器
            let successCount = 0;
            let errorCount = 0;
            
            // 处理每个信件文件
            for (const file of files) {
                try {
                    // 跳过非MD文件和图片文件
                    if (!file.endsWith('.md')) continue;
                    
                    console.log(`处理文件: ${file}`);
                    const isYourLetter = file.startsWith('TO_');
                    
                    try {
                        // 尝试获取文件内容
                        const fileResponse = await fetch(`doc/${file}`);
                        
                        if (!fileResponse.ok) {
                            console.warn(`无法获取文件 ${file}, 状态码: ${fileResponse.status}`);
                            errorCount++;
                            continue;
                        }
                        
                        let content = await fileResponse.text();
                        
                        // 解析日期 - 通常在第一行
                        let date = '';
                        const firstLine = content.split('\n')[0].trim();
                        if (/^\d+\.\d+(\.\d+)?$/.test(firstLine)) {
                            date = parseDate(firstLine);
                            // 移除第一行
                            content = content.substring(content.indexOf('\n') + 1).trim();
                        }
                        
                        // 创建信件卡片
                        const letterCard = createLetterCard(file, date, content);
                        
                        // 添加到相应容器
                        if (isYourLetter) {
                            yourLettersContainer.appendChild(letterCard);
                        } else {
                            myLettersContainer.appendChild(letterCard);
                        }
                        
                        successCount++;
                    } catch (fileError) {
                        console.error(`处理文件 ${file} 时出错:`, fileError);
                        errorCount++;
                    }
                } catch (itemError) {
                    console.error('处理单个信件时出错:', itemError);
                    errorCount++;
                }
            }
            
            console.log(`成功加载 ${successCount} 个信件，失败 ${errorCount} 个`);
            
            // 如果没有成功加载任何信件，抛出错误
            if (successCount === 0) {
                throw new Error('没有成功加载任何信件');
            }
            
            // 按日期排序信件
            sortLettersByDate(myLettersContainer);
            sortLettersByDate(yourLettersContainer);
            
        } catch (error) {
            console.error('加载信件失败:', error);
            // 使用示例信件
            useExampleLetters();
        }
    }
    
    // 解析日期字符串
    function parseDate(dateStr) {
        // 尝试解析各种日期格式
        if (/^\d+\.\d+$/.test(dateStr)) {
            // 格式: 1.4
            const [month, day] = dateStr.split('.').map(Number);
            return `${new Date().getFullYear()}年${month}月${day}日`;
        } else if (/^\d+\.\d+\.\d+$/.test(dateStr)) {
            // 格式: 2023.1.4
            const [year, month, day] = dateStr.split('.').map(Number);
            return `${year}年${month}月${day}日`;
        }
        
        // 如果无法解析，返回原字符串
        return dateStr;
    }
    
    // 创建信件卡片
    function createLetterCard(filename, date, content) {
        const card = document.createElement('div');
        card.className = 'letter-card';
        
        // 标题通常是第一行或文件名
        let title = filename.replace('.md', '').replace('TO_', '');
        const lines = content.split('\n');
        if (lines.length > 0 && lines[0].trim()) {
            // 如果第一行不是日期，使用第一行作为标题
            title = lines[0].trim().replace(/[:#\-]/g, '');
        }
        
        // 简短预览
        let preview = content;
        if (preview.length > 300) {
            preview = preview.substring(0, 300) + '...';
        }
        
        // 替换Markdown格式
        preview = preview.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                         .replace(/\*(.*?)\*/g, '<em>$1</em>')
                         .replace(/\n\n/g, '<br><br>')
                         .replace(/\n/g, '<br>');
        
        card.innerHTML = `
            <div class="letter-header">
                <div class="letter-date">${date || '未知日期'}</div>
                <div class="letter-title">${title}</div>
            </div>
            <div class="letter-preview">${preview}</div>
            <div class="read-more">阅读全文</div>
        `;
        
        // 点击阅读全文，打开完整信件
        card.querySelector('.read-more').addEventListener('click', () => {
            openFullLetter(title, date, content);
            playSound('https://www.soundjay.com/buttons/sounds/button-28.mp3');
        });
        
        return card;
    }
    
    // 按日期排序信件
    function sortLettersByDate(container) {
        const cards = Array.from(container.children);
        
        cards.sort((a, b) => {
            const dateA = a.querySelector('.letter-date').textContent;
            const dateB = b.querySelector('.letter-date').textContent;
            
            // 尝试解析日期
            return parseDateForSort(dateB) - parseDateForSort(dateA);
        });
        
        // 清空容器并重新添加排序后的卡片
        container.innerHTML = '';
        cards.forEach(card => container.appendChild(card));
    }
    
    // 将日期字符串解析为时间戳用于排序
    function parseDateForSort(dateStr) {
        if (dateStr === '未知日期') return 0;
        
        // 尝试解析 "2023年1月4日" 格式
        const match = dateStr.match(/(\d+)年(\d+)月(\d+)日/);
        if (match) {
            const [_, year, month, day] = match;
            return new Date(year, month - 1, day).getTime();
        }
        
        return 0;
    }
    
    // 打开完整信件
    function openFullLetter(title, date, content) {
        console.log(`打开信件: ${title}`);
        // 创建灯箱样式的全屏信件
        const fullLetter = document.createElement('div');
        fullLetter.className = 'full-letter-container';
        
        // 替换Markdown格式
        content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                         .replace(/\*(.*?)\*/g, '<em>$1</em>')
                         .replace(/\n\n/g, '<br><br>')
                         .replace(/\n/g, '<br>');
        
        fullLetter.innerHTML = `
            <div class="full-letter">
                <span class="close-letter">&times;</span>
                <div class="letter-header">
                    <div class="letter-title">${title}</div>
                    <div class="letter-date">${date || '未知日期'}</div>
                </div>
                <div class="letter-body">${content}</div>
                <div class="letter-footer">
                    <div class="letter-stamp"></div>
                </div>
            </div>
        `;
        
        document.body.appendChild(fullLetter);
        
        // 动画效果
        setTimeout(() => fullLetter.classList.add('open'), 10);
        
        // 关闭按钮
        fullLetter.querySelector('.close-letter').addEventListener('click', () => {
            fullLetter.classList.remove('open');
            setTimeout(() => fullLetter.remove(), 300);
        });
        
        // 点击背景关闭
        fullLetter.addEventListener('click', e => {
            if (e.target === fullLetter) {
                fullLetter.classList.remove('open');
                setTimeout(() => fullLetter.remove(), 300);
            }
        });
    }
    
    // 加载照片墙
    function loadGallery() {
        console.log('加载照片墙');
        
        // 清空照片容器
        const galleryContainer = document.querySelector('.gallery-container');
        galleryContainer.innerHTML = '';
        
        // 模拟照片数据
        photos = [
            { type: 'image', url: 'photos/image.png', caption: '我们的美好时光' },
            { type: 'image', url: 'photos/image copy.png', caption: '美好的回忆' },
            { type: 'video', url: 'photos/84996_1740840651.mp4', caption: '有趣的瞬间' },
            { type: 'image', url: 'photos/image copy 2.png', caption: '一起度过的时光' },
            { type: 'image', url: 'photos/image copy 3.png', caption: '美好的回忆' },
            { type: 'image', url: 'photos/image copy 4.png', caption: '甜蜜时刻' },
            { type: 'image', url: 'photos/image copy 5.png', caption: '难忘的日子' },
            { type: 'image', url: 'photos/image copy 6.png', caption: '珍贵的时光' },
            { type: 'image', url: 'photos/image copy 7.png', caption: '美好回忆' },
            { type: 'image', url: 'photos/image copy 8.png', caption: '幸福的日子' },
            { type: 'image', url: 'photos/image copy 9.png', caption: '甜蜜瞬间' },
            { type: 'video', url: 'photos/77344_1740250598.mp4', caption: '一段美好的记忆' },
            { type: 'image', url: 'photos/image copy 10.png', caption: '美好的一天' }
        ];
        
        // 预加载所有照片
        photos.forEach(item => {
            if (item.type === 'image') {
                const img = new Image();
                img.src = item.url;
                img.onerror = () => {
                    console.warn(`照片加载失败: ${item.url}，使用备用图片`);
                    item.url = 'images/photo-placeholder.jpg';
                };
            }
        });
        
        // 创建全屏照片查看容器
        const fullscreenContainer = document.createElement('div');
        fullscreenContainer.className = 'fullscreen-photo-container';
        fullscreenContainer.innerHTML = `
            <div class="photo-wrapper">
                <img src="" alt="" class="fullscreen-photo">
                <video class="fullscreen-video" controls></video>
            </div>
            <div class="photo-caption"></div>
            <div class="photo-instruction">向下滑动查看下一张</div>
            <div class="close-fullscreen">&times;</div>
        `;
        galleryContainer.appendChild(fullscreenContainer);
        
        // 获取元素
        const photoWrapper = fullscreenContainer.querySelector('.photo-wrapper');
        const fullscreenPhoto = fullscreenContainer.querySelector('.fullscreen-photo');
        const fullscreenVideo = fullscreenContainer.querySelector('.fullscreen-video');
        const photoCaption = fullscreenContainer.querySelector('.photo-caption');
        const closeBtn = fullscreenContainer.querySelector('.close-fullscreen');
        
        // 关闭按钮事件
        closeBtn.addEventListener('click', () => {
            fullscreenContainer.classList.remove('active');
        });
        
        // 创建照片缩略图
        photos.forEach((item, index) => {
            try {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                
                if (item.type === 'image') {
                    galleryItem.innerHTML = `<img src="${item.url}" alt="${item.caption}">`;
                } else {
                    galleryItem.innerHTML = `
                        <video poster="${item.url.replace('.mp4', '.jpg')}" preload="none">
                            <source src="${item.url}" type="video/mp4">
                        </video>
                        <div class="video-indicator"><i class="fas fa-play"></i></div>
                    `;
                }
                
                galleryContainer.appendChild(galleryItem);
                
                // 点击打开全屏查看
                galleryItem.addEventListener('click', () => {
                    showFullscreenPhoto(index);
                });
                
                console.log(`添加照片/视频 ${index + 1}/${photos.length}`);
            } catch (error) {
                console.error(`处理照片/视频项 ${index} 时出错:`, error);
            }
        });
        
        // 显示全屏照片
        function showFullscreenPhoto(index) {
            currentPhotoIndex = index;
            const item = photos[index];
            
            // 重置显示
            fullscreenPhoto.style.display = 'none';
            fullscreenVideo.style.display = 'none';
            
            if (item.type === 'image') {
                fullscreenPhoto.src = item.url;
                fullscreenPhoto.style.display = 'block';
            } else {
                fullscreenVideo.innerHTML = `<source src="${item.url}" type="video/mp4">`;
                fullscreenVideo.style.display = 'block';
                fullscreenVideo.load();
                fullscreenVideo.play().catch(e => console.log("视频播放失败:", e));
            }
            
            photoCaption.textContent = item.caption;
            fullscreenContainer.classList.add('active');
        }
        
        // 添加滑动事件
        let touchStartY = 0;
        
        photoWrapper.addEventListener('touchstart', function(e) {
            touchStartY = e.touches[0].clientY;
        }, false);
        
        photoWrapper.addEventListener('touchmove', function(e) {
            e.preventDefault(); // 防止页面滚动
        }, false);
        
        photoWrapper.addEventListener('touchend', function(e) {
            const touchEndY = e.changedTouches[0].clientY;
            const diffY = touchStartY - touchEndY;
            
            // 向下滑动超过50px
            if (diffY < -50) {
                currentPhotoIndex = getRandomNextPhotoIndex();
                showFullscreenPhoto(currentPhotoIndex);
            }
        }, false);
        
        // 为非触摸设备添加鼠标滚轮事件
        photoWrapper.addEventListener('wheel', function(e) {
            if (e.deltaY > 0) {
                currentPhotoIndex = getRandomNextPhotoIndex();
                showFullscreenPhoto(currentPhotoIndex);
            }
        });
        
        // 添加键盘事件
        document.addEventListener('keydown', function(e) {
            if (fullscreenContainer.classList.contains('active')) {
                if (e.key === 'ArrowDown' || e.key === 'Space') {
                    currentPhotoIndex = getRandomNextPhotoIndex();
                    showFullscreenPhoto(currentPhotoIndex);
                } else if (e.key === 'Escape') {
                    fullscreenContainer.classList.remove('active');
                }
            }
        });
    }
    
    // 随机获取下一张照片索引
    function getRandomNextPhotoIndex() {
        if (photos.length <= 1) return 0;
        
        let nextIndex;
        do {
            nextIndex = Math.floor(Math.random() * photos.length);
        } while (nextIndex === currentPhotoIndex);
        
        return nextIndex;
    }
    
    // 加载时间轴
    function loadTimeline() {
        console.log('加载时间轴');
        const timeline = document.querySelector('.timeline');
        
        // 模拟时间轴数据
        const events = [
            { date: '第1天', title: '相遇', content: '我们的故事从这一天开始...' },
            { date: '第20天', title: '第一次约会', content: '我们一起度过了美好的时光...' },
            { date: '第50天', title: '难忘的旅行', content: '一起去了向往已久的地方...' },
            { date: '第75天', title: '特别的日子', content: '在这一天，我们...' },
            { date: '第100天', title: '百日纪念', content: '感谢有你，这一百天...' }
        ];
        
        // 创建时间轴项目
        events.forEach((event, index) => {
            try {
                const item = document.createElement('div');
                item.className = 'timeline-item';
                
                item.innerHTML = `
                    <div class="dot"></div>
                    <div class="timeline-date">${event.date}</div>
                    <div class="timeline-content">
                        <h3>${event.title}</h3>
                        <p>${event.content}</p>
                    </div>
                `;
                
                timeline.appendChild(item);
                console.log(`添加时间轴项 ${index + 1}/${events.length}`);
            } catch (error) {
                console.error(`处理时间轴项 ${index} 时出错:`, error);
            }
        });
    }
    
    // 添加装饰元素
    function addDecorativeElements() {
        console.log('添加装饰元素');
        // 添加浮动爱心
        for (let i = 0; i < 10; i++) {
            createFloatingHeart();
        }
    }
    
    // 创建浮动爱心
    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '❤️';
        
        // 随机位置
        const posX = Math.random() * window.innerWidth;
        const posY = Math.random() * window.innerHeight;
        
        // 随机大小
        const size = 10 + Math.random() * 20;
        
        // 随机动画时长
        const duration = 5 + Math.random() * 10;
        
        heart.style.cssText = `
            position: fixed;
            left: ${posX}px;
            top: ${posY}px;
            font-size: ${size}px;
            opacity: ${0.2 + Math.random() * 0.3};
            z-index: -1;
            animation: float ${duration}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        
        document.body.appendChild(heart);
    }
    
    // 如果无法从服务器加载信件，使用示例数据
    function useExampleLetters() {
        console.log('使用示例信件数据');
        // 我写给女友的信件示例
        const myLetters = [
            {
                title: '新年快乐',
                date: '2024年1月1日',
                content: `亲爱的，<br><br>
                        新的一年到了，回顾过去的时光，最让我感到幸福的就是有你的陪伴。<br><br>
                        希望在新的一年里，我们能够一起创造更多美好的回忆。<br><br>
                        爱你的我`
            },
            {
                title: '情人节快乐',
                date: '2024年2月14日',
                content: `亲爱的，<br><br>
                        情人节快乐！感谢你一直以来的陪伴和理解，你是我生命中最美好的礼物。<br><br>
                        这是我们在一起后的第一个情人节，希望未来还有无数个这样的日子。<br><br>
                        永远爱你的我`
            }
        ];
        
        // 女友写给我的信件示例
        const yourLetters = [
            {
                title: 'TO_我的爱',
                date: '2024年1月20日',
                content: `亲爱的，<br><br>
                        谢谢你一直以来的关心和照顾，你的温柔和体贴让我感到无比幸福。<br><br>
                        希望我们的爱情能够如同冬日的阳光，温暖而持久。<br><br>
                        爱你的我`
            }
        ];
        
        // 添加示例信件
        myLetters.forEach(letter => {
            const card = createLetterCard(letter.title, letter.date, letter.content);
            myLettersContainer.appendChild(card);
        });
        
        yourLetters.forEach(letter => {
            const card = createLetterCard(letter.title, letter.date, letter.content);
            yourLettersContainer.appendChild(card);
        });
    }
    
    // 使用所有示例内容
    function useExampleContent() {
        console.log('使用所有示例内容');
        useExampleLetters();
        loadGallery();
        loadTimeline();
    }
}); 