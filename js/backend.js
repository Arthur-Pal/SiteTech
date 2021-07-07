$(function () {
	//cctv 關閉任何的lightbox
	$("#mask,.lg-bot .btn-cancel").on("click", function () {
		$("#mask,.lg-box").fadeOut(300);
	});

	//cctv確認刪除訊息
	$(".js-del-confirm").on("click", function () {
		$("#lgMesg,#mask").fadeIn(300);
	});
	

	//打開lightbox
	$(".js-del-confirm").on("click", function () {
		$("#lgMesg,#mask").fadeIn(300);
	});
	$("#btnOpenBig").on("click", function () {
		$("#lgBig,#mask").fadeIn(300);
	});
	$("#btnOpenfull").on("click", function () {
		$("#lgfull,#mask").fadeIn(300);
	});

	var winW = $('body, html').width();
	var switchNav = 0;
	//for mobile
	$('#closeNav').on('click', function () {
		if (winW < 1024) {
			if (switchNav === 0) {
				$('.side-nav').animate({ height: '100%' }, 300);
				switchNav = 1;
			} else {
				$('.side-nav').animate({ height: '41px' }, 300);
				switchNav = 0;
			}
		} else {
			//側邊欄選單
			$('#closeNav').animate({ right: '12px' }, 300);
			$('.side-nav').animate({ width: '0' }, 300);
			$('.btn-side-open').animate({ left: '0' }, 400);

			$('#openNav').on('click', function () {
				$('#closeNav').animate({ right: '12px' }, 300);
				$('.side-nav').animate({ width: '180px' }, 300);
				$('.btn-side-open').animate({ left: '-26px' }, 400);
			});
		}
	});
	//mobile
	var topMenu = 0;
	$('.m-top-menu').on('click', function () {
		if (topMenu === 0) {
			$('.sub-system').show();
			topMenu = 1;
		} else {
			$('.sub-system').hide();
			topMenu = 0;
		}
	});

	$(window).on('load', function () {
		//remove notic
		$("#closeNotic").on("click", function () {
			$(".err-notic-box").hide();
		});
	})
	$(window).resize(function () {
		winW = $('body, html').width();
		$('.side-nav,.sub-system').removeAttr('style');
		switchNav = 0;
		topMenu = 0;
	});



	//打開次項目
	$(".nav-sub-item").on('click', function () {
		$(this).parent().find('.sub-nav').slideToggle(300);
		if ($(this).parent().find('.nav-sub-item').hasClass('act')) {
			$(this).parent().find('.nav-sub-item').removeClass('act');
			console.log(false);
		} else {
			$(this).parent().find('.nav-sub-item').addClass('act');
			console.log(true);
		}
	});

	//展開收合
	$(".unfold-item").on("click", function () {
		if ($(this).parent().find(".unfold-cont").is(":hidden") == true) {
			$(this).addClass("fold-open");
			$(this).find("i").removeClass("fa-plus").addClass("fa-minus");
			$(this).parent().find(".unfold-cont").slideDown(300);
		} else {
			$(this).removeClass("fold-open");
			$(this).find("i").removeClass("fa-minus").addClass("fa-plus");
			$(this).parent().find(".unfold-cont").slideUp(300);
		}
	});
	//全選
	$(".js-checkAll").on('change', function () {
		if ($(this).is(':checked')) {
			// console.log('true');
			$(this).parent().parent().parent().parent().parent().find("input[type='checkbox']").prop("checked", true);
		} else {
			// console.log('false');
			$(this).parent().parent().parent().parent().parent().find("input[type='checkbox']").prop("checked", false);
		}
	});


	//上傳檔案
	$('#uploadFile').change(function () {
		var filename = $(this).val();
		var lastIndex = filename.lastIndexOf("\\");
		if (lastIndex >= 0) {
			filename = filename.substring(lastIndex + 1);
		}
		$('#fileNameBox').text(filename);
	});

	$("#uploadMultiple").change(function(e){
		uploadMultiple(this,'preViewList');
	});
	$("#EditUploadMultiple").change(function(e){
		uploadMultiple(this,'editPreViewList');
	});
	

	//增加標籤
	$('#btnTagAdd').on('click', function () {
		$('#tagCreat').show();
	});
	$('#btnTagAdd2').on('click', function () {
		$('#tagCreat2').show();
	});

	

	// 判斷點擊別的地方會關閉
	// document.addEventListener('click',(e)=>{
	// 	let getId = e.target.className;
	// 	console.log('點到',getId);
	// 	if( getId != 'selected-ui' && getId != 'sel-cus-sub'){
	// 		$('.sel-cus-sub').hide();	
	// 	}
	// });


});
//自定義下拉單
function queryItemDate(selTargetItem, actName, checkBoxList) {
	actName.addEventListener('click',(e)=>{
		if( checkBoxList.style.display === 'none' || checkBoxList.style.display === ''){
			checkBoxList.style.display = 'flex';
		}else{
			checkBoxList.style.display = 'none';
		}
	});
	// 如不需要取得內容文字，則不需要click
	// for (let i = 0; i < selTargetItem.length; i++) {
	// 	selTargetItem[i].addEventListener('click', (e) => {
	// 		console.log(e);
	// 		// e.preventDefault()
	// 		e.stopPropagation();
	// 		if( e.target.tagName.toLowerCase() === 'label'){ //避開冒泡事件
	// 			const getData = e.target.getAttribute('data-val');
    //             console.log('👉 | selTargetItem[i].addEventListener | getData', getData)
	// 		}
	// 		return false;
	// 	}, false)
	// }
}

//上傳多張圖片
function uploadMultiple(input,target){
	if (input.files && input.files.length >= 0) {
		$('#'+target).addClass('previews-photo');
		for(var i = 0; i < input.files.length; i ++){
			const fileName = input.files[i].name;
			// console.log(fileName)
			var reader = new FileReader();
			reader.onload = function (e) {
				// console.log(e);
				var uploadImgItem = '<li>'+
						'<div class="del-photo" title="刪除" alt="刪除" onclick="$(this).parent().remove()"></div>'+
						'<img src=" '+ e.target.result + ' " alt="">'+
						'<p style="margin:5px 0 0;">'+
							'<input type="text" class="input-sty" value="'+fileName+'">'+
						'</p>'+
					'</li>';
				$('#'+target).append(uploadImgItem);
			}
			reader.readAsDataURL(input.files[i]);
		}
	}else{
		var noPictures = $("<p>目前沒有圖片</p>");
		$('#'+target).append(noPictures).removeClass('previews-photo');
	}
}
//上傳圖片
function uploadFile(targerDom){
	var filename = targerDom.val();
	var lastIndex = filename.lastIndexOf("\\");
	if (lastIndex >= 0) {
		filename = filename.substring(lastIndex + 1);
	}
	targerDom.parent().parent().parent().parent().find('input').val(filename);
	// $('#fileNameBox').text(filename);
}


//上傳圖片的按鈕
function upload_click(obj) {
	var fileEvent = $(obj).parent().find('input[type=file]');
	fileEvent.click();
}

//側邊欄nav height
function sideNav() {
	var _navH = $('.side-nav').height();
	var _logo = $('.side-logo').outerHeight();
	var _tit = $('.backend-tit').outerHeight();
	var _info = $('.user-info').outerHeight();
	var _sideFoot = $('.side-footer').outerHeight();
	//console.log( _navH,_logo,_tit,_info,_sideFoot);
	$('.nav-box').height(_navH - (_logo + _tit + _info + _sideFoot + 50));
}
