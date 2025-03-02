document.addEventListener('DOMContentLoaded', function() {
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
    
    // 点击信封事件
    envelope.addEventListener('click', function() {
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
            }).catch(e => console.log("背景音乐播放失败:", e));
        } else {
            backgroundMusic.pause();
            this.classList.remove('playing');
            this.innerHTML = '<i class="fas fa-music-slash"></i>';
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
        audio.play().catch(e => console.log("音频播放失败:", e));
    }
    
    // 加载内容函数
    async function loadContent() {
        // 加载信件
        await loadLetters();
        
        // 加载照片墙
        loadGallery();
        
        // 加载时间轴
        loadTimeline();
    }
    
    // 从MD文件加载信件
    async function loadLetters() {
        try {
            // 获取doc目录下的文件列表
            const response = await fetch('doc-list.json');
            if (!response.ok) {
                throw new Error('无法获取文件列表');
            }
            
            const files = await response.json();
            
            // 处理每个信件文件
            for (const file of files) {
                // 跳过非MD文件和图片文件
                if (!file.endsWith('.md')) continue;
                
                const isYourLetter = file.startsWith('TO_');
                const fileResponse = await fetch(`doc/${file}`);
                if (!fileResponse.ok) continue;
                
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
        // 这里我们需要从服务器获取照片文件列表
        // 由于GitHub Pages限制，这里使用模拟数据
        
        // 模拟照片数据
        const photos = [
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
        
        // 创建照片/视频元素
        photos.forEach(item => {
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
            
            // 点击打开灯箱
            galleryItem.addEventListener('click', () => {
                openLightbox(item);
                playSound('https://www.soundjay.com/buttons/sounds/button-20.mp3');
            });
        });
    }
    
    // 打开灯箱
    function openLightbox(item) {
        lightboxImage.style.display = 'none';
        lightboxVideo.style.display = 'none';
        
        if (item.type === 'image') {
            lightboxImage.src = item.url;
            lightboxImage.style.display = 'block';
        } else {
            lightboxVideo.innerHTML = `<source src="${item.url}" type="video/mp4">`;
            lightboxVideo.style.display = 'block';
            lightboxVideo.load();
            lightboxVideo.play().catch(e => console.log("视频播放失败:", e));
        }
        
        lightboxCaption.textContent = item.caption;
        lightbox.classList.add('active');
    }
    
    // 加载时间轴
    function loadTimeline() {
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
        });
    }
    
    // 添加装饰元素
    function addDecorativeElements() {
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
}); 