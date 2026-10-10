const fs=require("fs");
const vm=require("vm");
const path=require("path");

const root=path.resolve(__dirname,"..");
const storage=new Map();
const elements=new Map();
const listeners={};
const makeElement=id=>({
  id,
  innerHTML:"",
  textContent:"",
  value:"",
  dataset:{},
  classList:{add(){},remove(){},toggle(){}},
  focus(){},
  showModal(){},
  close(){},
  appendChild(){},
  remove(){},
});
[
  "screen","topScoreStrip","toast","timerTime","timer","timerToggle",
  "scoreDialog","settingsDialog","scoreDialogTitle","scoreDialogHint","scoreInputs",
  "teamNameInputs","stageScoreDialog","stageScoreInputs"
].forEach(id=>elements.set(id,makeElement(id)));

const context={
  console,
  Blob,
  URL:{createObjectURL(){return"blob:test"},revokeObjectURL(){}},
  setTimeout(fn){fn();return 1},
  clearInterval(){},
  setInterval(){return 1},
  confirm(){return true},
  localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)},
  document:{
    body:{dataset:{},appendChild(){}},
    documentElement:{requestFullscreen(){}},
    fullscreenElement:null,
    getElementById:id=>elements.get(id)||makeElement(id),
    querySelector:selector=>selector.startsWith("#")?elements.get(selector.slice(1))||null:null,
    addEventListener(type,handler){listeners[type]=handler},
    createElement(){return makeElement("a")},
    exitFullscreen(){},
  },
  window:{scrollTo(){},AudioContext:null,webkitAudioContext:null},
};
context.window.window=context.window;
context.window.document=context.document;
context.window.localStorage=context.localStorage;
vm.createContext(context);
for(const file of ["js/config.js","js/data.js","js/app.js"]){
  vm.runInContext(fs.readFileSync(path.join(root,file),"utf8"),context,{filename:file});
}

const run=code=>vm.runInContext(code,context);
const assert=(condition,message)=>{if(!condition)throw new Error(message)};

const indexSource=fs.readFileSync(path.join(root,"index.html"),"utf8");
assert(indexSource.includes('id="celebrationMusic"')&&indexSource.includes(" loop "),"Nhạc ăn mừng chưa được thiết lập tự lặp");
assert(fs.existsSync(path.join(root,"assets","anh-nen-phan-3-v2.png")),"Thiếu ảnh Market V2 mặc định");

