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

# 4. esbuild 构建
for input_file in "${input_files[@]}"; do
    echo "正在转换: $input_file"
    esbuild $input_file --bundle --outdir=dist --format=esm --external:react --external:@copywise/api
done

# 5. 重命名 .js -> .mjs
for file in dist/*.js; do
    mv "$file" "${file%.js}.mjs"
done

# 6. 从 package.json 提取指定字段生成 manifest.json
jq '{ name: .name, version: .version, title: .title, description: .description, icons: .icons, commands: .commands, preferences: .preferences }' package.json > dist/manifest.json

# 7. 复制 assets 到 dist（排除隐藏文件）
rsync -R $(find assets -type f ! -name '.*') dist/

# 8. dist里面的文件打成一个zip包
rm -rf 69cebdda-0165-424a-bb04-0c1990645e71.zip
cd dist && zip -r ../69cebdda-0165-424a-bb04-0c1990645e71.zip *

echo "Build completed. Output files are in the dist directory."