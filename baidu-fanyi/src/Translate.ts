import { openUrl } from '@copywise/api';

export default async ({ data, preferences }) => {
  openUrl(`https://fanyi.baidu.com/mtpe-individual/multimodal?query=${data}&lang=auto2${preferences.targetLanguage || 'zh'}`);
}
