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
const KEY = "a7cc721e31ef4e5199636b84dd243813";
const ATPT_OFCDC_SC_CODE = "B10"; //서울특별시교육청
const SD_SCHUL_CODE = "7010569"; //미림여자정보과학고등학교
let MLSV_YMD = "20221019"; //2022년10월19일
let  MMEAL_SC_CODE = 2; //중식

let url = `https://open.neis.go.kr/hub/mealServiceDietInfo`;
url += `?KEY=${KEY}`
url += `&TYPE=json`
url += `&ATPT_OFCDC_SC_CODE=${ATPT_OFCDC_SC_CODE}`
url += `&SD_SCHUL_CODE=${SD_SCHUL_CODE}`
url += `&MLSV_YMD=${MLSV_YMD}`
url += `&MMEAL_SC_CODE=${MMEAL_SC_CODE}`
console.log(url)