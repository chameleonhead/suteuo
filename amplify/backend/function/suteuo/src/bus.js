class Bus {
  handlers = [];
  subscribe(handler) {
    this.handlers.push(handler);
    return () => this.unsubscribe();
  }
  unsubscribe(handler) {
    const handlerIndex = this.handlers.indexOf(handler);
    if (handlerIndex > 0) {
      this.handlers.slice(handlerIndex, 1);
    }
  }
  async publish(type, payload, meta) {
    for (const handler of this.handlers) {
      await handler({ type, payload, meta });
    }
  }
}

module.exports = Bus;
