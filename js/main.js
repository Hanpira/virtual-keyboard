document.body.innerHTML = `
        <header>
            <h1 class="title"> Virtual Keyboard</h1>
        </header>
        <main>
            <div class="keyboard__container">
                <div class="keyboard__about">Created in Windows
                </div>
                <textarea class="keyboard__textarea"></textarea>
            </div>
        </main>
        <footer class="footer">
        <div class="footer-container">
           <div class="footer__item">
                <a href="https://github.com/Hanpira/virtual-keyboard/pulls" title="github-pull"><img src="assets/svg/github_logo.svg" alt="github" class="logo"></a>
           </div>
           <div class="footer__item footer__text"> 2022
           </div>
           <div class="footer__item">
              <a href="https://rs.school/js/" title="rsschool/js"><img src="assets/svg/rs_school_js.svg" alt="rsschool/js" class="logo"></a>
           </div>
        </div>
     </footer>
    `

/* Internationalization 
import i18Obj from './translate.js';

const switchLng = document.querySelector('.lng');
const switchLngBtns = document.querySelectorAll('.lng-btn');

const lngBtnClick = (event) => {
  if (event.target.classList.contains('lng-btn')) {
    start.lang = event.target.dataset.lng;
    translateClasses();
  }
};

const translateClasses = () => {
  changeLngActive();
  getTranslate(start.lang);
};

const changeLngActive = () => {
  switchLngBtns.forEach((el) => el.classList.remove('lng-active'));
  const activeBtn = document.querySelector(`[data-lng=${start.lang}]`);
  activeBtn.classList.add('lng-active');
};

const getTranslate = (currentLanguage) => {
  const dataElements = document.querySelectorAll('[data-i18]');

  dataElements.forEach((el) => {
    if (el.placeholder) {
      el.placeholder = i18Obj[currentLanguage][el.dataset.i18];
      el.textContent = '';
    } else {
      el.textContent = i18Obj[currentLanguage][el.dataset.i18];
    }
  });
};

switchLng.addEventListener('click', lngBtnClick);

*/

const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        values: '',
        capsLock: false
    },

    init() {
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        this.elements.main.classList.add("keyboard");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        document.querySelectorAll(".keyboard__textarea").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "`", "1" , "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace", "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "Delete", "CapsLk", "a" , "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter", "Shift_L", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "Up", "Shift_R", "Ctrl", "Lang", "Alt", "Space", "Alt", "Ctrl", "Left", "Down", "Right"
        ];

        const createIconHTML = (icon_name) => {
            return `<img src="../assets/svg/${icon_name}.svg" alt="${icon_name}" class="keyboard__img">`;
        };

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["Backspace", "Delete", "Enter", "Shift_R"].indexOf(key) !== -1;

            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");

            switch(key) {
                case "Backspace":
                    keyElement.classList.add("keyboard__key-wide");
                    keyElement.innerHTML = createIconHTML("backspace");
                    keyElement.addEventListener('click', () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent('oninput');
                    });

                    break;
                
                case "Del":
                    keyElement.classList.add("keyboard__key-wide");
                    keyElement.addEventListener('click', () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length);
                        this._triggerEvent('oninput');
                        });
    
                    break;
                
                case "CapsLk":
                    keyElement.classList.add("keyboard__key-wide", "keyboard__key-activatable");
                    keyElement.innerHTML = createIconHTML("capslock");
                    keyElement.addEventListener('click', () => {
                        this._toggleCapsLock()
                        this._triggerEvent('oninput');
                        keyElement.classList.toggle("keyboard__key-active", this.properties.capsLock);
                    });

                    break;

                case "Enter":
                    keyElement.classList.add("keyboard__key-wide");
                    keyElement.innerHTML = createIconHTML("enter");
                    keyElement.addEventListener('click', () => {
                        this.properties.value += "\n";
                        this._triggerEvent('oninput');
                    });

                    break;

                case "Space":
                    keyElement.classList.add("keyboard__key-extra-wide");
                    keyElement.innerHTML = createIconHTML("spacebar");
                    keyElement.addEventListener('click', () => {
                        this.properties.value += " ";
                        this._triggerEvent('oninput');
                    });

                    break;

                case "Tab":
                    keyElement.classList.add("keyboard__key-wide");
                    keyElement.innerHTML = createIconHTML("tab");
                    keyElement.addEventListener('click', () => {
                        this.properties.value += "    ";
                        this._triggerEvent('oninput');
                    });
    
                    break;
                
                case "Lang":
                    keyElement.classList.add ("keyboard__key-wide", "keyboard__key-dark");
                    keyElement.innerHTML = createIconHTML("lang");
                /* keyElement.addEventListener('click', () => {
                        
                    }) */
                    break;
                
                case "Up":
                    keyElement.classList.add("keyboard__key-wide");
                    keyElement.innerHTML = createIconHTML("up");
                    keyElement.addEventListener('click', () => {
                        this.properties.value;
                        this._triggerEvent('oninput');
                    });
        
                    break;
                
                case "Left":
                    keyElement.classList.add("keyboard__key-wide");
                    keyElement.innerHTML = createIconHTML("left");
                    keyElement.addEventListener('click', () => {
                        this.properties.value;
                        this._triggerEvent('oninput');
                    });
        
                    break;
                
                case "Down":
                    keyElement.classList.add("keyboard__key-wide");
                    keyElement.innerHTML = createIconHTML("Down");
                    keyElement.addEventListener('click', () => {
                        this.properties.value;
                        this._triggerEvent('oninput');
                    });
            
                    break;
                
                case "Right":
                    keyElement.classList.add("keyboard__key-wide");
                    keyElement.innerHTML = createIconHTML("right");
                    keyElement.addEventListener('click', () => {
                        this.properties.value;
                        this._triggerEvent('oninput');
                    });
            
                    break;

                default:
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener('click', () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent("oninput");
                    });
        
                    break;
            }

            fragment.appendChild(keyElement);

            if(insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }

        });

        return fragment;
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }

    },
}

window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
})