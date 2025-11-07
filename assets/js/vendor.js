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
    
    // Global function
    function $(selector) {
        return new VendorLib(selector);
    }
    
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
    
    // Expose to global scope
    window.$ = window.VendorLib = $;
    
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