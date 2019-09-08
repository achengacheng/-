import React from 'react';
import styles from '../../../style/mine/MyConsume/ConsumePage.css';

const CheckRecordCard = ({type}) => {
	class CheckRecordCard extends React.Component{	
        constructor(props) {
            super(props); 
            this.state = {
                type:false
            }
        }	
		render () {
			return (
				<div>
                    <div className={styles.recordListHeader}>
                        <div className={styles.recordListTimetype}>
                            <img src="/src/assets/Mine-time.png" alt=""/> &nbsp;
                            <p> 2017年10月</p>
                        </div>
                        <div className={styles.recordTag}>
                            <div>
                                <p>消费金额(元)</p>
                                <p className={type?styles.recordTagGreen:styles.recordTagRed}>420.00</p>
                            </div>
							<div>
                                <p>考核金额(元)</p>
                                <p className={styles.recordPrice}>420.00</p>
                            </div>
                            {
                                type?<img src="/src/assets/Mine-qualified.png" alt="" className={styles.recordRightImg}/>:<img src="/src/assets/Mine-Unqualified.png" alt="" className={styles.recordRightImg}/>
                            }
                        </div>
                    </div>
				</div>
			)
		}
	}	
	return <CheckRecordCard />
};
export default CheckRecordCard;