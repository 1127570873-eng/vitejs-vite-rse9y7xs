import { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import type { CardData, SkillCategory, Project } from '../types';

interface Props {
  data: CardData;
  onSave: (data: CardData) => void;
  onClose: () => void;
}

export default function EditModal({ data, onSave, onClose }: Props) {
  const [form, setForm] = useState<CardData>(JSON.parse(JSON.stringify(data)));

  const setField = <K extends keyof CardData>(key: K, value: CardData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateSkillCategory = (idx: number, cat: SkillCategory) => {
    const cats = [...form.skillCategories];
    cats[idx] = cat;
    setField('skillCategories', cats);
  };

  const addSkillCategory = () => {
    setField('skillCategories', [
      ...form.skillCategories,
      { name: '新分类', skills: [] },
    ]);
  };

  const removeSkillCategory = (idx: number) => {
    setField(
      'skillCategories',
      form.skillCategories.filter((_, i) => i !== idx)
    );
  };

  const updateProject = (idx: number, proj: Project) => {
    const projs = [...form.projects];
    projs[idx] = proj;
    setField('projects', projs);
  };

  const addProject = () => {
    setField('projects', [
      ...form.projects,
      { name: '新项目', role: '', period: '', description: '', tech: [] },
    ]);
  };

  const removeProject = (idx: number) => {
    setField(
      'projects',
      form.projects.filter((_, i) => i !== idx)
    );
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">编辑名片信息</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Basic Info */}
          <fieldset className="edit-group">
            <legend className="edit-group-title">基本信息</legend>
            <div className="edit-row">
              <label className="edit-label">姓名</label>
              <input
                className="edit-input"
                value={form.name}
                onChange={(e) => setField('name', e.target.value)}
              />
            </div>
            <div className="edit-row">
              <label className="edit-label">职位</label>
              <input
                className="edit-input"
                value={form.title}
                onChange={(e) => setField('title', e.target.value)}
              />
            </div>
            <div className="edit-row">
              <label className="edit-label">副标题</label>
              <input
                className="edit-input"
                value={form.tagline}
                onChange={(e) => setField('tagline', e.target.value)}
              />
            </div>
            <div className="edit-row-3">
              <div>
                <label className="edit-label">工作年限</label>
                <input
                  className="edit-input"
                  value={form.experience}
                  onChange={(e) => setField('experience', e.target.value)}
                />
              </div>
              <div>
                <label className="edit-label">期望城市</label>
                <input
                  className="edit-input"
                  value={form.location}
                  onChange={(e) => setField('location', e.target.value)}
                />
              </div>
              <div>
                <label className="edit-label">期望薪资</label>
                <input
                  className="edit-input"
                  value={form.salary}
                  onChange={(e) => setField('salary', e.target.value)}
                />
              </div>
            </div>
            <div className="edit-row">
              <label className="edit-label">个人简介</label>
              <textarea
                className="edit-input edit-textarea"
                value={form.intro}
                onChange={(e) => setField('intro', e.target.value)}
              />
            </div>
          </fieldset>

          {/* Contact */}
          <fieldset className="edit-group">
            <legend className="edit-group-title">联系方式</legend>
            {(
              [
                { key: 'wechat', label: '微信号' },
                { key: 'phone', label: '手机号' },
                { key: 'email', label: '邮箱' },
                { key: 'github', label: '社交主页 URL' },
              ] as { key: keyof CardData; label: string }[]
            ).map(({ key, label }) => (
              <div key={key} className="edit-row">
                <label className="edit-label">{label}</label>
                <input
                  className="edit-input"
                  value={form[key] as string}
                  onChange={(e) => setField(key, e.target.value)}
                />
              </div>
            ))}
          </fieldset>

          {/* Skills */}
          <fieldset className="edit-group">
            <legend className="edit-group-title">技能分类</legend>
            {form.skillCategories.map((cat, idx) => (
              <div key={idx} className="edit-skill-cat">
                <div className="edit-skill-cat-header">
                  <input
                    className="edit-input edit-input-sm"
                    placeholder="分类名"
                    value={cat.name}
                    onChange={(e) =>
                      updateSkillCategory(idx, { ...cat, name: e.target.value })
                    }
                  />
                  <button
                    className="icon-btn danger"
                    onClick={() => removeSkillCategory(idx)}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <input
                  className="edit-input"
                  placeholder="技能（逗号分隔）"
                  value={cat.skills.join('，')}
                  onChange={(e) =>
                    updateSkillCategory(idx, {
                      ...cat,
                      skills: e.target.value
                        .split(/[,，]/)
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                />
              </div>
            ))}
            <button className="add-btn" onClick={addSkillCategory}>
              <Plus size={14} /> 添加分类
            </button>
          </fieldset>

          {/* Projects */}
          <fieldset className="edit-group">
            <legend className="edit-group-title">项目经历</legend>
            {form.projects.map((proj, idx) => (
              <div key={idx} className="edit-project">
                <div className="edit-project-header">
                  <span className="edit-project-num">项目 {idx + 1}</span>
                  <button
                    className="icon-btn danger"
                    onClick={() => removeProject(idx)}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="edit-row">
                  <label className="edit-label">项目名称</label>
                  <input
                    className="edit-input"
                    value={proj.name}
                    onChange={(e) =>
                      updateProject(idx, { ...proj, name: e.target.value })
                    }
                  />
                </div>
                <div className="edit-row-2">
                  <div>
                    <label className="edit-label">角色</label>
                    <input
                      className="edit-input"
                      value={proj.role}
                      onChange={(e) =>
                        updateProject(idx, { ...proj, role: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="edit-label">时间段</label>
                    <input
                      className="edit-input"
                      value={proj.period}
                      onChange={(e) =>
                        updateProject(idx, { ...proj, period: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="edit-row">
                  <label className="edit-label">项目简介</label>
                  <textarea
                    className="edit-input edit-textarea"
                    value={proj.description}
                    onChange={(e) =>
                      updateProject(idx, {
                        ...proj,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="edit-row">
                  <label className="edit-label">技术栈（逗号分隔）</label>
                  <input
                    className="edit-input"
                    value={proj.tech.join('，')}
                    onChange={(e) =>
                      updateProject(idx, {
                        ...proj,
                        tech: e.target.value
                          .split(/[,，]/)
                          .map((s) => s.trim())
                          .filter(Boolean),
                      })
                    }
                  />
                </div>
              </div>
            ))}
            <button className="add-btn" onClick={addProject}>
              <Plus size={14} /> 添加项目
            </button>
          </fieldset>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            取消
          </button>
          <button className="btn-primary" onClick={() => onSave(form)}>
            保存名片
          </button>
        </div>
      </div>
    </div>
  );
}
