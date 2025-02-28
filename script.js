document.addEventListener('DOMContentLoaded', function() {
    const envelope = document.getElementById('envelope');
    const timelineContainer = document.getElementById('timeline-container');

    // 添加信件数据 - 您需要替换为您实际的信件内容
    const letters = [
        {
            date: '2022年2月14日',
            content: `亲爱的，<br><br>
                      今天是我们在一起的第一个情人节，仍然记得第一次见到你的样子，你的笑容像阳光一样温暖了我的心。<br><br>
                      希望未来的每一天，我们都能一起度过。<br><br>
                      爱你的我`,
            icon: 'https://i.imgur.com/8kMfqIr.png' // Hello Kitty风格图标
        },
        {
            date: '2022年7月7日',
            content: `亲爱的，<br><br>
                      七夕快乐！传说中的牛郎织女每年只能相会一次，而我们何其有幸能够相伴左右。<br><br>
                      感谢你一直以来的陪伴和理解，你是我生命中最美好的礼物。<br><br>
                      永远爱你的我`,
            icon: 'https://i.imgur.com/Qp8SWBl.png' // 线条小狗风格图标
        },
        {
            date: '2022年12月25日',
            content: `亲爱的，<br><br>
                      圣诞快乐！窗外的雪花让我想起我们第一次一起堆雪人的场景。<br><br>
                      与你在一起的每一刻都是如此珍贵，我期待着未来更多美好的时光。<br><br>
                      爱你的我`,
            icon: 'https://i.imgur.com/8kMfqIr.png'
        },
        {
            date: '2023年2月14日',
            content: `亲爱的，<br><br>
                      又一个情人节到了，回顾这一年，我们经历了许多，分享了欢笑，也共同面对了挑战。<br><br>
                      每一步都让我更加确信，你就是我想要共度一生的人。<br><br>
                      爱你的我`,
            icon: 'https://i.imgur.com/Qp8SWBl.png'
        },
        {
            date: '2023年10月1日',
            content: `亲爱的，<br><br>
                      国庆假期，很开心能和你一起出游。看着你站在夕阳下的剪影，我感到无比幸福。<br><br>
                      愿我们的爱情如同这金色的阳光，温暖而持久。<br><br>
                      爱你的我`,
            icon: 'https://i.imgur.com/8kMfqIr.png'
        }
    ];

    // 点击信封事件
    envelope.addEventListener('click', function() {
        this.querySelector('.envelope').classList.add('open');
        
        // 播放可爱的音效
        playSound('https://www.soundjay.com/buttons/sounds/button-09.mp3');
        
        // 延迟显示时间轴
        setTimeout(() => {
            timelineContainer.style.display = 'block';
            setTimeout(() => {
                timelineContainer.classList.add('visible');
                renderLetters();
                // 添加可爱的装饰元素
                addDecorativeElements();
            }, 100);
        }, 1500);
    });

    // 播放音效
    function playSound(url) {
        const audio = new Audio(url);
        audio.volume = 0.3;
        audio.play().catch(e => console.log("音频播放失败:", e));
    }

    // 渲染信件到时间轴
    function renderLetters() {
        const timeline = document.querySelector('.timeline');
        letters.forEach((letter, index) => {
            const item = document.createElement('div');
            item.className = 'timeline-item';
            
            const dot = document.createElement('div');
            dot.className = 'dot';
            
            const dateElem = document.createElement('div');
            dateElem.className = 'timeline-date';
            dateElem.textContent = letter.date;
            
            const content = document.createElement('div');
            content.className = 'timeline-content';
            content.innerHTML = letter.content;
            
            // 添加小图标
            if (letter.icon) {
                const iconImg = document.createElement('img');
                iconImg.src = letter.icon;
                iconImg.style.width = '30px';
                iconImg.style.position = 'absolute';
                iconImg.style.top = '-15px';
                iconImg.style.right = index % 2 === 0 ? '-15px' : 'auto';
                iconImg.style.left = index % 2 === 1 ? '-15px' : 'auto';
                iconImg.style.transform = index % 2 === 0 ? 'rotate(15deg)' : 'rotate(-15deg)';
                content.appendChild(iconImg);
            }
            
            item.appendChild(dot);
            item.appendChild(dateElem);
            item.appendChild(content);
            
            // 添加点击事件，播放可爱的音效
            content.addEventListener('click', function() {
                playSound('https://www.soundjay.com/buttons/sounds/button-10.mp3');
                this.classList.toggle('expanded');
            });
            
            // 延迟添加到时间轴，创造渐进显示效果
            setTimeout(() => {
                timeline.appendChild(item);
                // 添加显示动画
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 50);
            }, index * 300);
        });
    }

    // 创建浮动的心形
    function createFloatingHearts() {
        const heartsCount = 10;
        const heartSymbols = ['❤', '💕', '💖', '💗', '💓'];
        
        for (let i = 0; i < heartsCount; i++) {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
            heart.style.left = `${Math.random() * 100}vw`;
            heart.style.top = `${Math.random() * 100}vh`;
            heart.style.animationDuration = `${3 + Math.random() * 4}s`;
            heart.style.animationDelay = `${Math.random() * 2}s`;
            heart.style.fontSize = `${20 + Math.random() * 20}px`;
            document.body.appendChild(heart);
        }
    }

    // 添加Hello Kitty和线条小狗装饰元素
    function addDecorativeElements() {
        // Hello Kitty元素
        const kittyImages = [
            'https://i.imgur.com/8kMfqIr.png',
            'https://i.imgur.com/JXMpbjC.png'
        ];
        
        // 线条小狗元素
        const dogImages = [
            'https://i.imgur.com/Qp8SWBl.png'
        ];
        
        // 添加5个Hello Kitty元素
        for (let i = 0; i < 5; i++) {
            const kitty = document.createElement('div');
            kitty.className = 'kitty-element';
            kitty.style.backgroundImage = `url(${kittyImages[Math.floor(Math.random() * kittyImages.length)]})`;
            kitty.style.left = `${Math.random() * 100}vw`;
            kitty.style.top = `${Math.random() * 100}vh`;
            kitty.style.animationDuration = `${4 + Math.random() * 3}s`;
            kitty.style.animationDelay = `${Math.random() * 2}s`;
            document.body.appendChild(kitty);
        }
        
        // 添加5个线条小狗元素
        for (let i = 0; i < 5; i++) {
            const dog = document.createElement('div');
            dog.className = 'dog-element';
            dog.style.backgroundImage = `url(${dogImages[0]})`;
            dog.style.left = `${Math.random() * 100}vw`;
            dog.style.top = `${Math.random() * 100}vh`;
            dog.style.animationDuration = `${4 + Math.random() * 3}s`;
            dog.style.animationDelay = `${Math.random() * 2}s`;
            document.body.appendChild(dog);
        }
    }

    createFloatingHearts();

    // 添加背景音乐（可选）
    function addBackgroundMusic() {
        const audio = document.createElement('audio');
        audio.src = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'; // 替换为您喜欢的音乐URL
        audio.loop = true;
        audio.volume = 0.2;
        
        const musicControl = document.createElement('button');
        musicControl.innerHTML = '♫';
        musicControl.style.position = 'fixed';
        musicControl.style.bottom = '20px';
        musicControl.style.right = '20px';
        musicControl.style.zIndex = '1000';
        musicControl.style.background = 'var(--primary-color)';
        musicControl.style.color = 'white';
        musicControl.style.border = 'none';
        musicControl.style.borderRadius = '50%';
        musicControl.style.width = '50px';
        musicControl.style.height = '50px';
        musicControl.style.fontSize = '24px';
        musicControl.style.cursor = 'pointer';
        musicControl.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        
        let isPlaying = false;
        
        musicControl.addEventListener('click', function() {
            if (isPlaying) {
                audio.pause();
                this.innerHTML = '♫';
                this.style.background = 'var(--primary-color)';
            } else {
                audio.play().catch(e => console.log("音频播放失败:", e));
                this.innerHTML = '◼';
                this.style.background = 'var(--accent-color)';
            }
            isPlaying = !isPlaying;
        });
        
        document.body.appendChild(audio);
        document.body.appendChild(musicControl);
    }
    
    // 取消注释下行可添加背景音乐（需要提供有效的音乐URL）
    addBackgroundMusic();
    
    // 添加页面标题动画效果
    function animateTitle() {
        const originalTitle = document.title;
        const titles = [
            "💕 爱的信笺 💕",
            "💖 我爱你 💖",
            "💗 甜蜜回忆 💗",
            originalTitle
        ];
        
        let titleIndex = 0;
        
        setInterval(() => {
            document.title = titles[titleIndex];
            titleIndex = (titleIndex + 1) % titles.length;
        }, 2000);
    }
    
    animateTitle();
}); 