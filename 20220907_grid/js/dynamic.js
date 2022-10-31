// 현재 구하자
let now = new Date();

//현재 년
let year = now.getFullYear();

//현재 월
let month = now.getMonth(); //0~11
month++;

const setCalendar = (year, month) => {
    // 1일이 무슨 요일?
    let firstDate = new Date(year, month-1, 1);
    let firstDay = firstDate.getDay();

    // 말일은 며칠?
    let lastDate = new Date(year, month, 0).getDate();

    //  제목 표시하기
    const setTitle = (year, month) => {
        // console.log(`${year} 년 ${month}월`)
        let title_year = document.getElementById('title_year');
        title_year.innerHTML = year;
        let title_month = document.getElementById('title_month');
        title_month.innerHTML = month;

    }

    setTitle(year, month);

    const dateGridContainerDiv = document.getElementsByClassName("date-grid-container")[0];
    dateGridContainerDiv.innerHTML="";
    // 1~말일까지 grid-item 만들자
    for(let i=1; i<=lastDate; i++){
        // 요소 만들자
        let newDiv = document.createElement("div");
        // class에 grid-item 넣자
        newDiv.classList.add("grid-item")
        // text에 숫자 넣기
        newDiv.innerHTML = i;
        // 부모에 newDiv 달자
        dateGridContainerDiv.appendChild(newDiv);
    }

    // 1일에 해당하는 div를 grid-column-start: 요일 + 1;
    let firstDateDiv = dateGridContainerDiv.getElementsByClassName("grid-item")[0];
    firstDateDiv.style.gridColumnStart = firstDay+1;
}

setCalendar(year, month);

//이전 달 달력 보이자
const prevMonth = () => {
    console.log("prev")
    month--;
    //month가 0이면, month = 12, year--;
    if(month === 0) {
        month=12;
        year--;
    }
    setCalendar(year, month);
}
//다음 달 달력 보이자
const nextMonth = () => {
    month++;
    // month가 13이면 month = 1, year++;
    if(month === 13){
        month=1;
        year++;
    }
    setCalendar(year, month);
}

const initButton  = () => {
    //HTML -> js
    const prev_btn = document.getElementById("prev_btn");
    const next_btn = document.getElementById("next_btn");

    //js event 달자
    // prev_btn.addEventListener("click", prevMonth)
    // next_btn.addEventListener("click", nextMonth)
    prev_btn.onclick = prevMonth;
    next_btn.onclick = nextMonth;
}

initButton()

//AJAX 급식데이터 가져오자
// .date-grid-container > .grid-item에 mouseover 이벤트 발생하면, handler를 지정하자
// url 호출하자
const handler = (event)=>{
    let date = event.target.innerHTML; //date str형식으로 가져옴.
    const KEY = "a7cc721e31ef4e5199636b84dd243813";
    const ATPT_OFCDC_SC_CODE = "B10"; //서울특별시교육청
    const SD_SCHUL_CODE = "7010569"; //미림여자정보과학고등학교
    let MLSV_YMD = `${year}${month.toString().padStart(2, "0")}${date.padStart(2, "0")}`; //2022년10월19일
    let url = `https://open.neis.go.kr/hub/mealServiceDietInfo`;
    url += `?KEY=${KEY}`
    url += `&TYPE=json`
    url += `&ATPT_OFCDC_SC_CODE=${ATPT_OFCDC_SC_CODE}`
    url += `&SD_SCHUL_CODE=${SD_SCHUL_CODE}`
    url += `&MLSV_YMD=${MLSV_YMD}`
    console.log(url)
    getMenuByAPI(url)
}
// AJAX로 url 호출하자(Asynchronous JavaScript And XML)
let getMenuByAPI = (url)=>{
    // XMLHttpRequest 만들자
    let xhr = new XMLHttpRequest();
    
    // callback
    xhr.onreadystatechange = () => {
        if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            //리퀘스트가 다 끝나서 응답이 왔다면
            console.log("성공!");
            // console.log(xhr.response);
            showMenu(xhr.response);
        }else{
            //실패
        }
    }

    // 요청을 보낼 방식, url, 비동기여부 설정하자
    xhr.open("GET", url, true);

    // 요청 전송
    xhr.send();

}
const showMenu = (jsonString) =>{
    // jsonString -> json
    let json = JSON.parse(jsonString);
    console.log(json)
    let breakfastMenu = "없음"
    let lunchMenu = "없음"
    let dinnerMenu = "없음"
    try{
        // json -> 조식, 중식, 석식
        breakfastMenu = json["mealServiceDietInfo"][1]["row"][0]["DDISH_NM"];
        // (5.13.) 삭제
        // (열고, 숫자, 여러개 ) 닫고
        breakfastMenu = breakfastMenu.replace(/\([0123456789\.]+\)/g,"")
    } catch {
    }
    try{
        lunchMenu = json["mealServiceDietInfo"][1]["row"][1]["DDISH_NM"]
        lunchMenu = lunchMenu.replace(/\([0-9\.]+\)/g,"")
    } catch {
    }
    try{
        dinnerMenu = json["mealServiceDietInfo"][1]["row"][2]["DDISH_NM"]
        dinnerMenu = dinnerMenu.replace(/\([0-9\.]+\)/g,"")
    } catch {
    }
    // 조식, 중식, 석식 -> HTML
    // 응답오면, #breakfast, #lunch, #dinner에 출력하자
    breakfast.innerHTML = breakfastMenu;
    lunch.innerHTML = lunchMenu;
    dinner.innerHTML = dinnerMenu;
}

let dateGridContainerDiv = document.getElementsByClassName("date-grid-container")[0];
let gridItems = dateGridContainerDiv.getElementsByClassName("grid-item");
for(let gridItem of gridItems){
    // handler에서 year, month, date 정보를 가져와서 url 생성하자
    gridItem.onmouseover = handler; //mouseover일 때, 이벤트 처리하기
}

// (5.6.) 삭제 정규식 이용
