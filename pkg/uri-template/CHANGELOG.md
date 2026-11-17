# @opendoc/uri-template

## 1.5.5

### Patch Changes

- 1b44872: 修复四处 RFC 6570 展开偏差（#37）：

  - 查询展开中变量名里的合法 pct 编码三元组不再被二次编码
  - 空列表与空对象在查询展开中不再产出 `?key=`
  - 保留展开（`+` 与 `#`）中裸 `%` 会被转义为 `%25`
  - 前缀修饰符（`:n`）按字符截断，不再把多字节字符切成半个（此前对 `{clef:1}` 这类模板会抛 `URIError: URI malformed`）

  现已通过 uritemplate-test extended-tests 全部 53 个用例。

## 1.5.4

### Patch Changes

- 59a0900: 删除 UriTemplateParser 的多余参数

## 1.5.3

### Patch Changes

- d9fec1f: 新增 @opendoc/uri-template 处理 openapi 的 path.
