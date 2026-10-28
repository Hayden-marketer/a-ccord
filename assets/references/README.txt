이미지 교체 안내
================

실제 적용된 이미지 (7장)
- midea-key-visual-01.jpg / midea-lifestyle-01.jpg : 마이디어 2in1 워시콤보 키비주얼, MP09 라이프스타일 컷
- zesty-saloon-01.jpg / zesty-saloon-02.jpg / zesty-saloon-03.jpg : 제스티살룬 메뉴 포스터·카드뉴스
- siksadaum-01.jpg / siksadaum-02.jpg : 식사다움 브랜드 포스터, 오늘의 석식 메뉴보드

플레이스홀더 상태(.ref-thumb.placeholder)로 남겨둔 항목 — 실제 파일이 생기면
해당 페이지(index.html의 Industry 카드, industry.html의 각 industry-group)에서
`<div class="ref-thumb placeholder">...</div>` 를
`<div class="ref-thumb"><img src="assets/references/파일명.jpg" alt="..."></div>` 로 바꾸면 됩니다.

- 한국관광공사(두루누비)
- 부산관광공사(비짓부산)
- 한국어촌어항공단
- 환경부
- 옵티멈뉴트리션
- BSN
- 라이프스팬
- 삼성제약
- 요가원
- 파밀리아크로스핏
- 데이원컴퍼니
- 크몽

이미지 규격: 장당 500KB 이하 권장(JPG), 가로 1200~1600px 선에서 리사이즈.
sips -s format jpeg -s formatOptions 80 -Z 1400 원본.png --out 결과.jpg
