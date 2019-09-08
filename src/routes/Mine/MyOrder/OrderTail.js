import React from 'react';
import styles from '../../../style/mine/MyOrder/MyOrder.css';
import Header from '../../../components/PublicComponents/HeaderReturn';// 公共头部
import OrderTails from '../../../components/Mine/MyOrder/OrderTail'
import { connect } from 'dva';

const OrderTail = ({MyOrderData,dispatch}) => {
    console.log(MyOrderData.trace_datas)
    //第三方物流信息接入
    function sentRes(url,data,method,fn){
        data=data||null;
        if(data==null){
            var content=require('querystring').stringify(data);
        }else{
            var content = JSON.stringify(data); //json format
        }
    
        var parse_u=require('url').parse(url,true);
        var isHttp=parse_u.protocol=='http:';
        var options={
            host:parse_u.hostname,
            port:parse_u.port||(isHttp?80:443),
            path:parse_u.path,
            method:method,
            headers:{
                'Content-Type':'application/json',
                'Content-Length':Buffer.byteLength(content,"utf8"),
                'Trackingmore-Api-Key':'7499581b-fe8e-423f-9c59-0f1eda58cc2d'
            }
        };
        var req = require(isHttp?'http':'https').request(options,function(res){
            var _data='';
            res.on('data', function(chunk){
                _data += chunk;
            });
            res.on('end', function(){
                fn!=undefined && fn(_data);
            });
        });
        req.write(content);
        req.end();
    }
    function aaa() {  
        var qs = window.location.href.split("?")[1];
        var  args = {}, 
            items = qs.length ? qs.split("&") : [], 
            item = null,
            len = items.length;
        for(var i = 0; i < len; i++) {
          item = items[i].split("=");
          var name = decodeURIComponent(item[0]),
            value = decodeURIComponent(item[1]);
          if(name) {
            args[name] = value;
          }
        }
        return args;
	  }
	class OrderTail extends React.Component{
        constructor(props){
            super(props);
            this.state={
                orderTail:MyOrderData.trace_datas
            }
        }
		render () {
            console.log(this.state.orderTail,333)
            let that=this;
            if(MyOrderData.traceLoad==true){
                return (
                    <div>
                        <Header head_title='订单跟踪' left_show='1' right_icon='2'/>
                        <div className={styles.tailTop}>
                            <div className={styles.tailImg}>
                                <img src={MyOrderData.trace_datas.picture} alt=""/>
                                <p>{this.state.orderTail.goodsNum}件商品</p>
                            </div>
                            <div className={styles.tailMsg}>
                                <p>配送企业：{this.state.orderTail.expressor}</p>
                                <p>快递单号：{this.state.orderTail.expressNo}</p>
                                {/* <p>联系电话：{this.state.orderTail.phone}</p> */}
                            </div>
                        </div>
                        <div className={styles.tailLine}>
                        {/* {
                            (function(){
                                if(that.state.orderTail.traceStatus){
                                    return(
                                        <div className={styles.tailLineSon1}>
                                            <p className={that.state.orderTail.traceStatus=='pending'?styles.tailCur:null}>已发货</p>
                                            <p className={that.state.orderTail.traceStatus=='transit'?styles.tailCur:null}>运输中</p>
                                            <p className={that.state.orderTail.traceStatus=='pickup'?styles.tailCur:null}>派件中</p>
                                            <p className={that.state.orderTail.traceStatus=='delivered'?styles.tailCur:null}>已签收</p>
                                        </div>
                                    )
                                }else{
                                    return(
                                        <div className={styles.tailLineSon1}>
                                            <p className={styles.tailCur}>已发货</p>
                                            <p className={that.state.orderTail.traceStatus=='transit'?styles.tailCur:null}>运输中</p>
                                            <p className={that.state.orderTail.traceStatus=='pickup'?styles.tailCur:null}>派件中</p>
                                            <p className={that.state.orderTail.traceStatus=='delivered'?styles.tailCur:null}>已签收</p>
                                        </div>
                                    )
                                }
                            })()
                        } */}
                            <div className={styles.tailLineSon1}>
                                <p className={this.state.orderTail.traceStatus=='pending'?styles.tailCur:null}>已发货</p>
                                <p className={this.state.orderTail.traceStatus=='transit'?styles.tailCur:null}>运输中</p>
                                <p className={this.state.orderTail.traceStatus=='pickup'?styles.tailCur:null}>派件中</p>
                                <p className={this.state.orderTail.traceStatus=='delivered'?styles.tailCur:null}>已签收</p>
                            </div>
                            <div className={styles.tailLineSon2}>
                                <div></div>
                                <p></p>
                                <div></div>
                                <p></p>
                                <div></div>
                                <p></p>
                                <div className={styles.tailCurDot}></div>
                            </div>
                            <div className={styles.tailLineSon3}>
                                {/* <p>北京市</p>
                                <p>深圳市</p> */}
                            </div>
                        </div>
                        <div className={styles.tailBox}>
                        <div className={styles.tailBoxHead}>物流详情</div>
                        <div className={styles.tailBoxDe}>
                            {
                                this.state.orderTail.expressDetail.map(function(item,index){
                                    return(
                                        <div>
                                            <div>
                                                <div className={styles.tailDotCur}></div>
                                                <div className={styles.tailDotSaw}></div>
                                            </div>
                                            <div className={styles.tailheight}>
                                                <p>{item.description}</p>
                                                <p>{item.time}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    </div>
                )
            }else{
                return(
                    <div></div>
                )
            }
        }
        componentDidMount (){
            if(MyOrderData.traceLoad==false){
                dispatch({
					type:'MyOrderData/traceMsg',
					orderId:aaa().id
				})
            }
        }
	}	
	return <OrderTail />
};
export default connect(({ MyOrderData }) => ({
    MyOrderData
  }))(OrderTail);