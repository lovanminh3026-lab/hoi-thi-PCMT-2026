# HỘI THI TUYÊN TRUYỀN PHÒNG, CHỐNG MA TÚY · V11.4

Ứng dụng web tĩnh dành cho Trường PTDT Nội trú THPT tỉnh Lai Châu. Chạy offline hoặc đưa thẳng lên GitHub Pages, không cần cài đặt và không dùng cơ sở dữ liệu.

## Chạy trên máy tính

Giữ nguyên toàn bộ thư mục, sau đó nhấp đúp `index.html` và mở bằng Chrome hoặc Edge.

## Các tệp cần sửa về sau

- `js/data.js`: 30 câu hỏi, đáp án, giải thích và 10 tình huống.
- `HUONG_DAN_DOI_CAU_HOI.md`: hướng dẫn từng bước để thay câu hỏi Phần 1 và tình huống Phần 2 an toàn.
- `js/config.js`: tên trường, điểm số, thời gian và tên đội mặc định.
- `css/styles.css`: nền tảng bố cục và các thành phần chung.
- `css/theme.css`: lớp giao diện sân khấu hiện hành; ưu tiên sửa tệp này khi cần đổi màu, khoảng cách hoặc phong cách.
- `js/app.js`: luồng thi theo lượt, tính điểm, đồng hồ và sao lưu.
- `index.html`: khung trang và các hộp thoại chính.

## Đưa lên GitHub Pages

1. Tạo repository mới trên GitHub.
2. Tải toàn bộ nội dung thư mục này lên nhánh `main`.
3. Vào `Settings` → `Pages`.
4. Trong `Build and deployment`, chọn `Deploy from a branch`.
5. Chọn nhánh `main`, thư mục `/ (root)`, rồi bấm `Save`.

GitHub sẽ cung cấp đường dẫn dạng:

`https://ten-tai-khoan.github.io/ten-repository/`

## Lưu ý vận hành

- MC đọc câu hỏi trực tiếp; ứng dụng không có chức năng tự đọc.
- Phần 1: Đội 1 → Đội 4, mỗi đội chọn đúng 1 gói. Bấm phương án để tô cam, bấm `Hiện đáp án` để tô xanh đáp án đúng và tự cộng 4 điểm nếu chọn đúng.
- Phương án đổi sang màu cam ngay khi MC nhấn chuột xuống, không cần chờ nhả chuột. Các ô đáp án được thiết kế cao và dùng chữ lớn để đọc từ xa.
- Ở màn hình chọn gói/tình huống, đội đang thi được tô sáng nổi bật và có dòng `ĐẾN LƯỢT ĐỘI X CHƠI`. Học sinh tự chọn ô số; ứng dụng không có nút chọn ngẫu nhiên thay học sinh.
- Đồng hồ trả lời Phần 1 chỉ hiện số giây `5, 4, 3, 2, 1, 0`, không hiện `00:` phía trước. MC bấm `Bắt đầu`, `Tạm dừng` hoặc `Đặt lại`; nhấn một lần phím `Space` để chạy/tạm dừng tức thì, phím `R` đặt lại. Giữ phím Space không còn làm đồng hồ nhận lệnh lặp.
- Phần 2: mỗi đội chọn đúng 1 tình huống; chọn rõ đồng hồ 2 phút suy nghĩ hoặc 3 phút trình bày ngay trong bảng đồng hồ. Điểm BGK tối đa 30 và có thể sửa lại sau khi lưu.
- Khi mở ứng dụng, màn hình Market xuất hiện trước để dùng trong lúc phát biểu, văn nghệ hoặc chờ chương trình. Ảnh hiển thị sáng nguyên bản; nút điều khiển được làm mờ ở hai góc. Bấm `MỞ CHƯƠNG TRÌNH` một lần để đồng thời vào trang chọn phần thi và bật toàn màn hình. Trình duyệt không cho trang web tự bật toàn màn hình khi người dùng chưa bấm nút. Từ trang chủ có thể bấm `MÀN HÌNH MARKET` để quay lại.
- Phần 3 dùng cùng ảnh Market. Bấm trực tiếp đồng hồ `05:00` hoặc nhấn `Space` để bắt đầu. Vì công bằng, đồng hồ đã chạy không thể tạm dừng; chỉ nút reset hình vòng tròn mới đưa đồng hồ về `05:00`. Đồng hồ có nền gần trong suốt; Home, reset, dấu cộng và cúp mặc định hơi mờ, rê chuột tới sẽ sáng rõ.
- Điểm Phần 3 được nhập kín hai lần cho từng đội. Tám ô luôn mở ở trạng thái trống, bốn đội có bốn màu nền riêng; ứng dụng chỉ lưu khi hai lần trùng nhau và chưa cộng vào điểm công khai. Sau khi kiểm tra xong, bấm biểu tượng cúp để mở điểm Phần 3 và bảng xếp hạng cuối cùng.
- Bản V11.4 đã có sẵn ảnh Market cá nhân hóa cho Sở GD&ĐT Lai Châu và Trường PTDT Nội trú THPT tỉnh Lai Châu. Ảnh dùng dải núi mảnh, tiêu đề giãn thoáng và dòng “PHÒNG, CHỐNG MA TÚY” màu trắng–xanh trang trọng. Muốn đổi ảnh khác, chép ảnh PNG vào thư mục `assets` và đặt đúng tên `anh-nen-phan-3-v2.png`.
- Sau khi thi xong, mở `Bảng xếp hạng` → `Điều chỉnh điểm` để hậu kiểm trực tiếp điểm Phần 2 và Phần 3 của từng đội. Chức năng này chỉ sửa điểm đã nhập, không quay lại phần thi và không thay đổi gói câu hỏi hoặc tình huống đã chọn.
- Tại bảng xếp hạng, bấm `ĂN MỪNG` để mở màn hình vinh danh có pháo hoa, hoa giấy và tim bay; bấm `Quay lại bảng xếp hạng` để trở về.
- Điểm, lượt thi, màn hình đang mở và số giây còn lại đều được tự động lưu trong trình duyệt trên máy đang chạy. Sau mất điện, tắt máy hoặc đóng nhầm trình duyệt, mở lại `index.html` sẽ trở về đúng màn hình; đồng hồ được khôi phục ở trạng thái tạm dừng để MC chủ động nhấn `Space` chạy tiếp.
- Nên tải bản sao lưu JSON sau mỗi phần thi. Bản sao lưu V11 chứa cả tiến trình, màn hình và thời gian còn lại.
- Nếu cần đổi máy: máy thứ hai phải có sẵn cùng bộ game V11.2. Ở máy đang chơi, mở `Thiết lập` → `TẢI PHIÊN ĐỂ CHUYỂN MÁY`, chép tệp `.json` vừa tải sang USB; ở máy khác mở game → `Thiết lập` → `MỞ PHIÊN TỪ MÁY KHÁC`. Không cần chép lại cả thư mục game nếu máy thứ hai đã có đúng phiên bản. Dữ liệu tự lưu trong trình duyệt không tự truyền sang máy khác, vì vậy nên tải tệp chuyển máy sau mỗi phần thi.
- Để có nhạc ăn mừng, chép một bài MP3 vào `assets/music` và đổi tên chính xác thành `nhac-an-mung.mp3`. Nhạc tự chạy khi bấm `ĂN MỪNG`, tự lặp lại khi hết bài và tự dừng khi rời màn hình này.
- Nhấn `F11` hoặc nút toàn màn hình khi trình chiếu trên màn hình LED.

