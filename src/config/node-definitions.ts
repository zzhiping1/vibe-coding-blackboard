import type { NodeCategoryGroup, NodeDefinition } from "../types/node-palette";

// ========= 💡 提示词 ========= (avg 72.0)
const promptNodes: NodeDefinition[] = [
  { id: "prompt-template", label: "提示词模板", category: "prompt", icon: "📝", color: "#f97316", defaultSpecs: "输出AA：分镜提示词\n模板结构：\n[角色描述]+[动作]+[表情]+[场景]+[光影]+[镜头]+[风格]\n填充变量从A/C/D提取", score: 85 },
  { id: "prompt-enhance", label: "提示词增强", category: "prompt", icon: "✨", color: "#f97316", defaultSpecs: "AI优化提示词质量\n添加质量关键词\n负向提示词生成", score: 78 },
  { id: "prompt-translate", label: "提示词翻译", category: "prompt", icon: "🌐", color: "#f97316", defaultSpecs: "中→英/日 提示词翻译\n保持语义精确\n适配目标平台关键词习惯", score: 70 },
  { id: "prompt-bind", label: "素材关联绑定", category: "prompt", icon: "🔗", color: "#f97316", defaultSpecs: "将AA提示词与对应的C角色图、D场景图绑定\n形成完整的生成包\n关联关系可视化", score: 65 },
  { id: "prompt-test", label: "提示词测试", category: "prompt", icon: "🧪", color: "#f97316", defaultSpecs: "A/B测试提示词\n输出对比\n参数调优\n最佳实践沉淀", score: 62 },
];

// ========= 📝 文本处理 ========= (avg 67.9)
const textProcessNodes: NodeDefinition[] = [
  { id: "ai-segment", label: "AI智能分段", category: "text-process", icon: "🔪", color: "#8b5cf6", defaultSpecs: "按照场景/情节/对话自然分段\n每段对应一个漫剧场景\n保留原文上下文关联", score: 82 },
  { id: "manga-adapt", label: "漫剧化改编", category: "text-process", icon: "🎭", color: "#8b5cf6", defaultSpecs: "输出A：漫剧改编脚本\n- 镜头描述（画面+动作）\n- 对话/旁白/字幕\n- 情绪/氛围标注\n- 角色出场标记", score: 80 },
  { id: "dialogue-extract", label: "对白提取", category: "text-process", icon: "💬", color: "#8b5cf6", defaultSpecs: "提取角色对话，标注说话人、情绪、语气", score: 75 },
  { id: "episode-split", label: "分集切分", category: "text-process", icon: "📑", color: "#8b5cf6", defaultSpecs: "按集数切分剧本\n每集开头/结尾设计\n悬念/钩子位置", score: 72 },
  { id: "text-translate", label: "文本翻译", category: "text-process", icon: "🌐", color: "#8b5cf6", defaultSpecs: "多语言翻译\n保持语境/风格\n专业术语表\n本地化适配", score: 68 },
  { id: "text-summarize", label: "内容摘要", category: "text-process", icon: "📊", color: "#8b5cf6", defaultSpecs: "长文本摘要提取\n关键信息标注\n章节概要生成", score: 62 },
  { id: "narration-split", label: "旁白/对话分离", category: "text-process", icon: "🔀", color: "#8b5cf6", defaultSpecs: "分离旁白叙述和角色对话\n分别输出处理", score: 58 },
  { id: "continuity-check", label: "连贯性检查", category: "text-process", icon: "🔍", color: "#8b5cf6", defaultSpecs: "检查角色状态连续性\n检查场景过渡合理性\n检查时间线一致性", score: 55 },
];

// ========= 📥 输入/素材 ========= (avg 67.3)
const inputNodes: NodeDefinition[] = [
  { id: "upload-novel", label: "上传小说原文", category: "input", icon: "📖", color: "#6366f1", defaultSpecs: "小说文件格式：TXT/DOCX/PDF\n编码：UTF-8\n支持批量上传多章节", score: 85 },
  { id: "upload-ref-images", label: "上传参考图片", category: "input", icon: "🖼️", color: "#6366f1", defaultSpecs: "角色参考/风格参考/场景参考", score: 72 },
  { id: "set-params", label: "设置参数", category: "input", icon: "⚙️", color: "#6366f1", defaultSpecs: "集数规划：每集N分钟\n画风：写实/二次元/水墨\n分辨率：1080p/4K", score: 65 },
  { id: "upload-script", label: "上传已有剧本", category: "input", icon: "📋", color: "#6366f1", defaultSpecs: "已改编完成的漫剧剧本", score: 47 },
];

// ========= 🖥️ 前端开发 ========= (avg 69.7) + MCP + skill
const frontendNodes: NodeDefinition[] = [
  { id: "fe-setup", label: "前端项目初始化", category: "frontend", icon: "⚡", color: "#3b82f6", defaultSpecs: "框架：React/Vue/Svelte\n构建工具：Vite/Webpack\nTypeScript配置\n代码规范ESLint", score: 90 },
  { id: "fe-component", label: "UI组件开发", category: "frontend", icon: "🧩", color: "#3b82f6", defaultSpecs: "组件拆分设计\nProps/State设计\n组件复用策略\n单元测试", score: 88 },
  { id: "fe-page", label: "页面开发", category: "frontend", icon: "📄", color: "#3b82f6", defaultSpecs: "路由配置\n页面布局\n数据获取/渲染\nSEO优化", score: 87 },
  { id: "fe-responsive", label: "响应式适配", category: "frontend", icon: "📱", color: "#3b82f6", defaultSpecs: "移动端适配\n平板适配\n桌面端布局\n触摸交互", score: 80 },
  { id: "fe-form", label: "表单开发", category: "frontend", icon: "📝", color: "#3b82f6", defaultSpecs: "表单验证\n动态表单\n文件上传\n多步骤表单", score: 78 },
  { id: "fe-seo", label: "SEO优化", category: "frontend", icon: "🔍", color: "#3b82f6", defaultSpecs: "Meta标签\n结构化数据\nSitemap\n服务端渲染SSR", score: 75 },
  { id: "fe-state", label: "状态管理", category: "frontend", icon: "📦", color: "#3b82f6", defaultSpecs: "全局状态方案\nRedux/Zustand/Pinia\n数据缓存策略\n持久化", score: 73 },
  { id: "fe-api", label: "API对接", category: "frontend", icon: "🔗", color: "#3b82f6", defaultSpecs: "请求封装\n拦截器/中间件\n错误处理\n加载状态", score: 72 },
  { id: "fe-routing", label: "路由设计", category: "frontend", icon: "🗺️", color: "#3b82f6", defaultSpecs: "路由结构设计\n权限路由\n懒加载路由\n面包屑导航", score: 70 },
  { id: "fe-error", label: "错误处理", category: "frontend", icon: "🛡️", color: "#3b82f6", defaultSpecs: "错误边界\n全局错误捕获\n友好的错误页面\n错误上报", score: 65 },
  { id: "fe-perf", label: "性能优化", category: "frontend", icon: "🚀", color: "#3b82f6", defaultSpecs: "代码分割/懒加载\n图片优化/WebP\n缓存策略\nLighthouse优化", score: 63 },
  { id: "fe-i18n", label: "国际化i18n", category: "frontend", icon: "🌍", color: "#3b82f6", defaultSpecs: "多语言方案\n语言包管理\n日期/数字格式\nRTL支持", score: 55 },
  { id: "fe-a11y", label: "无障碍a11y", category: "frontend", icon: "♿", color: "#3b82f6", defaultSpecs: "ARIA标签\n键盘导航\n屏幕阅读器\n对比度检查", score: 50 },
  { id: "fe-pwa", label: "PWA支持", category: "frontend", icon: "📲", color: "#3b82f6", defaultSpecs: "Service Worker\n离线缓存\n安装提示\n推送通知", score: 48 },
  { id: "skill-responsive-site", label: "响应式网站(一键)", category: "frontend", icon: "🌐", color: "#3b82f6", defaultSpecs: "📦 Skill: 自动搭建响应式网站\n📋 流程: 初始化项目→桌面/平板/手机三端适配→响应式组件库→断点测试→部署\n🔧 工具: Playwright自动截图验证各端显示\n💡 Agent读取此节点后自动完成全套响应式网站搭建", score: 78 },
  { id: "skill-admin-dashboard", label: "管理后台(一键)", category: "frontend", icon: "📊", color: "#3b82f6", defaultSpecs: "📦 Skill: 自动搭建后台管理系统\n📋 流程: 初始化→登录页→侧边栏导航→CRUD表格→图表仪表盘→权限控制\n🔧 工具: Ant Design / Element Plus 组件库\n💡 Agent读取此节点后自动生成完整后台管理系统", score: 75 },
  { id: "mcp-playwright", label: "浏览器自动化测试", category: "frontend", icon: "🎭", color: "#3b82f6", defaultSpecs: "📦 工具: Playwright MCP\n📋 功能: 浏览器自动化 + 页面截图 + 表单填写 + E2E测试\n📌 安装: npm i -g @playwright/mcp\n📌 配置: {\"command\":\"npx\",\"args\":[\"@playwright/mcp@latest\"]}\n💡 自动验证页面显示、交互流程、截图对比", score: 60 },
  { id: "mcp-chrome-devtools", label: "浏览器调试工具", category: "frontend", icon: "🛠️", color: "#3b82f6", defaultSpecs: "📦 工具: Chrome DevTools MCP (44.2k stars)\n📋 功能: 浏览器调试 + 网络请求检查 + Console日志 + 性能分析\n📌 安装: npm i -g chrome-devtools-mcp\n📌 配置: {\"command\":\"npx\",\"args\":[\"chrome-devtools-mcp\"]}\n💡 前端调试、性能分析、网络问题排查", score: 55 },
];

