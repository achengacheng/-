import React from 'react';
import styles from '../../../style/mine/SystemSet/Imprint.css';
import $ from 'jquery'

const Imprint = ({listData}) => {
	class Imprint extends React.Component{		
		render () {
            if(listData){
                return (
                   <div>
                       {listData?listData.map(function(item,index){
                               return(
                                    <div className={styles.helpsCard} key={index}>
                                        <div className={styles.helpsHead}>
                                            <p>{item.version}</p>
                                            <p>{item.createDate}</p>
                                        </div>
                                        <div className={styles.helpsContent}>
                                            <p className='describeText'></p>
                                        </div>
                                    </div>    
                               )
                           }):''
                       }
                   </div>
                    // <div className={styles.helpsCard}>
                    //     <div className={styles.helpsHead}>
                    //         <p>V 2.0.0</p>
                    //         <p>2017-05-01</p>
                    //     </div>
                    //     <div className={styles.helpsContent}>
                    //         <p>1.购物满88元包邮，48小时退款，30天无忧退货购物满88元包邮，48小时退款，30天无忧退货购物满88元包邮，48小时退款，30天无忧退货</p>
                    //         <p>2.购物满88元包邮，48小时退款，30天无忧退货</p>
                    //         <p>3.购物满88元包邮，48小时退款，30天无忧退货</p>
                    //         <p>4.购物满88元包邮，48小时退款，30天无忧退货</p>
                    //     </div>
                    // </div>    
                )
            }else{
                return(
                    <div></div>
                )
            }
		}
    componentDidMount(){
      if(listData){
        for(var i=0 ;i<listData.length;i++){
              $('.describeText').eq(i).html(function(){
                  return listData[i].describe
              })  
        }
      }
      
    }
	}	
	return <Imprint />
};
export default Imprint;