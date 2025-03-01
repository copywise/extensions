#!/bin/bash

# 1.  清理 dist
rm -rf dist
echo "清理 dist 完成"

# 2. 读取 package.json 里的所有 commands
commands=$(jq -r '.commands[].name' package.json)
echo "读取 package.json 里的 commands 完成: $commands"

# 3. 将 commands 的 name 组成一个数组
input_files=()
for command in $commands; do
    if [[ -f "./src/${command}.ts" ]]; then
        input_files+=("./src/${command}.ts")
    else
        if [[ -f "./src/${command}.tsx" ]]; then
            input_files+=("./src/${command}.tsx")
        fi
    fi
done
echo "组成 input_files 数组完成: ${input_files[@]}"
echo "找到的输入文件: ${input_files[@]}"

# 4. 遍历每个输入文件，创建包装器文件
input_files_wrapped=()

# 创建临时目录
temp_dir="temp"
mkdir -p "$temp_dir"

for input_file in "${input_files[@]}"; do
    filename=$(basename "$input_file")

    # 创建临时 JavaScript 文件
    temp_js_file="$temp_dir/temp.mjs"
    esbuild "$input_file" --bundle --outfile="$temp_js_file" --format=esm --external:react --external:@copywise/api

    # 检测是否为 React 组件
    node scripts/isReactComponent.mjs "$temp_js_file"
    is_react_component=$?

    # 删除临时 JavaScript 文件
    rm -f "$temp_js_file"

    # 输出 is_react_component 的值
    echo "is_react_component: $input_file $is_react_component"
    
    # 根据是否为 React 组件创建不同的包装器文件
    if [ $is_react_component -eq 0 ]; then
        # React 组件的包装器
        cat > "$temp_dir/${filename}" << EOF
import { _setContext } from '@copywise/api';
import React from 'react';
import OriginalComponent from '../src/${filename%.*}';

export default ({ context, ...props }) => {
  _setContext(context);
  return React.createElement(OriginalComponent, props);
};
EOF
    else
        # 普通函数的包装器
        cat > "$temp_dir/${filename}" << EOF
import { _setContext } from '@copywise/api';
import originalFunc from '../src/${filename%.*}';

export default ({ context, ...props }) => {
  _setContext(context);
  return originalFunc(props);
};
EOF
    fi
    
    input_files_wrapped+=()

    # esbuild 构建
    echo "正在转换: $temp_dir/${filename}"
    esbuild "$temp_dir/${filename}" --bundle --outdir=dist --format=esm --external:react --external:@copywise/api
done

# 清理临时文件
rm -rf "$temp_dir"

# 5. 重命名 .js -> .mjs
for file in dist/*.js; do
    mv "$file" "${file%.js}.mjs"
done

# 6. 从 package.json 提取指定字段生成 manifest.json
jq '{ name: .name, version: .version, title: .title, description: .description, icons: .icons, commands: .commands, preferences: .preferences }' package.json > dist/manifest.json

# 7. 复制 assets 到 dist（排除隐藏文件）
rsync -R $(find assets -type f ! -name '.*') dist/

# 8. dist里面的文件打成一个zip包
rm -rf c1818798-4fc2-4c62-919c-7ecc2c881d75.zip
cd dist && zip -r ../c1818798-4fc2-4c62-919c-7ecc2c881d75.zip *

echo "Build completed. Output files are in the dist directory."