// ========= ⚙️ 后端开发 ========= (avg 53.6) + MCP + skill
const backendNodes: NodeDefinition[] = [
  { id: "skill-auth-system", label: "用户登录注册(一键)", category: "backend", icon: "🔑", color: "#f59e0b", defaultSpecs: "📦 Skill: 自动搭建用户认证系统\n📋 流程: 数据库建表→注册/登录API→JWT Token→密码加密→邮箱验证→第三方登录\n🔧 工具: Supabase Auth 或自建JWT\n💡 Agent读取此节点后自动生成完整认证系统", score: 90 },
  { id: "be-api", label: "API接口开发", category: "backend", icon: "🔌", color: "#f59e0b", defaultSpecs: "RESTful/GraphQL设计\n路由/控制器\n请求验证\n响应格式", score: 88 },
  { id: "be-logic", label: "业务逻辑", category: "backend", icon: "💼", color: "#f59e0b", defaultSpecs: "核心业务实现\n数据校验\n事务处理\n异常捕获", score: 85 },
  { id: "be-setup", label: "后端项目初始化", category: "backend", icon: "⚙️", color: "#f59e0b", defaultSpecs: "框架：Node/Python/Go/Java\n项目结构\n依赖管理\n环境配置", score: 83 },
  { id: "db-design", label: "数据库设计", category: "backend", icon: "🗄️", color: "#f59e0b", defaultSpecs: "ER图设计\n表结构定义\n索引策略\n关系设计", score: 80 },
  { id: "be-middleware", label: "中间件", category: "backend", icon: "🔧", color: "#f59e0b", defaultSpecs: "日志中间件\nCORS配置\n限流/防刷\n压缩/缓存", score: 72 },
  { id: "db-schema", label: "数据建模", category: "backend", icon: "📊", color: "#f59e0b", defaultSpecs: "实体关系\n字段类型\n约束条件\n版本迁移", score: 70 },
  { id: "be-upload", label: "文件上传", category: "backend", icon: "📁", color: "#f59e0b", defaultSpecs: "分片上传\n断点续传\n存储方案\n格式校验", score: 68 },
  { id: "be-cache", label: "缓存策略", category: "backend", icon: "⚡", color: "#f59e0b", defaultSpecs: "Redis/Memcached\n缓存粒度\n过期策略\n缓存穿透/雪崩", score: 65 },
  { id: "be-search", label: "搜索引擎", category: "backend", icon: "🔍", color: "#f59e0b", defaultSpecs: "Elasticsearch/Meilisearch\n全文检索\n搜索建议\n高亮/排序", score: 62 },
  { id: "be-email", label: "邮件服务", category: "backend", icon: "📧", color: "#f59e0b", defaultSpecs: "邮件模板\nSMTP配置\n发送队列\n追踪统计", score: 58 },
  { id: "be-cron", label: "定时任务", category: "backend", icon: "⏰", color: "#f59e0b", defaultSpecs: "Cron表达式\n任务调度\n失败重试\n监控告警", score: 55 },
  { id: "be-queue", label: "消息队列", category: "backend", icon: "📬", color: "#f59e0b", defaultSpecs: "RabbitMQ/Kafka/Pulsar\n异步任务\n事件驱动\n死信处理", score: 50 },
  { id: "be-ratelimit", label: "限流/熔断", category: "backend", icon: "🚦", color: "#f59e0b", defaultSpecs: "令牌桶/滑动窗口\nIP限流\n接口熔断\n降级策略", score: 48 },
  { id: "be-graphql", label: "GraphQL", category: "backend", icon: "◈", color: "#f59e0b", defaultSpecs: "Schema设计\nResolver编写\nN+1问题\nSubscriptions", score: 45 },
  { id: "skill-payment", label: "支付接入(一键)", category: "backend", icon: "💳", color: "#f59e0b", defaultSpecs: "📦 Skill: 自动接入支付系统\n📋 流程: 微信/支付宝SDK→支付下单→回调处理→退款接口→对账\n💡 Agent读取此节点后自动生成完整支付模块", score: 75 },
  { id: "mcp-postgres", label: "PostgreSQL数据库管理", category: "backend", icon: "🐘", color: "#f59e0b", defaultSpecs: "📦 工具: PostgreSQL MCP\n📋 功能: 数据库Schema查询 + SQL执行 + 数据读写\n📌 安装: npx -y @modelcontextprotocol/server-postgres\n📌 配置: {\"command\":\"npx\",\"args\":[\"-y\",\"@modelcontextprotocol/server-postgres\",\"postgresql://...\"]}\n💡 Agent通过此工具直接操作PostgreSQL数据库", score: 55 },
  { id: "mcp-mongodb", label: "MongoDB数据库管理", category: "backend", icon: "🍃", color: "#f59e0b", defaultSpecs: "📦 工具: MongoDB MCP\n📋 功能: 文档CRUD + Schema查询 + 聚合管道 + 索引管理\n📌 安装: npx -y mongodb-mcp-server\n📌 配置: {\"command\":\"npx\",\"args\":[\"-y\",\"mongodb-mcp-server\"],\"env\":{\"MONGODB_URI\":\"...\"}}\n💡 Agent通过此工具直接操作MongoDB", score: 50 },
  { id: "mcp-redis-cache", label: "Redis缓存管理", category: "backend", icon: "🔴", color: "#f59e0b", defaultSpecs: "📦 工具: Redis MCP\n📋 功能: Key-Value读写 + 列表/集合/哈希操作 + TTL管理\n📌 安装: npx -y @modelcontextprotocol/server-redis\n📌 配置: {\"command\":\"npx\",\"args\":[\"-y\",\"@modelcontextprotocol/server-redis\",\"redis://localhost:6379\"]}\n💡 Agent通过此工具管理Redis缓存", score: 45 },
  { id: "mcp-sqlite", label: "SQLite轻量数据库", category: "backend", icon: "💾", color: "#f59e0b", defaultSpecs: "📦 工具: SQLite MCP\n📋 功能: 轻量数据库 + SQL查询 + 无需服务器\n📌 安装: npx -y @modelcontextprotocol/server-sqlite\n📌 配置: {\"command\":\"npx\",\"args\":[\"-y\",\"@modelcontextprotocol/server-sqlite\",\"/path/to/db.sqlite\"]}\n💡 小型项目、本地开发、原型验证", score: 40 },
  { id: "mcp-supabase", label: "Supabase全栈后端", category: "backend", icon: "⚡", color: "#f59e0b", defaultSpecs: "📦 工具: Supabase MCP\n📋 功能: Postgres数据库 + Auth认证 + Storage存储 + Edge Functions + Realtime\n📌 安装: npx -y @supabase/mcp-server-supabase@latest\n📌 配置: {\"command\":\"npx\",\"args\":[\"-y\",\"@supabase/mcp-server-supabase@latest\"],\"env\":{\"SUPABASE_ACCESS_TOKEN\":\"...\"}}\n💡 全栈项目快速开发，自带认证和存储", score: 58 },
  { id: "db-rw-separate", label: "读写分离", category: "backend", icon: "🔀", color: "#f59e0b", defaultSpecs: "主从配置\n读写路由\n数据同步\n一致性保障", score: 35 },
  { id: "db-nosql", label: "NoSQL设计", category: "backend", icon: "📦", color: "#f59e0b", defaultSpecs: "MongoDB/Redis/DynamoDB\n文档设计\n聚合管道\n索引策略", score: 38 },
  { id: "db-migration", label: "数据迁移", category: "backend", icon: "🚚", color: "#f59e0b", defaultSpecs: "迁移脚本\n数据清洗\n回滚方案\n验证检查", score: 35 },
];