assert(elements.get("screen").innerHTML.includes("MỞ CHƯƠNG TRÌNH"),"Thiếu màn hình market mở đầu");
assert(elements.get("screen").innerHTML.includes("market-fullscreen"),"Màn market thiếu nút toàn màn hình");
run("startProgram()");
assert(elements.get("screen").innerHTML.includes("PHẦN 1"),"Trang chủ không hiển thị đủ phần thi");
assert(elements.get("screen").innerHTML.includes("HỘI THI TUYÊN TRUYỀN PHÒNG, CHỐNG MA TÚY"),"Tiêu đề trang chủ chưa đúng");
assert(!elements.get("screen").innerHTML.includes("<br><strong>phòng"),"Tiêu đề trang chủ vẫn bị tách dòng cũ");
run("openPart1()");
assert(elements.get("screen").innerHTML.includes("ĐẾN LƯỢT <strong>ĐỘI 1</strong> CHƠI"),"Phần 1 thiếu thông báo lượt chơi");
assert(!elements.get("screen").innerHTML.includes("CHỌN NGẪU NHIÊN CHO"),"Phần 1 vẫn còn nút chọn ngẫu nhiên của hệ thống");
assert(!elements.get("screen").innerHTML.includes('class="rank-tag"'),"Bảng đội vẫn còn nhãn ĐỘI bị lặp");
assert(elements.get("screen").innerHTML.includes('class="team-status">ĐANG THI'),"Đội đang thi chưa có trạng thái nổi bật");
run("selectPackage(1)");
assert(elements.get("screen").innerHTML.includes("onpointerdown=\"selectAnswer('A')\""),"Đáp án chưa phản hồi ngay khi nhấn chuột");
assert(elements.get("screen").innerHTML.includes("option-a"),"Đáp án A–D chưa có mã màu riêng");
run("timer.left=5;tickDisplay()");
assert(elements.get("timerTime").textContent==="5","Đồng hồ 5 giây vẫn còn hiển thị dạng 00:05");
listeners.keydown({target:{matches(){return false}},repeat:false,code:"Space",key:" ",preventDefault(){}});
assert(run("timer.running")===true,"SPACE không bắt đầu đồng hồ");
listeners.keydown({target:{matches(){return false}},repeat:true,code:"Space",key:" ",preventDefault(){}});
assert(run("timer.running")===true,"Giữ SPACE làm đồng hồ đổi trạng thái nhiều lần");
run("selectAnswer('B')");
assert(elements.get("screen").innerHTML.includes('option-b selected'),"Đáp án được chọn chưa đổi màu ngay");
run("openPart2()");
assert(elements.get("screen").innerHTML.includes("ĐẾN LƯỢT <strong>ĐỘI 1</strong> CHƠI"),"Phần 2 thiếu thông báo lượt chơi");
assert(!elements.get("screen").innerHTML.includes("CHỌN NGẪU NHIÊN CHO"),"Phần 2 vẫn còn nút chọn ngẫu nhiên của hệ thống");
run("openScoreDialog('p2',0,false)");
assert(elements.get("scoreInputs").innerHTML.includes('value=""'),"Ô điểm Phần 2 mới vẫn hiện sẵn số 0");
run("openPart3(0)");
assert(elements.get("screen").innerHTML.includes('class="stage-reset-icon"'),"Phần 3 thiếu nút reset dạng biểu tượng");
assert(elements.get("screen").innerHTML.includes("stage-score-trigger"),"Phần 3 thiếu nút mở bảng điểm");
assert(elements.get("screen").innerHTML.includes("stage-home-icon"),"Phần 3 thiếu nút Home dạng biểu tượng");
assert(elements.get("screen").innerHTML.includes('aria-label="Chưa nhập điểm kín"'),"Biểu tượng cúp bị ẩn trước khi nhập điểm");
assert(!elements.get("screen").innerHTML.includes("SÂN KHẤU HÓA"),"Phần 3 vẫn còn tiêu đề phủ lên ảnh market");
assert(!elements.get("screen").innerHTML.includes("SPACE"),"Phần 3 vẫn còn hướng dẫn phím Space");
assert(!elements.get("screen").innerHTML.includes("PHẦN 2"),"Phần 3 vẫn còn nút quay về Phần 2");
assert(!elements.get("screen").innerHTML.includes("timerToggle"),"Phần 3 vẫn còn nút bắt đầu/tạm dừng riêng");
listeners.keydown({target:{matches(){return false}},repeat:false,code:"Space",key:" ",preventDefault(){}});
assert(run("timer.running")===true,"Bấm đồng hồ Phần 3 chưa bắt đầu đếm");
run("startStageTimer()");
assert(run("timer.running")===true,"Đồng hồ Phần 3 bị tạm dừng sau khi đã chạy");
assert(!elements.get("screen").innerHTML.includes("p3score0"),"Bảng nhập điểm Phần 3 đang hiển thị khi chưa bấm nút Điểm");
run("openP3ScorePanel()");
assert(elements.get("stageScoreInputs").innerHTML.includes("p3score0"),"Không mở được bảng nhập điểm chung Phần 3");
assert(elements.get("stageScoreInputs").innerHTML.includes('type="password"'),"Điểm Phần 3 chưa được che kín");
assert(elements.get("stageScoreInputs").innerHTML.includes("p3confirm0"),"Thiếu ô nhập xác nhận điểm lần hai");
for(let i=0;i<4;i++){const input=makeElement(`p3score${i}`),confirmInput=makeElement(`p3confirm${i}`);input.value=String([51,40,30,20][i]);confirmInput.value=input.value;elements.set(input.id,input);elements.set(confirmInput.id,confirmInput)}
run("saveAllP3Scores()");
assert(run("JSON.stringify(state.p3Scores)")==="[0,0,0,0]","Ứng dụng chấp nhận điểm Phần 3 vượt 50");
for(let i=0;i<4;i++){const input=makeElement(`p3score${i}`),confirmInput=makeElement(`p3confirm${i}`);input.value=String([50,40,30,20][i]);confirmInput.value=input.value;elements.set(input.id,input);elements.set(confirmInput.id,confirmInput)}
run("saveAllP3Scores()");
assert(run("JSON.stringify(state.p3Scores)")==="[50,40,30,20]","Nút lưu chung Phần 3 lưu sai");
assert(run("state.p3Published")===false,"Điểm Phần 3 bị công bố ngay sau khi nhập");
assert(elements.get("screen").innerHTML.includes('aria-label="Sửa điểm kín"'),"Nút dấu cộng chưa chuyển sang chức năng sửa điểm kín Phần 3");
assert(elements.get("screen").innerHTML.includes('aria-label="Công bố kết quả"'),"Thiếu nút cúp công bố kết quả sau khi khóa điểm");
assert(!elements.get("screen").innerHTML.includes(">🏆 CÔNG BỐ KẾT QUẢ<"),"Nút cúp vẫn còn chữ công bố kết quả");
run("openP3ScorePanel()");
assert((elements.get("stageScoreInputs").innerHTML.match(/value=""/g)||[]).length===8,"Các ô điểm kín không mở ở trạng thái trống");
run("showScoreboard()");
assert(elements.get("screen").innerHTML.includes("ĐANG KHÓA"),"Bảng điểm tạm thời làm lộ điểm Phần 3");
assert(elements.get("screen").innerHTML.includes("🔒"),"Cột điểm Phần 3 chưa được khóa trước công bố");
run("openPart3();publishP3Scores()");
assert(run("state.p3Published")===true,"Không công bố được điểm Phần 3");
assert(elements.get("screen").innerHTML.includes("ranking-showcase"),"Bảng xếp hạng chưa trở lại bố cục V3");
assert(elements.get("screen").innerHTML.includes("VỊ TRÍ DẪN ĐẦU"),"Thiếu thẻ đội dẫn đầu kiểu V3");
assert(elements.get("screen").innerHTML.includes("ĂN MỪNG"),"Thiếu nút ăn mừng");
run("beginScoreAdjustments()");
assert(elements.get("screen").innerHTML.includes("CHẾ ĐỘ HẬU KIỂM"),"Thiếu chế độ hậu kiểm");
assert(elements.get("screen").innerHTML.includes("LƯU ĐIỀU CHỈNH"),"Thiếu nút lưu điều chỉnh");

