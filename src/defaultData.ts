import type { CardData } from './types';

const profile = {
  name: '敖以成',
  title: '前端开发工程师',
  tagline: '6 年前端开发经验，专注 Web 前端、可视化与工程化建设',
  experience: '6 年',
  location: '成都',
  salary: '12-15K',
  wechat: 'NewQuery',
  phone: '18385940400',
  email: 'ayc_acknow@163.com',
  github: '',
  intro:
    '精通 Vue2、React 等前端框架，熟练掌握 Element UI、Bootstrap、jQuery 等组件库，具备丰富的 3D 可视化与大屏应用开发经验，擅长从 0 到 1 搭建项目、重构架构和性能优化。',
  coreTech: ['Vue2', 'React', 'TypeScript', 'Element UI', 'Three.js', 'Cesium', 'ECharts'],
  skillCategories: [
    {
      name: '前端技术',
      skills: ['Vue2', 'React', 'JavaScript', 'TypeScript', 'HTML/CSS', 'jQuery', 'Bootstrap', 'Element UI'],
    },
    {
      name: '可视化与工程化',
      skills: ['Three.js', 'Cesium', 'ECharts', 'Webpack', 'AJAX', 'JSON', 'zTree', '性能优化'],
    },
  ],
  projects: [
    {
      name: '雷击风险评估软件',
      role: '前端开发工程师',
      period: '2023.08 - 2026.02',
      description: '公司数字接地领域核心软件，面向避雷针设计流程线上化与高效化，独立承担前端全流程开发。',
      achievements: [
        '将避雷针设计流程从线下平均 3 天缩短至线上 4 小时内，效率提升 85% 以上',
        '独立完成全界面开发与前后端联调，支撑 50+ 企业客户',
        '项目创新成果获得专利 1 项，参与专著 2 项',
      ],
      tech: ['Vue2', 'Element UI', 'Three.js', 'ECharts'],
    },
    {
      name: '数字接地系统',
      role: '前端开发',
      period: '2025.06 - 2026.01',
      description: '公司核心产品架构重构项目，基于 fastbee 组态二开，打造轻量化、高可视化的智能接地系统。',
      achievements: [
        '主导老旧框架向组态化架构重构，独立搭建新前端架构',
        '通过 Three.js 与 ECharts 实现 3D 场景和多维度数据呈现，操作效率提升 60%',
        '降低部署与维护成本 50%',
      ],
      tech: ['Vue2', 'Element UI', 'Three.js', 'ECharts', 'fastbee'],
    },
    {
      name: '星地网络管理系统',
      role: '前端开发工程师',
      period: '2019.12 - 2022.03',
      description: '为大理区域公司提供网络管理平台，与设备系统联动，支持快速操作和管理。',
      achievements: [
        '使用响应式布局与性能优化手段，减少首页显示反应时间 3-7 秒',
        '对整体弹框、提示和插件进行统一设计，提升 UI 统一性',
        '优化 Cesium 与 ECharts 兼容性与展示效果',
      ],
      tech: ['Vue2', 'Element UI', 'Cesium', 'ECharts', 'zTree'],
    },
    {
      name: '成都应急网络管理系统',
      role: '前端开发工程师',
      period: '2020.04 - 2022.01',
      description: '面向成都应急管理局的网络管控平台，实现与硬件设备深度联动与应急场景调度。',
      achievements: [
        '独立完成十余个业务页面开发与上线',
        '对表格与表单组件进行二次封装，提高开发效率',
        '通过 Webpack 缓存与 gzip 优化提升页面加载速度',
      ],
      tech: ['Vue2', 'Element UI', 'Cesium', 'ECharts', 'Webpack'],
    },
  ],
  honors: [
    {
      type: 'patent',
      title: '专利：一种基于三维可视化的接地系统设计方法',
      description: '围绕数字接地与可视化设计场景提出创新方案。',
      year: '2024',
    },
    {
      type: 'publication',
      title: '参与专著《数字接地技术与应用》',
      description: '参与公司数字接地领域技术内容编写与分享。',
      year: '2024',
    },
    {
      type: 'award',
      title: '年度优秀开发者',
      description: '在公司内获得年度优秀开发者荣誉。',
      year: '2024',
    },
  ],
} as const;

export const defaultData: CardData = {
  ...profile,
  avatar: {
    image: '',
    initials: 'AC',
    alt: '敖以成头像',
  },
  profile,
};