// ========= 🎨 设计 ========= (avg 62.6) + skill
const designNodes: NodeDefinition[] = [
  { id: "skill-admin-panel", label: "后台管理系统(一键)", category: "design", icon: "📊", color: "#ec4899", defaultSpecs: "📦 Skill: 后台管理系统设计模板\n📋 包含: 登录页+侧边栏+数据表格+表单+图表+权限\n💡 Agent读取后自动生成完整后台UI", score: 82 },
  { id: "ui-design", label: "UI设计稿", category: "design", icon: "🎨", color: "#ec4899", defaultSpecs: "高保真设计稿\n设计规范/组件库\n色彩/字体方案\n图标/插图风格", score: 80 },
  { id: "ux-flow", label: "交互流程", category: "design", icon: "🔄", color: "#ec4899", defaultSpecs: "用户操作流程\n页面跳转逻辑\n异常状态处理\n加载/空状态", score: 75 },
  { id: "wireframe", label: "线框图", category: "design", icon: "📐", color: "#ec4899", defaultSpecs: "页面布局草图\n交互流程图\n信息架构\n响应式断点", score: 72 },
  { id: "design-system", label: "设计系统", category: "design", icon: "🧱", color: "#ec4899", defaultSpecs: "组件库规范\n样式变量\n间距/排版规则\n动效规范", score: 60 },
  { id: "brand-design", label: "品牌设计", category: "design", icon: "🏷️", color: "#ec4899", defaultSpecs: "Logo设计\n品牌色彩\n品牌字体\n品牌调性", score: 55 },
  { id: "design-review", label: "设计评审", category: "design", icon: "👁️", color: "#ec4899", defaultSpecs: "设计走查清单\n一致性检查\n交互逻辑审查\n开发可行性", score: 48 },
  { id: "motion-design", label: "动效设计", category: "design", icon: "✨", color: "#ec4899", defaultSpecs: "页面转场动效\n微交互动画\n加载动画\n手势引导", score: 45 },
  { id: "icon-library", label: "图标/插图库", category: "design", icon: "🖼️", color: "#ec4899", defaultSpecs: "图标风格定义\n自定义图标清单\n插图风格\nSVG规范", score: 42 },
];

// ========= 🎨 图像生成 ========= (avg 64.9)
const imageGenNodes: NodeDefinition[] = [
  { id: "storyboard-gen", label: "分镜图生成", category: "image-gen", icon: "🎬", color: "#ec4899", defaultSpecs: "输出SP：分镜画面\n- 关联AA提示词+C角色+D场景\n- 每集分多镜头生成\n- 保持画面风格统一\n- 构图/景别/角度标注", score: 82 },
  { id: "character-sheet", label: "角色三视图", category: "image-gen", icon: "👤", color: "#ec4899", defaultSpecs: "输出B：角色设计图\n- 正面/侧面/背面三视图\n- 面部特写\n- 服装细节\n- 表情包（喜怒哀乐）\n- 身高比例参考\n风格：纯净线稿/彩稿", score: 78 },
  { id: "scene-gen", label: "场景图生成", category: "image-gen", icon: "🏰", color: "#ec4899", defaultSpecs: "输出D：场景概念图\n- 仅需要场景一致性的场景才生成\n- 包含光影/氛围/时间\n- 多角度备用\n- 场景编号关联", score: 72 },
  { id: "character-variant", label: "角色段落变体", category: "image-gen", icon: "👗", color: "#ec4899", defaultSpecs: "输出C：基于大段落变化的角色图\n- 服装细微变化\n- 状态变化（受伤/成长/变装）\n- 保持面部特征一致\n- 与B的关联度标注", score: 68 },
  { id: "batch-gen", label: "批量生成", category: "image-gen", icon: "📦", color: "#ec4899", defaultSpecs: "批量处理多个同类任务\n设置并发数/重试策略", score: 62 },
  { id: "avatar-gen", label: "头像/Logo生成", category: "image-gen", icon: "🎭", color: "#ec4899", defaultSpecs: "品牌头像/Logo\n多尺寸输出\n透明背景\n矢量化", score: 55 },
  { id: "style-transfer", label: "风格迁移", category: "image-gen", icon: "🎨", color: "#ec4899", defaultSpecs: "将参考图风格应用到生成图\n保持全集风格统一", score: 50 },
  { id: "product-img", label: "商品图生成", category: "image-gen", icon: "🛍️", color: "#ec4899", defaultSpecs: "白底图/场景图\n模特换装\n多角度\n详情页长图", score: 48 },
];

// ========= 🎬 视频制作 ========= (avg 63.2)
const videoProdNodes: NodeDefinition[] = [
  { id: "shot-stitch", label: "镜头衔接", category: "video-prod", icon: "🔗", color: "#ef4444", defaultSpecs: "SP1尾帧 + 下一镜头AA/C/D\n导入即梦生成SP2\n强关联场景必须使用此节点", score: 80 },
  { id: "video-trim", label: "视频剪辑", category: "video-prod", icon: "✂️", color: "#ef4444", defaultSpecs: "片段裁剪\n拼接\n转场效果\n节奏调整", score: 78 },
  { id: "audio-add", label: "配音/配乐", category: "video-prod", icon: "🎵", color: "#ef4444", defaultSpecs: "添加旁白配音\n背景音乐\n音效同步", score: 72 },
  { id: "subtitle-gen", label: "字幕生成", category: "video-prod", icon: "📝", color: "#ef4444", defaultSpecs: "从剧本提取字幕\n时间轴对齐\n字幕样式/位置", score: 70 },
  { id: "voice-synth", label: "AI配音", category: "video-prod", icon: "🗣️", color: "#ef4444", defaultSpecs: "角色声线选择\n情感语调\n语速控制\n多角色对话", score: 68 },
  { id: "video-export", label: "视频导出", category: "video-prod", icon: "💾", color: "#ef4444", defaultSpecs: "导出最终视频\n格式：MP4/MOV\n分辨率/码率设置", score: 65 },
  { id: "color-grade", label: "调色/滤镜", category: "video-prod", icon: "🎨", color: "#ef4444", defaultSpecs: "色彩校正\n风格滤镜\nLUT应用\n全片统一", score: 58 },
  { id: "jimeng-import", label: "即梦导入", category: "video-prod", icon: "🎬", color: "#ef4444", defaultSpecs: "按预编排格式导入即梦\n- 分镜AA + 角色C + 场景D\n- 每镜头单独生成\n- 参数：帧率/时长/运镜", score: 55 },
  { id: "bgm-gen", label: "背景音乐", category: "video-prod", icon: "🎶", color: "#ef4444", defaultSpecs: "AI音乐生成\n风格匹配\n时长适配\n音量平衡", score: 52 },
  { id: "sfx-add", label: "音效处理", category: "video-prod", icon: "🔊", color: "#ef4444", defaultSpecs: "环境音效\n动作音效\n转场音效\n音效库", score: 45 },
  { id: "frame-extract", label: "尾帧提取", category: "video-prod", icon: "🖼️", color: "#ef4444", defaultSpecs: "提取当前镜头最后一帧\n作为下一镜头的起始参考\n保证镜头间衔接流畅", score: 42 },
];

// ========= 📋 规划/需求 ========= (avg 73.0) + skill
const planNodes: NodeDefinition[] = [
  { id: "skill-scaffold", label: "一键搭建项目", category: "plan", icon: "🚀", color: "#8b5cf6", defaultSpecs: "📦 Skill: 根据需求自动搭建项目骨架\n📋 流程: 分析需求→技术选型→项目初始化→目录结构→依赖安装→README生成\n💡 Agent读取此节点后自动完成项目脚手架搭建", score: 95 },
  { id: "requirements", label: "需求收集", category: "plan", icon: "📋", color: "#8b5cf6", defaultSpecs: "功能需求列表\n非功能需求（性能/安全）\n用户故事/用例\n优先级排序", score: 92 },
  { id: "architecture", label: "架构设计", category: "plan", icon: "🏗️", color: "#8b5cf6", defaultSpecs: "系统架构图\n模块划分\n数据流设计\nAPI接口规划", score: 88 },
  { id: "project-overview", label: "项目概述", category: "plan", icon: "📝", color: "#8b5cf6", defaultSpecs: "项目名称/目标/范围\n目标用户画像\n核心价值主张\n项目时间线", score: 85 },
  { id: "tech-selection", label: "技术选型", category: "plan", icon: "🔧", color: "#8b5cf6", defaultSpecs: "前端框架选择\n后端语言/框架\n数据库选型\n第三方服务", score: 80 },
  { id: "milestones", label: "里程碑规划", category: "plan", icon: "📅", color: "#8b5cf6", defaultSpecs: "阶段划分\n每个阶段交付物\n关键节点\n验收标准", score: 72 },
  { id: "user-research", label: "用户调研", category: "plan", icon: "👥", color: "#8b5cf6", defaultSpecs: "目标用户画像\n使用场景分析\n痛点/需求挖掘\n用户旅程图", score: 68 },
  { id: "competitor-analysis", label: "竞品分析", category: "plan", icon: "🔍", color: "#8b5cf6", defaultSpecs: "竞品列表/优劣势\n功能对比矩阵\n差异化策略\n市场定位", score: 65 },
  { id: "project-schedule", label: "项目排期", category: "plan", icon: "📊", color: "#8b5cf6", defaultSpecs: "甘特图规划\n人员分工\n关键路径\n缓冲时间", score: 55 },
  { id: "budget-plan", label: "预算规划", category: "plan", icon: "💰", color: "#8b5cf6", defaultSpecs: "开发成本估算\n服务器/云服务费用\n第三方服务费用\n运维成本", score: 50 },
  { id: "risk-assessment", label: "风险评估", category: "plan", icon: "⚠️", color: "#8b5cf6", defaultSpecs: "技术风险清单\n进度风险\n资源风险\n应对方案", score: 45 },
];

