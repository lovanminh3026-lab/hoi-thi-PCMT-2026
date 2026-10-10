# HƯỚNG DẪN ĐỔI CÂU HỎI PHẦN 1 VÀ PHẦN 2

Toàn bộ nội dung câu hỏi nằm trong tệp `js/data.js`. Có thể mở tệp này bằng Notepad, Notepad++ hoặc Visual Studio Code. Nên tạo một bản sao thư mục trước khi chỉnh sửa.

## Phần 1 – Câu hỏi trắc nghiệm

Nội dung nằm trong khối `packages`. Ứng dụng hiện dùng 6 gói, mỗi gói đúng 5 câu. Nên giữ nguyên các `id` từ 1 đến 6 và không thay đổi số câu trong mỗi gói.

Mỗi câu có cấu trúc:

```js
{
  "q": "Nội dung câu hỏi?",
  "options": {
    "A": "Phương án A",
    "B": "Phương án B",
    "C": "Phương án C",
    "D": "Phương án D"
  },
  "correct": "C",
  "explanation": "Đáp án C. Nội dung giải thích ngắn gọn."
}
```

Cách đổi:

1. Tìm gói cần sửa qua dòng `"id": 1`, `"id": 2`…
2. Thay nội dung sau `"q"`.
3. Thay bốn phương án A, B, C, D.
4. Đặt `"correct"` bằng đúng một chữ cái `A`, `B`, `C` hoặc `D`.
5. Sửa `"explanation"` cho khớp đáp án.

## Phần 2 – Tình huống

Nội dung nằm trong khối `situations`. Ứng dụng hiện dùng 10 tình huống. Phải giữ nguyên các `id` liên tục từ 1 đến 10.

Mỗi tình huống có cấu trúc:

```js
{
  "id": 1,
  "title": "Tên ngắn của tình huống",
  "prompt": "Nội dung tình huống để đội thi xử lý.",
  "suggestion": "Gợi ý xử lý để MC hoặc Ban giám khảo tham khảo."
}
```

Cách đổi:

1. Tìm tình huống theo `"id"`.
2. Sửa `"title"`, `"prompt"` và `"suggestion"`.
3. Không xóa dấu ngoặc kép, dấu phẩy hoặc ngoặc nhọn.

## Những lỗi cần tránh

- Nếu nội dung có dấu ngoặc kép, viết thành `\"nội dung\"`.
- Không dùng dấu phẩy sau trường cuối cùng của một câu hoặc tình huống.
- Không đổi tên các trường `q`, `options`, `correct`, `explanation`, `title`, `prompt`, `suggestion`.
- Lưu tệp theo mã hóa UTF-8 để tiếng Việt không bị lỗi.
- Sau khi sửa, mở `index.html`, thử ít nhất một câu của từng gói và một tình huống trước ngày thi.

Nếu chỉ thay nội dung theo đúng cấu trúc trên thì không cần sửa `index.html`, `js/app.js` hoặc các tệp CSS.
