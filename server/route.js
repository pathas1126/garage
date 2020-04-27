const express = require("express");
const router = express.Router();
const controller = require("./controller");

const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./public/images/",
  filename: (req, file, callback) => {
    callback(null, "imgfile" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
});

// 상품 페이지 관련 라우트
router.get("/sales/items", controller.sales.items);

router.post("/sales/write", controller.sales.write);

router.post("/sales/image", upload.single("img"), (req, res, next) => {
  console.log(req.file);
  res.send({
    fileName: req.file.filename,
  });
});

router.get("/sales/item", controller.sales.item);

// 상품 상세 페이지
router.get("/sales/detail/item/:item_Id", controller.sales.detail.item);

router.post("/sales/detail/remove", controller.sales.detail.remove);

router.put("/sales/detail/update", controller.sales.detail.update);

// 상품 댓글 작성
router.post("/sales/write/reply", controller.sales.reply.write);

// 댓글 수정
router.put("/sales/detail/upload/reply", controller.sales.reply.update);

// 댓글 삭제
router.post("/sales/detail/item/:id", controller.sales.reply.delete);

// 로그인 페이지 라우트
router.post("/users/login", controller.users.login);

// 회원가입 라우트
router.post("/users/signup", controller.users.signup);

// 마이 페이지
router.post("/users/user", controller.users.user);

// 내 글 보기
router.get("/users/myposts", controller.users.myposts);

// 회원 탈퇴
router.post("/users/withdrawal", controller.users.withdrawal);

// 공지사항 목록 조회
router.get("/notice", controller.notice.get);

// 공지사항 세부 조회
router.get("/notice/:id", controller.notice.detail);

// 공지사항 글 작성_관리자
router.post("/notice", controller.notice.write);

// 공지사항 조회수 올리기
router.post("/notice/readcount", controller.notice.readcount);

// 공지사항 수정
router.put("/notice/:id", controller.notice.update);

// 공지사항 글 삭제
router.post("/notice/d", controller.notice.delete);
module.exports = router;

// QNA 글 등록
router.post("/qna", controller.qna.write);

// QNA 글 목록 조회
router.get("/qna", controller.qna.list);

// QNA 글 삭제
router.post("/qna/d/:id", controller.qna.delete);

// QNA 글 수정
router.put("/qna/:id", controller.qna.update);