// ========= 🔧 流程控制 ========= (avg 63.1)
const controlNodes: NodeDefinition[] = [
  { id: "if-branch", label: "条件分支", category: "control", icon: "🔀", color: "#14b8a6", defaultSpecs: "根据条件走不同分支\n如：是否需要场景一致性→是则生成D", score: 82 },
  { id: "parallel", label: "并行执行", category: "control", icon: "⚡", color: "#14b8a6", defaultSpecs: "多任务并行处理\n等待全部完成\n部分失败处理", score: 78 },
  { id: "review", label: "人工审核节点", category: "control", icon: "👁️", color: "#14b8a6", defaultSpecs: "暂停等待人工审核\n可返回修改\n审核通过后继续", score: 72 },
  { id: "quality-check", label: "质量检查", category: "control", icon: "✅", color: "#14b8a6", defaultSpecs: "检查输出质量\n不达标自动重试\n最终人工兜底", score: 68 },
  { id: "loop", label: "循环处理", category: "control", icon: "🔄", color: "#14b8a6", defaultSpecs: "批量处理多集/多镜头\n循环直到完成所有任务", score: 65 },
  { id: "merge", label: "合并汇聚", category: "control", icon: "⬇️", color: "#14b8a6", defaultSpecs: "合并多个并行分支的结果\n按顺序组装", score: 58 },
  { id: "try-catch", label: "异常捕获", category: "control", icon: "🛡️", color: "#14b8a6", defaultSpecs: "捕获错误\n重试/降级\n告警通知\n日志记录", score: 50 },
  { id: "delay", label: "等待/延时", category: "control", icon: "⏱️", color: "#14b8a6", defaultSpecs: "等待固定时间\n等待外部事件\n超时处理", score: 38 },
];

// ========= 🧪 测试/质量 ========= (avg 60.5) + MCP
const testNodes: NodeDefinition[] = [
  { id: "skill-auto-test", label: "自动化测试(一键)", category: "test", icon: "🤖", color: "#14b8a6", defaultSpecs: "📦 Skill: 自动搭建测试体系\n📋 流程: 单元测试+接口测试+E2E测试→覆盖率报告→CI集成\n🔧 工具: Jest/Vitest + Playwright + GitHub Actions\n💡 Agent读取此节点后自动生成完整测试套件", score: 82 },
  { id: "test-plan", label: "测试计划", category: "test", icon: "📋", color: "#14b8a6", defaultSpecs: "测试策略\n测试用例设计\n测试环境准备\n验收标准", score: 72 },
  { id: "code-review", label: "代码审查", category: "test", icon: "👨‍💻", color: "#14b8a6", defaultSpecs: "代码规范检查\n性能/安全审查\n逻辑正确性\n可维护性", score: 70 },
  { id: "test-api", label: "接口测试", category: "test", icon: "🔗", color: "#14b8a6", defaultSpecs: "Postman/Insomnia\n自动化测试\n性能基线\n回归测试", score: 68 },
  { id: "test-unit", label: "单元测试", category: "test", icon: "🔬", color: "#14b8a6", defaultSpecs: "Jest/Vitest/PyTest\n函数级测试\n覆盖率目标\nMock策略", score: 65 },
  { id: "test-e2e", label: "E2E测试", category: "test", icon: "🌐", color: "#14b8a6", defaultSpecs: "Cypress/Playwright\n完整流程测试\n多浏览器\n截图对比", score: 62 },
  { id: "test-perf", label: "性能测试", category: "test", icon: "🚀", color: "#14b8a6", defaultSpecs: "JMeter/k6/Artillery\n并发测试\n响应时间\n吞吐量", score: 58 },
  { id: "test-security", label: "安全测试", category: "test", icon: "🛡️", color: "#14b8a6", defaultSpecs: "OWASP Top 10检查\n渗透测试\n漏洞扫描\n安全基线", score: 55 },
  { id: "test-regression", label: "回归测试", category: "test", icon: "🔄", color: "#14b8a6", defaultSpecs: "核心流程回归\n自动化回归\n影响范围分析\n冒烟测试", score: 52 },
  { id: "test-compat", label: "兼容性测试", category: "test", icon: "🖥️", color: "#14b8a6", defaultSpecs: "浏览器兼容\n移动设备兼容\n分辨率适配\n系统版本", score: 48 },
  { id: "test-load", label: "压力测试", category: "test", icon: "💪", color: "#14b8a6", defaultSpecs: "极限并发\n稳定性测试\n资源瓶颈\n容量规划", score: 45 },
  { id: "test-data", label: "测试数据管理", category: "test", icon: "📊", color: "#14b8a6", defaultSpecs: "Mock数据生成\n测试数据脱敏\n数据初始化\n数据清理", score: 42 },
  { id: "mcp-puppeteer", label: "浏览器自动化爬取", category: "test", icon: "🎪", color: "#14b8a6", defaultSpecs: "📦 工具: Puppeteer MCP\n📋 功能: Chrome浏览器自动化 + 网页爬取 + PDF生成 + 截图\n📌 安装: npx -y @modelcontextprotocol/server-puppeteer\n📌 配置: {\"command\":\"npx\",\"args\":[\"-y\",\"@modelcontextprotocol/server-puppeteer\"]}\n💡 Chrome专属自动化、爬虫、PDF导出", score: 40 },
];

// ========= 📤 输出/导出 ========= (avg 57.3) + skill
const outputNodes: NodeDefinition[] = [
  { id: "export-md", label: "导出Markdown", category: "output", icon: "📄", color: "#22c55e", defaultSpecs: "导出结构化文档给AI编程\nClaude Code可读格式", score: 82 },
  { id: "export-json", label: "导出JSON", category: "output", icon: "📦", color: "#22c55e", defaultSpecs: "导出结构化数据\n程序可解析", score: 78 },
  { id: "preview", label: "预览检查", category: "output", icon: "👁️", color: "#22c55e", defaultSpecs: "预览最终效果\n逐镜头检查", score: 72 },
  { id: "save-project", label: "保存项目", category: "output", icon: "💾", color: "#22c55e", defaultSpecs: "保存完整工作流\n支持版本管理", score: 68 },
  { id: "skill-readme", label: "生成README文档", category: "output", icon: "📖", color: "#22c55e", defaultSpecs: "📦 Skill: 自动生成项目README\n📋 包含: 项目介绍+安装步骤+使用说明+API文档+贡献指南\n💡 Agent读取此节点后自动生成完整文档", score: 65 },
  { id: "export-mermaid", label: "导出流程图", category: "output", icon: "📊", color: "#22c55e", defaultSpecs: "导出Mermaid格式\n可嵌入文档\n可视化流程", score: 48 },
  { id: "export-pdf", label: "导出PDF", category: "output", icon: "📕", color: "#22c55e", defaultSpecs: "导出PDF文档\n打印友好\n含图表", score: 42 },
];

