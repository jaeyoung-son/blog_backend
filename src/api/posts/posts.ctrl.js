const api = require('..').default;

let postId = 1; // 아이디 초기값

// 포스츠 배열 초기데이터

const posts = [
  {
    id: 1,
    title: '제목',
    body: '내용',
  },
];

// 포스트 작성
// POST /api/posts
// { title, body}

export const write = ctx => {
  // rest api 의 request body는 ctx.request.body에서 조회
  const { title, body } = ctx.request.body;
  postId += 1;
  const post = { id: postId, title, body };
  posts.push(post);
  ctx.body = post;
};

// 포스트 목록 조회
// GET /api/posts

export const list = ctx => {
  ctx.body = posts;
};

// 특정 포스트 조회
// GET /api/posts/:id

export const read = ctx => {
  const { id } = ctx.params;
  // 파라미터로 받아 온 값은 문자열 이므로 숫자로 변환하거나 비교할 p.id 값을 문자열로 변경해야 한다.
  const post = posts.find(p => p.id.toString() === id);

  if (!post) {
    ctx.status = 404;
    ctx.body = {
      message: '포스트가 존재하지 않습니다.',
    };
    return;
  }
  ctx.body = posts;
};

// 특정 포스트 제거
// DELETE /api/posts/:id

export const remove = ctx => {
  const { id } = ctx.params;

  const index = posts.findIndex(p => p.id.toString() === id);

  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: '포스트가 존재하지 않습니다.',
    };
    return;
  }

  posts.splice(index, 1);
  ctx.status = 204; // No Content
};

// 포스트 수정(교체)
// PUT /api/posts/:id
// {title,body}

export const replace = ctx => {
  // PUT 메소드는 전체 포스트 정보를 입력하여 데이터를 통쨰로 교체할 떄 사용
  const { id } = ctx.params;

  const index = posts.findIndex(p => p.id.toString() === id);

  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: '포스트가 존재하지 않습니다.',
    };
    return;
  }

  posts[index] = {
    id,
    ...ctx.request.body,
  };
  ctx.body = posts[index];
};

// 포스트 수정(특정 필드 변경)
// PATCH /api/posts/:id
// {title, body}

export const update = ctx => {
  // PATCH 메서드는 주어진 필드만 교체
  const { id } = ctx.params;

  const index = posts.findIndex(p => p.id.toString() === id);

  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: '포스트가 존재하지 않습니다.',
    };
    return;
  }
  posts[index] = {
    ...posts[index],
    ...ctx.request.body,
  };
  ctx.body = posts[index];
};