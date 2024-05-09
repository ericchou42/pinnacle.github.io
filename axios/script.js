// JSON 檔案網址
const url = "https://soweb.kcg.gov.tw/webapi/api/Category/";
const list = document.querySelector(".list");
let data = [];

/** 步驟一 **/

axios.get(url)
  .then(function (response) {
    console.log(response.data);
    
    // 宣告一個變數 str 並賦予值為字串型別的空字串
    let str ="";
  
    //將撈取回來的資料賦予在變數 data 上
    data = response.data;
    
    //請透過 data 陣列跑 forEach ，並至少帶入第一個參數
    data.forEach(function(item){
      // 將陣列中 kind_name 加入 str 空字串中
      str += `<li>${item.kind_name}</li>`;
    })
    console.log(str)
    
    //請透過 innerHTML 給 list 變數賦予值
    list.innerHTML = str;
  });


/*＊ 步驟四 **/
//以下步驟在 forEach {} 大括號外執行
//請透過 innerHTML 給 list 變數賦予值
//該值為變數 str