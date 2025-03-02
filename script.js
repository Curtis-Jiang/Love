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
        console.log('开始加载照片墙...');
        
        // 模拟照片和视频列表
        const mediaItems = [
            { type: 'image', url: 'photos/photo1.jpg', caption: '我们的第一张合照' },
            { type: 'image', url: 'photos/photo2.jpg', caption: '一起看日落' },
            { type: 'image', url: 'photos/photo3.jpg', caption: '周末野餐' },
            { type: 'video', url: 'photos/video1.mp4', caption: '一起唱歌的视频' },
            { type: 'image', url: 'photos/photo4.jpg', caption: '公园散步' },
            { type: 'image', url: 'photos/photo5.jpg', caption: '生日派对' },
            { type: 'image', url: 'photos/photo6.jpg', caption: '咖啡馆约会' },
            { type: 'video', url: 'photos/video2.mp4', caption: '一起跳舞' },
            { type: 'image', url: 'photos/photo7.jpg', caption: '海边漫步' },
            { type: 'image', url: 'photos/photo8.jpg', caption: '雪中嬉戏' }
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
        console.log('创建全屏照片查看器...');
        
        // 检查是否已存在
        let container = document.querySelector('.fullscreen-photo-container');
        if (container) {
            console.log('全屏照片查看器已存在，跳过创建');
            return;
        }
        
        // 创建容器
        container = document.createElement('div');
        container.className = 'fullscreen-photo-container';
        
        // 创建关闭按钮
        const closeBtn = document.createElement('div');
        closeBtn.className = 'close-fullscreen';
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        closeBtn.addEventListener('click', () => {
            container.classList.remove('active');
        });
        
        // 创建照片包装器
        const photoWrapper = document.createElement('div');
        photoWrapper.className = 'photo-wrapper';
        
        // 创建照片元素
        const photo = document.createElement('img');
        photo.className = 'fullscreen-photo';
        
        // 创建视频元素
        const video = document.createElement('video');
        video.className = 'fullscreen-video';
        video.controls = true;
        
        // 创建说明文字
        const caption = document.createElement('div');
        caption.className = 'photo-caption';
        
        // 创建操作提示
        const instruction = document.createElement('div');
        instruction.className = 'photo-instruction';
        instruction.textContent = '向下滑动或滚动查看下一张 | 按ESC关闭';
        
        // 组装元素
        photoWrapper.appendChild(photo);
        photoWrapper.appendChild(video);
        photoWrapper.appendChild(caption);
        container.appendChild(closeBtn);
        container.appendChild(photoWrapper);
        container.appendChild(instruction);
        document.body.appendChild(container);
        
        // 添加触摸事件
        let startY = 0;
        container.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
        });
        
        container.addEventListener('touchmove', (e) => {
            const currentY = e.touches[0].clientY;
            const diff = currentY - startY;
            
            if (diff > 50) {  // 向下滑动超过50px
                e.preventDefault();
                showFullscreenPhoto(getRandomNextPhotoIndex());
                startY = currentY;
            }
        });
        
        // 添加鼠标滚轮事件
        container.addEventListener('wheel', (e) => {
            if (e.deltaY > 0) {  // 向下滚动
                showFullscreenPhoto(getRandomNextPhotoIndex());
            }
        });
        
        // 添加键盘事件
        document.addEventListener('keydown', (e) => {
            if (!container.classList.contains('active')) return;
            
            if (e.key === 'Escape') {
                container.classList.remove('active');
            } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') {
                showFullscreenPhoto(getRandomNextPhotoIndex());
            }
        });
        
        console.log('全屏照片查看器创建完成');
    }
    
    // 显示全屏照片
    function showFullscreenPhoto(index) {
        console.log('显示全屏照片，索引:', index);
        
        const container = document.querySelector('.fullscreen-photo-container');
        if (!container) {
            console.error('找不到全屏照片容器!');
            return;
        }
        
        const photo = container.querySelector('.fullscreen-photo');
        const video = container.querySelector('.fullscreen-video');
        const caption = container.querySelector('.photo-caption');
        
        if (!photo || !video || !caption) {
            console.error('找不到全屏照片元素!');
            return;
        }
        
        if (index >= 0 && index < photos.length) {
            const item = photos[index];
            currentPhotoIndex = index;
            
            // 重置显示
            photo.style.display = 'none';
            video.style.display = 'none';
            
            if (item.type === 'image') {
                photo.src = item.url;
                photo.style.display = 'block';
            } else if (item.type === 'video') {
                video.src = item.url;
                video.style.display = 'block';
                video.play().catch(e => console.error('视频播放失败:', e));
            }
            
            caption.textContent = item.caption;
            container.classList.add('active');
        } else {
            console.error('照片索引超出范围:', index);
        }
    }
    
    // 获取随机的下一张照片索引
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
}); 