document.addEventListener('DOMContentLoaded', () => {
    // --- Header Scroll Effect ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Smooth Scroll without Hash in URL ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Remove o hash da URL ou mantém limpa sem recarregar
                window.history.replaceState(null, null, window.location.pathname + window.location.search);
            }
        });
    });

    // Limpar hash da URL se a página for carregada com um (ex: via link externo ou refresh)
    if (window.location.hash) {
        window.history.replaceState(null, null, window.location.pathname + window.location.search);
    }

    // --- Hero Carousel ---
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentSlide = 0;
    let slideTimer;

    function showSlide(index) {
        // Remover classes de todos
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.querySelector('.hero-overlay').classList.remove('active-content');
        });
        indicators.forEach(ind => ind.classList.remove('active'));

        // Adicionar ao atual
        slides[index].classList.add('active');
        // Pequeno delay para a animação do conteúdo
        setTimeout(() => {
            slides[index].querySelector('.hero-overlay').classList.add('active-content');
        }, 50);

        indicators[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        let next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    function prevSlide() {
        let prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    }

    // Auto play
    function startTimer() {
        clearInterval(slideTimer);
        slideTimer = setInterval(nextSlide, 6000);
    }

    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); startTimer(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); startTimer(); });

    indicators.forEach((indicator, i) => {
        indicator.addEventListener('click', () => {
            showSlide(i);
            startTimer();
        });
    });

    // --- Product Modal Logic ---
    const modal = document.getElementById('product-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const closeModal = document.getElementById('close-modal');
    const productImages = document.querySelectorAll('.product-image img');

    productImages.forEach(img => {
        img.addEventListener('click', () => {
            const card = img.closest('.product-card');
            const title = card.querySelector('h3').innerText;
            
            modalImg.src = img.src;
            modalTitle.innerText = title;
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Bloqueia scroll do fundo
        });
    });

    const closeProductModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Libera scroll
    };

    if (closeModal) {
        closeModal.addEventListener('click', closeProductModal);
    }

    // Fechar ao clicar fora da modal-container
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeProductModal();
            }
        });
    }

    // Fechar com a tecla Esc
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeProductModal();
        }
    });

    startTimer();
    // Inicializar primeiro slide
    showSlide(0);
});
