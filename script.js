document.addEventListener('DOMContentLoaded', function() {
    // 添加调试信息
    console.log('页面加载完成，开始初始化...');
    
    // 加载动画和进度条
    const pageLoader = document.getElementById('page-loader');
    const progressBar = document.getElementById('progress-bar');
    
    if (!pageLoader) {
        console.error('找不到页面加载器元素!');
    }
    
    if (!progressBar) {
        console.error('找不到进度条元素!');
    }
    
    // 更新进度条
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress > 100) progress = 100;
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
        
        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                if (pageLoader) {
                    pageLoader.style.opacity = '0';
                    setTimeout(() => {
                        if (pageLoader.parentNode) {
                            pageLoader.parentNode.removeChild(pageLoader);
                        }
                        console.log('加载动画已移除');
                    }, 500);
                }
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
    
    // 检查元素是否存在
    if (!envelope) console.error('找不到信封元素!');
    if (!welcomeScreen) console.error('找不到欢迎屏幕元素!');
    if (!mainContent) console.error('找不到主内容元素!');
    if (!mobileNav) console.error('找不到移动导航元素!');
    if (!musicToggle) console.error('找不到音乐控制元素!');
    if (!backgroundMusic) console.error('找不到背景音乐元素!');
    else console.log('背景音乐元素已找到:', backgroundMusic.innerHTML);
    
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
    
    // 初始化
    console.log('开始初始化网站...');
    
    // 尝试预加载音乐
    if (backgroundMusic) {
        console.log('尝试预加载背景音乐...');
        backgroundMusic.load();
    }
    
    // 打开信封动画
    if (envelope) {
        envelope.addEventListener('click', function() {
            console.log('信封被点击');
            const envelopeElement = envelope.querySelector('.envelope');
            if (envelopeElement) {
                envelopeElement.classList.add('open');
                
                // 尝试播放背景音乐
                if (backgroundMusic) {
                    console.log('尝试播放背景音乐...');
                    backgroundMusic.play().then(() => {
                        console.log('背景音乐播放成功!');
                        if (musicToggle) {
                            musicToggle.classList.add('playing');
                        }
                    }).catch(e => {
                        console.error('背景音乐播放失败:', e);
                    });
                }
                
                // 3秒后显示主内容
                setTimeout(() => {
                    console.log('准备显示主内容...');
                    if (welcomeScreen) {
                        welcomeScreen.style.opacity = '0';
                    }
                    
                    setTimeout(() => {
                        if (welcomeScreen) {
                            welcomeScreen.style.display = 'none';
                        }
                        if (mainContent) {
                            mainContent.style.display = 'block';
                            setTimeout(() => {
                                mainContent.style.opacity = '1';
                            }, 100);
                        }
                        if (mobileNav) {
                            mobileNav.style.display = 'flex';
                            setTimeout(() => {
                                mobileNav.style.opacity = '1';
                            }, 100);
                        }
                        
                        // 默认显示第一个内容区域
                        if (contentSections && contentSections.length > 0) {
                            contentSections[0].style.display = 'block';
                            setTimeout(() => {
                                contentSections[0].classList.add('active');
                            }, 100);
                        }
                        
                        // 加载内容
                        loadContent();
                    }, 500);
                }, 3000);
            }
        });
    }
    
    // 音乐控制
    if (musicToggle && backgroundMusic) {
        musicToggle.addEventListener('click', function() {
            console.log('音乐控制按钮被点击');
            if (backgroundMusic.paused) {
                backgroundMusic.play().then(() => {
                    console.log('背景音乐播放成功!');
                    musicToggle.classList.add('playing');
                }).catch(e => console.error('背景音乐播放失败:', e));
            } else {
                backgroundMusic.pause();
                console.log('背景音乐已暂停');
                musicToggle.classList.remove('playing');
            }
        });
    }
    
    // 导航切换
    const navLinks = document.querySelectorAll('.nav-links li, .nav-item');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            console.log('导航链接被点击:', sectionId);
            
            // 移除所有活动状态
            navLinks.forEach(l => l.classList.remove('active'));
            contentSections.forEach(section => {
                section.style.display = 'none';
                section.classList.remove('active');
            });
            
            // 添加活动状态
            this.classList.add('active');
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.style.display = 'block';
                setTimeout(() => {
                    targetSection.classList.add('active');
                }, 10);
            }
        });
    });
    
    // 标签页切换
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            console.log('标签按钮被点击:', tabId);
            
            // 移除所有活动状态
            tabBtns.forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // 添加活动状态
            this.classList.add('active');
            const targetTab = document.getElementById(tabId);
            if (targetTab) {
                targetTab.classList.add('active');
            }
        });
    });
    
    // 默认激活第一个导航项
    if (navLinks && navLinks.length > 0) {
        navLinks[0].classList.add('active');
    }
    
    // 播放声音效果
    function playSound(url) {
        console.log('尝试播放声音:', url);
        const audio = new Audio(url);
        audio.volume = 0.3;
        audio.play().catch(e => {
            console.error('声音播放失败:', e);
        });
    }
    
    // 全局变量
    let currentPage = 'welcome';
    let letters = [];
    let bgMusic;
    let photos = [];
    let currentPhotoIndex = 0;
    let backgroundImages = [];

    // 加载内容
    async function loadContent() {
        console.log('开始加载内容...');
        try {
            // 加载信件
            await loadLetters();
            
            // 加载照片墙
            loadGallery();
            
            // 添加装饰元素
            addDecorativeElements();
            
            console.log('所有内容加载完成!');
        } catch (error) {
            console.error('加载内容时出错:', error);
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
            <div class="letter-card-header">
                <h3>${title}</h3>
                <div class="letter-date">${date || '未知日期'}</div>
            </div>
            <div class="letter-preview">${preview}</div>
        `;
        
        // 点击卡片，打开完整信件
        card.addEventListener('click', () => {
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
        
        // 检查是否已存在全屏信件
        let fullLetter = document.querySelector('.full-letter');
        if (!fullLetter) {
            // 创建全屏信件元素
            fullLetter = document.createElement('div');
            fullLetter.className = 'full-letter';
            document.body.appendChild(fullLetter);
        }
        
        // 替换Markdown格式
        content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                         .replace(/\*(.*?)\*/g, '<em>$1</em>')
                         .replace(/\n\n/g, '<br><br>')
                         .replace(/\n/g, '<br>');
        
        // 填充内容
        fullLetter.innerHTML = `
            <div class="close-letter">
                <i class="fas fa-times"></i>
            </div>
            <div class="full-letter-content">
                <div class="full-letter-header">
                    <h2>${title}</h2>
                    <div class="full-letter-date">${date || '未知日期'}</div>
                </div>
                <div class="full-letter-body">
                    ${content}
                </div>
            </div>
        `;
        
        // 打开信件
        setTimeout(() => fullLetter.classList.add('open'), 10);
        
        // 关闭按钮
        fullLetter.querySelector('.close-letter').addEventListener('click', () => {
            fullLetter.classList.remove('open');
        });
        
        // 点击背景关闭
        fullLetter.addEventListener('click', e => {
            if (e.target === fullLetter) {
                fullLetter.classList.remove('open');
            }
        });
    }
    
    // 加载照片墙
    function loadGallery() {
        console.log('开始加载照片墙...');
        
        // 模拟照片和视频列表
        const mediaItems = [
            { type: 'image', url: 'https://via.placeholder.com/400x400?text=Photo+1', caption: '我们的第一张合照' },
            { type: 'image', url: 'https://via.placeholder.com/400x400?text=Photo+2', caption: '一起看日落' },
            { type: 'image', url: 'https://via.placeholder.com/400x400?text=Photo+3', caption: '周末野餐' },
            { type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4', caption: '一起唱歌的视频' },
            { type: 'image', url: 'https://via.placeholder.com/400x400?text=Photo+4', caption: '公园散步' },
            { type: 'image', url: 'https://via.placeholder.com/400x400?text=Photo+5', caption: '生日派对' },
            { type: 'image', url: 'https://via.placeholder.com/400x400?text=Photo+6', caption: '咖啡馆约会' },
            { type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4', caption: '一起跳舞' },
            { type: 'image', url: 'https://via.placeholder.com/400x400?text=Photo+7', caption: '海边漫步' },
            { type: 'image', url: 'https://via.placeholder.com/400x400?text=Photo+8', caption: '雪中嬉戏' }
        ];
        
        // 存储照片数组供全屏查看使用
        photos = mediaItems;
        
        // 清空容器
        if (galleryContainer) {
            galleryContainer.innerHTML = '';
            
            // 创建照片墙项目
            mediaItems.forEach((item, index) => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                galleryItem.setAttribute('data-index', index);
                
                if (item.type === 'image') {
                    const img = document.createElement('img');
                    img.src = item.url;
                    img.alt = item.caption;
                    img.loading = 'lazy';
                    galleryItem.appendChild(img);
                } else if (item.type === 'video') {
                    const video = document.createElement('video');
                    video.src = item.url;
                    video.muted = true;
                    video.loop = true;
                    video.preload = 'metadata';
                    
                    // 鼠标悬停时播放视频
                    galleryItem.addEventListener('mouseenter', () => {
                        video.play().catch(e => console.error('视频播放失败:', e));
                    });
                    
                    galleryItem.addEventListener('mouseleave', () => {
                        video.pause();
                    });
                    
                    galleryItem.appendChild(video);
                    
                    // 添加视频指示器
                    const videoIndicator = document.createElement('div');
                    videoIndicator.className = 'video-indicator';
                    videoIndicator.innerHTML = '<i class="fas fa-play"></i>';
                    galleryItem.appendChild(videoIndicator);
                }
                
                // 点击打开全屏查看
                galleryItem.addEventListener('click', () => {
                    showFullscreenPhoto(index);
                });
                
                galleryContainer.appendChild(galleryItem);
            });
            
            console.log('照片墙加载完成，共加载 ' + mediaItems.length + ' 个媒体项');
        } else {
            console.error('找不到照片墙容器!');
        }
        
        // 创建全屏照片查看器
        createFullscreenPhotoViewer();
    }
    
    // 创建全屏照片查看器
    function createFullscreenPhotoViewer() {
        // 如果已经存在则返回
        if (document.getElementById('fullscreen-photo-container')) {
            return;
        }
        
        // 创建全屏容器
        const container = document.createElement('div');
        container.id = 'fullscreen-photo-container';
        container.className = 'fullscreen-photo-container';
        container.style.display = 'none';
        
        // 创建关闭按钮
        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-fullscreen-photo';
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', closeFullscreenPhoto);
        
        // 创建照片/视频容器
        const mediaContainer = document.createElement('div');
        mediaContainer.className = 'fullscreen-media-container';
        
        // 创建说明文字容器
        const caption = document.createElement('div');
        caption.className = 'fullscreen-photo-caption';
        
        // 创建导航提示
        const navHint = document.createElement('div');
        navHint.className = 'fullscreen-nav-hint';
        navHint.innerHTML = '向下滑动或按下空格键切换照片';
        
        // 添加到DOM
        container.appendChild(closeBtn);
        container.appendChild(mediaContainer);
        container.appendChild(caption);
        container.appendChild(navHint);
        document.body.appendChild(container);
        
        // 添加触摸事件监听
        let touchStartY = 0;
        
        container.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        }, { passive: true });
        
        container.addEventListener('touchend', (e) => {
            const touchEndY = e.changedTouches[0].clientY;
            const diff = touchStartY - touchEndY;
            
            // 向下滑动超过50px
            if (diff > 50) {
                showNextRandomPhoto();
            }
        }, { passive: true });
        
        // 添加鼠标滚轮事件
        container.addEventListener('wheel', (e) => {
            if (e.deltaY > 0) {
                showNextRandomPhoto();
            }
        }, { passive: true });
        
        // 添加键盘事件
        document.addEventListener('keydown', handlePhotoKeyboard);
    }
    
    // 显示全屏照片
    function showFullscreenPhoto(index) {
        currentPhotoIndex = index;
        const container = document.getElementById('fullscreen-photo-container');
        const mediaContainer = container.querySelector('.fullscreen-media-container');
        const caption = container.querySelector('.fullscreen-photo-caption');
        
        // 清空媒体容器
        mediaContainer.innerHTML = '';
        
        // 获取当前项目
        const item = photos[index];
        
        // 根据类型显示照片或视频
        if (item.type === 'image') {
            const img = document.createElement('img');
            img.src = item.url;
            img.alt = item.caption;
            mediaContainer.appendChild(img);
        } else if (item.type === 'video') {
            const video = document.createElement('video');
            video.src = item.url;
            video.controls = true;
            video.autoplay = true;
            video.loop = true;
            mediaContainer.appendChild(video);
        }
        
        // 设置说明文字
        caption.textContent = item.caption;
        
        // 显示容器
        container.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // 防止背景滚动
        
        // 如果有音乐并且正在播放，暂时将音量降低
        if (backgroundMusic && !backgroundMusic.paused) {
            backgroundMusic.volume = 0.2;
        }
    }
    
    // 关闭全屏照片
    function closeFullscreenPhoto() {
        const container = document.getElementById('fullscreen-photo-container');
        if (container) {
            container.style.display = 'none';
            document.body.style.overflow = ''; // 恢复背景滚动
            
            // 恢复背景音乐音量
            if (backgroundMusic && !backgroundMusic.paused) {
                backgroundMusic.volume = 0.5;
            }
        }
        
        // 移除键盘事件监听
        document.removeEventListener('keydown', handlePhotoKeyboard);
    }
    
    // 随机选择下一张照片
    function getRandomNextPhotoIndex() {
        if (photos.length <= 1) return 0;
        
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * photos.length);
        } while (newIndex === currentPhotoIndex);
        
        return newIndex;
    }
    
    // 显示下一张随机照片
    function showNextRandomPhoto() {
        const nextIndex = getRandomNextPhotoIndex();
        showFullscreenPhoto(nextIndex);
    }
    
    // 处理照片查看时的键盘事件
    function handlePhotoKeyboard(e) {
        const container = document.getElementById('fullscreen-photo-container');
        
        // 只在全屏照片显示时处理
        if (container && container.style.display !== 'none') {
            switch (e.key) {
                case 'Escape':
                    closeFullscreenPhoto();
                    break;
                case ' ':
                case 'ArrowDown':
                case 'ArrowRight':
                    e.preventDefault();
                    showNextRandomPhoto();
                    break;
            }
        }
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
        console.log('添加装饰元素...');
        
        // 创建浮动心形
        setInterval(createFloatingHeart, 2000);
        
        // 添加背景图片
        backgroundImages = [
            'images/bg1.jpg',
            'images/bg2.jpg',
            'images/bg3.jpg'
        ];
        
        // 预加载背景图片
        backgroundImages.forEach(url => {
            const img = new Image();
            img.src = url;
        });
        
        console.log('装饰元素添加完成');
    }
    
    // 创建浮动心形
    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        
        // 随机位置
        const posX = Math.random() * window.innerWidth;
        const size = Math.random() * 20 + 10;
        
        heart.style.left = posX + 'px';
        heart.style.width = size + 'px';
        heart.style.height = size + 'px';
        
        document.body.appendChild(heart);
        
        // 动画结束后移除
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 4000);
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

    // 设置背景音乐
    function setupBackgroundMusic() {
        // 创建音乐元素
        bgMusic = new Audio('https://music.163.com/song/media/outer/url?id=29764563.mp3'); // EXO的初雪（First Snow）
        bgMusic.volume = 0.5;
        bgMusic.loop = true;
        
        // 创建音乐控制按钮
        const musicControl = document.createElement('div');
        musicControl.className = 'music-control';
        musicControl.innerHTML = '<i class="fas fa-music"></i>';
        musicControl.setAttribute('title', 'EXO - 初雪 (First Snow)');
        document.body.appendChild(musicControl);
        
        // 音乐播放状态
        let musicPlaying = false;
        
        // 用户交互后尝试播放音乐
        function tryPlayMusic() {
            if (!musicPlaying) {
                bgMusic.play().then(() => {
                    musicPlaying = true;
                    musicControl.classList.add('playing');
                }).catch(err => {
                    console.error('无法播放音乐:', err);
                });
            }
        }
        
        // 音乐控制按钮点击事件
        musicControl.addEventListener('click', function() {
            if (musicPlaying) {
                bgMusic.pause();
                musicPlaying = false;
                musicControl.classList.remove('playing');
            } else {
                tryPlayMusic();
            }
        });
        
        // 监听任意用户交互后自动播放音乐（仅触发一次）
        function autoPlayOnInteraction() {
            tryPlayMusic();
            // 移除所有事件监听器
            document.removeEventListener('click', autoPlayOnInteraction);
            document.removeEventListener('touchstart', autoPlayOnInteraction);
            document.removeEventListener('keydown', autoPlayOnInteraction);
            document.removeEventListener('scroll', autoPlayOnInteraction);
        }
        
        // 添加事件监听器
        document.addEventListener('click', autoPlayOnInteraction);
        document.addEventListener('touchstart', autoPlayOnInteraction);
        document.addEventListener('keydown', autoPlayOnInteraction);
        document.addEventListener('scroll', autoPlayOnInteraction);
    }
});

// 当页面加载完成后直接加载所有内容，避免等待信封点击
window.addEventListener('load', function() {
    preloadAllContent();
});

// 预加载内容，提高响应速度
function preloadAllContent() {
    // 预加载信件
    fetchLetters();
    
    // 预加载照片
    fetchPhotos();
    
    // 预加载时间线
    buildTimeline();
    
    // 尝试预加载音乐
    if (backgroundMusic) {
        console.log('预加载背景音乐...');
        backgroundMusic.load();
    }
}

// 尝试播放背景音乐
if (backgroundMusic) {
    console.log('尝试播放背景音乐...');
    playSafely(backgroundMusic).then(() => {
        console.log('背景音乐播放成功!');
        if (musicToggle) {
            musicToggle.classList.add('playing');
            musicToggle.nextElementSibling.textContent = '暂停音乐';
        }
    }).catch(e => {
        console.error('背景音乐播放失败:', e);
    });
}

// 安全播放函数
async function playSafely(audioElement) {
    try {
        // 尝试直接播放
        await audioElement.play();
    } catch (err) {
        console.warn('直接播放失败，等待用户交互后再尝试:', err);
        
        // 创建一个一次性点击事件监听器，在用户交互后尝试播放
        const playOnUserInteraction = async () => {
            try {
                await audioElement.play();
                document.removeEventListener('click', playOnUserInteraction);
                document.removeEventListener('touchstart', playOnUserInteraction);
            } catch (err2) {
                console.error('用户交互后播放仍然失败:', err2);
            }
        };
        
        document.addEventListener('click', playOnUserInteraction);
        document.addEventListener('touchstart', playOnUserInteraction);
        
        // 如果1分钟内未播放，则移除事件监听器
        setTimeout(() => {
            document.removeEventListener('click', playOnUserInteraction);
            document.removeEventListener('touchstart', playOnUserInteraction);
        }, 60000);
        
        // 向上抛出错误，通知调用者播放失败
        throw err;
    }
}

// 音乐控制更新
if (musicToggle && backgroundMusic) {
    musicToggle.addEventListener('click', function() {
        console.log('音乐控制按钮被点击');
        if (backgroundMusic.paused) {
            playSafely(backgroundMusic).then(() => {
                console.log('背景音乐播放成功!');
                musicToggle.classList.add('playing');
                musicToggle.nextElementSibling.textContent = '暂停音乐';
            }).catch(e => console.error('背景音乐播放失败:', e));
        } else {
            backgroundMusic.pause();
            console.log('背景音乐已暂停');
            musicToggle.classList.remove('playing');
            musicToggle.nextElementSibling.textContent = '播放音乐';
        }
    });
}

// 照片过滤器
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');
        console.log('过滤按钮被点击:', filter);
        
        // 移除所有活动状态
        filterBtns.forEach(b => b.classList.remove('active'));
        
        // 添加活动状态
        this.classList.add('active');
        
        // 筛选图片
        filterGallery(filter);
    });
});

// 筛选图库
function filterGallery(filter) {
    const items = document.querySelectorAll('.gallery-item');
    
    items.forEach(item => {
        if (filter === 'all') {
            item.style.display = 'block';
        } else if (item.getAttribute('data-type') === filter) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// 设置灯箱功能
function setupLightbox() {
    if (!lightbox) return;
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    let currentIndex = 0;
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const index = parseInt(item.getAttribute('data-index'));
            openLightbox(index);
        });
    });
    
    // 打开灯箱
    function openLightbox(index) {
        currentIndex = index;
        const photos = Array.from(document.querySelectorAll('.gallery-item')).map(item => {
            return {
                src: item.querySelector('img, video').getAttribute('src'),
                type: item.getAttribute('data-type'),
                caption: item.querySelector('img, video').getAttribute('alt') || '照片'
            };
        });
        
        const photo = photos[index];
        
        // 重置灯箱
        lightboxImage.style.display = 'none';
        lightboxVideo.style.display = 'none';
        
        // 根据类型显示内容
        if (photo.type === 'photo') {
            lightboxImage.src = photo.src;
            lightboxImage.style.display = 'block';
        } else if (photo.type === 'video') {
            lightboxVideo.src = photo.src;
            lightboxVideo.style.display = 'block';
        }
        
        // 显示说明
        lightboxCaption.textContent = photo.caption;
        
        // 显示灯箱
        lightbox.classList.add('active');
        
        // 禁止滚动
        document.body.style.overflow = 'hidden';
    }
    
    // 关闭灯箱
    if (closeLightbox) {
        closeLightbox.addEventListener('click', () => {
            lightbox.classList.remove('active');
            setTimeout(() => {
                lightboxVideo.pause();
                document.body.style.overflow = '';
            }, 300);
        });
    }
    
    // 上一张/下一张
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', () => {
            const itemsVisible = Array.from(document.querySelectorAll('.gallery-item')).filter(item => 
                window.getComputedStyle(item).display !== 'none'
            );
            const totalItems = itemsVisible.length;
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
            const newIndex = parseInt(itemsVisible[currentIndex].getAttribute('data-index'));
            openLightbox(newIndex);
        });
    }
    
    if (lightboxNext) {
        lightboxNext.addEventListener('click', () => {
            const itemsVisible = Array.from(document.querySelectorAll('.gallery-item')).filter(item => 
                window.getComputedStyle(item).display !== 'none'
            );
            const totalItems = itemsVisible.length;
            currentIndex = (currentIndex + 1) % totalItems;
            const newIndex = parseInt(itemsVisible[currentIndex].getAttribute('data-index'));
            openLightbox(newIndex);
        });
    }
    
    // 键盘导航
    document.addEventListener('keydown', event => {
        if (!lightbox.classList.contains('active')) return;
        
        if (event.key === 'Escape') {
            closeLightbox.click();
        } else if (event.key === 'ArrowLeft') {
            lightboxPrev.click();
        } else if (event.key === 'ArrowRight') {
            lightboxNext.click();
        }
    });
}

// 构建时间线
function buildTimeline() {
    const timelineContainer = document.querySelector('.timeline-container');
    if (!timelineContainer) return;
    
    // 清除加载指示器
    const loadingIndicator = timelineContainer.querySelector('.loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
    }
    
    // 创建时间线项目
    const timeline = [
        {
            date: '第1天',
            title: '初次相遇',
            content: '这是我们故事的开始，第一次见面的那一天，一切都是那么美好。'
        },
        {
            date: '第7天',
            title: '第一次约会',
            content: '我们的第一次正式约会，一起看电影，一起吃饭，聊了很多很多。'
        },
        {
            date: '第15天',
            title: '确定关系',
            content: '在这一天，我们决定正式在一起，成为彼此生命中重要的人。'
        },
        {
            date: '第30天',
            title: '一月纪念',
            content: '在一起一个月了，时间过得真快，每一天都很珍贵。'
        },
        {
            date: '第50天',
            title: '小旅行',
            content: '我们一起出去旅行，看了美丽的风景，留下了美好的回忆。'
        },
        {
            date: '第75天',
            title: '度过挑战',
            content: '我们一起面对了一些挑战，但我们的感情变得更加坚强。'
        },
        {
            date: '第100天',
            title: '百日纪念',
            content: '今天是我们在一起的第100天，这个特别的日子值得我们铭记。'
        }
    ];
    
    // 渲染时间线
    timeline.forEach(item => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        timelineItem.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <div class="timeline-date">${item.date}</div>
                <h3 class="timeline-title">${item.title}</h3>
                <p>${item.content}</p>
            </div>
        `;
        
        timelineContainer.appendChild(timelineItem);
    });
}

// 显示错误信息
function showError(message) {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    
    document.body.appendChild(errorMessage);
    
    setTimeout(() => {
        errorMessage.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        errorMessage.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(errorMessage);
        }, 300);
    }, 5000);
} 