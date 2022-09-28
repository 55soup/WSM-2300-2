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