// ========= 📊 运维/监控 ========= (avg 55.6) + MCP + skill
const opsNodes: NodeDefinition[] = [
  { id: "skill-deploy", label: "一键部署上线", category: "ops", icon: "🚀", color: "#ef4444", defaultSpecs: "📦 Skill: 自动部署项目到线上\n📋 流程: 构建→Docker打包→云服务部署→域名绑定→SSL证书→健康检查\n🔧 工具: Vercel/Railway/阿里云 + Docker + Nginx\n💡 Agent读取此节点后自动完成部署全流程", score: 88 },
  { id: "monitor", label: "监控告警", category: "ops", icon: "📊", color: "#ef4444", defaultSpecs: "Grafana/Prometheus\n关键指标监控\n告警规则\n值班通知", score: 72 },
  { id: "logging", label: "日志系统", category: "ops", icon: "📝", color: "#ef4444", defaultSpecs: "ELK/Loki日志\n结构化日志\n日志分析\n异常追踪", score: 65 },
  { id: "backup", label: "备份恢复", category: "ops", icon: "💾", color: "#ef4444", defaultSpecs: "自动备份策略\n数据库快照\n灾备方案\n恢复演练", score: 58 },
  { id: "auto-ops", label: "自动化运维", category: "ops", icon: "🤖", color: "#ef4444", defaultSpecs: "Ansible/Playbook\n自动部署\n配置漂移检测\n自愈机制", score: 55 },
  { id: "incident-response", label: "故障响应", category: "ops", icon: "🚨", color: "#ef4444", defaultSpecs: "故障分级\n响应流程\n根因分析\n复盘报告", score: 50 },
  { id: "mcp-github", label: "GitHub代码管理", category: "ops", icon: "🐙", color: "#ef4444", defaultSpecs: "📦 工具: GitHub MCP (30.9k stars)\n📋 功能: 仓库管理 + Issue/PR操作 + Actions CI/CD + 代码搜索\n📌 安装: npx -y @modelcontextprotocol/server-github\n📌 配置: {\"command\":\"npx\",\"args\":[\"-y\",\"@modelcontextprotocol/server-github\"],\"env\":{\"GITHUB_PERSONAL_ACCESS_TOKEN\":\"...\"}}\n💡 Agent通过此工具管理GitHub仓库、PR、Issue", score: 62 },
  { id: "mcp-n8n", label: "工作流自动化平台", category: "ops", icon: "⚡", color: "#ef4444", defaultSpecs: "📦 工具: n8n MCP (21.9k stars)\n📋 功能: 可视化工作流 + 400+应用集成 + AI工作流 + Webhook\n📌 安装: npx -y n8n-mcp\n📌 配置: {\"command\":\"npx\",\"args\":[\"-y\",\"n8n-mcp\"],\"env\":{\"N8N_BASE_URL\":\"http://localhost:5678\",\"N8N_API_KEY\":\"...\"}}\n💡 自动化运维、数据同步、多系统联动", score: 48 },
  { id: "mcp-gitlab", label: "GitLab代码管理", category: "ops", icon: "🦊", color: "#ef4444", defaultSpecs: "📦 工具: GitLab MCP\n📋 功能: 项目管理 + Merge Request + CI/CD Pipeline + Issue跟踪\n📌 安装: npx -y @modelcontextprotocol/server-gitlab\n📌 配置: {\"command\":\"npx\",\"args\":[\"-y\",\"@modelcontextprotocol/server-gitlab\",\"--gitlab-url\",\"https://gitlab.com\"],\"env\":{\"GITLAB_PERSONAL_ACCESS_TOKEN\":\"...\"}}\n💡 GitLab托管项目管理", score: 42 },
  { id: "capacity-plan", label: "容量规划", category: "ops", icon: "📈", color: "#ef4444", defaultSpecs: "资源使用趋势\n扩容预警\n成本预估\n优化建议", score: 40 },
  { id: "cost-optimize", label: "成本优化", category: "ops", icon: "💰", color: "#ef4444", defaultSpecs: "资源利用率分析\n预留vs按需\nspot实例\n成本报告", score: 38 },
  { id: "sla-manage", label: "SLA管理", category: "ops", icon: "📊", color: "#ef4444", defaultSpecs: "可用性目标\n响应时间承诺\n故障处理时效\n报告生成", score: 35 },
];

// ========= ☁️ 基础设施/部署 ========= (avg 57.2) + MCP
const infraNodes: NodeDefinition[] = [
  { id: "docker", label: "Docker容器化", category: "infra", icon: "🐳", color: "#6366f1", defaultSpecs: "Dockerfile编写\n多阶段构建\n镜像优化\nCompose编排", score: 82 },
  { id: "cicd", label: "CI/CD流水线", category: "infra", icon: "🔄", color: "#6366f1", defaultSpecs: "GitHub Actions/GitLab CI\n自动构建/测试/部署\n环境变量管理\n回滚策略", score: 78 },
  { id: "cloud-deploy", label: "云服务部署", category: "infra", icon: "☁️", color: "#6366f1", defaultSpecs: "阿里云/AWS/腾讯云\nECS/EC2/容器服务\n域名/SSL配置\nCDN加速", score: 75 },
  { id: "env-config", label: "环境配置", category: "infra", icon: "⚙️", color: "#6366f1", defaultSpecs: "开发/测试/生产环境\n环境变量\n配置中心\n密钥管理", score: 70 },
  { id: "server-config", label: "服务器配置", category: "infra", icon: "🖥️", color: "#6366f1", defaultSpecs: "Nginx/Apache配置\n反向代理\n负载均衡\n安全加固", score: 68 },
  { id: "dns-config", label: "域名/DNS", category: "infra", icon: "🌐", color: "#6366f1", defaultSpecs: "域名注册\nDNS解析配置\nDNSSEC\n子域名规划", score: 62 },
  { id: "ssl-cert", label: "SSL证书", category: "infra", icon: "🔐", color: "#6366f1", defaultSpecs: "Let's Encrypt申请\n自动续期\n通配符证书\nHSTS配置", score: 58 },
  { id: "cdn-config", label: "CDN加速", category: "infra", icon: "🚀", color: "#6366f1", defaultSpecs: "CDN服务商选择\n缓存规则\nHTTPS配置\n回源策略", score: 55 },
  { id: "mcp-vercel-deploy", label: "Vercel/Render一键部署", category: "infra", icon: "▲", color: "#6366f1", defaultSpecs: "📦 工具: agent-deploy-dashboard-mcp\n📋 功能: 一键部署到Vercel/Render/Railway/Fly.io + 9个部署管理工具\n📌 安装: npx -y agent-deploy-dashboard-mcp\n📌 配置: {\"command\":\"npx\",\"args\":[\"-y\",\"agent-deploy-dashboard-mcp\"],\"env\":{\"VERCEL_TOKEN\":\"...\",\"RENDER_API_KEY\":\"...\"}}\n💡 前端/全栈项目快速部署，支持多平台对比", score: 52 },
  { id: "mcp-aws", label: "AWS云服务管理", category: "infra", icon: "☁️", color: "#6366f1", defaultSpecs: "📦 工具: AWS MCP\n📋 功能: S3存储 + EC2计算 + Lambda函数 + RDS数据库 + CloudFront CDN\n📌 安装: npm i -g @awslabs/mcp\n📌 配置: {\"command\":\"npx\",\"args\":[\"@awslabs/mcp\"],\"env\":{\"AWS_ACCESS_KEY_ID\":\"...\",\"AWS_SECRET_ACCESS_KEY\":\"...\"}}\n💡 企业级AWS云服务项目", score: 42 },
  { id: "mcp-aliyun", label: "阿里云服务管理", category: "infra", icon: "🌐", color: "#6366f1", defaultSpecs: "📦 工具: 阿里云MCP\n📋 功能: ECS云服务器 + 云监控 + 对象存储OSS + RDS数据库\n📌 安装: pip install alibaba-cloud-ops-mcp\n📌 配置: 通过阿里云AccessKey认证\n💡 国内项目、需要国内服务器部署", score: 45 },
  { id: "auto-scale", label: "自动扩缩容", category: "infra", icon: "📈", color: "#6366f1", defaultSpecs: "CPU/内存触发\n自定义指标\n预热策略\n缩容冷却", score: 40 },
  { id: "serverless", label: "Serverless", category: "infra", icon: "⚡", color: "#6366f1", defaultSpecs: "云函数/Edge Function\n冷启动优化\n触发器配置\n成本控制", score: 38 },
  { id: "load-balance", label: "负载均衡", category: "infra", icon: "⚖️", color: "#6366f1", defaultSpecs: "四层/七层负载\n健康检查\n会话保持\n权重配置", score: 35 },
  { id: "k8s", label: "Kubernetes编排", category: "infra", icon: "☸️", color: "#6366f1", defaultSpecs: "Pod/Service/Deployment\nHPA自动扩缩\nConfigMap/Secret\nHelm Charts", score: 32 },
  { id: "mcp-k8s", label: "K8s集群管理", category: "infra", icon: "☸️", color: "#6366f1", defaultSpecs: "📦 工具: Kubernetes MCP\n📋 功能: kubectl命令 + Helm Charts + Istio + ArgoCD\n📌 安装: go install github.com/alexei-led/k8s-mcp-server@latest\n📌 配置: 需要kubeconfig文件\n💡 大规模容器编排、生产环境部署", score: 28 },
  { id: "terraform", label: "IaC基础设施", category: "infra", icon: "🏗️", color: "#6366f1", defaultSpecs: "Terraform/Pulumi\n资源编排\n状态管理\n模块复用", score: 25 },
];

