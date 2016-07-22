var t, s;
$(document).ready(function() {
	showSmallBag(true);
	showMei()
});

function showSmallBag(a) {
	clearTimeout(s);
	t = setTimeout(function() {
		showSmallBagDelay(a)
	}, 500)
}

function showSmallBagDelay(b) {
	var a = $("#pop_up_shopping");
	var d = $("#countBank");
	var c = $("#contextPath").val();
	$.ajax({
		type: "POST",
		url: c + "/shoppingBag/smallBag",
		data: {
			showCountAndAmount: b
		},
		success: function(h) {
			var g = h.count;
			d.html(g);
			if (!b) {
				var f = getBagHtml(h);
				$("#pop_up_shopping").html(f);
				a.stop().slideDown()
			} else {
				$("#shopping_quantity").text(h.count);
				$("#shopping_amount").text("¥" + h.amount)
			}
			var e = $(".my_product").size();
			if (e > 3) {
				loadScrollSmallBag("my_product_container")
			}
			s = setTimeout(function() {
				a.stop().slideUp()
			}, 3000)
		}
	})
}

function alwaysShow() {
	clearTimeout(s);
	$("#pop_up_shopping").show()
}

function hideSmallBag() {
	clearTimeout(t);
	clearTimeout(s);
	s = setTimeout(function() {
		$("#pop_up_shopping").stop().slideUp()
	}, 500)
}

function closeSmallBag(a) {
	$("#" + a).stop().slideUp(100)
}

function addProduct(e, d, g, b, f) {
	var a = 1;
	var c = function(l, k, n, h, m) {
		var i = $.Deferred();
		var j = $("#contextPath").val();
		if (null == m || undefined == m) {
			m = ""
		}
		$.ajax({
			type: "POST",
			url: j + "/shoppingBag/addProduct",
			async: false,
			data: {
				productId: l,
				eventId: k,
				brandId: n,
				shoppingNum: h,
				productType: m
			},
			success: function(p) {
				var o = p.result;
				switch (o) {
					case -1:
						a = -1;
						break;
					case -2:
						a = -2;
						break;
					case -3:
						a = -3;
						break;
					case -4:
						a = -4;
						break;
					case -5:
						a = -5;
						break;
					case -8:
						a = -8;
						break;
					case -9:
						a = -9;
						break;
					default:
						showSmallBag();
						break
				}
			},
			complete: function() {
				i.resolve()
			}
		});
		return i.promise()
	};
	c(e, d, g, b, f);
	return a
}

function delSamllBagProduct(b) {
	var a = $("#contextPath").val();
	$.ajax({
		type: "POST",
		url: a + "/shoppingBag/delProduct",
		data: {
			bagDetailId: b
		},
		success: function(c) {
			showSmallBag()
		}
	})
}

function getBagHtml(c) {
	var j = $("#basePath").val();
	var e = "<div styel='display:block;'><a class='button_close' href='javascript:void(0);' onclick=closeSmallBag('pop_up_shopping');>关闭</a></div>";
	if (c.productList.length == 0) {
		e += "<div class='inner_none' style='display:display;'>购物袋暂无商品</div>";
		$("#shopping_quantity").text(0);
		$("#shopping_amount").text("¥0.00")
	} else {
		e += "<div class='inner_have'><div class='my_product_container' id='my_product_container'><ul>";
		var f = c.count;
		for (var d = 0; d < c.productList.length; d++) {
			var h = c.productList[d].productName;
			var a = c.productList[d].detailType;
			var b = 1;
			if (2 == a) {
				b = 4
			} else {
				if (3 == a) {
					b = 3
				}
			}
			var g = "";
			if (c.productList[d].detailType == "2") {
				g = "<a>"
			} else {
				g = "<a href='" + j + "/silo/" + c.productList[d].url1 + "/" + c.productList[d].url2 + "/" + c.productList[d].url3 + ".html'>"
			}
			e += "<li class='my_product'><span class='my_product_img'>" + g + " <img title='" + c.productList[d].productName + "' alt='" + c.productList[d].productName + "' src='" + c.productList[d].jsImage + "'></a></span>";
			if (2 != a) {
				e += "<a class='my_product_delete' href='javascript:void(0);' onclick=delSamllBagProduct('" + c.productList[d].shoppingProductId + "')>删除</a>"
			}
			e += "<ul><li>" + g + h + "</a></li><li>" + c.productList[d].productSize + "</li><li><span>" + c.productList[d].shoppingCount + "</span> x <span>¥" + c.productList[d].price + "</span></li></ul></li>"
		}
		e += "</ul></div><div class='subtotal'>购物袋小计：<span style='margin-right:15px;'>¥" + c.amount + "</span></div><a class='my_product_button' href='" + j + "/checkout/cart'>结算</a></div>";
		$("#shopping_quantity").text(f);
		$("#shopping_amount").text("¥" + c.amount)
	}
	e += "</div>";
	return e
}

