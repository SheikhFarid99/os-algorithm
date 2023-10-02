class CountingSemaphore {
    constructor(initialCount) {
      this.count = initialCount;
      this.waitingQueue = [];
    }
  
    async acquire() {
      if (this.count > 0) {
        this.count--;
      } else {
        await new Promise((resolve) => this.waitingQueue.push(resolve));
      }
    }
  
    release() {
      if (this.waitingQueue.length > 0) {
        const resolve = this.waitingQueue.shift();
        resolve();
      } else {
        this.count++;
      }
    }
  }
  
  // Usage example:
  const semaphore = new CountingSemaphore(3); // Allow up to 3 concurrent tasks
  
  async function runTask(taskId) {
    console.log(`Task ${taskId} is waiting to acquire the semaphore.`);
    await semaphore.acquire();
    console.log(`Task ${taskId} has acquired the semaphore.`);
    // Simulate some work
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 2000));
    console.log(`Task ${taskId} has completed its work.`);
    semaphore.release();
  }
  
  // Start multiple tasks
  for (let i = 1; i <= 5; i++) {
    runTask(i);
  }
  