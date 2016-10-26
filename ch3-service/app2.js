function ItemService(opt_items){
    var items = opt_items || [];
    this.list = function(){
        return items;
    };
    this.add = function(item){
        items.push(item);
    };
}
 
 angular.module('notesApp', [])
    .provider('ItemService',function(){
        var haveDefaultItems = true;
        this.disableDefaultItems = function(){
            haveDefaultItems = false;
        };

        //啟動 Provider 會自動執行
        this.$get = [function(){
            var optItems = [];
            if(haveDefaultItems){
                optItems = [
                    {id:1,label:'Item0'},
                    {id:2,label:'Item1'}  
                ];
            }
            return new ItemService(optItems);
        }];

    })
    .config(['ItemServiceProvider',function(ItemServiceProvider){
        //了解 Provider 更改組態的方式
        //改變 shouldHaveDefaults 的值為 true
        //並試著執行這個範例
        var shouldHaveDefaults = true;

        //從伺服器取得組態
        //用某種方式設定 shouldHaveDefaults
        //現在假設內容已經改變
        if(!shouldHaveDefaults){
            ItemServiceProvider.disableDefaultItems();
        }
    }])
    .controller("MainCtrl",[function(){
        var self = this;
        self.tab ='first';
        self.open = function(tab){
            self.tab = tab
        };
    }])
    .controller("SubCtrl",['ItemService',function(ItemService){
      var self = this;

      self.list = function(){
          return ItemService.list();
      }

      self.add = function(){
          ItemService.add({
              id:self.list().length+1,
              label:'Item' + self.list().length
          });
      };

    }]);

    