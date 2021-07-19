
//開始函數
$(document).ready(function () {
    //一進入畫面讀取CCTV 攝影機URL
    console.log("Enter Ready");
    LoadCCTVURL();
    LoadCCTVManagement();
});

//一進入畫面讀取 CCTV 影像畫面以及URL
function LoadCCTVURL()
{
    let hostOrigion = "http://localhost";
    hostOrigion = location.origin;
    var url = "/vtsApi/api/CCTV/GetCCTVInit";
    var Url = hostOrigion + url;
    var Unitdatas = new Array();
    var InnerUnits = new Array();

    $.ajax({
        url: Url,
        type: "GET",
        contentType: "application/json; charset=utf-8",

        success: function (data) {
            if (data.length <= 0) {
                alert(" Could not find CCTV URL");
                return;
            }

            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    // 添加上方下拉式選單單位以及內部單位
                    Unitdatas.push(data[i].Unit);
                    InnerUnits.push(data[i].InnerUnit);

                    // 添加下方影片圖像List
                    var txt1 = '<li>';
                    var txt2 = '<div class="live-box">"' + data[i].LiveName + '"</div>';
                    var txt3 = '<div class="live-name">"' + data[i].UnderName + '"</div>';
                    var txt4 = '<a href="' + data[i].URL + '" target="_blank">';
                    var txt5 = '<img src="' + data[i].ImgURL + '" alt="">';
                    var txt6 = '</a>';
                    var txt7 = '</li>';
                    var allPhoto = txt1 + txt2 + txt3 + txt4 + txt5 + txt6 + txt7;
                    $('#CCTV-Anchor-point').append(allPhoto);
                }

                var filterUnitdatas = Unitdatas.filter(function (ele, pos) {
                    return Unitdatas.indexOf(ele) == pos;
                })

                var filterInnerUnits = InnerUnits.filter(function (ele, pos) {
                    return InnerUnits.indexOf(ele) == pos;
                })

                for (var Unitdata in filterUnitdatas) {
                    $("#Unitsel").append('<option value="' + filterUnitdatas[Unitdata] + '">' + filterUnitdatas[Unitdata] + '</option>');
                }

                for (var InnerUnitdata in filterInnerUnits) {
                    $("#InnerUnitsel").append('<option value="' + filterInnerUnits[InnerUnitdata] + '">' + filterInnerUnits[InnerUnitdata] + '</option>');
                }

            }
        }
    });
}

// 查詢 CCTV 影像列表
function BtnCCTVQuery(Unit, InnerUnit) {
    console.log("Btn Click Unit = " + Unit + " , InnerUnit = " + InnerUnit + "");

    let hostOrigion = "http://localhost";
    hostOrigion = location.origin;
    var url = "/vtsApi/api/CCTV/GetCCTVQuery/?Unit=" + Unit + "&InnerUnit=" + InnerUnit + "";
    var Url = hostOrigion + url;

    console.log("Url = " + Url + " ");

    $.ajax({
        url: Url,
        type: "GET",
        contentType: "application/json; charset=utf-8",

        success: function (data) {
            if (data.length <= 0) {
                alert(" Could not find Data");
                return;
            }

            $('#CCTV-Anchor-point').empty();

            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    var txt1 = '<li>';
                    var txt2 = '<div class="live-box">"' + data[i].LiveName + '"</div>';
                    var txt3 = '<div class="live-name">"' + data[i].UnderName + '"</div>';
                    var txt4 = '<a href="' + data[i].URL + '" target="_blank">';
                    var txt5 = '<img src="' + data[i].ImgURL + '" alt="">';
                    var txt6 = '</a>';
                    var txt7 = '</li>';
                    var allPhoto = txt1 + txt2 + txt3 + txt4 + txt5 + txt6 + txt7;
                    $('#CCTV-Anchor-point').append(allPhoto);
                }
            }
        },
        error: function (error) {
            alert('error; ' + eval(error));
        }
    });
}

