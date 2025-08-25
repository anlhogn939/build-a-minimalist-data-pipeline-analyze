class MinimalDataPipeline {
  constructor(pipelineName) {
    this.pipelineName = pipelineName;
    this.sources = [];
    this.processors = [];
    this.sinks = [];
  }

  addSource(source) {
    this.sources.push(source);
  }

  addProcessor(processor) {
    this.processors.push(processor);
  }

  addSink(sink) {
    this.sinks.push(sink);
  }

  analyze() {
    const sourceData = this.sources.map((source) => source.getData());
    const processedData = this.processors.reduce((acc, processor) => {
      return processor.process(acc);
    }, sourceData);
    this.sinks.forEach((sink) => sink.storeData(processedData));
  }
}

class Source {
  constructor(data) {
    this.data = data;
  }

  getData() {
    return this.data;
  }
}

class Processor {
  constructor(processFn) {
    this.processFn = processFn;
  }

  process(data) {
    return this.processFn(data);
  }
}

class Sink {
  constructor(storeFn) {
    this.storeFn = storeFn;
  }

  storeData(data) {
    this.storeFn(data);
  }
}

// Example usage
const pipeline = new MinimalDataPipeline('my_pipeline');

const source1 = new Source([1, 2, 3]);
const source2 = new Source([4, 5, 6]);

const processor1 = new Processor((data) => data.map((x) => x * 2));
const processor2 = new Processor((data) => data.filter((x) => x > 5));

const sink = new Sink((data) => console.log(data));

pipeline.addSource(source1);
pipeline.addSource(source2);
pipeline.addProcessor(processor1);
pipeline.addProcessor(processor2);
pipeline.addSink(sink);

pipeline.analyze();