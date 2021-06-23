var inventory;

(function() {
  inventory = {
    lastId: 0,
    collection: [],
    setDate: function() {
      var date = new Date();
      document.getElementById("order_date").textContent = date.toUTCString();
    },
    cacheTemplate: function() {
      let inventoryItem = document.getElementById('inventory_item');
      var iTmpl = inventoryItem.parentNode.removeChild(inventoryItem);
      this.template = iTmpl.innerHTML;
    },
    add: function() {
      this.lastId++;
      var item = {
        id: this.lastId,
        name: "",
        stock_number: "",
        quantity: 1
      };
      this.collection.push(item);

      return item;
    },
    remove: function(idx) {
      this.collection = this.collection.filter(function(item) {
        return item.id !== idx;
      });
    },
    get: function(id) {
      var found_item;

      this.collection.forEach(function(item) {
        if (item.id === id) {
          found_item = item;
          return false;
        }
      });

      return found_item;
    },
    update: function($item) {
      var id = this.findID($item),
          item = this.get(id);

      item.name = $item.querySelector("[name^=item_name]").value;
      item.stock_number = $item.querySelector("[name^=item_stock_number]").value;
      item.quantity = $item.querySelector("[name^=item_quantity]").value;
    },
    newItem: function(e) {
      e.preventDefault();
      var item = this.add(),
          builtItem = this.template.replace(/ID/g, item.id);

      document.getElementById('inventory').insertAdjacentHTML("beforeend", builtItem);
    },
    findParent: function(e) {
      return e.target.closest("tr");
    },
    findID: function($item) {
      return +$item.querySelector("input[type=hidden]").value;
    },
    deleteItem: function(e) {
      e.preventDefault();
      var item = this.findParent(e).remove();
    },
    updateItem: function(e) {
      var $item = this.findParent(e);

      this.update($item);
    },
    bindEvents: function() {
      let invElement = document.getElementById('inventory');
      document.getElementById('add_item').addEventListener('click', this.newItem.bind(this));

      invElement.addEventListener('click', e => {
        if (e.target.tagName === 'A' && e.target.classList.contains('delete')) {
          this.deleteItem(e);
        }
      });

      invElement.addEventListener('focusout', e => {
        if (e.target.tagName === 'INPUT') this.updateItem(e);
      });
    },
    init: function() {
      this.setDate();
      this.cacheTemplate();
      this.bindEvents();
    }
  };
})();

document.addEventListener('DOMContentLoaded', function() {
  inventory.init.bind(inventory)();
});
