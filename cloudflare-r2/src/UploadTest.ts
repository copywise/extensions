import upload from "./Upload";
import * as fs from "fs";
import * as path from "path";

async function testUpload() {
  // 构造一个data，可以用本地的一张图片文件作为Buffer
  // 用字符串作为 data 测试上传
  // const data = "hello world";
  // 构造一个data，可以用本地的一张图片文件作为Buffer
  const imgPath = path.resolve(__dirname, "test.jpg");
  if (!fs.existsSync(imgPath)) {
    console.error("请在 src 目录下放一张名为 test.jpg 的图片用于测试");
    return;
  }
  console.log(imgPath);
  const imgData = fs.readFileSync(imgPath); // Buffer 类型
  const url = await upload({ data: { text: imgData } });
  console.log("上传结果：", url);
}

testUpload();
