# ElementDetector
It detects DOM in Browser

  - How to use -

1) 브라우저 내에서 분석하고자 하는 페이지에 접속.


2) 개발자도구( Chrome 브라우저의 경우 f12 ) console창 열기.


3) jqeury import

    var sc = document.createElement("script");
    sc.src = "https://code.jquery.com/jquery-3.2.1.js";
    document.getElementsByTagName("head")[0].append(sc);

    위의 코드를 복사하여 console 창에 붙여 넣습니다.
    페이지 내에서 jqeury가 import 되어 있다면 3)은 생략 가능합니다.


4) elemdetector.js 전문 붙여넣기


위의 과정을 따르면 ElementDetector 창이 뜨는것을 확인할 수 있습니다.
페이지 내에서 hover된 Element는 지정한 배경색, 투명도, 그림자 효과가 적용됩니다.
hover 적용된 상태에서 클릭을 하면 ElementDetector 창에서 속성을 확인하고 변경할 수 있습니다.