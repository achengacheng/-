import React from 'react';
import { Router, Route, Switch  } from 'dva/router';
import dynamic from 'dva/dynamic';
import browserHistory from 'history/createBrowserHistory';

function RouterConfig({ history,app }) {
  {/*首页-start*/}
  const HomePage = dynamic({
    app,
    component: () => import('./routes/Home/HomePage')
  })
  const BrandPage = dynamic({
    app,
    models: () => [import('./models/home/brand')],
    component: () => import('./routes/Home/Brand')
  })
  const RecommendPage = dynamic({
    app,
    models: () => [import('./models/home/recommend')],
    component: () => import('./routes/Home/Recommend')
  })
  {/*首页-end*/}
  {/*我的-start*/}
  const MyPage = dynamic({
    app,
    models: () => [import('./models/mine/myPage')],
    component: () => import('./routes/Mine/MyPage')
  })
  const CenterPerson = dynamic({
    app,
    models: () => [import('./models/mine/centerPerson')],
    component: () => import('./routes/Mine/CenterPerson/CenterPerson')
  })
  const MyBalance = dynamic({
    app,
    models: () => [import('./models/mine/myBalance/balancePage')],
    component: () => import('./routes/Mine/MyBalance/BalancePage')
  })
  const BalanceRecord = dynamic({
    app,
    models: () => [import('./models/mine/myBalance/balancePage')],
    component: () => import('./routes/Mine/MyBalance/BalanceRecord')
  })
  const BalanceIntroduce = dynamic({
    app,
    // models: () => [import('./models/mine/myBalance/balancePage')],
    component: () => import('./routes/Mine/MyBalance/BalanceIntroduce')
  })
  const DepositRecord = dynamic({
    app,
    models: () => [import('./models/mine/myBalance/balancePage')],
    component: () => import('./routes/Mine/MyBalance/DepositRecord')
  })
  const ModifyPassword = dynamic({
    app,
    models: () => [import('./models/mine/centerPerson')],
    component: () => import('./routes/Mine/CenterPerson/ModifyPassword')
  })
  const MyOrder = dynamic({
    app,
    models: () => [import('./models/mine/myOrder/MyOrderPage'),import('./models/mine/myPage'),import('./models/mine/MyEva/EvaPage')],
    component: () => import('./routes/Mine/MyOrder/OrderPage')
  })
  const OrderTail = dynamic({
    app,
    models: () => [import('./models/mine/myOrder/MyOrderPage')],
    component: () => import('./routes/Mine/MyOrder/OrderTail')
  })
  const OrderDetails = dynamic({
    app,
    models: () => [import('./models/mine/myOrder/MyOrderPage')],
    component: () => import('./routes/Mine/MyOrder/OrderDetails')
  })
  const AddressManage = dynamic({
    app,
    models: () => [import('./models/mine/addressManage/addressPage')],
    component: () => import('./routes/Mine/AddressManage/AddressPage')
  })
  const EditConsignee = dynamic({
    app,
    models: () => [import('./models/mine/addressManage/addressPage')],
    component: () => import('./routes/Mine/AddressManage/EditConsignee')
  })
  const AddConsignee = dynamic({
    app,
    models: () => [import('./models/mine/addressManage/addressPage')],
    component: () => import('./routes/Mine/AddressManage/AddConsignee')
  })
  const AfterSaleService = dynamic({
    app,
    models: () => [import('./models/mine/AfterSaleService/AfterSaleService')],
    component: () => import('./routes/Mine/AfterSaleService/AfterSaleServicePage')
  })
  const CheckProgress = dynamic({
    app,
    models: () => [import('./models/mine/AfterSaleService/AfterSaleService')],
    component: () => import('./routes/Mine/AfterSaleService/CheckProgress')
  })
  const RecordDetails = dynamic({
    app,
    models: () => [import('./models/mine/AfterSaleService/AfterSaleService')],
    component: () => import('./routes/Mine/AfterSaleService/RecordDetails')
  })
  const ApplyForReturn = dynamic({
    app,
    models: () => [import('./models/mine/AfterSaleService/AfterSaleService')],
    component: () => import('./routes/Mine/AfterSaleService/ApplyForReturn')
  })
  const SubmitSuccess = dynamic({
    app,
    // models: () => [import('./models/mine/AfterSaleService/AfterSaleService')],
    component: () => import('./routes/Mine/AfterSaleService/SubmitSuccess')
  })
  const PersonalInformation = dynamic({
    app,
    models: () => [import('./models/mine/centerPerson')],
    component: () => import('./routes/Mine/CenterPerson/PersonalInformation')
  })
  const ChangePhone = dynamic({
    app,
    models: () => [import('./models/mine/centerPerson')],
    component: () => import('./routes/Mine/CenterPerson/ChangePhone')
  })
  const ChangePhone_Next = dynamic({
    app,
    models: () => [import('./models/mine/centerPerson')],
    component: () => import('./routes/Mine/CenterPerson/ChangePhone_next')
  })
  const InvitePage = dynamic({
    app,
    models: () => [import('./models/mine/Invite/InvitePage')],
    component: () => import('./routes/Mine/Invite/InvitePage')
  })
  const AwardDetails = dynamic({
    app,
    models: () => [import('./models/mine/Invite/InvitePage')],
    component: () => import('./routes/Mine/Invite/AwardDetails')
  })
  const MsgPage = dynamic({
    app,
    models: () => [import('./models/mine/MsgCenter/MsgPage')],
    component: () => import('./routes/Mine/MsgCenter/MsgPage')
  })
  const AfterRefund = dynamic({
    app,
    models: () => [import('./models/mine/AfterSaleService/AfterSaleService')],
    component: () => import('./routes/Mine/AfterSaleService/AfterRefund')
  })
  const ActivityMsg = dynamic({
    app,
    models: () => [import('./models/mine/MsgCenter/MsgPage')],
    component: () => import('./routes/Mine/MsgCenter/ActivityMsg')
  })
  const ServiceMsg = dynamic({
    app,
    models: () => [import('./models/mine/MsgCenter/MsgPage')],
    component: () => import('./routes/Mine/MsgCenter/ServiceMsg')
  })
  const SystemMsg = dynamic({
    app,
    models: () => [import('./models/mine/MsgCenter/MsgPage')],
    component: () => import('./routes/Mine/MsgCenter/SystemMsg')
  })
  const MsgDetails = dynamic({
    app,
    models: () => [import('./models/mine/MsgCenter/MsgPage')],
    component: () => import('./routes/Mine/MsgCenter/MsgDetails')
  })
  const ServePage = dynamic({
    app,
    models: () => [import('./models/mine/serverpage')],
    component: () => import('./routes/Mine/ServeCenter/ServePage')
  })
  const HelpContent = dynamic({
    app,
    models: () => [import('./models/mine/serverpage')],
    component: () => import('./routes/Mine/ServeCenter/HelpContent')
  })
  const SystemPage = dynamic({
    app,
    models: () => [import('./models/mine/myPage')],
    component: () => import('./routes/Mine/SystemSet/SystemPage')
  })
  const AboutUs = dynamic({
    app,
    component: () => import('./routes/Mine/SystemSet/AboutUs')
  })
  const Imprint = dynamic({
    app,
    models: () => [import('./models/mine/myPage')],
    component: () => import('./routes/Mine/SystemSet/Imprint')
  })
  const Feedback = dynamic({
    app,
    component: () => import('./routes/Mine/SystemSet/Feedback')
  })
  const LovePage = dynamic({
    app,
    models: () => [import('./models/mine/love')],
    component: () => import('./routes/Mine/MyLove/LovePage')
  })
  const SimilarGoodsPage = dynamic({
    app,
    models: () => [import('./models/mine/love')],
    component: () => import('./routes/Mine/MyLove/SimilarGoods')
  })
  const EvaPage = dynamic({
    app,
    models: () => [import('./models/mine/MyEva/EvaPage')],
    component: () => import('./routes/Mine/MyEva/EvaPage')
  })
  const EvaIntroduce = dynamic({
    app,
    // models: () => [import('./models/mine/MyEva/EvaPage')],
    component: () => import('./routes/Mine/MyEva/EvaIntroduce')
  })
  const NewEva = dynamic({
    app,
    models: () => [import('./models/mine/MyEva/EvaPage')],
    component: () => import('./routes/Mine/MyEva/NewEva')
  })
  const AdPage = dynamic({
    app,
    models: () => [import('./models/mine/MyAdRate/Adpage')],
    component: () => import('./routes/Mine/MyAdRate/AdPage')
  })
  const ConsumePage = dynamic({
    app,
    models: () => [import('./models/mine/ConsumePage/ConsumePage')],
    component: () => import('./routes/Mine/MyConsume/ConsumePage')
  })
  const EarningsRecord = dynamic({
    app,
    // models: () => [import('./models/mine/ConsumePage/ConsumePage')],
    component: () => import('./routes/Mine/MyConsume/EarningsRecord')
  })
  const CheckRecord = dynamic({
    app,
    // models: () => [import('./models/mine/ConsumePage/ConsumePage')],
    component: () => import('./routes/Mine/MyConsume/CheckRecord')
  })
  const ConsumeIntroduce = dynamic({
    app,
    // models: () => [import('./models/mine/ConsumePage/ConsumePage')],
    component: () => import('./routes/Mine/MyConsume/ConsumeIntroduce')
  })
  const AdRateDetails = dynamic({
    app,
    models: () => [import('./models/mine/MyAdRate/Adpage')],
    component: () => import('./routes/Mine/MyAdRate/AdRateDetails')
  })
  const AdRateExplain = dynamic({
    app,
    // models: () => [import('./models/mine/MyAdRate/Adpage')],
    component: () => import('./routes/Mine/MyAdRate/AdRateExplain')
  })
  const DepositWay = dynamic({
    app,
    models: () => [import('./models/mine/DepositWay/DepositWayPage')],
    component: () => import('./routes/Mine/DepositWay/ConsumePage')
  })
  const Alipay = dynamic({
    app,
    models: () => [import('./models/mine/DepositWay/DepositWayPage')],
    component: () => import('./routes/Mine/DepositWay/Alipay')
  })
  const AddAliPay = dynamic({
    app,
    models: () => [import('./models/mine/DepositWay/DepositWayPage')],
    component: () => import('./routes/Mine/DepositWay/AddAliPay')
  })
  const AddBankCard = dynamic({
    app,
    models: () => [import('./models/mine/DepositWay/DepositWayPage')],
    component: () => import('./routes/Mine/DepositWay/AddBankCard')
  })
  const BankCard = dynamic({
    app,
    models: () => [import('./models/mine/DepositWay/DepositWayPage')],
    component: () => import('./routes/Mine/DepositWay/BankCard')
  })
  const Withdrawals = dynamic({
    app,
    models: () => [import('./models/mine/DepositWay/DepositWayPage')],
    component: () => import('./routes/Mine/DepositWay/Withdrawals')
  })
  const Footprint = dynamic({
    app,
    models: () => [import('./models/mine/footprint')],
    component: () => import('./routes/Mine/MyFootprint')
  })
  {/*我的-end*/}
  {/*分类-start*/}
  const ClassifyPage = dynamic({
    app,
    models: () => [import('./models/classify/classifyPage')],
    component: () => import('./routes/Classify/ClassifyPage')
  })
  const ClassifyList = dynamic({
    app,
    models: () => [import('./models/classify/classifyList')],
    component: () => import('./routes/Classify/ClassifyList')
  })
  {/*分类-end*/}
  {/*艾家专区-start*/}
  const AJPage = dynamic({
    app,
    models: () => [import('./models/AJ/AJPage')],
    component: () => import('./routes/AJ/AJPage')
  })
  const AllAJ = dynamic({
    app,
    models: () => [import('./models/AJ/AJPage')],
    component: () => import('./routes/AJ/AJOfAll')
  })
  const ClassifyAJ = dynamic({
    app,
    models: () => [import('./models/AJ/AJPage')],
    component: () => import('./routes/AJ/ClassifyOfAJ')
  })
  const AJDetails = dynamic({
    app,
    models: () => [import('./models/AJ/AJIntroduce')],
    component: () => import('./routes/AJ/AJDetails')
  })
  const AJEva = dynamic({
    app,
    models: () => [import('./models/AJ/AJIntroduce')],
    component: () => import('./routes/AJ/AJEva')
  })
  {/*艾家专区-end*/}
  {/*专题-start*/}
  const SpecialPage = dynamic({
    app,
    models: () => [import('./models/special/specialPage')],
    component: () => import('./routes/Special/SpecialPage')
  })
  const SpecialDetail = dynamic({
    app,
    models: () => [import('./models/special/specialPage')],
    component: () => import('./routes/Special/SpecialDetail')
  })
  const SpecialFillComment = dynamic({
    app,
    models: () => [import('./models/special/specialPage')],
    component: () => import('./routes/Special/SpecialFillComment')
  })
  const SpecialCommentDetail = dynamic({
    app,
    models: () => [import('./models/special/specialPage')],
    component: () => import('./routes/Special/SpecialCommentDetail')
  })
  const SpecialAllComment = dynamic({
    app,
    models: () => [import('./models/special/specialPage')],
    component: () => import('./routes/Special/SpecialAllComment')
  })
  {/*专题-end*/}
  {/*搜索-start*/}
  const SearchPage = dynamic({
    app,
    models: () => [import('./models/Search')],
    component: () => import('./routes/Search')
  })
  {/*搜索-end*/}
  {/*购物流程-start*/}
  const ShoppingCart = dynamic({
    app,
    models: () => [import('./models/shopping/shoppingCart')],
    component: () => import('./routes/Shopping/ShoppingCart')
  })
  const PlaceOrder = dynamic({
    app,
    models: () => [import('./models/shopping/placeOrder')],
    component: () => import('./routes/Shopping/PlaceOrder')
  })
  const OrderAddress = dynamic({
    app,
    models: () => [import('./models/shopping/placeOrder')],
    component: () => import('./routes/Shopping/OrderAddress')
  })
  const PaymentOrder = dynamic({
    app,
    models: () => [import('./models/shopping/placeOrder')],
    component: () => import('./routes/Shopping/PaymentOrder')
  })
  const PaySuccess = dynamic({
    app,
    models: () => [import('./models/shopping/placeOrder')],
    component: () => import('./routes/Shopping/PaySuccess')
  })
  {/*购物流程-end*/}
  {/*秒杀-start*/}
  const SeckillPage = dynamic({
    app,
    models: () => [import('./models/seckill/seckillPage')],
    component: () => import('./routes/Seckill/SeckillPage')
  })
  {/*秒杀-end*/}
  {/*商品-start*/}
  const GoodsPage = dynamic({
    app,
    models: () => [import('./models/goods/goods')],
    component: () => import('./routes/Goods/GoodsPage')
  })
  const AdListPage = dynamic({
    app,
    models: () => [import('./models/goods/adList')],
    component: () => import('./routes/Goods/AdListPage')
  })
  {/*商品-end*/}
  {/*登录注册-start*/}
  const Login = dynamic({
    app,
    models: () => [import('./models/login')],
    component: () => import('./routes/Login/Login')
  })
  const Register = dynamic({
    app,
    models: () => [import('./models/login')],
    component: () => import('./routes/Login/Register')
  })
  const ForgetPassword = dynamic({
    app,
    models: () => [import('./models/login')],
    component: () => import('./routes/Login/ForgetPassword')
  })
  {/*登录注册-end*/}
  {/*独立图文页-start*/}
  const GoodsImageTextPage = dynamic({
    app,
    models: () => [import('./models/goods/goods')],
    component: () => import('./routes/GoodsImageText')
  })
  {/*独立图文页-end*/}
  {/*客服-start*/}
  const Customerservice = dynamic({
    app,
    component: () => import('./routes/CustomService')
  })
  {/*客服-end*/}
  {/*晒单页-start*/}
  const SharebackPage = dynamic({
    app,
    models: () => [import('./models/shareback')],
    component: () => import('./routes/SharebackPage')
  })
  {/*晒单页-end*/}
  return (
    <Router history={history}>
      <Switch>
         {/*首页-路由-START*/}
          <Route path="/" exact component={HomePage} />
          <Route path="/BrandPage" exact component={BrandPage} />{/*品牌艾家*/}
          <Route path="/RecommendPage" exact component={RecommendPage} />{/*促销管理*/}
        {/*首页-路由-END*/}
        {/*我的-路由*/}
          <Route path="/myPage" exact component={ MyPage } />
          <Route path="/mypage/CenterPerson" exact component={ CenterPerson } />{/*个人中心*/}
          <Route path="/mypage/CenterPerson/ModifyPassword" exact component={ ModifyPassword } /> {/*修改密码*/}
          <Route path="/mypage/CenterPerson/PersonalInformation" exact component={ PersonalInformation } />{/*个人信息*/}
          <Route path="/mypage/CenterPerson/ChangePhone" exact component={ ChangePhone } /> {/*修改手机*/}
          <Route path="/mypage/CenterPerson/ChangePhone_Next" exact component={ ChangePhone_Next } />{/*修改手机第二步*/}
          <Route path="/mypage/MyBalance" exact component={ MyBalance } /> {/*余额主页*/}
          <Route path="/mypage/MyBalance/BalanceRecord" exact component={ BalanceRecord } />{/*余额记录*/}
          <Route path="/mypage/MyBalance/DepositRecord" exact component={ DepositRecord } />{/*提现记录*/}
          <Route path="/mypage/MyOrder" exact component={ MyOrder } />{/*订单主页*/}
          <Route path="/mypage/AddressPage" exact component={ AddressManage } />{/*地址管理*/}
          <Route path="/mypage/AddressPage/EditConsignee" exact component={ EditConsignee } />{/*编辑收货人*/}
          <Route path="/mypage/AddressPage/AddConsignee" exact component={ AddConsignee } /> {/*新增收货人*/}
          <Route path="/mypage/MyOrder/OrderDetails" exact component={ OrderDetails } />{/*订单详情*/}
          <Route path="/mypage/MyOrder/OrderTail" exact component={ OrderTail } />    {/*订单跟踪*/}
          <Route path="/mypage/MyBalance/BalanceIntroduce" exact component={ BalanceIntroduce } />  {/*余额介绍*/}
          <Route path="/mypage/AfterSaleServicePage/AfterIndex" exact component={ AfterSaleService } /> { /*售后服务首页*/}
          <Route path="/mypage/AfterSaleServicePage/CheckProgress" exact component={ CheckProgress } /> { /*审核进度*/}
          <Route path="/mypage/AfterSaleServicePage/RecordDetails" exact component={ RecordDetails } />  {/*记录详情*/}
          <Route path="/mypage/AfterSaleServicePage/ApplyForReturn" exact component={ ApplyForReturn } />  {/*申请退货*/}
          <Route path="/mypage/AfterSaleServicePage/AfterRefund" exact component={ AfterRefund } />  {/*申请退款*/}
          <Route path="/mypage/AfterSaleServicePage/SubmitSuccess" exact component={ SubmitSuccess } />  {/*提交成功*/}
          <Route path="/mypage/Invite" exact component={ InvitePage } />  {/*邀请有礼主页*/}
          <Route path="/mypage/Invite/AwardDetails" exact component={ AwardDetails } /> { /*奖励明细*/}
          <Route path="/mypage/MsgPage" exact component={ MsgPage } />  {/*消息中心*/}
          <Route path="/mypage/MsgPage/MsgDetails" exact component={ MsgDetails } />  {/*消息中心*/}
          <Route path="/mypage/MsgPage/ActivityMsg" exact component={ ActivityMsg } />  {/*活动消息*/}
          <Route path="/mypage/MsgPage/ServiceMsg" exact component={ ServiceMsg } />  {/*服务消息*/}
          <Route path="/mypage/MsgPage/SystemMsg" exact component={ SystemMsg } />  {/*系统消息*/}
          <Route path="/mypage/ServePage" exact component={ ServePage } />  {/*服务中心*/}
          <Route path="/mypage/ServePage/HelpContent/:id" exact component={ HelpContent } />  {/*帮助内容*/}
          <Route path="/mypage/SystemPage" exact component={ SystemPage } /> { /*系统设置*/}
          <Route path="/mypage/SystemPage/AboutUs" exact component={ AboutUs } />  {/*关于我们*/}
          <Route path="/mypage/SystemPage/Imprint" exact component={ Imprint } /> { /*版本说明*/}
          <Route path="/mypage/SystemPage/Feedback" exact component={ Feedback } />  {/*意见反馈*/}
          <Route path="/mypage/EvaPage" exact component={ EvaPage } />  {/*评价主页*/}
          <Route path="/mypage/EvaIntroduce" exact component={ EvaIntroduce } /> { /*评价介绍*/}
          <Route path="/mypage/NewEva" exact component={ NewEva } />  {/*发布评价*/}
          <Route path="/mypage/LovePage" exact component={ LovePage } />  {/*我的收藏*/}
          <Route path="/mypage/LovePage/SimilarGoodsPage" exact component={ SimilarGoodsPage } /> {/*我的收藏下--相似商品--*/}
          <Route path="/mypage/Footprint" exact component={ Footprint } /> { /*我的足迹*/}
          <Route path="/mypage/AdPage" exact component={ AdPage } />  {/*我的广告费*/}
          <Route path="/mypage/AdPage/AdRateDetails" exact component={ AdRateDetails } />  {/*广告费详情*/}
          <Route path="/mypage/AdPage/AdRateExplain" exact component={ AdRateExplain } />  {/*广告费说明*/}
          <Route path="/mypage/ConsumePage" exact component={ ConsumePage } />  {/*消费主页*/}
          <Route path="/mypage/ConsumePage/EarningsRecord" exact component={ EarningsRecord } />  {/*收益记录*/}
          <Route path="/mypage/ConsumePage/CheckRecord" exact component={ CheckRecord } />  {/*考核记录*/}
          <Route path="/mypage/ConsumePage/ConsumeIntroduce" exact component={ ConsumeIntroduce } />  {/*消费说明*/}
          <Route path="/mypage/ConsumePages" exact component={ DepositWay } />  {/*提现方式主页*/}
          <Route path="/mypage/ConsumePages/Alipay" exact component={ Alipay } />  {/*支付宝*/}
          <Route path="/mypage/ConsumePages/AddAliPay" exact component={ AddAliPay } />  {/*绑定支付宝*/}
          <Route path="/mypage/ConsumePages/BankCard" exact component={ BankCard } />  {/*银行卡*/}
          <Route path="/mypage/ConsumePages/AddBankCard" exact component={ AddBankCard } />  {/*绑定银行卡*/}
          <Route path="/mypage/ConsumePages/Withdrawals" exact component={ Withdrawals } />  {/*提现页面*/}
        {/*我的-路由-END*/}

        {/*分类-路由-start-*/}
          <Route path="/ClassifyPage" exact component={ ClassifyPage } /> { /*全部分类*/  }
          <Route path="/ClassifyList/:menuId" exact component={ ClassifyList } />  {/*分类列表*/}
        {/*分类-路由-end-*/}

        {/*艾家-路由-start-*/}
          <Route path="/AJPage" exact component={ AJPage } />  {/*艾家首页*/}
          <Route path="/AJPage/AllAJ" exact component={ AllAJ } /> {/*全部艾家*/}
          <Route path="/AJPage/ClassifyAJ/:classifyId" exact component={ ClassifyAJ } />  {/*分类艾家*/}
          <Route path="/AJPage/AJDetails/:ajId" exact component={ AJDetails } /> {/*艾家详情*/}
          <Route path="/AJPage/AJEva/:commentId" exact component={ AJEva } /> {/*评论详情*/}
        {/*艾家-路由-end-*/}

        {/*购物流程*/}
          <Route path="/ShoppingCart" exact component={ ShoppingCart } /> {/*购物车*/}
          <Route path="/PlaceOrder" exact component={ PlaceOrder } /> {/*确认订单*/}
          <Route path="/PlaceOrder/OrderAddress" exact component={ OrderAddress } />  {/*订单地址管理*/}
          <Route path="/PaymentOrder" exact component={ PaymentOrder } /> {/*订单支付*/}
          <Route path="/PaySuccess" exact component={ PaySuccess } />    {/*支付成功*/}
        {/*购物流程-END*/}

        {/*专题-路由*/}
          <Route path="/SpecialPage" exact component={ SpecialPage } /> {/* 专题主页*/}
          <Route path="/SpecialPage/SpecialDetail/:SpecialId" exact component={ SpecialDetail } /> {/* 专题详情*/}
          <Route path="/SpecialPage/SpecialFillComment" exact component={ SpecialFillComment } /> {/* 专题填写评论*/}
          <Route path="/SpecialPage/SpecialCommentDetail" exact component={ SpecialCommentDetail } /> {/* 专题评论详情*/}
          <Route path="/SpecialPage/SpecialAllComment" exact component={ SpecialAllComment } /> {/* 专题全部评论*/}
        {/*专题-路由-END*/}

        {/*搜索-路由*/}
          <Route path="/SearchPage" exact component={ SearchPage } />
        {/*搜索-路由-END*/}

        {/*秒杀-路由*/}
          <Route path="/SeckillPage" exact component={ SeckillPage } />
        {/*秒杀-路由-END*/}

        {/*登录&&注册-路由*/}
          <Route path="/Login" exact component={ Login } /> {/* 登录*/}
          <Route path="/Register" exact component={ Register } />  {/* 注册*/}
          <Route path="/ForgetPassword" exact component={ ForgetPassword } />  {/* 找回密码*/}
        {/*登录&&注册-END*/}

        {/*商品-路由-start-*/}
          <Route path="/GoodsPage/:goodsId" exact component={ GoodsPage } />  {/*商品主页*/ }
          <Route path="/AdListPage/:adId" exact component={ AdListPage } />  {/*商品-广告费排行展示*/ }
        {/*商品-路由-end-*/}

        {/*独立图文-路由-start-*/}
          <Route path="/GoodsImageTextPage/:goodsId" exact component={ GoodsImageTextPage } />
        {/*独立图文-路由-end-*/ }

        {/*客服-路由-start-*/}
          <Route path="/Customerservice" exact component={ Customerservice } />
        {/*客服-路由-end-*/ }

         {/*晒单扫码进入-路由-start-*/}
          <Route path="/SharebackPage/:id" exact component={ SharebackPage } />
        {/*客服-路由-end-*/ }
      </Switch>
    </Router>
  );
}

export default RouterConfig;
