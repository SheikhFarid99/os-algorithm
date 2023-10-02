class BoundedBuffer {
    constructor(size) {
      this.size = size;
      this.buffer = new Array(size);
      this.inIndex = 0;
      this.outIndex = 0;
      this.count = 0;
    }
  
    async enqueue(item) {
      // Wait until there is space in the buffer
      while (this.count === this.size) {
        await new Promise((resolve) => setTimeout(resolve, 100)); // Sleep for a short time
      }
  
      // Add the item to the buffer
      this.buffer[this.inIndex] = item;
      this.inIndex = (this.inIndex + 1) % this.size;
      this.count++;
  
      return item;
    }
  
    async dequeue() {
      // Wait until there is an item in the buffer
      while (this.count === 0) {
        await new Promise((resolve) => setTimeout(resolve, 100)); // Sleep for a short time
      }
  
      // Remove and return the item from the buffer
      const item = this.buffer[this.outIndex];
      this.outIndex = (this.outIndex + 1) % this.size;
      this.count--;
  
      return item;
    }
  }
  
  // Example usage:
  const buffer = new BoundedBuffer(5); // Create a buffer with a capacity of 5
  
  // Producer function
  async function producer() {
    for (let i = 1; i <= 10; i++) {
      const item = await buffer.enqueue(`Item ${i}`);
      console.log(`Produced: ${item}`);
      await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000)); // Simulate variable production time
    }
  }
  
  // Consumer function
  async function consumer() {
    for (let i = 1; i <= 10; i++) {
      const item = await buffer.dequeue();
      console.log(`Consumed: ${item}`);
      await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000)); // Simulate variable consumption time
    }
  }
  
  // Start the producer and consumer
  producer();
  consumer();
  