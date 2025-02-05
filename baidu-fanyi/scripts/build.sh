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

# 6. 复制 package.json 到 dist
cp package.json dist


# 7. dist里面的文件打成一个zip包
rm -rf 69cebdda-0165-424a-bb04-0c1990645e71.zip
zip -rj 69cebdda-0165-424a-bb04-0c1990645e71.zip ./dist/*

echo "Build completed. Output files are in the dist directory."