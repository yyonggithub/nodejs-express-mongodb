$(function () {
	var user = {
		name: "测试",
		sex: '男',
		age: 28
	};

	$("#sub").on('click', function () {
		var name = $("#people-name").val()
		var age = $("#people-age").val()
		var sex = $("#people-sex").val()
		if (name !== "") {
			user.name = $("#people-name").val();
		}
		user.sex = $("#people-sex").val();
		if (sex !== "") {
			user.age = $("#people-age").val();
		}
		$.ajax({
			url: '/add',
			data: user,
			type: 'post',
			success: function (e) {
				console.log(e);
				var result = JSON.parse(e);
				if (result.code === "0") {
					location.replace(location.href);
				}
			},
			error: function (e) {
				console.log(e);
			}
		})
	});

	$(".del").on("click", function (e) {
		// e.target.
		// console.log(e);
		var id = $(this).parent()[0].attributes[0].value;
		// console.log($(this).parent()[0].attributes[0].value)
		$.ajax({
			url: "/del",
			data: {
				id: id
			},
			type: "post",
			success: function (e) {
				console.log(e);
				var result = JSON.parse(e);
				if (result.code === "0") {
					location.replace(location.href);
				} else {
					console.log(result)
				}
			},
			err: function (e) {
				console.log(e);
			}
		})
	});

	var ths = $(".ok");
	ths.on('click', thclick);
	function thclick() {
		console.log(this);
		var th = $(this);
		var text = th.text();
		th.html("");
		var ipt = $("<input>");
		ipt.attr("value", text);
		// ipt.attr('class','')
		ipt.blur(function (event) {
			if (confirm("是否确认修改")) {
				var ipttext = ipt.val();
				var tdNode = ipt.parent();
				tdNode.html(ipttext);
				tdNode.click(thclick);
			}
		})
		th.append(ipt);
		var inputdom = ipt.get(0);
		inputdom.select();
		th.unbind('click');
	};

	$(".updata").on('click', function (e) {
		var tr = $(this).parent().parent();
		var name = tr.children(".th-name")[0].innerText;
		var age = tr.children(".th-age")[0].innerText;
		var sex = tr.children(".th-sex")[0].innerText;
		user = {
			name: name,
			sex: sex,
			age: age
		};
		$.ajax({
			url: '/updata',
			data: user,
			type: "post",
			success: function (e) {
				console.log(e);
				var result = JSON.parse(e);
				if (result.code === "0") {
					location.replace(location.href);
				} else {
					console.log(result)
				}
			},
			error: function (e) {
				console.log(e);
			}
		})
	})
})