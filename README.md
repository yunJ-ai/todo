# 📝 Todo List API (MSW Mock API)

이 프로젝트는 [MSW (Mock Service Worker)](https://mswjs.io/)를 이용하여 Todo List API를 모킹(mocking)한 예제입니다.  
개발 환경에서 실제 서버 없이 API 요청을 테스트할 수 있도록 구성되었습니다.

---

## 📌 API 엔드포인트

### 1️⃣ **GET /todos**

모든 Todo 목록을 가져옵니다.

#### ✅ 요청 예시

```http
GET /todos
```

#### ✅ 응답 예시 (200 OK)

```json
[
  { "id": "1", "text": "Learn Vite", "completed": false },
  { "id": "2", "text": "Setup MSW", "completed": true }
]
```

---

### 2️⃣ **POST /todos**

새로운 Todo를 생성합니다.

#### ✅ 요청 예시

```http
POST /todos
Content-Type: application/json
```

```json
{
  "text": "Write Documentation"
}
```

#### ✅ 응답 예시 (201 Created)

```json
{
  "id": "1700000000000",
  "text": "Write Documentation",
  "completed": false
}
```

---

### 3️⃣ **PATCH /todos/:id**

특정 Todo를 수정합니다. (예: 완료 상태 변경)

#### ✅ 요청 예시

```http
PATCH /todos/1700000000000
Content-Type: application/json
```

```json
{
  "completed": true
}
```

#### ✅ 응답 예시 (200 OK)

```json
{
  "id": "1700000000000",
  "text": "Write Documentation",
  "completed": true
}
```

#### ❌ 응답 예시 (404 Not Found - 존재하지 않는 Todo)

```json
{
  "status": 404
}
```

---

### 4️⃣ **DELETE /todos/:id**

특정 Todo를 삭제합니다.

#### ✅ 요청 예시

```http
DELETE /todos/1700000000000
```

#### ✅ 응답 예시 (200 OK)

```json
{
  "id": "1700000000000",
  "text": "Write Documentation",
  "completed": true
}
```

#### ❌ 응답 예시 (404 Not Found - 존재하지 않는 Todo)

```json
{
  "status": 404
}
```

---

## 🚀 프로젝트 실행 방법

### 1️⃣ **MSW 설치**

먼저, MSW 패키지를 설치합니다.

```sh
npm install msw --save-dev
```

### 2️⃣ **MSW 서비스 워커 파일 생성**

MSW를 정상적으로 실행하려면 `public/` 디렉토리에 `mockServiceWorker.js` 파일이 필요합니다.  
아래 명령어를 실행하여 생성합니다.

```sh
npx msw init public/ --save
```

### 3️⃣ **MSW 실행**

개발 환경에서 MSW 워커를 시작하려면 `src/main.tsx` 또는 `src/index.tsx`에 아래 코드를 추가합니다.

```ts
if (process.env.NODE_ENV === "development") {
  import("./mocks/browser").then(({ worker }) => {
    worker.start();
  });
}
```

### 4️⃣ **개발 서버 실행**

```sh
npm run dev
```

이제 브라우저에서 `/todos` API 요청을 보내면 MSW가 모킹된 데이터를 응답하게 됩니다.

---

## 📚 추가 정보

- **MSW 공식 문서**: [https://mswjs.io/](https://mswjs.io/)
- **Fetch API 사용법**: [https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

---