// 一進入畫面讀取影像管理 List CCTVManagement
function LoadCCTVManagement()
{
    console.log("Enter GetCCTVManagerListInit");
    let hostOrigion = "http://localhost";
    hostOrigion = location.origin;
    var url = "/vtsApi/api/CCTV/GetCCTVManagerListInit";
    var Url = hostOrigion + url;

    $.ajax({
        url: Url,
        type: "GET",
        contentType: "application/json; charset=utf-8",

        success: function (data) {

            if (data.length > 0) {

                display_pages("Init", data, data.length, 1)

                // 列表點查看
                //$('.js-views-only').on('click', function () {
                //    $('#videoOnlyView').show();
                //    $('#live,#videoAdd,#videoList').hide();
                //});

                //// 列表點編輯
                //$('.js-page-edit').on('click', function () {
                //    $('#videoEdit').show();
                //    $('#live,#videoAdd,#videoList').hide();
                //});

                //// 列表點刪除
                //$('.js-page-delete').on('click', function () {
                //    if (confirm("真的要刪除嗎?1")) {
                //        var id = $(this).attr("value");
                //        CCTVManagerListDelete(id);
                //    }
                //});
            }         
        }
    });
}

//刪除影像管理List
function CCTVManagerListDelete(UUID)
{
    console.log("Enter Delete");
    let hostOrigion = "http://localhost";
    hostOrigion = location.origin;
    var url = "/vtsApi/api/CCTV/DeleteCCTVManageList/?UUID=" + UUID + "";
    var Url = hostOrigion + url;

    $.ajax({
        url: Url,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data)
        {
            alert(data);
            $('#CCTVManager-Anchor-point').empty();
            LoadCCTVManagement();
        }
    });
}

//搜尋影像管理List
function CCTVManagerSearch(Flag, StartDate, EndDate, KeyWord, Type)
{
    console.log("Enter Search");
    let hostOrigion = "http://localhost";
    hostOrigion = location.origin;
    var url = "/vtsApi/api/CCTV/GetCCTVManageListQuery";
    var Url = hostOrigion + url;

    var VO = {
        Flag: Flag,
        StartDate: StartDate,
        EndDate: EndDate,
        KeyWord: KeyWord,
        Type: Type
    };

    $.ajax({
        url: Url,
        type: "POST",
        async: false,
        dataType: "json",
        data: JSON.stringify(VO),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.length <= 0) {
                alert("查無資料");
                return;
            }

            $('#CCTVManager-Anchor-point').empty();

            if (data.length > 0) {
                console.log("CCTVManagerSearch data.length :" + data.length + "");
                for (var i = 0; i < data.length; i++) {
                    // 添加下方影片圖像List
                    var txt1 = '<div class="group-box-83">';
                    var txt2 = '<div class="box-5 txt-c">' + data[i].ID + '</div>';
                    var txt3 = '<div class="box-10">' + data[i].Time + '</div>';
                    var txt4 = '<div class="box-10">' + data[i].Location + '</div>';
                    var txt5 = '<div class="box-15">' + data[i].EventName + '</div>';
                    var txt6 = '<div class="box-15 txt-c">' + data[i].ShipName + '</div>';
                    var txt7 = '<div class="box-10 txt-c">' + data[i].Uploader + '</div>';
                    var txt8 = '<div class="box-10 txt-c">' + data[i].Type + '</div>';
                    var txt9 = '<div class="box-20">' + data[i].Remark + '</div>';
                    var txt10 = '</div>';
                    var txt11 = '<div class="group-box-15 opera">';
                    var txt12 = '<a href="###" title="檢視" alt="檢視" class="js-views-only" value="' + data[i].UUID + '">';
                    var txt13 = '<i class="fad fa-eye"></i>';
                    var txt14 = '</a>';
                    var txt15 = '<a href="###" title="編輯" alt="編輯" class="js-page-edit value="' + data[i].UUID + '"">';
                    var txt16 = '<i class="fad fa-pen-square"></i>';
                    var txt17 = '</a>';
                    var txt18 = '<a href="###" title="刪除" alt="刪除" class="js-page-delete" value="' + data[i].UUID + '">';
                    var txt19 = '<i class="fad fa-times-square"></i>';
                    var txt20 = '</a>';
                    var txt21 = '</div>';
                    var allPhoto = txt1 + txt2 + txt3 + txt4 + txt5 + txt6 + txt7 + txt8 + txt9 + txt10 + txt11 + txt12 + txt13 + txt14 + txt15 + txt16 +
                        txt17 + txt18 + txt19 + txt20 + txt21;

                    $('#CCTVManager-Anchor-point').append(allPhoto);                
                }
            }

            // 列表點查看
            $('.js-views-only').on('click', function () {
                var UUID = $(this).attr("value");
                GetViewData(UUID);
                $('#videoOnlyView').show();
                $('#live,#videoAdd,#videoList').hide();
            });

            // 列表點編輯
            $('.js-page-edit').on('click', function () {
                var UUID = $(this).attr("value");
                GetEditData(UUID);
                $('#videoEdit').show();
                $('#live,#videoAdd,#videoList').hide();
            });

            // 列表點刪除
            $('.js-page-delete').on('click', function () {
                if (confirm("真的要刪除嗎? 這會將列表資料 , 以及影片 , 照片檔都刪除.")) {
                    var id = $(this).attr("value");
                    CCTVManagerListDelete(id);
                }
            });

            display_pages("Query", data, data.length, 1)
        }
    });
}

