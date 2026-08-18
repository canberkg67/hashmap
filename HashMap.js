export class HashMap {
    constructor() {
        this.capacity = 16;
        this.loadFactor = 0.75;
        this.buckets = new Array(this.capacity);
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (hashCode * primeNumber + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    }

    set(key,value) {
        const index = this.hash(key);

        if (index < 0 || index >= this.buckets.length) {
        throw new Error("Trying to access index out of bounds");
        }
        
        if (!this.buckets[index]) {
            this.buckets[index] = [];
        }
        
        const bucket = this.buckets[index];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value;
                return;
            }
        }
        bucket.push([key, value]);

    }

    get(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        if (!bucket) {
            return undefined;
        }
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return bucket[i][1];
            }
        }
        return undefined;
    }

    has(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        if (!bucket) {
            return false;
        }
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return true;
            }
        }
        return false;
    }

    length() {
        let count = 0;
        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i]) {
                count += this.buckets[i].length;
            }
        }
        return count;
    }
}