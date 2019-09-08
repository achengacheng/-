import dva from 'dva';
import './style/global.css';
import createHistory from 'history/createBrowserHistory';
// const browserHistory = createBrowserHistory()
// const hashHistory = createHashHistory()
// 1. Initialize
try{
const app = dva();
// var Swiper=require('./relyOn/swiper-4.2.6.min.js')
// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/home/homePage').default);

// 4. Router
app.router(require('./router').default);

// 5. Start

app.start('#root');

}catch(err){
  console.log(err)
}