/* 
    分頁組件展示 
    total_pages: 總頁數；
    visible_pages： 讓組件展示10頁；
    current_page: 當前頁
*/
function display_pages(state, Qdata , totalCounts, current_page) {
    $("#pagination0").jqPaginator({
        totalCounts: totalCounts,
        pageSize: 10,  //每頁顯示的數據量
        currentPage: current_page,
        first: '<a href="javascript:; class="first"">首頁</a>',
        prev: '<a href="javascript:;" class="prev">上一頁</a>',
        next: '<a href="javascript:;" class="next">下一頁</a>',
        last: '<a href="javascript:;" class="last">末頁</a>',
        page: '<a href="javascript:;" class="page">{{page}}</a>',
        onPageChange: function (page, type) {
            var U_limit = String(page) + 0;
            var L_limit = Number(String(page) + 0) - 9;

            let hostOrigion = "http://localhost";
            hostOrigion = location.origin;
            var url = "/vtsApi/api/CCTV/PageChange";
            var Url = hostOrigion + url;

            var VO = {
                U_limit: U_limit,
                L_limit: L_limit
            };

            $.ajax({
                url: Url,
                type: "POST",
                async: false,
                dataType: "json",
                data: JSON.stringify(VO),
                contentType: "application/json; charset=utf-8",
                success: function (Rtdata) {
                    $('#CCTVManager-Anchor-point').empty();
                    if (state == "Init")
                    {
                        renderTableCCTVManagermentList(Rtdata);
                    }

                    if (state == "Query")
                    {
                        renderTableCCTVManagermentList(Qdata);
                    }

                    // 列表點查看
                    $('.js-views-only').on('click', function () {
                        var UUID = $(this).attr("value");
                        GetViewData(UUID);
                        $('#videoOnlyView').show();
                        $('#live,#videoAdd,#videoList').hide();
                    });

                    // 列表點編輯
                    $('.js-page-edit').on('click', function () {
                        var UUID = $(this).attr("value");
                        GetEditData(UUID);
                        $('#videoEdit').show();
                        $('#live,#videoAdd,#videoList').hide();
                    });

                    // 列表點刪除
                    $('.js-page-delete').on('click', function () {
                        if (confirm("真的要刪除嗎? 這會將列表資料 , 以及影片 , 照片檔都刪除.")) {
                            var UUID = $(this).attr("value");
                            CCTVManagerListDelete(UUID);
                        }
                    });
                },
                error: function (error) {
                    alert('error; ' + eval(error));
                }
            });
        }
    });
}

