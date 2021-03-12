class Store {
  kvData = {};
  all = [];

  constructor(keyName) {
    this.keyName = keyName || "id";
  }

  clear() {
    for (const key in this.kvData) {
      if (Object.hasOwnProperty.call(this.kvData, key)) {
        delete this.kvData[key];
      }
    }
    this.all.splice(0, this.all.length);
  }

  findById(entityId) {
    return this.kvData[entityId] || null;
  }

  getAll() {
    return JSON.parse(JSON.stringify(this.all));
  }

  add(entity) {
    if (this.kvData[entity[this.keyName]]) {
      console.error("already exists");
      throw new Error("already exists");
    }
    this.kvData[entity[this.keyName]] = entity;
    this.all.push(entity);
  }
  remove(entityId) {
    const currentEntity = this.kvData[entityId];
    if (currentEntity) {
      delete this.kvData[entityId];
      this.all.splice(this.all.indexOf(currentEntity));
    }
  }
  update(entity) {
    const currentEntity = this.kvData[entity[this.keyName]];
    if (currentEntity) {
      this.remove(entity[this.keyName]);
      this.add(entity);
    }
  }
}

module.exports = Store;
