
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
                    var txt2 = '<div class="live-box"></div>';
                    var txt3 = '<div class="live-name"></div>';
                    var txt4 = '<a href="' + data[i].URL + '" target="_blank">';
                    var txt5 = '<img src="../img/cctv_10.jpg" alt="">';
                    var txt6 = '</a>';
                    var txt7 = '</li>';
                    var allPhoto = txt1 + txt2 + txt3 + txt4 + txt5 + txt6 + txt7;
                    $('#CCTV-Anchor-point').append(allPhoto);
                }

                var filterUnitdatas = Unitdatas.filter(function (ele, pos) {
                    return Unitdatas.indexOf(ele) == pos;
                })

                //console.log("The filterUnitdatas array ", filterUnitdatas);

                var filterInnerUnits = InnerUnits.filter(function (ele, pos) {
                    return InnerUnits.indexOf(ele) == pos;
                })

                //console.log("The filterInnerUnits array ", filterInnerUnits);
                //console.log(typeof filterUnitdatas);

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
    var url = "/vtsApi/api/CCTV/GetCCTVQuery/?Unit=" + Unit + "&InnerUnit=" + InnerUnit + "";
    var Url = hostOrigion + url;

    console.log("Url = " + Url + " ");

    $.ajax({
        url: Url,
        type: "GET",
        //dataType: 'json',
        //data: { Unit: "" + Unit + "", InnerUnit: "" + InnerUnit + "" },
        contentType: "application/json; charset=utf-8",

        success: function (data) {
            if (data.length <= 0) {
                alert(" Could not find Data");
                return;
            }

            $('#CCTV-Anchor-point').empty();

            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    // 添加下方影片圖像List
                    var txt1 = '<li>';
                    var txt2 = '<div class="live-box"></div>';
                    var txt3 = '<div class="live-name"></div>';
                    var txt4 = '<a href="' + data[i].URL + '" target="_blank">';
                    var txt5 = '<img src="../img/cctv_10.jpg" alt="">';
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
    console.log("Enter LoadCCTVManagement");
    let hostOrigion = "http://localhost";
    var url = "/vtsApi/api/CCTV/GetCCTVManagerList";
    var Url = hostOrigion + url;

    $.ajax({
        url: Url,
        type: "GET",
        contentType: "application/json; charset=utf-8",

        success: function (data) {
            if (data.length > 0) {
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
                    var txt12 = '<a href="###" title="檢視" alt="檢視" class="js-views-only">';
                    var txt13 = '<i class="fad fa-eye"></i>';
                    var txt14 = '</a>';
                    var txt15 = '<a href="###" title="編輯" alt="編輯" class="js-page-edit">';
                    var txt16 = '<i class="fad fa-pen-square"></i>';
                    var txt17 = '</a>';
                    var txt18 = '<a href="###" title="刪除" alt="刪除" class="js-page-delete" value="' + data[i].ID +'">';
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
                $('#videoOnlyView').show();
                $('#live,#videoAdd,#videoList').hide();
            });

           // 列表點編輯
		    $('.js-page-edit').on('click',function(){
		        $('#videoEdit').show();
		        $('#live,#videoAdd,#videoList').hide();
            });

            // 列表點刪除
            $('.js-page-delete').on('click', function () {
                var id = $(this).attr("value");
                console.log("ID : " +id+ "");
                CCTVManagerListDelete(id);
            });
        }
    });
}

//刪除影像管理List
function CCTVManagerListDelete(id)
{
    console.log("Enter Delete");
    let hostOrigion = "http://localhost";
    var url = "/vtsApi/api/CCTV/DeleteCCTVManageList/?id=" + id + "";
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
    var url = "/vtsApi/api/CCTV/GetCCTVListQuery";
    var Url = hostOrigion + url;

    //傳至後端之資料用Json包起來        
    //var VO = '[{ "Flag" : "' + Flag + '" , "StartDate" : "' + StartDate + '", "EndDate" : "' + EndDate + '", "KeyWord" : "' + KeyWord + '", "Type" : "' + Type + '"}]';
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
                    var txt12 = '<a href="###" title="檢視" alt="檢視" class="js-views-only">';
                    var txt13 = '<i class="fad fa-eye"></i>';
                    var txt14 = '</a>';
                    var txt15 = '<a href="###" title="編輯" alt="編輯" class="js-page-edit">';
                    var txt16 = '<i class="fad fa-pen-square"></i>';
                    var txt17 = '</a>';
                    var txt18 = '<a href="###" title="刪除" alt="刪除" class="js-page-delete">';
                    var txt19 = '<i class="fad fa-times-square"></i>';
                    var txt20 = '</a>';
                    var txt21 = '</div>';
                    var allPhoto = txt1 + txt2 + txt3 + txt4 + txt5 + txt6 + txt7 + txt8 + txt9 + txt10 + txt11 + txt12 + txt13 + txt14 + txt15 + txt16 +
                        txt17 + txt18 + txt19 + txt20 + txt21;

                    $('#CCTVManager-Anchor-point').append(allPhoto);                
                }
            }
        }
    });

    // 列表點查看
    $('.js-views-only').on('click', function () {
        $('#videoOnlyView').show();
        $('#live,#videoAdd,#videoList').hide();
    });

    // 列表點編輯
    $('.js-page-edit').on('click', function () {
        $('#videoEdit').show();
        $('#live,#videoAdd,#videoList').hide();
    });

    // 列表點刪除
    $('.js-page-delete').on('click', function () {
        CCTVManagerListDelete();
    });
}