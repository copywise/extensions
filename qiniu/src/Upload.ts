import { log, showToast, Record } from '@copywise/api';

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// 替换为你的 Cloudflare R2 信息
const s3 = new S3Client({
  region: "auto", // R2 推荐用 auto
  endpoint: "https://9d3809956f93a0669b5e4756db48847b.r2.cloudflarestorage.com", // 你的 R2 endpoint
  credentials: {
    accessKeyId: "43eebbab972b04ed7f0e264ebe9b699e",
    secretAccessKey: "efa4d074bbebbc0c084667989f9d9152b231a7e9b6b61a536e65bcacbd8f8c18",
  },
});

async function uploadImageToR2(data: Buffer | Blob, fileName: string, mimeType: string): Promise<string> {
  const params = {
    Bucket: "copywise-apps", // R2 的 bucket 名称
    Key: fileName,
    Body: data,
    ContentType: mimeType, // 自动根据文件名推断类型
    // R2 不支持 ACL 字段
  };
  try {
    const command = new PutObjectCommand(params);
    await s3.send(command);
    // R2 的公开访问链接格式如下（需开启 bucket 公网访问权限）
    return `https://${params.Bucket}.r2.cloudflarestorage.com/${params.Key}`;
  } catch (err) {
    console.error("上传失败", err);
    throw err;
  }
}

function base64ToBuffer(base64: string): Buffer {
  // 支持 data:image/png;base64,xxxx 或纯 base64 字符串
  const matches = base64.match(/^data:(.+);base64,(.+)$/);
  if (matches) {
    return Buffer.from(matches[2], 'base64');
  } else {
    return Buffer.from(base64, 'base64');
  }
}

export default async () => {
  const { content, mimeType } = await Record.read();
  const fileName = `images/${Date.now()}.jpg`;
  log.debug(`🥋 ${mimeType}`)

  try {
    const url = await uploadImageToR2(content, fileName, mimeType);
    showToast({
      title: '上传成功',
      message: url,
      status: 'success'
    });
    return url;
  } catch (e) {
    // log.error("上传失败");
    return null;
  }
}
