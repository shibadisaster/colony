class Lock {
    constructor(name, remain_unlocked = false) {
        this.name = name;
        this.unlock_criteria = function() { // true means shown and false means hidden
            return true;
        };
        this.unlocked = false;

        this.remain_unlocked = remain_unlocked;

        game.locks[this.name] = this;
    }

    evaluate_lock() {
        if (this.remain_unlocked && this.unlocked) { return; }
        this.unlocked = this.unlock_criteria();
    }
    
    update_locks() {
        this.evaluate_lock();
        if (this.unlocked) {
            $(".locked-by-" + this.name).hide();
            $(".unlocked-by-" + this.name).show();
        }
        
    }
}