function getBankCount(c) {
	var b = 0;
	for (var a = 0; a < c.productList.length; a++) {
		b = b + c.productList[a].shoppingCount
	}
	return b
}

function loadScrollSmallBag(a) {
	$("." + a).jscroll({
		W: "3.5px",
		BgUrl: "",
		Bg: "right #e7e7e7 repeat-x",
		Bar: {
			Pos: "up",
			Bd: {
				Out: "#000 background-color #000",
				Hover: "#000 "
			},
			Bg: {
				Out: "-45px 0 repeat-x #000",
				Hover: "-58px 0 repeat-x  #000 pointer",
				Focus: "-71px 0 repeat-x  #000"
			}
		},
		Btn: {
			btn: false,
			uBg: {
				Out: "0 0 ",
				Hover: "-15px 0",
				Focus: "-30px 0"
			},
			dBg: {
				Out: "0 -15px",
				Hover: "-15px -15px",
				Focus: "-30px -15px"
			}
		},
		Fn: function() {}
	})
}
$(window).scroll(function() {
	var a = $(window).scrollTop();
	if (a >= 160) {
		$("#navBarId").removeClass();
		$("#navBarId").addClass("nav_container nav_container_top")
	} else {
		$("#navBarId").removeClass();
		$("#navBarId").addClass("nav_container")
	}
});

function toLogin() {
	var a = $("#contextPath").val();
	var b = document.location.href;
	b = base64encode(b);
	location.href = a + "/user/tologinpage?callbackUrl=" + b
}

function showMei() {
	$("#pup_mei").live("mouseover", function() {
		$(this).find(".pop_up_myGlamour").show()
	});
	$("#pup_mei").live("mouseout", function() {
		$(this).find(".pop_up_myGlamour").hide()
	});
	$("#pup_mei li:eq(0)").live("click", function() {
		window.location.href = $("#contextPath").val() + "/myMeiOrders/myOrderList"
	});
	$("#pup_mei li:eq(1)").live("click", function() {
		window.location.href = $("#contextPath").val() + "/myComment/myNotComment"
	});
	$("#pup_mei li:eq(2)").live("click", function() {
		window.location.href = $("#contextPath").val() + "/myConponsMessage/intomyconpons"
	});
	$("#pup_mei li:eq(3)").live("click", function() {
		window.location.href = $("#contextPath").val() + "/personInfo/showPersonInfo"
	});
	$("#pup_mei li:eq(4)").live("click", function() {
		window.location.href = $("#contextPath").val() + "/userAddress/userAddressshow"
	});
	$("#pup_mei li:eq(5)").live("click", function() {
		window.location.href = $("#contextPath").val() + "/personInfo/showPersonInfo"
	})
}

function clicksina() {
	var a = $("#contextPath").val();
	$.ajax({
		type: "POST",
		url: a + "/checkout/getShareWebsiteRecord",
		data: {
			websiteType: "1"
		},
		success: function(c) {
			var b = c.result
		}
	})
}

function shoppingSkipBag() {
	var a = $("#contextPath").val();
	var b = isLogins();
	if (b != null && b != "nologin") {
		location.href = a + "/checkout/cart"
	} else {
		var a = $("#contextPath").val();
		var c = document.location.href;
		c = base64encode(c);
		location.href = a + "/user/tologinpage?callbackUrl=" + c
	}
}

function illegalChar(b) {
	var a = /^([\u4E00-\u9FA5a-zA-Z0-9._-])*$/;
	if (a.test(b)) {
		return false
	} else {
		return true
	}
};