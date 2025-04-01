"use strict";



export class InteractiveElement {
    static body = document.body;
    static aboutMeButton = document.querySelector('.light-button');
    static themeToggle = document.getElementById('theme-toggle')
    static icon = document.querySelector('.material-symbols-outlined')
    static header = document.querySelector('.header');
    static content = document.querySelector('.content');
    static loaded = false;
    static arrowDown = document.querySelector('.arrow-down');
    static threshold = 0
    static screenPosition = 0

    static updateClock() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');

        document.querySelector('.clock').textContent = `${hours}:${minutes}:${seconds}`;
    }
    
    static handleMouseMove(event) {
        const rect = this.aboutMeButton.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        this.aboutMeButton.style.setProperty('--mouse-x', `${x}px`)
        this.aboutMeButton.style.setProperty('--mouse-y', `${y}px`)
      
        

    

    }

    static handleMouseEnter() {
        this.aboutMeButton.classList.add('hovered')
    }

    static handleMouseLeave() {
        this.aboutMeButton.classList.remove('hovered')
    }

        static handleThemeToggle() {
            this.body.classList.toggle('dark-mode')
            this.icon.textContent = this.body.classList.contains("dark-mode") ? "light_mode" : "dark_mode";

        }

    static handleScroll() {
        if (this.loaded === true) {
        if (window.scrollY > this.threshold) {
            this.header.classList.add('shrink')
        } else {
            this.header.classList.remove('shrink')

        const contentPosition = this.content.getBoundingClientRect().top;
        if (contentPosition > this.screenPosition && !this.content.classList.contains('visible')) {
            [this.content, this.arrowDown].forEach(el => el.classList.add('visible'));
            setTimeout(() => {
                this.arrowDown.classList.add('hidden');
            }, 600);
        }

        } } }
    
    static updateThreshold() {
        this.threshold = window.innerHeight * 0.1;
        
    }
        
    static scrollStart() {
        // Ajout d'un délai pour s'assurer que la page est complètement visible avant d'écouter le scroll
        setTimeout(() => {
            this.loaded = true; // Permet de démarrer la logique de scroll
            this.threshold = window.innerHeight * 0.1;
            this.screenPosition = window.innerHeight / 1.30;

            window.addEventListener('scroll', () => this.handleScroll());
            window.addEventListener('resize', () => this.updateThreshold());
        }, 50);
    }

    static init() {
        this.aboutMeButton.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.aboutMeButton.addEventListener('mouseenter', () => this.handleMouseEnter());
        this.aboutMeButton.addEventListener('mouseleave', () => this.handleMouseLeave());
        setInterval(InteractiveElement.updateClock, 1000);
        InteractiveElement.updateClock();
        

    }

}

InteractiveElement.init();