//渲染申請列表表格
function renderTableCCTVManagermentList(data) {
    console.log("renderTableCCTVManagermentList enter  data.length : " + data.length + "")

    for (var i = 0; i < data.length; i++) {
        // 添加下方影片圖像List
        var txt1 = '<div class="group-box-83">';
        var txt2 = '<div class="box-5 txt-c">' + data[i].ID + '</div>';
        var txt3 = '<div class="box-10">' + data[i].Time + '</div>';
        var txt4 = '<div class="box-10">' + data[i].Location + '</div>';
        var txt5 = '<div class="box-15">' + data[i].EventName + '</div>';
        var txt6 = '<div class="box-15 txt-c">' + data[i].ShipName + '</div>';
        var txt7 = '<div class="box-10 txt-c">' + data[i].Uploader + '</div>';
        var txt8 = '<div class="box-10 txt-c">' + data[i].Type + '</div>';
        var txt9 = '<div class="box-20">' + data[i].Remark + '</div>';
        var txt10 = '</div>';
        var txt11 = '<div class="group-box-15 opera">';
        var txt12 = '<a href="###" title="檢視" alt="檢視" class="js-views-only" value="' + data[i].UUID + '">';
        var txt13 = '<i class="fad fa-eye"></i>';
        var txt14 = '</a>';
        var txt15 = '<a href="###" title="編輯" alt="編輯" class="js-page-edit" value="' + data[i].UUID + '">';
        var txt16 = '<i class="fad fa-pen-square"></i>';
        var txt17 = '</a>';
        var txt18 = '<a href="###" title="刪除" alt="刪除" class="js-page-delete" value="' + data[i].UUID + '">';
        var txt19 = '<i class="fad fa-times-square"></i>';
        var txt20 = '</a>';
        var txt21 = '</div>';
        var allPhoto = txt1 + txt2 + txt3 + txt4 + txt5 + txt6 + txt7 + txt8 + txt9 + txt10 + txt11 + txt12 + txt13 + txt14 + txt15 + txt16 +
            txt17 + txt18 + txt19 + txt20 + txt21;
        $('#CCTVManager-Anchor-point').append(allPhoto);
    }
}

//檢查日期格式
function checkInputDate(obj) {
    var t = Date.parse(obj);
    if (isNaN(t)) {
        alert("日期格式錯誤，請重新輸入！");
        return false;
    }

    return true;
}

//新增影像管理List
function InsertCCTVManager(local, dateTime, shipName, eventName, Uploader, Type, addNoteMesg) {
    console.log("InsertCCTVManager local: " + local + " dateTime : " + dateTime + " shipName : " + shipName + " eventName : " + eventName + " Uploader : " + Uploader + " Type : " + Type + " addNoteMesg : " + addNoteMesg + "")

    let hostOrigion = "http://localhost";
    hostOrigion = location.origin;
    var url = "/vtsApi/api/CCTV/InsertCCTVData";
    var Url = hostOrigion + url;

    var VO = {
        Location: local,
        Time: dateTime,
        shipName: shipName,
        eventName: eventName,
        Uploader: Uploader,
        Type: Type,
        Remark: addNoteMesg
    };

    $.ajax({
        url: Url,
        type: "POST",
        async: false,
        dataType: "json",
        data: JSON.stringify(VO),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            alert('success Insert Data');
        },
        error: function (error) {
            alert('error Fail Insert Data');
        }
    });

    $('#CCTVManager-Anchor-point').empty();
    LoadCCTVManagement();
}

//修改影像管理List
function UpdateCCTVManager(local, dateTime, shipName, eventName, Uploader, Type, addNoteMesg , UUID)
{
    let hostOrigion = "http://localhost";
    hostOrigion = location.origin;
    var url = "/vtsApi/api/CCTV/UpdateCCTVData";
    var Url = hostOrigion + url;

    var VO = {
        Location: local,
        Time: dateTime,
        shipName: shipName,
        eventName: eventName,
        Uploader: Uploader,
        Type: Type,
        Remark: addNoteMesg,
        UUID: UUID
    };

    $.ajax({
        url: Url,
        type: "POST",
        async: false,
        dataType: "json",
        data: JSON.stringify(VO),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            alert('success Update Data');
        },
        error: function (error) {
            alert('error Update Insert Data');
        }
    });
}

//取得檔案檢視
function GetViewData(UUID)
{
    console.log("Enter GetEditData() :" + UUID + "")
    let hostOrigion = "http://localhost";
    hostOrigion = location.origin;
    var url = "/vtsApi/api/CCTV/GetCCTVManageView/?UUID=" + UUID + "";
    var Url = hostOrigion + url;

    $.ajax({
        url: Url,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            $('#CCTVMLocation').html("" + data.Location + "");
            $('#CCTVMShipname').html("" + data.ShipName + "");
            $('#CCTVMEvent').html("" + data.EventName + "");
            $('#CCTVMTime').html("" + data.Time + "");
            $('#CCTVMRemark').html("" + data.Remark + "");
            $('#CCTVMUUID').html("" + data.UUID + "");

            GetShowFilm(data.UUID, "View");
            GetShowPic(data.UUID, "View");
        },
        error: function (error) {
            alert('Fail View Data');
        }
    });
}

