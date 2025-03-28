import { openUrl } from '@copywise/api';

export default async ({ data, preferences }) => {
  const text = data?.text || '';
  openUrl(`https://fanyi.baidu.com/mtpe-individual/multimodal?query=${text}&lang=auto2${preferences.targetLanguage || 'zh'}`);
}
