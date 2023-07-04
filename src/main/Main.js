import * as THREEE from 'three';
import { MainRenderer } from './renderers/MainRenderer.js';
import { ARButton } from '../../node_modules/three/examples/jsm/webxr/ARButton.js';

let loadingScene = document.createElement('div');
let loadingLogo = document.createElement('img');
loadingLogo.src = './src/assets/Logo.png';
loadingLogo.style.width = '15%';
loadingLogo.style.margin = '24px';
loadingScene.style.width = '100%';
loadingScene.style.height = '100%';
loadingScene.style.position = 'absolute';
loadingScene.style.display = 'flex';
loadingScene.style.flexDirection = 'column';
loadingScene.style.justifyContent = 'center';
loadingScene.style.alignItems = 'center';
loadingScene.style.zIndex = '1000';
loadingScene.appendChild(loadingLogo);

let loadingText = document.createElement('label');
loadingText.innerText = 'Loading...';
loadingText.style.fontSize = '64px';
loadingText.style.margin = '36px';
loadingText.style.color = 'antiquewhite';
loadingText.style.fontFamily = '\'Bebas Neue\', sans-serif';
loadingScene.appendChild(loadingText);
let progressBar = document.createElement('div');
progressBar.id = 'progressBar';
progressBar.style.width = '300px';
progressBar.style.height = '10px';
progressBar.style.backgroundColor = '#252525';
progressBar.style.borderRadius = '10px';
progressBar.style.overflow = 'hidden';

let progressElement = document.createElement('div');
progressElement.style.height = '100%';
progressElement.style.backgroundColor = '#e28743';
progressElement.style.width = '0';
progressElement.style.transition = 'width 0.3s ease-in-out';

progressBar.appendChild(progressElement);
loadingScene.appendChild(progressBar);
let progress = 0;
document.body.appendChild(loadingScene);
setProgress(progress);
const renderer = new MainRenderer(window.innerWidth, window.innerHeight);
renderer.pixelRatio = window.devicePixelRatio;

const arButton = ARButton.createButton(renderer);

renderer.startLoop();
function setProgress(progress) {
    const interval = setInterval(() => {
        progress += 10;
        progressElement.style.width = `${progress}px`;
        if (progress >= 300) {
            document.body.removeChild(loadingScene);
            document.body.appendChild(renderer.domElement);
            document.body.appendChild(arButton);
            clearInterval(interval);

        }
    }, 100);
}
