import React from 'react';
import styles from '../../style/AJ/AJ.css';

var more,singeTo,data;
const AJOfAll = ({ pageData,chooseToGo,type }) => {
	if(type==="AJ"){/*来自艾家专区*/
		singeTo = "AJDetails";
		data = pageData;
		return (
			<div>
				{data.map(function(item, index) {
				    return 	<div className={styles.AJModule} key={index}>
								<div className={styles.AJtitle}>
									<p>{item.name}</p>
									<span onClick={() => chooseToGo("ClassifyAJ/"+item.id)}>更多</span>
								</div>
								<ul className={styles.AJMain}>
									{item.merchantDetail.map(function(k,i){
											if(i>7){
												item.merchantDetail.slice(0,7).map(function(a,b){
													return  <li key={i} onClick={() => chooseToGo("AJDetails/"+a.id)} >
																<div>
																	<img src={a.pictureUrl} alt={a.storeName} />
																</div>
																<p>{a.storeName}</p>
															</li>
												})
											}else{
												return  <li key={i} onClick={() => chooseToGo("AJDetails/"+k.id)} >
															<div>
																<img src={k.pictureUrl} alt={k.storeName} />
															</div>
															<p>{k.storeName}</p>
														</li>
											}
											return false
										})
									}
								</ul>
							</div>
					})
				}
			</div>
		)
	}else if(type==="Classify"){/*来自分类*/
		more = "ClassifyList";
		singeTo = "ClassifyList";
		data = pageData;
		return (
			<div>
				{data.map(function(item, index) {
				    return 	<div className={styles.AJModule} key={index}>
								<div className={styles.AJtitle}>
									<p>{item.name}</p>
									<span onClick={() => chooseToGo(more,item.name,item.id)}>更多</span>
								</div>
								<ul className={styles.AJMain}>
									{item.childrens.map(function(k,i){
										return  <li key={i} onClick={() => chooseToGo(singeTo,k.name,k.id)} >
													<div>
														<img src={k.icon} alt={k.name} />
													</div>
													<p>{k.name}</p>
												</li>
										})
									}
								</ul>
							</div>
					})
				}
			</div>
		)
	}
}

export default AJOfAll
