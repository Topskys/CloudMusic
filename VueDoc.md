# vue 39个知识点

## 1、vue的优点和缺点？
优点：渐进式（？你想用啥你就用啥），组件化，轻量化，虚拟dom，响应式，单页面路由，数据与视图分开。
缺点：单页面不利于seo，不支持IE8以下，首屏加载时间长。

## 2、Vue 跟 React 的异同？
相同：
1. 组件化开发
2. 使用虚拟dom
3. 都是单向数据流（父子组件之间，不建议子修改父传下来的数据）
4. 都支持服务器端渲染
不同：
1. React的JSX，Vue的template
2. 数据变化，React手动（setState），Vue自动（初始化已响应式处理，Object.defineProperty）
3. React单向绑定，Vue双向绑定
4. React（Redux），Vue（Vuex）

## 3、MVVM ？和MVC有什么区别？
MVC：
    Model(模型)：负责从数据库中取数据
    View(视图)：负责展示数据的地方
    controller(控制器)：用户交互的地方，例如点击事件等等
    思想：Controller将Model 的数据展示在 View 
    //图在public/imgs

MVVM：
    VM： 也就是 View-Model，做了两件事达到了数据的双向绑定。
    一是将【模型】转化成【视图】，即将后端传递的数据转化成所看到的页面。实现的方式是：数据绑定。
    二是将「视图】转化成「模型，即将所看到的页面转化成后端的数据。实现的方式是：DOM事件监听。
    思想：实现了 View 和Model 的自动同步，也就是当 Model 的属性改变时，我们不用再自己手动操作 Dom 元素，来改变View 的显示，而是改变属性后该属性对应view 层显示会自动改变（对应vue数据动的思想）

MVVM 与MVC的区别
    整体看来，MVVM比 MVC 精简很多，不仅简化了业务与界面的依赖，还解决了数据频繁更新的问题，不用再用选择器操作 DOM 元素。因为在 MVVM 中，view 不知道Model 的存在：
    Model 和 ViewlModel 也观察不到 View，这种耦合模式提高代码的可重用性

vue是不是MVVM框架？
    vue 是MVVM框架，但是不是严格符合MVVM， 因为 MVVM规定Model 和 View不能直接通信，而vue的ref可以做到这点


## 5、vue 和JQuery的区别在哪？为什么放弃 JQuery 用 Vue?
1. jQuery 是直接操作DOM， vue不直接操作DOM， vue的数据与视图是分开的,vue 只需要操作数据即可
2. 在操作DOM频繁的场景里，jQuery的操作DOM行为是频繁的，而vue利用虛拟DOM的技术，大大提高了更新DOM时的性能
3. vue 中不倡导直接操作DOM.开发者只需要把大部分精力放在数据层面上
4. vue集成的一些库，大大提高开发效率，比如 Vuex,Router等

## 6、为什么data 是个函数并且返回个对象呢？
    data 之所以是一个函数，是因为一个组件可能会多处调用，而每一次调用就会执行 data 函数并返回新的数据对象，这样，可以避免多处调
用之间的数据污染。

## 7、使用过哪些 vue 的修饰符呢？

## 8、使用过哪些 vue 的内部指令呢？


## 10、组件之间的传值方式有哪些？
1. 父组件传值给子组件，子组件使用 props进行接收
2. 子组件传值给父组件，子组件使用$emit+事件对父组件进行传值
3. 组件中可以使用＄parent和$children获取到父组件实例和子组件实例，进而获取数据
4. 使用$attrs和 $listeners，在对一些组件进行二次封装时可以方便传值，例如A->B->C
5. 使用$refs 获取组件实例，进而获取数据
6. 使用 vuex进行状态管理
7. 使用 eventBus进行跨组件触发事件，进而传递数据
8. 使用 provide 和 inject， 官方建议我们不要用这个，我在看ElementUl源码时发现大量使用
9. 使用浏览器本地缓存，例如localstorage

## 11、路由有哪些模式呢？又有什么不同呢？
hash模式：通过#号后面的内容的更改，触发hashchange 事件，实现路由切换
history模式：通过pushState和replaceState 切换url，实现路由切换，需要后端配合

