class MemoryLeakReporter {
  constructor(threshold) {
    this.threshold = threshold;
  }

  specStarted(spec) {
    if (performance) {
      const windowPerformance = performance;
      let memory = windowPerformance.memory;
      if (memory) {
        spec.startingHeapSize = memory.usedJSHeapSize / Math.pow(1000, 2);
      }
    }
  }

  specDone(spec) {
    if (performance) {
      const windowPerformance = performance;
      let memory = windowPerformance.memory;
      if (memory) {
        const usedJSHeapSize = memory.usedJSHeapSize / Math.pow(1000, 2);
        const memoryLeak = usedJSHeapSize - spec.startingHeapSize;

        console.log(`memoryLeak: ${memoryLeak}`);
        console.log(`this.threshold: ${this.threshold}`);

        if (memoryLeak > this.threshold) {
          spec.status = 'failed';
          spec.failedExpectations.push({
            message: `Memory leak detected: ${memoryLeak} MB, exceeding threshold of ${this.threshold} MB`,
          });
        }
      }
    }
  }
}

module.exports = { MemoryLeakReporter };
