import { log, showToast, Record } from '@copywise/api';

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

async function uploadImageToR2(accessKeyId: string, secretAccessKey: string, bucketName: string, endpoint: string, domain: string,data: Buffer | Blob, fileName: string, mimeType: string): Promise<string> {
  // 创建 S3Client 实例，使用用户提供的凭证
  const s3 = new S3Client({
    region: "auto", // R2 推荐用 auto
    endpoint,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
  const params = {
    Bucket: bucketName, // R2 的 bucket 名称
    Key: fileName,
    Body: data,
    ContentType: mimeType, // 自动根据文件名推断类型
    // R2 不支持 ACL 字段
  };
  try {
    const command = new PutObjectCommand(params);
    await s3.send(command);
    return `${domain}/${params.Key}`;
  } catch (err) {
    console.error("上传失败", err);
    throw err;
  }
}

// 生成唯一文件名：时间戳 + 随机串
function generateUniqueName(): string {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substr(2, 8); // 8位随机串
  return `${timestamp}_${randomStr}`;
}

export default async ({ data, preferences }) => {
  const { accessKey, secretKey, bucketName, endpoint, domain } = preferences;
  let showFilename = "";
  if (data.type === "file") {
    // 提取文件名（包含扩展名）
    const path = data.metadata.path;
    showFilename = path ? path.substring(path.lastIndexOf('/') + 1) : "";
  }

  showToast({
    title: 'Uploading...',
    message: showFilename,
    status: 'success'
  });

  const { content, mimeType, filePath } = await Record.read();

  const fileExt = filePath ? filePath.substring(filePath.lastIndexOf('.')) : '';
  const uniqueName = generateUniqueName();
  // 根据 preferences.folderPath 构造文件夹路径
  let folderPath = preferences.folderPath || "";
  folderPath = folderPath.replace(/^\/+|\/+$/g, ""); // 去掉首尾的 /
  if (folderPath) {
    folderPath += "/";
  }
  const fileName = `${folderPath}${uniqueName}${fileExt}`;

  try {
    const url = await uploadImageToR2(accessKey, secretKey, bucketName, endpoint, domain, content, fileName, mimeType);
    showToast({
      title: 'Uploaded!',
      message: url,
      status: 'success'
    });
    return url;
  } catch (e) {
    // log.error("上传失败");
    return null;
  }
}