## 12、如何设置动态class，动态style?
动态class对象：
```
<div:class="E'is-activtrue, 'red': isRed]"></div>
```
动态class数组：
```
<div:class="'is-active-isRed? 'red' : "']"></div>
```
动态style对象：
```
<div :style="{ color:textColor, fontSize: '18px' }"></div>
```
动态style数组：
```
<div:style="[ color:textColor, fontSize: '18px' }, { fontWeight:'300' }]"></div>
```

## 13、v-if 和v-show有何区别？
1. v-if是通过控制dom 元素的删除和生成来实现显隐，每一次显隐都会使组件重新跑一遍生命周期，因为显隐决定了组件的生成和销毁
2. v-show 是通过控制dom 元素的css样式来实现显隐，不会销毀
3. 频繁或者大数量品隐使用 v-show，否则使用 v-if

## 14、computed 和 watch有何区别？
1. computed是依赖已有的变量来计算-目标变量，大多数情況都是多个变量湊一 起计算出一个变量，并且 computed 貝有缓存机制．依赖值不变的情況下其会直接读取缓存进行复用，computed 不能进行异步操作
2. watch是监听某一个变量的变化，并执行相应的回调函数，通常是一个变量的变化决定多个变量的变化，watch 可以进行异步操作
3. 简单记就是：一般情况下 computed是多对一，watch是一对多

## 15、Vue 的生命周期，讲一讲？


## 16、为什么v-if 和v-for不建议用在同一标签？
在vue2中，v-for优先级是高于v-if的，咱们来看例子
```
div v-for="item in [1, 2, 3, 4, 5, 6, 7]" v-if="item!==3">{{item}}</div>
```
上面的写法是v-for和v-if同时存在，会先把7个元素都遍历出来，然后再一个个判断是否为3，并把3给隐藏掉，这样的坏处就是，渲染无用的3节点，增加无用的dom操作，建议用computed 来解决这个问题：
```
<div -for="item in list">{{item}]</div>
computed (){
    list(){
        return [1, 2, 3, 4, 5, 6, 7].filter (item =>item!==3)
    }
}
```

## 17、vuex的有哪些属性？用处是什么?
State：定义了应用状态的数据结构，在这里设置默认的初始状态。
Getter：允许组件从 Store 中获取数据，mapGetters 辅助函数仅仅是将store 中的getter 映射到局部计算属性。
Mutation：是唯一更改store 中状态的方法，且必须是同步函数。
Action：用于提交mutation，而不是直接变更状态，可以包含任意异步操作
Module：允许将单一的Store 拆分为多个多个store且同时保存在单一的状态树中。

## 18、不需要响应式的数据应该怎么处理？
在我们的vue开发中，会有一些数据，从始至终都末曾改变过，这种死数据，既然不改变，那也就不需要对他做响应式处理了，不然只会一些无用功消耗性能，比如一些写死的下拉框，写死的表格数据，这些数据量大的死数据，如果都进行响应式处理，那会消耗大量性能。
方法一：将数据定义在data之外
```
data 0) {
    this.list1=
    { XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX}
    this.list2=
    { XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX}
    this.list3=
    { XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX}
    this.list4=
    { XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX}
    this.list5=
    { XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX}
        return {}
}
```

## 19. watch 有哪些属性，分别有什么用？
```
//当我们监听一个基本数据类型时：
watch: {
    value (){
    //do something
    }
}
//当我们监听一个引用数据类型时：
watch: {
    obj: {
        handler (){// 执行回调
        //do something
    },
    deep: true,// 是否进行深度监听
    immediate: true, // 是否初始执行 handler函数
    }
}
```

## 20.父子组件生命周期顺序
父beforeCreate -> 父 created -> 父beforeMount -> 子 beforeCreate -> 子 created-> 子 beforeMount -> 子 mounted -> 父mounted

