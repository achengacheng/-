import React from 'react';
import Header from '../../../components/PublicComponents/HeaderReturn';// 公共头部
import styles from '../../../style/mine/Invite/InvitePage.css'

const InviteNumber = () => {
	class InviteNumber extends React.Component{		
		render () {
			return (
				<ul className={styles.InviteBox}>
                    <li>
                        <div className={styles.InviteIcon}>
                            <img src="/src/assets/Mine-inviteIcon.png" alt=""/>
                            <div>
                                <p className={styles.InviteNewName}>注册新用户</p>
                                <p>187****9999</p>
                            </div>
                        </div>
                        <div className={styles.InviteLineTime}>
                            <p className={styles.InviteNewMoney}>+100</p>
                            <p>2017-10-12 10:00</p>
                        </div>
                    </li>
                    <li>
                        <div className={styles.InviteIcon}>
                            <img src="/src/assets/Mine-inviteIcon.png" alt=""/>
                            <div>
                                <p className={styles.InviteNewName}>注册新用户</p>
                                <p>187****9999</p>
                            </div>
                        </div>
                        <div className={styles.InviteLineTime}>
                            <p className={styles.InviteNewMoney}>+100</p>
                            <p>2017-10-12 10:00</p>
                        </div>
                    </li>
                    <li>
                        <div className={styles.InviteIcon}>
                            <img src="/src/assets/Mine-inviteIcon.png" alt=""/>
                            <div>
                                <p className={styles.InviteNewName}>注册新用户</p>
                                <p>187****9999</p>
                            </div>
                        </div>
                        <div className={styles.InviteLineTime}>
                            <p className={styles.InviteNewMoney}>+100</p>
                            <p>2017-10-12 10:00</p>
                        </div>
                    </li>
                </ul>
			)
		}
	}	
	return <InviteNumber />
};
export default InviteNumber;