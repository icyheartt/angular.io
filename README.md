
# Angular.io 프로젝트

Angular 기반 웹 애플리케이션 프로젝트입니다. 본 프로젝트는 GitHub Pages를 통해 배포되며, Git Flow 전략과 효율적인 버전 관리를 도입하여 개발되었습니다.

---

## 📋 프로젝트 기본 정보
- **프로젝트 이름**: Angular.io
- **주요 기능**:
  - 인기 영화, 최신 영화, 액션 영화 등의 정보를 표시
  - GitHub Pages 배포
- **기술 스택**:
  - Angular
  - TypeScript
  - Git & Git Flow
  - GitHub Actions (배포 및 CI/CD)

---

## 📁 프로젝트 구조
```
Angular.io/
├── src/                  # 소스 코드
│   ├── app/              # Angular 컴포넌트 및 모듈
│   ├── assets/           # 정적 파일 (이미지, 아이콘 등)
│   └── styles.css        # 글로벌 스타일
├── docs/                 # GitHub Pages 배포 파일
├── angular.json          # Angular 프로젝트 설정
├── package.json          # 프로젝트 의존성
└── README.md             # 프로젝트 설명
```

---

## 🚀 설치 및 실행 가이드

### 1. **프로젝트 클론**
```bash
git clone https://github.com/<your-username>/angular.io.git
cd angular.io
```

### 2. **의존성 설치**
```bash
npm install
```

### 3. **로컬 서버 실행**
```bash
ng serve
```
- 브라우저에서 [http://localhost:4200](http://localhost:4200)로 접속합니다.

### 4. **프로덕션 빌드 및 배포**
```bash
ng build --configuration=production --base-href="/angular.io/"
```
- 빌드 파일은 `docs/` 폴더에 생성됩니다.

---

## 🔧 Git Flow 전략
본 프로젝트는 Git Flow 전략을 사용하여 브랜치를 관리합니다:

- **`main`**: 배포 브랜치
- **`develop`**: 개발 브랜치
- **`feature/<기능명>`**: 새로운 기능 개발 브랜치
- **`release/<버전명>`**: 배포 준비 브랜치
- **`hotfix/<버그명>`**: 긴급 수정 브랜치

---

## 📖 개발 가이드

### 1. **코드 컨벤션**
- **파일명**: CamelCase 또는 kebab-case
- **컴포넌트**: Angular CLI로 생성
- **주석 작성**: 중요 로직에는 주석 추가

### 2. **Git Commit 메시지 규칙**
- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 스타일 변경
- `refactor`: 코드 리팩토링
- `test`: 테스트 추가/수정
- `chore`: 기타 변경 사항

---

## 📜 추가 문서
- [API 문서](#)
- [PR 템플릿](#)
- [이슈 등록 방법](#)
- [사용자 가이드](#)

---

## 🔐 GitHub Actions
- **CI/CD**: GitHub Actions를 활용하여 자동 배포 및 테스트를 실행
- **배포 경로**: [https://icyheartt.github.io/angular.io/](https://icyheartt.github.io/angular.io/)

---

## 🤝 기여 방법
1. 이슈 등록 및 논의
2. Fork 후 로컬에서 작업
3. PR(Pull Request) 제출
4. 코드 리뷰 및 병합

---

## 📌 기타 정보
- 문의사항은 [이슈 페이지](https://github.com/<your-username>/angular.io/issues)를 통해 남겨주세요.
- 본 프로젝트는 오픈 소스이며, 자유롭게 기여할 수 있습니다.
