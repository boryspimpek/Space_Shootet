class ImageLoader {
    static cache = new Map();
    
    static load(src, fallbackName = null) {
        if (this.cache.has(src)) {
            return this.cache.get(src);
        }
        
        const entry = {
            image: new Image(),
            loaded: false,
            error: false
        };
        
        entry.image.onload = () => {
            entry.loaded = true;
        };
        
        entry.image.onerror = () => {
            entry.error = true;
            console.warn(`Failed to load ${src}${fallbackName ? `, falling back to ${fallbackName}` : ''}`);
        };
        
        entry.image.src = src;
        this.cache.set(src, entry);
        return entry;
    }
    
    static get(src) {
        return this.cache.get(src);
    }
    
    static isLoaded(src) {
        const entry = this.cache.get(src);
        return entry ? entry.loaded : false;
    }
    
    static hasError(src) {
        const entry = this.cache.get(src);
        return entry ? entry.error : false;
    }
}
