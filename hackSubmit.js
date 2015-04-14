var jsonQA = {
	"裕泰茶馆老板叫":"王利发",
	"上海东濒哪个海":"东海",
	"宪兵司令部的处长姓":"沈",
	"小唐铁嘴是谁的儿子":"唐铁嘴",
	"小宋恩子是谁的儿子":"宋恩",
	"王大栓是王掌柜第几个儿子":"1",
	"谁是民族资本家":"秦仲义",
	"王大栓的女儿是":"王小花",
	"谁请客吃饭":"小明",
	"小明买了几棵圣诞树":"1",
	"小白有几个儿子":"2",
	"北京拥有多少年历史":"3000",
	"谁是精英知识分子":"孟晓骏",
	"成东青是第几次高考才考上燕大":"3",
	"大提琴属于什么乐器":"弓弦",
	"诺贝尔奖共设有几个奖项":"5",
	"谁去了济南":"铁扇",
	"小明买了几种颜色的帽子":"20",
	"广东省会":"广州"
};
window.alert = function (msg) {console.log("alert:" + msg)};
jQuery.noConflict();
function getResultLen(qst) {
	if(qst.indexOf("（一个") != -1) {
		return 1;
	} else if(qst.indexOf("（两个") != -1) {
		return 2;
	} else if(qst.indexOf("（三个") != -1) {
		return 3;
	} else if(qst.indexOf("（四个") != -1) {
		return 4;
	} else if(qst.indexOf("（五个") != -1) {
		return 5;
	} else if(qst.indexOf("（阿拉伯数字") != -1) {
		return -1;
	}
}
function getResult() {
	var keyword;
	var result = "";
	var question = jQuery("#answer").parent().text();
	var resultlen = getResultLen(question) + 1;
	var articlehtml = jQuery(".honor-layout-topic span:eq(1)").html();
	var article = articlehtml.substring(0, articlehtml.indexOf("<"));
	var keywordlen = 3;
	var qstwords = ["什么", "哪", "多少","几"];
//	var qstwords2 = ["谁"];
	result = matchAnswer(question);
	for (var i = 0; i < qstwords.length; i++) {
		var qstkey = qstwords[i];
		if(question.indexOf(qstkey) != -1) {
			if(parseResult(qstkey)) {
				break;
			}
		}
	}
	if(result.length == 0) {
		markArticle();
		//jQuery("#answer").after("<div style='color:red;font-weight:bolder'>获取失败，请手动填写！</div>"); //提示暂时不加没用
	}
	/**
	 * 直接在题库中搜索答案
	 * @param question
	 * @returns {*}
	 */
	function matchAnswer(question) {
		for(var k in jsonQA) {
			if(question.indexOf(k) != -1) {
				alert(jsonQA[k]);
				return jsonQA[k];
			}
		}
	}
	function parseResult(qstkey) {
		keyword = question.substring(question.indexOf(qstkey) - keywordlen, question.indexOf(qstkey));
		if(article.indexOf(keyword) == -1 && keyword.indexOf("了") == (keywordlen - 1)) {/*有"了"*/
			keyword = keyword.substring(0, keyword.indexOf("了"));/*去掉"了"*/
		}
//		console.log(keyword);
//		console.log(resultlen);
		if(article.indexOf(keyword) != -1) {
			var startcount = article.indexOf(keyword) + keyword.length;
			if(resultlen > 0) {/*截取字符,答案在后面*/
				var endcount = startcount + resultlen + 1;
				result = article.substring(startcount, endcount);
				if(result.indexOf("了") == 0) {/*去掉"了"*/
					result = result.substring(1);
				} else {
					result = result.substring(0, resultlen - 1);
				}
				return true;
			} else if (resultlen == 0) {/*数字*/
				result = parseInt(article.substring(startcount));
				return true;
			}
		}
		return false;
	}
	function markArticle() {
		var newarticle = article;
		for(var i = 0; i < question.length; i++) {
			var w = question[i];
			newarticle = newarticle.replace(w, "<span style='color:blue;font-weight:bold;'>" + w + "</span>");
		}
//		console.log(article);
//		console.log(newarticle);
		jQuery(".honor-layout-topic span:eq(1)").html(articlehtml.replace(article, newarticle));
	}
	return result;
}
function hack() {
	if(jQuery("#countdown").text() == "000000" && !jQuery("#countdown").data("click")) {
		jQuery(".honor-btn-go").click();
		jQuery("#countdown").data("click", true);
	}
	if(jQuery("#answer").length > 0) {
		jQuery("#answer").val(getResult());
		jQuery("#submit_answer").click();
	}
}
jQuery(function(){
	window.setInterval(hack, 50);
});
