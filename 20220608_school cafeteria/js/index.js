const showToday = () => {
    //오늘의 년, 월, 일, 요일 구하자
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let date = now.getDate();
    let day = now.getDay(); //요일: 0~6: 0:일요일, 6:토요일
    let namesOfTheDaysOfTheWeek_array = ["일", "월", "화", "수", "목", "금", "토"];
    day = namesOfTheDaysOfTheWeek_array[day]
    // console.log(year, month, date, day);
    let title = `${year}.${month}.${date}.(${day})`;
    // console.log(title);

    //HTML에 표시하자
    // let cardDateDivs = document.getElementsByClassName("card-date");
    let cardDateDivs = document.querySelectorAll(".card-date");
    // console.log(cardDateDivs);
    for (cardDateDiv of cardDateDivs) {
        cardDateDiv.innerHTML = title;
    }
}
showToday();


const addNow = (mainCardId) => {
     //html -> js
     const mainCard = document.getElementById(mainCardId);

     //지금 몇시? 다음 식사 -> 몇번째 카드인지
     let now = new Date();
     let hour = now.getHours();
     let minute = now.getMinutes();
     // console.log(`${hour}시 ${minute}분`);
     let minutes = hour * 60 + minute; //현재 시와 분을 통해 분으로 단위통일
 
     //지금 시각 -> index
     //조식 끝: 7:30 -> 1
     //중식 끝: 13:10 -> 2
     //석식 끝: 18:10 -> 0
     let index = 0;
     if (18 * 60 + 10 <= minutes) {  //18:10 <= now
       index = 0;
     } else if (13 * 60 + 10 <= minutes) { //13:10 <= now
       index = 2;
     } else if (7 * 60 + 30 <= minutes) { //7:30 <= now
       index = 1;
     } else {
       index = 0;
     }
 
     let selectedCard = mainCard.getElementsByClassName('card')[index];
     //now 클래스 추가
     selectedCard.classList.add('now');
}
addNow('main-card');

 