## 21.对象新属性无法更新视图，删除属性无法更新视图，为什么？怎么办？
1. 原因：Object.defineProperty 没有对象的新属性进行厲性劫持
2. 对象新属性无法更新视图：使用vue.
```
$ set(obj, key, value)，组件中 this.
$ set(obj, key, value)
```
3. 删除属性无法更新视图：使用vue.
$ dlelete (obi, key)，组件中this.$delete(okey)

## 22.直接arr[index]=xxx 无法更新视图怎么办？为什么？怎么办？
原因：
1. vue没有对数组进行Object.defineProperty的厲性劫持，所以直接arr[index] =xxx是无法更新视图的
2. 使用数组的splice方法，arr.splice(index,1, item)
3. 使用Vue.$set(arr, index, value)

## 23.vue 的SSR 是什么？有什么好处？
1. SSR就是服务端渲染
2. 基于nodeis serve服务环境开发，所有html代码在服务端渲染
3. 数据返回给前端，然后前端进行“激活”即可成为浏览器识别的html代码
4. SSR 首次加载更快，有更好的用户体验，有更好的seo优化，因为爬虫能看到整个页面的内容，如果是vue 项目，由于数据还要经过解析，这就造成爬虫并不会等待你的数据加载完成，所以其实 vue 项目的Seo体验不是很好