// ========= 🔒 安全 ========= (avg 54.8)
const securityNodes: NodeDefinition[] = [
  { id: "auth-system", label: "身份认证系统", category: "security", icon: "🔑", color: "#f97316", defaultSpecs: "多因素认证\n密码策略\n会话管理\n第三方登录", score: 78 },
  { id: "permission", label: "权限控制", category: "security", icon: "🛡️", color: "#f97316", defaultSpecs: "RBAC/ABAC模型\n菜单权限\n数据权限\n操作审计", score: 72 },
  { id: "data-encrypt", label: "数据加密", category: "security", icon: "🔒", color: "#f97316", defaultSpecs: "传输加密HTTPS\n存储加密\n敏感数据脱敏\n密钥轮换", score: 68 },
  { id: "sql-inject", label: "SQL注入防护", category: "security", icon: "💉", color: "#f97316", defaultSpecs: "参数化查询\nORM使用\n输入验证\nWAF规则", score: 62 },
  { id: "xss-protect", label: "XSS防护", category: "security", icon: "🛡️", color: "#f97316", defaultSpecs: "输入过滤\n输出编码CSP\nCookie安全\nHttpOnly", score: 58 },
  { id: "csrf-protect", label: "CSRF防护", category: "security", icon: "🔐", color: "#f97316", defaultSpecs: "Token验证\nSameSite Cookie\nReferer检查\n双重提交", score: 55 },
  { id: "audit-log", label: "审计日志", category: "security", icon: "📋", color: "#f97316", defaultSpecs: "操作记录\n登录日志\n数据变更\n合规留存", score: 50 },
  { id: "mcp-sentry", label: "错误监控追踪", category: "security", icon: "🚨", color: "#f97316", defaultSpecs: "📦 工具: Sentry MCP\n📋 功能: 错误收集 + Issue分析 + 性能监控 + 告警通知\n📌 安装: npx -y @modelcontextprotocol/server-sentry\n📌 配置: {\"command\":\"npx\",\"args\":[\"-y\",\"@modelcontextprotocol/server-sentry\",\"--sentry-dsn\",\"https://...@sentry.io/...\"]}\n💡 生产环境错误监控和追踪", score: 48 },
  { id: "ddos-protect", label: "DDoS防护", category: "security", icon: "🌊", color: "#f97316", defaultSpecs: "流量清洗\nIP黑名单\n速率限制\nCDN防护", score: 42 },
  { id: "privacy", label: "隐私保护", category: "security", icon: "👤", color: "#f97316", defaultSpecs: "GDPR/个保法\n隐私政策\n数据最小化\n用户授权", score: 40 },
  { id: "compliance", label: "合规检查", category: "security", icon: "✅", color: "#f97316", defaultSpecs: "等保/GDPR/PCI-DSS\n安全基线\n定期审计\n整改跟踪", score: 35 },
];

// ========= 🔌 API接入方 ========= (avg 44.4)
const apiNodes: NodeDefinition[] = [
  { id: "api-claude", label: "Claude API", category: "api", icon: "🤖", color: "#0ea5e9", defaultSpecs: "Anthropic Claude\n文本分析/改编/翻译\n长文本理解/提示词生成", score: 82 },
  { id: "api-gpt", label: "GPT API", category: "api", icon: "🧠", color: "#0ea5e9", defaultSpecs: "OpenAI GPT\n文本处理/对话生成\n提示词优化", score: 80 },
  { id: "api-deepseek", label: "DeepSeek API", category: "api", icon: "🔬", color: "#0ea5e9", defaultSpecs: "DeepSeek\n代码生成/推理\n数学/逻辑\n高性价比", score: 75 },
  { id: "api-jimeng", label: "即梦 API", category: "api", icon: "🎬", color: "#0ea5e9", defaultSpecs: "字节跳动即梦AI\n视频生成/图像生成\n图生视频/首帧尾帧控制", score: 72 },
  { id: "api-kimi", label: "Kimi API", category: "api", icon: "🌙", color: "#0ea5e9", defaultSpecs: "月之暗面Kimi\n长文本处理\n文档理解\n联网搜索", score: 68 },
  { id: "api-tongyi", label: "通义万相 API", category: "api", icon: "🎨", color: "#0ea5e9", defaultSpecs: "阿里通义万相\n图像生成/风格迁移\n角色一致性控制", score: 65 },
  { id: "api-doubao", label: "豆包 API", category: "api", icon: "🫘", color: "#0ea5e9", defaultSpecs: "字节豆包\n对话/创作\n图片理解\n语音交互", score: 62 },
  { id: "api-siliconflow", label: "硅基流动 API", category: "api", icon: "💎", color: "#0ea5e9", defaultSpecs: "SiliconFlow\n开源模型托管\n高性价比推理\n多模型切换", score: 58 },
  { id: "api-sd", label: "Stable Diffusion", category: "api", icon: "🎨", color: "#0ea5e9", defaultSpecs: "SD WebUI/API\nLoRA/ControlNet\nImg2Img\n本地/云端", score: 55 },
  { id: "api-elevenlabs", label: "ElevenLabs语音", category: "api", icon: "🗣️", color: "#0ea5e9", defaultSpecs: "AI语音合成\n声音克隆\n多语言配音\n情感语调", score: 52 },
  { id: "api-comfyui", label: "ComfyUI工作流", category: "api", icon: "🔧", color: "#0ea5e9", defaultSpecs: "ComfyUI工作流\n节点式图像生成\nSDXL/Flux\n自定义工作流", score: 48 },
  { id: "api-midjourney", label: "MidJourney API", category: "api", icon: "🖼️", color: "#0ea5e9", defaultSpecs: "MidJourney\n高质量概念图/角色图\n场景图/风格参考", score: 45 },
  { id: "api-wenxin", label: "文心一言 API", category: "api", icon: "📝", color: "#0ea5e9", defaultSpecs: "百度文心一言\n文本生成/理解\n多模态能力", score: 42 },
  { id: "api-hunyuan", label: "腾讯混元 API", category: "api", icon: "🌀", color: "#0ea5e9", defaultSpecs: "腾讯混元\n文本/图像生成\n视频理解\n多模态", score: 40 },
  { id: "api-suno", label: "Suno AI音乐", category: "api", icon: "🎵", color: "#0ea5e9", defaultSpecs: "AI音乐生成\n歌词创作\n多风格\n背景音乐", score: 38 },
  { id: "api-ffmpeg", label: "FFmpeg视频处理", category: "api", icon: "🎞️", color: "#0ea5e9", defaultSpecs: "视频转码/剪辑\n格式转换\n滤镜处理\n批量处理", score: 35 },
  { id: "api-generic", label: "自定义 API", category: "api", icon: "🔌", color: "#0ea5e9", defaultSpecs: "填写API地址/Key\n自定义请求格式\n支持任意AI服务", score: 32 },
];

// ========= 📢 内容/运营 ========= (avg 48.2)
const contentOpsNodes: NodeDefinition[] = [
  { id: "analytics", label: "数据分析", category: "content-ops", icon: "📊", color: "#a855f7", defaultSpecs: "流量分析\n用户行为\n转化漏斗\nROI计算", score: 68 },
  { id: "seo-optimize", label: "SEO优化", category: "content-ops", icon: "🔍", color: "#a855f7", defaultSpecs: "关键词研究\nOn-page SEO\n外链建设\n排名监控", score: 62 },
  { id: "copywriting", label: "文案撰写", category: "content-ops", icon: "✍️", color: "#a855f7", defaultSpecs: "标题优化\n卖点提炼\nAIDA框架\n多版本测试", score: 58 },
  { id: "user-grow", label: "用户增长", category: "content-ops", icon: "🚀", color: "#a855f7", defaultSpecs: "获客渠道\n裂变策略\n留存优化\n生命周期", score: 52 },
  { id: "content-calendar", label: "内容日历", category: "content-ops", icon: "📅", color: "#a855f7", defaultSpecs: "发布排期\n内容主题规划\n节日/热点追踪\n团队协作", score: 48 },
  { id: "social-publish", label: "社媒发布", category: "content-ops", icon: "📢", color: "#a855f7", defaultSpecs: "多平台发布\n内容适配\n定时发布\n互动管理", score: 45 },
  { id: "ab-test", label: "A/B测试", category: "content-ops", icon: "🔬", color: "#a855f7", defaultSpecs: "实验设计\n变量控制\n显著性检验\n结果分析", score: 42 },
  { id: "feedback", label: "用户反馈", category: "content-ops", icon: "💬", color: "#a855f7", defaultSpecs: "反馈收集\n分类处理\n优先级排序\n闭环跟踪", score: 38 },
  { id: "ops-report", label: "运营报告", category: "content-ops", icon: "📈", color: "#a855f7", defaultSpecs: "日报/周报/月报\n关键指标\n趋势分析\n优化建议", score: 35 },
];

