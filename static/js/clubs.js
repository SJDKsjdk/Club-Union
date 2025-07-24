document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".tab-button");
    const contents = document.querySelectorAll(".tab-content");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const targetId = this.getAttribute("data-tab"); // 클릭한 버튼의 data-tab 값 가져오기
            const targetContent = document.getElementById(targetId); // 해당하는 콘텐츠 찾기

            // 모든 버튼과 콘텐츠에서 active 클래스 제거
            buttons.forEach(btn => btn.classList.remove("active"));
            contents.forEach(content => content.classList.remove("active"));

            // 클릭한 버튼과 해당 콘텐츠에 active 클래스 추가
            this.classList.add("active");
            targetContent.classList.add("active");
        });
    });
});