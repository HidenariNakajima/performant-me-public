// Vendor script with lots of unused code and dependencies

// Fake jQuery-like library with excessive features
(function(window) {
    'use strict';
    
    // Lots of console output
    console.log('Loading fake vendor library...');
    
    function VendorLib(selector) {
        this.elements = [];
        if (typeof selector === 'string') {
            this.elements = Array.from(document.querySelectorAll(selector));
        } else if (selector instanceof Element) {
            this.elements = [selector];
        }
        return this;
    }
    
    // Excessive prototype methods (most unused)
    VendorLib.prototype = {
        // Basic DOM manipulation
        addClass: function(className) {
            this.elements.forEach(el => el.classList.add(className));
            return this;
        },
        
        removeClass: function(className) {
            this.elements.forEach(el => el.classList.remove(className));
            return this;
        },
        
        toggleClass: function(className) {
            this.elements.forEach(el => el.classList.toggle(className));
            return this;
        },
        
        // Inefficient CSS manipulation
        css: function(property, value) {
            if (value === undefined) {
                return this.elements[0] ? window.getComputedStyle(this.elements[0])[property] : null;
            }
            this.elements.forEach(el => {
                el.style[property] = value;
                // Force reflow after each element
                el.offsetHeight;
            });
            return this;
        },
        
        // Inefficient animation
        animate: function(properties, duration = 1000) {
            this.elements.forEach(el => {
                const start = performance.now();
                const initialValues = {};
                
                Object.keys(properties).forEach(prop => {
                    initialValues[prop] = parseFloat(window.getComputedStyle(el)[prop]) || 0;
                });
                
                function step(timestamp) {
                    const elapsed = timestamp - start;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    Object.keys(properties).forEach(prop => {
                        const startValue = initialValues[prop];
                        const endValue = parseFloat(properties[prop]);
                        const currentValue = startValue + (endValue - startValue) * progress;
                        el.style[prop] = currentValue + 'px';
                        
                        // Force layout on every frame
                        el.offsetHeight;
                    });
                    
                    if (progress < 1) {
                        requestAnimationFrame(step);
                    }
                }
                requestAnimationFrame(step);
            });
            return this;
        },
        
        // Event handling with memory leaks
        on: function(event, handler) {
            this.elements.forEach(el => {
                el.addEventListener(event, handler);
                // Not storing references for cleanup
            });
            return this;
        },
        
        off: function(event, handler) {
            this.elements.forEach(el => {
                el.removeEventListener(event, handler);
            });
            return this;
        },
        
        // AJAX methods
        ajax: function(options) {
            const xhr = new XMLHttpRequest();
            xhr.open(options.method || 'GET', options.url, true);
            
            if (options.headers) {
                Object.keys(options.headers).forEach(header => {
                    xhr.setRequestHeader(header, options.headers[header]);
                });
            }
            
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        if (options.success) options.success(xhr.responseText);
                    } else {
                        if (options.error) options.error(xhr.statusText);
                    }
                }
            };
            
            xhr.send(options.data || null);
        },
        
        // Utility methods (mostly unused)
        hide: function() {
            this.elements.forEach(el => el.style.display = 'none');
            return this;
        },
        
        show: function() {
            this.elements.forEach(el => el.style.display = 'block');
            return this;
        },
        
        fadeIn: function(duration = 300) {
            this.elements.forEach(el => {
                el.style.opacity = '0';
                el.style.display = 'block';
                this.animate({opacity: 1}, duration);
            });
            return this;
        },
        
        fadeOut: function(duration = 300) {
            this.elements.forEach(el => {
                this.animate({opacity: 0}, duration);
                setTimeout(() => {
                    el.style.display = 'none';
                }, duration);
            });
            return this;
        },
        
        // Data manipulation
        data: function(key, value) {
            if (value === undefined) {
                return this.elements[0] ? this.elements[0].getAttribute('data-' + key) : null;
            }
            this.elements.forEach(el => el.setAttribute('data-' + key, value));
            return this;
        },
        
        // Form handling
        val: function(value) {
            if (value === undefined) {
                return this.elements[0] ? this.elements[0].value : null;
            }
            this.elements.forEach(el => el.value = value);
            return this;
        },
        
        // HTML manipulation
        html: function(content) {
            if (content === undefined) {
                return this.elements[0] ? this.elements[0].innerHTML : null;
            }
            this.elements.forEach(el => el.innerHTML = content);
            return this;
        },
        
        text: function(content) {
            if (content === undefined) {
                return this.elements[0] ? this.elements[0].textContent : null;
            }
            this.elements.forEach(el => el.textContent = content);
            return this;
        },
        
        // Traversal methods
        parent: function() {
            const parents = this.elements.map(el => el.parentElement).filter(p => p);
            const result = new VendorLib();
            result.elements = parents;
            return result;
        },
        
        children: function() {
            const children = [];
            this.elements.forEach(el => {
                children.push(...Array.from(el.children));
            });
            const result = new VendorLib();
            result.elements = children;
            return result;
        },
        
        find: function(selector) {
            const found = [];
            this.elements.forEach(el => {
                found.push(...Array.from(el.querySelectorAll(selector)));
            });
            const result = new VendorLib();
            result.elements = found;
            return result;
        },
        
        // Advanced selectors (unused complexity)
        first: function() {
            const result = new VendorLib();
            result.elements = this.elements.slice(0, 1);
            return result;
        },
        
        last: function() {
            const result = new VendorLib();
            result.elements = this.elements.slice(-1);
            return result;
        },
        
        eq: function(index) {
            const result = new VendorLib();
            result.elements = [this.elements[index]].filter(el => el);
            return result;
        },
        
        // Inefficient each method
        each: function(callback) {
            this.elements.forEach((el, index) => {
                callback.call(el, index, el);
            });
            return this;
        }
    };
    
    // Global function
    function $(selector) {
        return new VendorLib(selector);
    }
    
    // Utility functions (mostly unused)
    $.extend = function(target, ...sources) {
        sources.forEach(source => {
            Object.keys(source).forEach(key => {
                target[key] = source[key];
            });
        });
        return target;
    };
    
    $.isArray = function(obj) {
        return Array.isArray(obj);
    };
    
    $.isFunction = function(obj) {
        return typeof obj === 'function';
    };
    
    $.isObject = function(obj) {
        return obj !== null && typeof obj === 'object';
    };
    
    $.map = function(array, callback) {
        return array.map(callback);
    };
    
    $.filter = function(array, callback) {
        return array.filter(callback);
    };
    
    $.reduce = function(array, callback, initial) {
        return array.reduce(callback, initial);
    };
    
    // Date/time utilities (unused)
    $.now = function() {
        return Date.now();
    };
    
    $.parseDate = function(dateString) {
        return new Date(dateString);
    };
    
    $.formatDate = function(date, format) {
        // Basic implementation
        return date.toString();
    };
    
    // String utilities (unused)
    $.trim = function(str) {
        return str.trim();
    };
    
    $.capitalize = function(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    
    $.slugify = function(str) {
        return str.toLowerCase().replace(/[^a-z0-9]/g, '-');
    };
    
    // Number utilities (unused)
    $.random = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    
    $.round = function(num, decimals = 0) {
        return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
    };
    
    // Color utilities (completely unused)
    $.hexToRgb = function(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };
    
    $.rgbToHex = function(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    };
    
    // Animation easing functions (unused)
    $.easing = {
        linear: function(t) { return t; },
        easeInQuad: function(t) { return t * t; },
        easeOutQuad: function(t) { return t * (2 - t); },
        easeInOutQuad: function(t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; },
        easeInCubic: function(t) { return t * t * t; },
        easeOutCubic: function(t) { return (--t) * t * t + 1; },
        easeInOutCubic: function(t) { return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; }
    };
    
    // Storage utilities (unused)
    $.storage = {
        set: function(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
            } catch (e) {
                console.error('Storage error:', e);
            }
        },
        
        get: function(key) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : null;
            } catch (e) {
                console.error('Storage error:', e);
                return null;
            }
        },
        
        remove: function(key) {
            try {
                localStorage.removeItem(key);
            } catch (e) {
                console.error('Storage error:', e);
            }
        },
        
        clear: function() {
            try {
                localStorage.clear();
            } catch (e) {
                console.error('Storage error:', e);
            }
        }
    };
    
    // Cookie utilities (unused)
    $.cookie = {
        set: function(name, value, days) {
            let expires = "";
            if (days) {
                const date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + (value || "") + expires + "; path=/";
        },
        
        get: function(name) {
            const nameEQ = name + "=";
            const ca = document.cookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        },
        
        remove: function(name) {
            document.cookie = name + "=; Max-Age=-99999999;";
        }
    };
    
    // Validation utilities (unused)
    $.validate = {
        email: function(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        },
        
        phone: function(phone) {
            const re = /^\+?[\d\s\-\(\)]+$/;
            return re.test(phone);
        },
        
        url: function(url) {
            try {
                new URL(url);
                return true;
            } catch (e) {
                return false;
            }
        },
        
        creditCard: function(number) {
            // Luhn algorithm
            let sum = 0;
            let alternate = false;
            for (let i = number.length - 1; i >= 0; i--) {
                let n = parseInt(number.charAt(i), 10);
                if (alternate) {
                    n *= 2;
                    if (n > 9) {
                        n = (n % 10) + 1;
                    }
                }
                sum += n;
                alternate = !alternate;
            }
            return (sum % 10 === 0);
        }
    };
    
    // Expose to global scope
    window.$ = window.VendorLib = $;
    
    // Simulate heavy initialization
    console.log('Vendor library initializing...');
    for (let i = 0; i < 100000; i++) {
        Math.random();
    }
    
    console.log('Vendor library loaded');
    
})(window);

// Additional fake analytics library
(function() {
    'use strict';
    
    console.log('Loading fake analytics...');
    
    window.Analytics = {
        initialized: false,
        queue: [],
        
        init: function(config) {
            this.config = config;
            this.initialized = true;
            console.log('Analytics initialized with config:', config);
            
            // Process queued events
            this.queue.forEach(event => {
                this.track(event.name, event.data);
            });
            this.queue = [];
        },
        
        track: function(eventName, data) {
            if (!this.initialized) {
                this.queue.push({name: eventName, data: data});
                return;
            }
            
            console.log('Tracking event:', eventName, data);
            
            // Simulate sending data to server
            setTimeout(() => {
                console.log('Event sent to server:', eventName);
            }, Math.random() * 1000);
        },
        
        identify: function(userId, traits) {
            console.log('Identifying user:', userId, traits);
        },
        
        page: function(name, properties) {
            console.log('Page view:', name, properties);
        }
    };
    
    // Auto-initialize with dummy data
    setTimeout(() => {
        window.Analytics.init({
            apiKey: 'fake-api-key',
            debug: true
        });
    }, 1000);
    
    console.log('Analytics library loaded');
})();