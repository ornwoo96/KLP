## KLP 과제 - 김동우
#### [주제] 
- 간단한 커뮤니티 앱 MVP 개발

#### [요구 사항] 
- 회원가입/로그인
- 글(목록/상세/작성)
- 이미지첨부
- 댓글

<br>

## 주요 기능
| 회원가입 | 로그인 |
|:---:|:---:|
|<img src="https://github.com/user-attachments/assets/5a765532-5534-4fd3-a132-b6d7c695a2d8" width="175" >|<img src="https://github.com/user-attachments/assets/80e66975-2cf9-4504-83e3-946d212fe806" width="175">|

| 게시물 작성 | 댓글 작성 |
|:---:|:---:|
|<img src="https://github.com/user-attachments/assets/719c6062-a252-48ca-867c-03ee5d0447de" width="175" >|<img src="https://github.com/user-attachments/assets/3eff1ef4-ffe3-4d7c-8803-de20e459e0e4" width="175">|

| 이미지 미리보기 |
|:---:|
|<img src="https://github.com/user-attachments/assets/98ba0a2c-ac94-4713-a6ca-ee3e345d0427" width="175" >|

<br>

## 개발 환경
- React Native CLI
- React Native 0.81.4
- React 19.1.0
- Node.js 20+
- Yarn 3.6.4
- iOS 16.0+ / Android 13.0+ (테스트 환경)

<br>

## 사용 기술 및 라이브러리
- UI & 인터랙션 : `BottomSheet` · `Reanimated`
- 상태 관리 & 비동기 처리 : `Zustand` · `React Query`
-	네비게이션 : `ReactNavigation`
-	이미지 & 미디어 : `ImagePicker`
- 스토리지 : `Firebase`(`Auth` · `Firestore` · `Storage`)

<br>

## 폴더 구조
```
📂 src : 앱의 모든 소스코드 루트
├── 📂 assets : 정적 자원 (예: 아이콘, 이미지 등)
│   └── 📂 icons : 아이콘 모음
├── 📂 components : 공통적으로 재사용 가능한 UI 컴포넌트
├── 📂 hooks : React Query, Zustand 등을 활용한 커스텀 훅 모음
├── 📂 navigation : 네비게이션 관련 설정 및 타입 정의
├── 📂 screens : 화면 단위 컴포넌트 (기능별 하위 폴더로 구분)
│   ├── 📂 main : 메인 피드 및 게시물 관련 화면
│   ├── 📂 onboarding : 로그인, 회원가입, 프로필 설정 등 온보딩 화면
│   └── 📂 postDetail : 게시물 상세 및 댓글 관련 화면
├── 📂 services : Firebase 등 외부 API/서비스 호출 및 데이터 처리 로직
├── 📂 store : Zustand 기반 상태 관리 스토어
└── 📂 utils : 유틸리티 함수 모음
```

<br>


## 설치 방법


#### 1. 레포지토리 클론
```
git clone https://github.com/your-repo/KLP.git
cd KLP
```

#### 2. 패키지 설치
```
yarn install
```


#### 3. iOS 설정 (Mac 환경)
```
cd ios && pod install && cd ..
```

#### 4. 앱 실행

```
yarn ios   # iOS 시뮬레이터 실행
yarn android  # Android 에뮬레이터 실행
```

<br>


## 마무리
읽어주셔서 감사합니다.
