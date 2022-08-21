interface logginAttempts {
    readonly countAttempts: number
    readonly blockedTimeSeconds: number
    readonly blockedUntilDate: number
    readonly timeAttempts: number[]
}

class LogginAttempts {
    private countAttempts: number;
    private blockedTimeSeconds: number;
    private blockedUntilDate: number;
    private timeAttempts: number[];

    constructor() {
        this.countAttempts = 0;
        this.blockedTimeSeconds = 0;
        this.blockedUntilDate = 0;
        this.timeAttempts = [];
    }

    static fromString(str: string): LogginAttempts {
        const json = JSON.parse(str)
        const result = new LogginAttempts();
        result.countAttempts = json.countAttempts;
        result.blockedTimeSeconds = json.blockedTimeSeconds;
        result.blockedUntilDate = json.blockedUntilDate;
        result.timeAttempts = json.timeAttempts;
        return result
    }

    toString(): string {
        return JSON.stringify({
            countAttempts: this.countAttempts,
            blockedTimeSeconds: this.blockedTimeSeconds,
            blockedUntilDate: this.blockedUntilDate,
            timeAttempts: this.timeAttempts
        })
    }
    
    private isBlocked(): boolean {
        if (!this.blockedUntilDate) return false;
        
        return Date.now() <= this.blockedUntilDate;
    }
    // Can the user try again? Call this method before executing the login attempt
    couldTryAgain(): boolean {
        if (this.isBlocked()) return false
        return true;
    }

    // Call this method if the user err the password, this method return if is 
    incorrectPasswordIsLocked() {
        this.countAttempts++;
        this.timeAttempts.push(Date.now());

        if (this.countAttempts > 4) {
            if (this.blockedTimeSeconds > 0) {
                this.blockedTimeSeconds *= 2;
            }
            else this.blockedTimeSeconds = 10;

            this.#startBlocked();
            return true
        }
        return false
    }


    #startBlocked() {
        this.blockedUntilDate = Date.now() + (this.blockedTimeSeconds * 1000);
    }

    getTimeBlocked() {
        return new Date(this.blockedUntilDate);
    }
}