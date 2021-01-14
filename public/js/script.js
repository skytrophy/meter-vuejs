
// ★STEP2
import LineCart from "./LineChart"
Vue.config.devtools = true;
// https://jp.vuejs.org/v2/examples/todomvc.html
var STORAGE_KEY = 'todos-vuejs-demo'
var todoStorage = {
  fetch: function () {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach(function (todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

// ★STEP1
new Vue({
  el: '#app',

  data: {
    // ★STEP5 localStorage から 取得した ToDo のリスト
    todos: [],
    // ★STEP11 抽出しているToDoの状態
    current: 0,
    edit:0,
    //編集中の時は1 それ以外は0
    // ★STEP11＆STEP13 各状態のラベル
    options: [
      { value: 0, label: '全て' },
      { value: 1, label: '仮想通貨' },
      { value: 2, label: '証券' },
      { value: 3, label: '現金' }
    ]
  },

  computed: {

    // ★STEP12
    computedTodos: function () {
      return this.todos.filter(function (el) {
        return this.current == 0 ? true : this.current === el.type
      }, this)
    },

    // ★STEP13 作業中・完了のラベルを表示する
    labels() {
      return this.options.reduce(function (a, b) {
        return Object.assign(a, { [b.value]: b.label })
      }, {})
      // キーから見つけやすいように、次のように加工したデータを作成
      // {0: '作業中', 1: '完了', -1: 'すべて'}
    }
  },

  // ★STEP8
  watch: {
    // オプションを使う場合はオブジェクト形式にする
    todos: {
      // 引数はウォッチしているプロパティの変更後の値
      handler: function (todos) {
        todoStorage.save(todos)
      },
      // deep オプションでネストしているデータも監視できる
      deep: true
    }
  },

  // ★STEP9
  created() {
    // インスタンス作成時に自動的に fetch() する
    this.todos = todoStorage.fetch()
  },

  methods: {

    // ★STEP7 ToDo 追加の処理
    doAdd: function(event, value) {
      // ref で名前を付けておいた要素を参照
      var amount = this.$refs.amount
      var type = this.$refs.type
      // 入力がなければ何もしないで return
      if (!amount.value.length) {
        return
      }
      // { 新しいID, コメント, 作業状態 }
      // というオブジェクトを現在の todos リストへ push
      // 作業状態「type」はデフォルト「作業中=0」で作成
      if(this.edit==1){
        newID = this.todos[index].id;
        this.todos.splice(index, 1)
      }else{
        newID = todoStorage.uid++;
      }
      this.todos.push({
        id: newID,
        amount: Number(amount.value),
        type: Number(type.value)
      })
      // フォーム要素を空にする
      amount.value = ''
      type.value = ''
      this.edit = 0;
    },

    // ★STEP10 状態変更の処理
    doChangetype: function (item) {
      this.edit = 1;
      index = this.todos.indexOf(item);
      this.$refs.amount.value = this.todos[index].amount;
      this.$refs.type.value = this.todos[index].type;
      this.$refs.amount.focus();
    },
    
    

    // ★STEP10 削除の処理
    doRemove: function (item) {
      var index = this.todos.indexOf(item);
      this.todos.splice(index, 1)
    }

  }
})