//取得檔案編輯
function GetEditData(UUID)
{
    console.log("Enter GetEditData() :" + UUID +"")

    let hostOrigion = "http://localhost";
    hostOrigion = location.origin;
    var url = "/vtsApi/api/CCTV/GetCCTVManageEdit/?UUID=" + UUID + "";
    var Url = hostOrigion + url;

    $.ajax({
        url: Url,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            $('#editLocal').val("" + data.Location + "");
            $('#editShipName').val("" + data.ShipName + "");
            $('#editEventName').val("" + data.EventName + "");
            $('#editDateTime').val("" + data.Time + "");
            $('#noteMesg').val("" + data.Remark + "");
            $('#UUID').val("" + data.UUID + "");

            document.getElementById("Filmfile").value = "";
            document.getElementById("Picfile").value = "";

            GetShowFilm(data.UUID, "Edit");
            GetShowPic(data.UUID, "Edit");
        },
        error: function (error) {
            alert('Fail Edit Data');
        }
    });
}

//取得影片展現
function GetShowFilm(CCTVListUUID , event)
{
    console.log("Show Film! CCTVListUUID " + CCTVListUUID + " event :" + event+ "");
    let hostOrigion = "http://localhost";
    hostOrigion = location.origin;
    var Type = "影片"
    var url = "/vtsApi/api/CCTV/GetShow/?CCTVListUUID=" + CCTVListUUID + "&Type=" + Type + "";
    var Url = hostOrigion + url;

    $.ajax({
        url: Url,
        type: "Get",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            $('#CCTV-GetShowFilm-Anchor-point').empty();
            $('#CCTV-GetShowFilm-Anchor-point2').empty();
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {          
                    // 添加下方影片圖像List
                    var txt1 = '<li>';
                    var txt2 = '';
                    if (event == "Edit") {
                        txt2 = '<div class="del-photo" title="刪除" alt="刪除" value="' + data[i].UUID + '"></div>';
                    } else if (event == "View")
                    {
                        txt2 = '';
                    }
                    var txt3 = '<a href="###">';
                    var txt4 = '<video controls autoplay>';
                    var txt5 = '<source src="' + data[i].FilePath + '" type="video/mp4">';
                    var txt6 = '您的瀏覽器不支援此格式播放。';
                    var txt7 = '</video>';
                    var txt8 = '</a>';
                    var txt9 = '<p>';
                    var txt10 = '<input type="text" class="input-sty" value="' + data[i].FileName + '">';
                    var txt11 = '</p>';
                    var txt12 = '</li>';
                    var allPhoto = txt1 + txt2 + txt3 + txt4 + txt5 + txt6 + txt7 + txt8 + txt9 + txt10 + txt11 + txt12;
                    $('#CCTV-GetShowFilm-Anchor-point').append(allPhoto);
                    $('#CCTV-GetShowFilm-Anchor-point2').append(allPhoto);
                }
            }

            //刪除
            $('.del-photo').on('click', function () {
                var UUID = $(this).attr("value");
                DeleteFile(UUID)
            });
        },
        error: function (error) {
            alert('Fail GetShowFilm');
        }
    });
}

function DeleteFile(UUID)
{
    console.log(" DeleteFile() : " + UUID + "");

    let hostOrigion = "http://localhost";
    hostOrigion = location.origin;
    var url = "/vtsApi/api/CCTV/DeleteUploadFiles/?UUID=" + UUID + "";
    var Url = hostOrigion + url;

    $.ajax({
        url: Url,
        type: "Post",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            GetShowFilm($('#UUID').val(), "Edit");
            GetShowPic($('#UUID').val(), "Edit");
        },
        error: function (error) {
            alert('Delete Fail');
        }
    });
}