## 24. vue 响应式是怎么实现的？
整体思路是数据劫持＋观察者模式
对象内部通过defineReactive 方法，使用Object.definePropertv 将属性进行劫持 （只会劫持已经存在的属性），数组则是通过重写数组方法来实现。当页面使用对应属性时，每个属性都拥有自己的dep属性，存放他所依赖的watcher (依赖收集），当属性变化后会通知自己对应的watcher 去更新(派发更新)。

## 25.为什么只对对象劫持，而要对数组进行方法重写？
因为对象最多也就几十个属性，拦截起来数量不多，但是数组可能会有几百几千项，拦截起来非常耗性能，所以直接重写数组原型上的方法，是比较节省性能的方案

## 26. Vue.set方法的原理？
```
function set(target, key, val) {
    //判断是否是数组
    if (Array.isArray (target)) {
    //判断谁大谁小
    target.length=Math.max(target.length,key)
    //执行splice
    target.splice (key, 1, val)
    return val
    }
    const ob=target.__ob__
    //如果此对象没有不是响应式对象，直接设置并返回
    if (key in target && ! (key in target.prototype)|| !ob) {
        target[key] = val
        return val
    }
    //否则，新增属性，并响应式处理
    defineReactive (target, key, val)
    return val
}
```

## 27. 如果子组件改变props里的数据会发生什么
```
//1、改变的props 数据是基本类型,如果修改的是基本类型，则会报错
props:{
    num: Number,
}
created(){
this.num= 999
}
//2、改变的 props数据是引用类型
props:{
    item: {
    default: () => ({}),
}
}
created(){
    //不报错，并且父级数据会跟着变
    this.item.name = 'sanxin';
    //会报错，跟基础类型报错一样
    this.item = 'sss'
}

```

## 28.props怎么自定义验证
props:{
    num: {
        default: 1,
        validator: function (value) {
        //返回值为 false 则验证不通过，报错
        return[
            1, 2, 3, 4,5
        ].indexOf(value)!==-1
        }
    }
}

## 29.watch的immediate 属性有什么用?
比如平时 created时要请求一次数据，并且当搜索值改变，也要请求数据，我们会这么写：
```
created]{
    this.getList()
}
watch: {
    searchinputvalue0){
    this.getList()
}
//使用 immediate 完全可以这么写，当它为true时，会初始执行一次
watch: {
    searchinputValue:{
    handler: 'getList',
    immediate: true
    }
}
```

## 30. 审查元素时发现 data-v-xxxxx，这是啥？
```
<div data-v-811db470 class='entry'>
‹div data-v-811db470 class="el-card entry-headers is-always-shadow">...‹/div> flex
‹div data-v-811db470 class="entry-content›_‹/div› flex
```
这是在标记vue文件中css时使用 scoped标记产生的，因为要保证各文件中的css 不相互影响给每个 component都做了唯一的标记，所以每引入一个component就会出现一个新的'data-V-xxx'标记

## 31.computed 如何实现传参？
```
//html
<div>{{ total (3) }}
//js
computed: {
  totall(){
    return function(n) {
        return n* this.num
    }
  },
}
```

## 32.provide 和 injeet 是响应式的吗？0
```
//祖先组件
provide(){
    return{
    //keyName: { name: this.name }, //value 是对象才能实现响应式，也就是引用类型keyName: this.changevalue
    // 通过函数的方式也可以[注意，这里是把函数作为 vlue,而不是this.changevalue()]
    // key/Name: “test' valve 如果是基本类型，就无法实现响应式
    }
},
data(){
    return{
    name: '张三'，
    }
},
methods: {
    changeValue({
    this.name='改变后的名字-李四'
    }
},
//后代组件
inject:['keyName']
created(){
    cnsole.log(this.keyName）// 改变后的名
}
```

## 33.vue的el属性和$mount 优先级？
比如下面这种情况，vue 会渲染到哪个节点上
```
new Vue({
    router,
    store,
    el: '#app',
    render: h=> h(App)
}).$mount('#ggg')
```
//这是官方的一张图，可以看出el和$mount同
时存在时，el优先级＞$mount

## 34.动态指令和参数使用过吗？
```
<template>
<aButton
@[someEvent]="handleSomeEvent()":
[someProps]="1000" >...
</template>
<script>
...
data() {
return{
someEvent: some Condition ? "click" :"dbclick"
someProps: some Condition ? "num" :"price"
}
},
methods: {
handleSomeEvent(){
    //handle some event
}
}
</script>
```

## 35. 相同的路由组件如何重新渲染？
开发人员经常遇到的情况是，多个路由解析为同一个vue组件。问题是，vue 出于性能原因默认情况下共享组件将不会重新渲染，如果你尝试在使用相同组件的路由之间进行切换，则不会发生任何变化。
```
const routes =[
{
path: "a"
component: MyComponent
},
{
path: "/b"
component: MyComponent
},
]
//如果依然想重新渲染，怎么办呢？可以使用key
<template>
<router-view:key="$route.path"></router-view>
</template>
```
## 36.自定义v-model
默认情况下，v-model 是 @input 事件侦听器和 value 属性上的语法糖。但是，你可以在你的vue组件中指定一个模型属性来定义使用什么事件和value属性-非常棒！
```
export default: {
    model: {
    event: 'change',
    prop: 'checked'
    }
}
```

## 37. 如何将获取 data中某一个数据的初始状态？
在开发中，有时候需要拿初始状态去计算。例如
```
data(){
return {
num: 10
},
mounted({
this.num = 1000
},
methods: {
howMuch(){
    //计算出num增加了多少，那就是 1000.初始值
    //可以通过 this. $options.data0.xxx 来获取初始值
    console.log (1000 - this.$options.data ().num)
}
}
```

## 38.为什么不建议v-for和v-if 同时存在
```
<div v-for="item in [1, 2, 3, 4,5,6,7]" v-if="item!==3">{{item}}</div>
```
上面的写法是v-for和v-if 同时存在，会先把7个元素都遍历出来，然后再一个个判断是否为3，并把3给隐藏掉，这样的坏处就是，渲染了无用的3节点，增加无用的dom 操作，建议使用 computed 来解決这个问题：
```
<div v-for="item in list" >{{item}}</div>

computed({
list(){
    return [1, 2, 3, 4, 5, 6, 7].filter (item =>item!==3)
}
}
```

## 39.计算变量时，methods和computed 哪个好？
```
<div>
    <div>{{howMuch1()}</div>
    <div>{{howMuch2()}}</div>
    <div>{{findex}}</div>
<div>
data:(){
    return {
    index: 0
},
methods: {
    howMuch10{
        return this.num + this.price
    }
},
computed: {
    howMuch20 {
        return this.num + this.price
    }
}
```

//computed 会好一些，因为 computed会有缓存，例如 index由0变成1,那么会触发视图更新,now中methods会重新执行一次，而computed不会，//因为 computed依赖的两个变num和price都没变