// ========= 🛒 电商 ========= (avg 52.9)
const ecommerceNodes: NodeDefinition[] = [
  { id: "payment", label: "支付接入", category: "ecommerce", icon: "💳", color: "#f43f5e", defaultSpecs: "微信/支付宝\n支付网关\n退款处理\n对账", score: 78 },
  { id: "order-system", label: "订单系统", category: "ecommerce", icon: "📋", color: "#f43f5e", defaultSpecs: "下单流程\n订单状态\n退款/售后\n订单查询", score: 72 },
  { id: "product-mgmt", label: "商品管理", category: "ecommerce", icon: "📦", color: "#f43f5e", defaultSpecs: "SKU管理\n商品分类\n属性配置\n库存管理", score: 68 },
  { id: "promotion", label: "营销活动", category: "ecommerce", icon: "🎉", color: "#f43f5e", defaultSpecs: "秒杀/拼团\n满减/折扣\n活动配置\n风控", score: 55 },
  { id: "logistics", label: "物流对接", category: "ecommerce", icon: "🚚", color: "#f43f5e", defaultSpecs: "快递接口\n运费计算\n物流追踪\n自提/同城", score: 52 },
  { id: "crm", label: "客户管理CRM", category: "ecommerce", icon: "👥", color: "#f43f5e", defaultSpecs: "客户画像\n标签体系\n精准营销\n客户分层", score: 45 },
  { id: "inventory", label: "库存管理", category: "ecommerce", icon: "🏭", color: "#f43f5e", defaultSpecs: "库存预警\n多仓管理\n调拨/盘点\n安全库存", score: 42 },
  { id: "coupon", label: "优惠券系统", category: "ecommerce", icon: "🎫", color: "#f43f5e", defaultSpecs: "券类型设计\n发放策略\n核销规则\n防刷", score: 40 },
  { id: "points", label: "积分系统", category: "ecommerce", icon: "⭐", color: "#f43f5e", defaultSpecs: "积分规则\n积分商城\n等级体系\n兑换比例", score: 35 },
];

// ========= 🤖 数据/AI ========= (avg 50.3) + MCP
const dataAINodes: NodeDefinition[] = [
  { id: "rag-system", label: "RAG系统", category: "data-ai", icon: "📚", color: "#8b5cf6", defaultSpecs: "文档切片\n检索增强\n上下文注入\n答案生成", score: 72 },
  { id: "prompt-eng", label: "提示词工程", category: "data-ai", icon: "💡", color: "#8b5cf6", defaultSpecs: "Prompt设计\nFew-shot示例\n链式思考\n输出格式", score: 68 },
  { id: "data-viz", label: "数据可视化", category: "data-ai", icon: "📊", color: "#8b5cf6", defaultSpecs: "ECharts/D3.js\n图表选型\n交互设计\n仪表盘", score: 62 },
  { id: "vector-db", label: "向量数据库", category: "data-ai", icon: "🔮", color: "#8b5cf6", defaultSpecs: "Milvus/Pinecone/Qdrant\nEmbedding生成\n相似度检索\n索引优化", score: 58 },
  { id: "agent-build", label: "AI Agent构建", category: "data-ai", icon: "🤖", color: "#8b5cf6", defaultSpecs: "工具调用\n记忆管理\n多Agent协作\n自主决策", score: 55 },
  { id: "data-collect", label: "数据采集", category: "data-ai", icon: "📥", color: "#8b5cf6", defaultSpecs: "爬虫/API采集\n数据源管理\n增量采集\n数据质量", score: 52 },
  { id: "mcp-context7", label: "AI实时文档查询", category: "data-ai", icon: "📚", color: "#8b5cf6", defaultSpecs: "📦 工具: Context7 MCP (57.8k stars)\n📋 功能: 实时库文档查询 + 版本感知API引用 + 防止AI使用过时API\n📌 安装: npx -y @upstash/context7-mcp@latest\n📌 配置: {\"command\":\"npx\",\"args\":[\"-y\",\"@upstash/context7-mcp@latest\"]}\n💡 确保AI使用最新正确的API写法", score: 50 },
  { id: "mcp-serena", label: "代码语义理解", category: "data-ai", icon: "🔍", color: "#8b5cf6", defaultSpecs: "📦 工具: Serena MCP (25.6k stars)\n📋 功能: 代码语义检索 + 符号查找 + 代码编辑 + 项目结构理解\n📌 安装: pip install serena\n📌 配置: 需要配置项目路径\n💡 大型代码库理解、精准代码修改", score: 45 },
  { id: "mcp-web-scrape", label: "网页数据爬取", category: "data-ai", icon: "🕷️", color: "#8b5cf6", defaultSpecs: "📦 工具: Olostep MCP\n📋 功能: 网页爬取 + 批量抓取(10k URLs) + Markdown/JSON输出\n📌 安装: npx -y olostep-mcp-server\n📌 配置: {\"command\":\"npx\",\"args\":[\"-y\",\"olostep-mcp-server\"],\"env\":{\"OLOSTEP_API_KEY\":\"...\"}}\n💡 数据采集、竞品分析、内容监控", score: 42 },
  { id: "mcp-fetch", label: "网页内容抓取", category: "data-ai", icon: "📡", color: "#8b5cf6", defaultSpecs: "📦 工具: Fetch MCP\n📋 功能: 网页内容获取 + HTML转Markdown + API文档读取\n📌 安装: npx -y @modelcontextprotocol/server-fetch\n📌 配置: {\"command\":\"npx\",\"args\":[\"-y\",\"@modelcontextprotocol/server-fetch\"]}\n💡 读取文档、API参考、网页内容分析", score: 38 },
  { id: "ml-pipeline", label: "机器学习", category: "data-ai", icon: "🧠", color: "#8b5cf6", defaultSpecs: "特征工程\n模型选择\n训练/验证\n模型评估", score: 35 },
  { id: "model-deploy", label: "模型部署", category: "data-ai", icon: "🚀", color: "#8b5cf6", defaultSpecs: "模型导出\n推理服务\n性能优化\nAB测试", score: 32 },
  { id: "data-clean", label: "数据清洗", category: "data-ai", icon: "🧹", color: "#8b5cf6", defaultSpecs: "缺失值处理\n异常值检测\n数据标准化\n去重", score: 30 },
  { id: "data-dashboard", label: "数据看板", category: "data-ai", icon: "📺", color: "#8b5cf6", defaultSpecs: "实时数据大屏\n关键指标\n预警阈值\n自动刷新", score: 28 },
];

// ========= 💬 社交/社区 ========= (avg 47.1)
const socialNodes: NodeDefinition[] = [
  { id: "notification", label: "通知系统", category: "social", icon: "🔔", color: "#10b981", defaultSpecs: "站内信\n推送通知\n邮件通知\n通知偏好", score: 65 },
  { id: "comment", label: "评论互动", category: "social", icon: "💭", color: "#10b981", defaultSpecs: "评论/回复\n点赞/收藏\n举报\n表情包", score: 60 },
  { id: "feed-flow", label: "动态/信息流", category: "social", icon: "📰", color: "#10b981", defaultSpecs: "Feed流设计\n推荐算法\n内容排序\n无限滚动", score: 55 },
  { id: "im-system", label: "即时通讯", category: "social", icon: "💬", color: "#10b981", defaultSpecs: "私信/群聊\n消息类型\n已读/未读\n消息推送", score: 50 },
  { id: "user-relation", label: "用户关系", category: "social", icon: "👥", color: "#10b981", defaultSpecs: "关注/粉丝\n好友关系\n黑名单\n推荐关注", score: 45 },
  { id: "content-mod", label: "内容审核", category: "social", icon: "🛡️", color: "#10b981", defaultSpecs: "AI审核\n人工复审\n违规处理\n申诉机制", score: 40 },
  { id: "tag-system", label: "标签/话题", category: "social", icon: "🏷️", color: "#10b981", defaultSpecs: "标签创建\n话题聚合\n热门排行\n内容关联", score: 35 },
];

