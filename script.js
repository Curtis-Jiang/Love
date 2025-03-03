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
            // 直接从doc目录加载信件
            const response = await fetch('doc-list.json');
            if (!response.ok) {
                throw new Error('无法加载信件列表');
            }
            
            const letterFiles = await response.json();
            console.log('获取到信件列表:', letterFiles);
            
            // 清除加载指示器
            const loadingIndicators = document.querySelectorAll('.loading-indicator');
            loadingIndicators.forEach(indicator => {
                if (indicator.parentNode.id === 'my-letters' || indicator.parentNode.id === 'your-letters') {
                    indicator.style.display = 'none';
                }
            });
            
            // 分类信件
            const myLetters = [];
            const yourLetters = [];
            
            // 加载信件
            for (const file of letterFiles) {
                try {
                    const response = await fetch(`doc/${file}`);
                    if (!response.ok) {
                        console.error(`无法加载信件: ${file}`);
                        continue;
                    }
                    
                    const content = await response.text();
                    const letterTitle = getLetterTitle(file);
                    
                    // 判断信件类型
                    if (file.startsWith('TO_')) {
                        yourLetters.push({ filename: file, title: letterTitle, content });
                    } else {
                        myLetters.push({ filename: file, title: letterTitle, content });
                    }
                } catch (error) {
                    console.error(`加载信件失败: ${file}`, error);
                }
            }
            
            // 渲染信件
            renderLetters(myLetters, 'my-letters');
            renderLetters(yourLetters, 'your-letters');
            
        } catch (error) {
            console.error('加载信件列表失败:', error);
            showError('无法加载信件列表，请刷新页面重试。');
        }
    }
    
    // 渲染信件列表
    function renderLetters(letters, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        letters.forEach(letter => {
            const letterCard = createLetterCard(letter.title, extractDate(letter.content), getLetterPreview(letter.content), letter.content);
            container.appendChild(letterCard);
        });
    }
    
    // 从文件名获取信件标题
    function getLetterTitle(filename) {
        // 移除 .md 扩展名和 TO_ 前缀
        let title = filename.replace('.md', '').replace('TO_', '');
        // 将下划线替换为空格
        title = title.replace(/_/g, ' ');
        return title;
    }
    
    // 提取日期
    function extractDate(content) {
        // 尝试从内容中提取日期
        const dateRegex = /\d{4}[/\-年]\d{1,2}[/\-月]\d{1,2}/;
        const match = content.match(dateRegex);
        
        if (match) {
            return match[0];
        } else {
            // 默认返回当前日期
            const now = new Date();
            return `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`;
        }
    }
    
    // 获取信件预览
    function getLetterPreview(content) {
        // 移除 Markdown 格式并获取前 100 个字符
        let preview = content.replace(/[#*`>]/g, '').trim();
        return preview.length > 100 ? preview.substring(0, 100) + '...' : preview;
    }
    
    // 创建信件卡片
    function createLetterCard(title, date, preview, content) {
        const card = document.createElement('div');
        card.className = 'letter-card';
        
        card.innerHTML = `
            <div class="letter-card-header">
                <h3>${title}</h3>
                <div class="letter-date">${date}</div>
            </div>
            <div class="letter-preview">${preview}</div>
        `;
        
        // 点击打开信件
        card.addEventListener('click', () => {
            openLetter(title, date, content);
        });
        
        return card;
    }
    
    // 打开信件
    function openLetter(title, date, content) {
        // 创建全屏信件元素
        const fullLetter = document.createElement('div');
        fullLetter.className = 'full-letter';
        
        // 转换 Markdown 内容为 HTML
        const htmlContent = convertMarkdownToHtml(content);
        
        fullLetter.innerHTML = `
            <div class="full-letter-content">
                <div class="full-letter-header">
                    <h2>${title}</h2>
                    <div class="full-letter-date">${date}</div>
                </div>
                <div class="full-letter-body">${htmlContent}</div>
                <button class="close-letter"><i class="fas fa-times"></i></button>
            </div>
        `;
        
        // 添加到文档中
        document.body.appendChild(fullLetter);
        
        // 动画显示
        setTimeout(() => {
            fullLetter.classList.add('open');
        }, 10);
        
        // 关闭按钮
        const closeBtn = fullLetter.querySelector('.close-letter');
        closeBtn.addEventListener('click', () => {
            fullLetter.classList.remove('open');
            setTimeout(() => {
                document.body.removeChild(fullLetter);
            }, 300);
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
    
    // 使用所有示例内容
    function useExampleContent() {
        console.log('使用所有示例内容');
        useExampleLetters();
        loadGallery();
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

// 转换Markdown为HTML
function convertMarkdownToHtml(markdown) {
    if (!markdown) return '';
    
    // 处理标题 (## 标题)
    markdown = markdown.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>');
    markdown = markdown.replace(/^#\s+(.+)$/gm, '<h1>$1</h1>');
    markdown = markdown.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>');
    
    // 处理粗体和斜体
    markdown = markdown.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    markdown = markdown.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    
    // 处理链接 [文本](链接)
    markdown = markdown.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
    
    // 处理引用
    markdown = markdown.replace(/^>\s+(.+)$/gm, '<blockquote>$1</blockquote>');
    
    // 处理代码块
    markdown = markdown.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // 处理段落
    let paragraphs = markdown.split(/\n\s*\n/);
    markdown = paragraphs.map(p => {
        // 跳过已处理的HTML元素
        if (p.trim().startsWith('<') && !p.trim().startsWith('<a')) {
            return p;
        }
        return `<p>${p.trim()}</p>`;
    }).join('\n');
    
    // 处理行内换行
    markdown = markdown.replace(/\n/g, '<br>');
    
    return markdown;
} 