/**
 * Vueインスタンス生成
 */

Vue.config.devtools = true;
constapp=new Vue({
el:'#app1',
data:{
items:[
{no:'1',name:'そら',sex:'♂',age:'8',kind:'キジトラ',favorite:'犬の人形'},
{no:'2',name:'りく',sex:'♂',age:'7',kind:'長毛種',favorite:'人間'},
{no:'3',name:'うみ',sex:'♀',age:'6',kind:'ミケ',favorite:'高級ウェットフード'},
{no:'4',name:'こうめ',sex:'♀',age:'4',kind:'サビ',favorite:'横取りフード'},
]
}
})

var news = new Vue({
    el: '#test',
    data: {
        datalists:[],
    },
    created() {
        axios
        .get('./data/sample.json')
        .then(response => {
            this.datalists = response.data;
        })
        .catch(error => {
              console.log(error);
        });
    },
});