//取得照片展現
function GetShowPic(CCTVListUUID, event)
{
    console.log("GetShowPic! CCTVListUUID " + CCTVListUUID + " event :" + event + "");
    let hostOrigion = "http://localhost";
    hostOrigion = location.origin;
    var Type = "照片"
    var url = "/vtsApi/api/CCTV/GetShow/?CCTVListUUID=" + CCTVListUUID + "&Type=" + Type + "";
    var Url = hostOrigion + url;

    $.ajax({
        url: Url,
        type: "Get",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            $('#CCTV-GetShowPic-Anchor-point').empty();
            $('#photoList').empty();
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    // 添加下方影片圖像List
                    var txt1 = '<li>';
                    var txt2 = '';
                    if (event == "Edit") {
                        txt2 = '<div class="del-photo" title="刪除" alt="刪除" value="' + data[i].UUID + '"></div>';
                    } else if (event == "View") {
                        txt2 = '';
                    }
                    var txt3 = '<img src="' + data[i].FilePath + '" alt="">';
                    var txt4 = '<p>';
                    var txt5 = '<input type="text" class="input-sty" value="' + data[i].FileName + '">';
                    var txt6 = '</p>';
                    var txt7 = '</li>';             
                    var allPhoto = txt1 + txt2 + txt3 + txt4 + txt5 + txt6 + txt7;

                    $('#CCTV-GetShowPic-Anchor-point').append(allPhoto);
                    $('#photoList').append(allPhoto);
                }

                for (var i = 0; i < data.length; i++)
                {
                    var txt1 = '<div class="swiper-slide">';
                    var txt2 = '<div class="photo-item">';
                    var txt3 = '<img src="' + data[i].FilePath +'" alt="">';
                    var txt4 = '</div>';
                    var txt5 = '</div>';
                    var allPhoto2 = txt1 + txt2 + txt3 + txt4 + txt5;

                    $('#swiperwrapper').append(allPhoto2);
                }
            }

                            //刪除
            $('.del-photo').on('click', function () {
                var UUID = $(this).attr("value");
                DeleteFile(UUID)
            });

            $('#photoList li').each(function (index) {
                $(this).on('click', function () {
                    console.log("in");
                    $('#photoLgPage').fadeIn(function () {
                        photoSwiper.slideTo(index);
                    });
                })
            })

            const photoSwiper = new Swiper('#photoSlider', {
                slidesPerView: 1,
                spaceBetween: 10,
                speed: 300,
                observer: true,
                observeParents: true,
                preloadImages: true,
                updateOnImagesReady: true,
                autoHeight: true,
                pagination: {
                    el: '#photoPagin',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }
            });

            //關閉lightbox slide
            $('#closePhotoLg').on('click', function () {
                $('#photoLgPage').fadeOut();
            });
        },
        error: function (error) {
            alert('Fail GetShowFilm');
        }
    });
}

function checkFilmfile(sender) {
    // 可接受的附檔名
    var validExts = new Array(".mp4", ".webm");
    if (sender.value == null) {
        return;
    }
    var fileExt = sender.value;
    fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
    if (validExts.indexOf(fileExt) < 0) {
        sender.value = null;
        alert("檔案類型錯誤，可接受的副檔名有：" + validExts.toString());
        return;
    }
    else return true;
}

function checkPicfile(sender) {
    // 可接受的附檔名
    var validExts = new Array(".png", ".jpg", ".jpeg");
    if (sender.value == null) {
        return;
    }
    var fileExt = sender.value;
    fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
    if (validExts.indexOf(fileExt) < 0) {
        sender.value = null;
        alert("檔案類型錯誤，可接受的副檔名有：" + validExts.toString());
        return;
    }
    else return true;
}

function GetOneEditData()
{
    console.log("Enter GetOneEditData() :");

    let hostOrigion = "http://localhost";
    hostOrigion = location.origin;
    var url = "/vtsApi/api/CCTV/SelectTopUUID/";
    var Url = hostOrigion + url;

    $.ajax({
        url: Url,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            $('#editLocal').val("" + data.Location + "");
            $('#editShipName').val("" + data.ShipName + "");
            $('#editEventName').val("" + data.EventName + "");
            $('#editDateTime').val("" + data.Time + "");
            $('#noteMesg').val("" + data.Remark + "");
            $('#UUID').val("" + data.UUID + "");

            //GetShowFilm(data.UUID, "Edit");
            //GetShowPic(data.UUID, "Edit");
        },
        error: function (error) {
            alert('Fail Edit Data');
        }
    });
}