// ========= 📱 移动端 ========= (avg 43.8)
const mobileNodes: NodeDefinition[] = [
  { id: "app-dev", label: "App开发", category: "mobile", icon: "📱", color: "#3b82f6", defaultSpecs: "原生/跨平台选择\nFlutter/React Native\nUI适配\n性能优化", score: 68 },
  { id: "mini-program", label: "小程序开发", category: "mobile", icon: "🔹", color: "#3b82f6", defaultSpecs: "微信/支付宝/抖音\n组件开发\nAPI调用\n审核发布", score: 62 },
  { id: "push-notify", label: "推送通知", category: "mobile", icon: "🔔", color: "#3b82f6", defaultSpecs: "推送服务接入\n通知分类\n定时推送\n点击追踪", score: 52 },
  { id: "crash-report", label: "崩溃监控", category: "mobile", icon: "🚨", color: "#3b82f6", defaultSpecs: "Sentry/Firebase\n崩溃收集\nANR监控\n性能监控", score: 42 },
  { id: "analytics-mobile", label: "移动埋点", category: "mobile", icon: "📊", color: "#3b82f6", defaultSpecs: "事件埋点\n页面追踪\n用户画像\n漏斗分析", score: 38 },
  { id: "in-app-purchase", label: "应用内购", category: "mobile", icon: "💰", color: "#3b82f6", defaultSpecs: "商品配置\n支付流程\n订阅管理\n退款处理", score: 35 },
  { id: "deep-link", label: "深度链接", category: "mobile", icon: "🔗", color: "#3b82f6", defaultSpecs: "URL Scheme\nApp Links\nUniversal Links\n延迟深度链接", score: 28 },
  { id: "offline-cache", label: "离线缓存", category: "mobile", icon: "💾", color: "#3b82f6", defaultSpecs: "本地存储\n离线可用\n数据同步\n缓存策略", score: 25 },
];

// ========= 📚 教育/培训 ========= (avg 44.8)
const educationNodes: NodeDefinition[] = [
  { id: "course-design", label: "课程设计", category: "education", icon: "📚", color: "#0ea5e9", defaultSpecs: "课程大纲\n知识点拆分\n难度分级\n学习目标", score: 65 },
  { id: "homework", label: "作业系统", category: "education", icon: "✏️", color: "#0ea5e9", defaultSpecs: "作业布置\n提交/批改\n互评\nAI辅助批改", score: 55 },
  { id: "exam-system", label: "在线考试", category: "education", icon: "📝", color: "#0ea5e9", defaultSpecs: "题库管理\n自动组卷\n防作弊\n成绩分析", score: 50 },
  { id: "learning-path", label: "学习路径", category: "education", icon: "🗺️", color: "#0ea5e9", defaultSpecs: "路径设计\n前置条件\n进度追踪\n推荐算法", score: 45 },
  { id: "live-class", label: "直播课堂", category: "education", icon: "📺", color: "#0ea5e9", defaultSpecs: "直播间搭建\n互动工具\n回放管理\n签到", score: 42 },
  { id: "record-class", label: "录播管理", category: "education", icon: "🎬", color: "#0ea5e9", defaultSpecs: "视频上传\n章节切片\n字幕生成\n防盗播", score: 35 },
  { id: "discuss", label: "讨论社区", category: "education", icon: "💬", color: "#0ea5e9", defaultSpecs: "问答系统\n话题讨论\n专家答疑\n知识沉淀", score: 32 },
  { id: "certificate", label: "证书管理", category: "education", icon: "🏆", color: "#0ea5e9", defaultSpecs: "证书模板\n自动生成\n验证系统\n有效期", score: 28 },
];

// ========= 🏢 办公/协作 ========= (avg 45.1)
const officeNodes: NodeDefinition[] = [
  { id: "project-mgmt", label: "项目管理", category: "office", icon: "📋", color: "#64748b", defaultSpecs: "任务分配\n进度跟踪\n工时统计\n里程碑", score: 65 },
  { id: "kanban", label: "看板", category: "office", icon: "📌", color: "#64748b", defaultSpecs: "列定义\n拖拽排序\nWIP限制\n自动化", score: 58 },
  { id: "workflow-auto", label: "工作流自动化", category: "office", icon: "⚡", color: "#64748b", defaultSpecs: "Zapier/n8n\n触发条件\n多步骤流程\n错误处理", score: 52 },
  { id: "collab-doc", label: "协作文档", category: "office", icon: "📄", color: "#64748b", defaultSpecs: "富文本编辑\n多人协作\n版本历史\n评论/批注", score: 48 },
  { id: "wiki", label: "知识库", category: "office", icon: "📖", color: "#64748b", defaultSpecs: "文档结构\n搜索功能\n权限管理\n版本控制", score: 42 },
  { id: "gantt", label: "甘特图", category: "office", icon: "📊", color: "#64748b", defaultSpecs: "任务依赖\n时间轴\n关键路径\n资源分配", score: 38 },
  { id: "okr", label: "OKR目标", category: "office", icon: "🎯", color: "#64748b", defaultSpecs: "目标设定\n关键结果\n进度更新\n复盘", score: 32 },
  { id: "meeting", label: "会议管理", category: "office", icon: "🎥", color: "#64748b", defaultSpecs: "会议安排\n纪要生成\n待办跟踪\n回放", score: 28 },
];

// ========= 🧩 自定义 =========
const customNodes: NodeDefinition[] = [
  { id: "custom-node", label: "自定义节点", category: "custom", icon: "🧩", color: "#71717a", defaultSpecs: "自定义功能节点\n双击编辑名称和说明", score: 50 },
  { id: "custom-group", label: "分组容器", category: "custom", icon: "📦", color: "#71717a", defaultSpecs: "将多个节点归组\n便于管理复杂流程", score: 45 },
];

// ========= 导出（按分类均分从高到低排序） =========
export const NODE_CATEGORIES: NodeCategoryGroup[] = [
  { id: "plan", label: "📋 规划/需求", color: "#8b5cf6", nodes: planNodes },
  { id: "prompt", label: "💡 提示词", color: "#f97316", nodes: promptNodes },
  { id: "text-process", label: "📝 文本处理", color: "#8b5cf6", nodes: textProcessNodes },
  { id: "input", label: "📥 输入/素材", color: "#6366f1", nodes: inputNodes },
  { id: "frontend", label: "🖥️ 前端开发", color: "#3b82f6", nodes: frontendNodes },
  { id: "design", label: "🎨 设计", color: "#ec4899", nodes: designNodes },
  { id: "image-gen", label: "🎨 图像生成", color: "#ec4899", nodes: imageGenNodes },
  { id: "video-prod", label: "🎬 视频制作", color: "#ef4444", nodes: videoProdNodes },
  { id: "control", label: "🔧 流程控制", color: "#14b8a6", nodes: controlNodes },
  { id: "test", label: "🧪 测试/质量", color: "#14b8a6", nodes: testNodes },
  { id: "output", label: "📤 输出/导出", color: "#22c55e", nodes: outputNodes },
  { id: "infra", label: "☁️ 基础设施", color: "#6366f1", nodes: infraNodes },
  { id: "ops", label: "📊 运维/监控", color: "#ef4444", nodes: opsNodes },
  { id: "security", label: "🔒 安全", color: "#f97316", nodes: securityNodes },
  { id: "backend", label: "⚙️ 后端/数据库", color: "#f59e0b", nodes: backendNodes },
  { id: "ecommerce", label: "🛒 电商", color: "#f43f5e", nodes: ecommerceNodes },
  { id: "data-ai", label: "🤖 数据/AI", color: "#8b5cf6", nodes: dataAINodes },
  { id: "social", label: "💬 社交/社区", color: "#10b981", nodes: socialNodes },
  { id: "content-ops", label: "📢 内容/运营", color: "#a855f7", nodes: contentOpsNodes },
  { id: "office", label: "🏢 办公/协作", color: "#64748b", nodes: officeNodes },
  { id: "education", label: "📚 教育/培训", color: "#0ea5e9", nodes: educationNodes },
  { id: "mobile", label: "📱 移动端", color: "#3b82f6", nodes: mobileNodes },
  { id: "api", label: "🔌 API接入方", color: "#0ea5e9", nodes: apiNodes },
  { id: "custom", label: "🧩 自定义", color: "#71717a", nodes: customNodes },
];

export const ALL_NODE_DEFINITIONS: NodeDefinition[] = [
  ...planNodes, ...promptNodes, ...textProcessNodes, ...inputNodes,
  ...frontendNodes, ...designNodes, ...imageGenNodes, ...videoProdNodes,
  ...controlNodes, ...testNodes, ...outputNodes, ...infraNodes,
  ...opsNodes, ...securityNodes, ...backendNodes, ...ecommerceNodes,
  ...dataAINodes, ...socialNodes, ...contentOpsNodes, ...officeNodes,
  ...educationNodes, ...mobileNodes, ...apiNodes, ...customNodes,
];

export const getDefinitionById = (id: string): NodeDefinition | undefined =>
  ALL_NODE_DEFINITIONS.find((d) => d.id === id);
