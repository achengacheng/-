import React from 'react';
import { connect } from 'dva';
import $ from 'jquery'
import HeaderReturn from '../components/PublicComponents/HeaderReturn'
const Customerservice=()=>{

	class Customerservice extends React.Component {
		render(){
			return(<div>
						<HeaderReturn head_title="客服中心" left_show='1'/>
						 <iframe frameBorder='0' scrolling='no' width="100%" src='https://hb358.udesk.cn/im_client/?web_plugin_id=23078' id="custIframe"></iframe>		
					</div>)

		}
		componentDidMount(){
			$('#custIframe').css({
				height:function(){
					return $(window).height()-$('#headerReturn').height()-30+'px'		
				},
				'margin-top':$('#headerReturn').height()+2+"px",
			})
		}
	}
	return <Customerservice/>
}

export default connect()(Customerservice)