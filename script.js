// DOM要素の取得
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.querySelector('.contact-form');

// ハンバーガーメニューの制御
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// ナビゲーションリンクをクリックした時にメニューを閉じる
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// スムーズスクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ヘッダーのスクロール効果
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
});

// アクティブなナビゲーションリンクのハイライト
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
});

// フォームの送信処理
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // フォームデータの取得
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const service = formData.get('service');
        const message = formData.get('message');
        
        // 簡単なバリデーション
        if (!name || !email || !message) {
            showNotification('必須項目を入力してください。', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('正しいメールアドレスを入力してください。', 'error');
            return;
        }
        
        // 送信ボタンを無効化
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '送信中...';
        submitBtn.disabled = true;
        
        // 実際の送信処理（ここではシミュレーション）
        setTimeout(() => {
            showNotification('お問い合わせありがとうございます。2営業日以内にご返信いたします。', 'success');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// メールアドレスのバリデーション
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 通知表示機能
function showNotification(message, type = 'info') {
    // 既存の通知を削除
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // 新しい通知を作成
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // 通知のスタイルを設定
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
        color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460'};
        border: 1px solid ${type === 'success' ? '#c3e6cb' : type === 'error' ? '#f5c6cb' : '#bee5eb'};
        border-radius: 8px;
        padding: 15px 20px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // 通知をページに追加
    document.body.appendChild(notification);
    
    // 閉じるボタンのイベント
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    });
    
    // 5秒後に自動で削除
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// 通知のアニメーション用CSS
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
    }
    
    .notification-close {
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        color: inherit;
        opacity: 0.7;
        transition: opacity 0.2s;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
    
    .nav-link.active {
        color: var(--primary-color);
        font-weight: 600;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(notificationStyles);

// 要素の表示アニメーション（Intersection Observer）
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// アニメーション対象の要素を監視
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .pricing-card, .info-card, .contact-method');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// 電話番号のフォーマット
const phoneInput = document.querySelector('#phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 10) {
            value = value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
        } else if (value.length >= 6) {
            value = value.replace(/(\d{3})(\d{3})(\d+)/, '$1-$2-$3');
        } else if (value.length >= 3) {
            value = value.replace(/(\d{3})(\d+)/, '$1-$2');
        }
        e.target.value = value;
    });
}

// ページ読み込み完了時の処理
window.addEventListener('load', () => {
    // ローディング画面がある場合の処理
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }
    
    // 初期アニメーションの実行
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 1s ease-out';
    }
});

// エラーハンドリング
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
});

// リサイズ時の処理
window.addEventListener('resize', () => {
    // モバイルメニューが開いている場合は閉じる
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// キーボードナビゲーション
document.addEventListener('keydown', (e) => {
    // Escapeキーでモバイルメニューを閉じる
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// タッチデバイス用の処理
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
}

console.log('AreYoU Website JavaScript loaded successfully!');
