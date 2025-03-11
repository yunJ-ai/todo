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

## 🎯 연습 문제 (React 초보자를 위한 기능 구현)
이 프로젝트를 기반으로 React를 연습할 수 있도록 몇 가지 도전 과제를 추가합니다. 

### ✅ **기본 과제**
1. **Todo 수정 기능 추가**
   - 기존 Todo의 텍스트를 수정할 수 있도록 API를 추가하고 UI를 수정하세요.

2. **필터 기능 추가**
   - 완료된 Todo만 보기 / 미완료된 Todo만 보기 등의 필터링 기능을 구현하세요.

3. **검색 기능 추가**
   - Todo 목록에서 특정 키워드를 포함한 항목만 검색할 수 있도록 검색 기능을 추가하세요.

4. **Todo 개수 표시**
   - 전체 Todo 개수 및 완료된 Todo 개수를 화면에 표시하세요.

### 🚀 **심화 과제**
5. **Drag & Drop을 이용한 순서 변경**
   - `dnd-kit`를 사용하여 Todo 목록을 드래그해서 순서를 변경할 수 있도록 하세요.

6. **LocalStorage를 활용한 데이터 저장**
   - 페이지 새로고침 후에도 Todo 목록이 유지되도록 LocalStorage를 활용하세요.
  
---

## 📚 추가 정보

- **MSW 공식 문서**: [https://mswjs.io/](https://mswjs.io/)
- **Fetch API 사용법**: [https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

---


