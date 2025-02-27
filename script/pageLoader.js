"use strict";

import { InteractiveElement } from './interactiveElement.js';

class PageLoader {
    static loadingScreen = document.querySelector(".loading-screen");
    static pageContent = document.querySelector(".page-content");

    static handleLoad() {
        this.loadingScreen.addEventListener('animationend', () => {
            window.scrollTo(0, 0);
            this.loadingScreen.style.display = "none";
            this.pageContent.classList.add('visible')
            InteractiveElement.body.style.overflow = "auto";
            InteractiveElement.scrollStart();

        });}

    static init() {
        window.addEventListener("load", () => this.handleLoad());
    }


}

PageLoader.init();
