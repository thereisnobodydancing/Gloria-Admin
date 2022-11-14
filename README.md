# 光大OA管理后台

技术框架：[vue3](https://cn.vuejs.org/) + [vite](https://vitejs.dev/) + [Naive UI](https://www.naiveui.com/zh-CN/light) + [Tailwind CSS](https://tailwindcss.com/)

## 更新日志

### v1.0.0-alpha.2

2022-11-14

#### Feature

- 人员选择器组件优化，部门后面增加小图标

#### Bug Fixes

- 创建模板页面人员选择异常
- 部分页面加载过程中Empty显示异常

### v1.0.0-alpha.1

2022-11-11

#### Feature

- 更新登录界面ui，看起来也许会比以前高大上一丢丢
- 写了一个公共头像组件 BaseAvatar

#### Bug Fixes

- 技术部门下有数据的情况下，添加员工不能添加到上级技术部门
- 上级领导选择完成确定后，再次打开未保存
- 置顶功能异常
- 头像渲染闪烁异常
- 模块不能保存
- 编辑后台角色Modal勾选异常
- 账号被停用 仍然能登录、操作

### v1.0.0-alpha.0

2022-11-10

- 提交最初的版本