const packageSnapshot=run("JSON.stringify({p1Packages:state.p1Packages,p2Situations:state.p2Situations,p1Turn:state.p1Turn,p2Turn:state.p2Turn})");
for(let i=0;i<4;i++){
  const p2=makeElement(`adjustP2-${i}`),p3=makeElement(`adjustP3-${i}`);
  p2.value=String([30,20,10,0][i]);
  p3.value=String([50,40,30,20][i]);
  elements.set(p2.id,p2);elements.set(p3.id,p3);
}
run("saveScoreAdjustments()");
assert(run("JSON.stringify(state.p2Scores)")==="[30,20,10,0]","Điểm Phần 2 lưu sai");
assert(run("JSON.stringify(state.p3Scores)")==="[50,40,30,20]","Điểm Phần 3 lưu sai");
assert(run("JSON.stringify({p1Packages:state.p1Packages,p2Situations:state.p2Situations,p1Turn:state.p1Turn,p2Turn:state.p2Turn})")===packageSnapshot,"Hậu kiểm đã làm thay đổi tiến trình thi");
assert(elements.get("screen").innerHTML.includes("80"),"Tổng điểm hoặc xếp hạng chưa cập nhật");
run("showCelebration()");
assert(elements.get("screen").innerHTML.includes("VINH DANH ĐỘI CHIẾN THẮNG"),"Thiếu màn hình vinh danh");
assert(elements.get("screen").innerHTML.includes("firework"),"Thiếu hiệu ứng pháo hoa");
assert(elements.get("screen").innerHTML.includes("confetti"),"Thiếu hiệu ứng hoa giấy");
assert(elements.get("screen").innerHTML.includes("flying-heart"),"Thiếu hiệu ứng tim bay");
assert(run("JSON.stringify(state.p2Scores)")==="[30,20,10,0]","Màn ăn mừng làm thay đổi điểm");
run("showScoreboard()");

run("beginScoreAdjustments()");
elements.get("adjustP2-0").value="31";
run("saveScoreAdjustments()");
assert(run("state.p2Scores[0]")===30,"Ứng dụng chấp nhận điểm Phần 2 vượt 30");

run("openPart1();selectPackage(2);timer.left=4;saveRuntime()");
const checkpoint=JSON.parse(storage.get("ma-tuy-quiz-lai-chau-v3-runtime-v11"));
assert(checkpoint.view.name==="q"&&checkpoint.view.pkg===2,"Không lưu đúng màn hình đang chơi");
assert(checkpoint.timer.left===4,"Không lưu số giây còn lại để khôi phục");

console.log("PASS: market, đồng hồ, điểm kín hai lần, công bố, khôi phục phiên và bảo toàn tiến trình.");
