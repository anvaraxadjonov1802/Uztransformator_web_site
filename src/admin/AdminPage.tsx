import React, { useEffect, useMemo, useState } from 'react';
import {
  Award,
  Building2,
  ChevronRight,
  Contact,
  Eye,
  EyeOff,
  FileImage,
  Gauge,
  LogOut,
  Menu,
  Package,
  Pencil,
  Plus,
  RotateCcw,
  Save,
  ShieldCheck,
  Trash2,
  Upload,
  UserCog,
  Users,
  X,
} from 'lucide-react';
import {
  AdminAccount,
  Certificate,
  ContactSettings,
  Language,
  Partner,
  Product,
  ProductCategory,
  ProductSpec,
} from '../types';
import {
  getSiteContent,
  resetSiteContent,
  updateSiteContent,
  useSiteContent,
} from './contentStore';

const SESSION_KEY = 'uztransformator-admin-session';
type AdminTab = 'dashboard' | 'products' | 'certificates' | 'partners' | 'contact' | 'admins';

const languageLabels: Record<Language, string> = { uz: 'O‘zbekcha', ru: 'Русский', en: 'English' };
const languages: Language[] = ['uz', 'ru', 'en'];

const uid = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[’'`]/g, '')
    .replace(/[^a-z0-9а-яё]+/gi, '-')
    .replace(/^-+|-+$/g, '') || uid('item');

const emptyLocalized = () => ({ uz: '', ru: '', en: '' });
const emptySpec = (): ProductSpec => ({ label: emptyLocalized(), value: emptyLocalized() });
const emptyProduct = (): Product => ({
  id: '',
  name: emptyLocalized(),
  category: 'tmg',
  image: '',
  shortDesc: emptyLocalized(),
  fullDesc: emptyLocalized(),
  specs: [emptySpec()],
  borderVariant: 1,
});
const emptyCertificate = (): Certificate => ({
  id: '',
  title: emptyLocalized(),
  issuer: emptyLocalized(),
  year: new Date().getFullYear().toString(),
  image: '',
  description: emptyLocalized(),
});
const emptyPartner = (): Partner => ({ id: '', name: '', logo: '', url: '' });
const emptyAdmin = (): AdminAccount => ({
  id: '',
  name: '',
  username: '',
  password: '',
  role: 'Editor',
  createdAt: new Date().toISOString(),
});

const panelClass = 'rounded-3xl border border-[#173462] bg-[#071124]/94 shadow-[0_20px_60px_rgba(0,0,0,0.35)]';
const inputClass = 'w-full rounded-xl border border-[#24487d] bg-[#030b19] px-3.5 py-3 text-sm text-white outline-none transition focus:border-[#00e8ff] focus:ring-2 focus:ring-[#00e8ff]/15 placeholder:text-slate-600';
const labelClass = 'mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.13em] text-slate-400';
const primaryButton = 'inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F5BFF] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#00cde8] hover:text-[#020308] disabled:cursor-not-allowed disabled:opacity-45';
const secondaryButton = 'inline-flex items-center justify-center gap-2 rounded-xl border border-[#24487d] bg-[#09152a] px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-[#00e8ff]/60 hover:text-white';

const Field: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, ...props }) => (
  <label className="block">
    <span className={labelClass}>{label}</span>
    <input {...props} className={`${inputClass} ${props.className ?? ''}`} />
  </label>
);

const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }> = ({ label, ...props }) => (
  <label className="block">
    <span className={labelClass}>{label}</span>
    <textarea {...props} className={`${inputClass} min-h-24 resize-y ${props.className ?? ''}`} />
  </label>
);

const ImageField: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
}> = ({ label, value, onChange }) => {
  const handleFile = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(String(reader.result ?? ''));
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <span className={labelClass}>{label}</span>
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={inputClass}
          placeholder="/assets/... yoki https://..."
        />
        <label className={`${secondaryButton} cursor-pointer`}>
          <Upload className="h-4 w-4" />
          Fayl tanlash
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => handleFile(event.target.files?.[0])}
          />
        </label>
      </div>
      {value && (
        <div className="mt-3 h-36 overflow-hidden rounded-2xl border border-[#24487d] bg-[#020711]">
          <img src={value} alt="Ko‘rib chiqish" className="h-full w-full object-contain" />
        </div>
      )}
    </div>
  );
};

const LanguageFields: React.FC<{
  title: string;
  value: Record<Language, string>;
  multiline?: boolean;
  onChange: (language: Language, value: string) => void;
}> = ({ title, value, multiline = false, onChange }) => (
  <div className="rounded-2xl border border-[#173462] bg-[#040c1a]/75 p-4">
    <div className="mb-3 text-sm font-bold text-white">{title}</div>
    <div className="grid gap-3 lg:grid-cols-3">
      {languages.map((language) =>
        multiline ? (
          <TextArea
            key={language}
            label={languageLabels[language]}
            value={value[language]}
            onChange={(event) => onChange(language, event.target.value)}
          />
        ) : (
          <Field
            key={language}
            label={languageLabels[language]}
            value={value[language]}
            onChange={(event) => onChange(language, event.target.value)}
          />
        ),
      )}
    </div>
  </div>
);

const EmptyState: React.FC<{ text: string }> = ({ text }) => (
  <div className="rounded-2xl border border-dashed border-[#24487d] px-5 py-12 text-center text-sm text-slate-500">
    {text}
  </div>
);

const SectionHeading: React.FC<{
  eyebrow: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}> = ({ eyebrow, title, description, action }) => (
  <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
    <div>
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#00e8ff]">{eyebrow}</div>
      <h1 className="mt-2 font-display text-3xl font-extrabold uppercase text-white sm:text-4xl">{title}</h1>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{description}</p>
    </div>
    {action}
  </div>
);

const LoginScreen: React.FC<{ onLogin: (admin: AdminAccount) => void }> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const admin = getSiteContent().admins.find(
      (item) => item.username.trim() === username.trim() && item.password === password,
    );
    if (!admin) {
      setError('Login yoki parol noto‘g‘ri.');
      return;
    }
    setError('');
    onLogin(admin);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020308] px-4 py-10 text-white">
      <div className="pointer-events-none absolute left-[-10rem] top-[-10rem] h-[30rem] w-[30rem] rounded-full bg-[#0F5BFF]/18 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-[-12rem] right-[-8rem] h-[32rem] w-[32rem] rounded-full bg-[#00e8ff]/10 blur-[150px]" />
      <form onSubmit={submit} className={`${panelClass} relative z-10 w-full max-w-md p-6 sm:p-8`}>
        <div className="mb-7 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#00e8ff]/40 bg-[#0F5BFF]/15 text-[#00e8ff] shadow-[0_0_28px_rgba(0,232,255,0.15)]">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#00e8ff]">UZTRANSFORMATOR</div>
            <h1 className="mt-1 font-display text-2xl font-bold uppercase">Admin panel</h1>
          </div>
        </div>

        <div className="space-y-4">
          <Field label="Login" autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} />
          <label className="block">
            <span className={labelClass}>Parol</span>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className={`${inputClass} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                aria-label="Parolni ko‘rsatish"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </label>
          {error && <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div>}
          <button type="submit" className={`${primaryButton} w-full`}>
            Kirish <ChevronRight className="h-4 w-4" />
          </button>
          <button type="button" onClick={() => (window.location.href = '/')} className={`${secondaryButton} w-full`}>
            Saytga qaytish
          </button>
        </div>
      </form>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const content = useSiteContent();
  const cards = [
    { label: 'Katalog mahsulotlari', value: content.products.length, icon: Package },
    { label: 'Sertifikatlar', value: content.certificates.length, icon: Award },
    { label: 'Hamkorlar', value: content.partners.length, icon: Building2 },
    { label: 'Administratorlar', value: content.admins.length, icon: Users },
  ];

  return (
    <div>
      <SectionHeading
        eyebrow="Boshqaruv markazi"
        title="Dashboard"
        description="Saytdagi asosiy kontent va boshqaruv bo‘limlarining joriy holati."
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ label, value, icon: Icon }) => (
          <div key={label} className={`${panelClass} p-5`}>
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#0F5BFF]/35 bg-[#0F5BFF]/12 text-[#00e8ff]">
                <Icon className="h-5 w-5" />
              </div>
              <span className="font-mono text-3xl font-bold text-white">{value}</span>
            </div>
            <div className="mt-5 text-sm font-semibold text-slate-300">{label}</div>
          </div>
        ))}
      </div>
      <div className={`${panelClass} mt-6 p-6`}>
        <h2 className="font-display text-xl font-bold uppercase text-white">Tezkor qo‘llanma</h2>
        <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-400 md:grid-cols-2">
          <div className="rounded-2xl border border-[#173462] bg-[#040c1a] p-4">Katalog bo‘limida mahsulot rasmlari, nomlari, tavsifi va texnik xususiyatlarini tahrirlang.</div>
          <div className="rounded-2xl border border-[#173462] bg-[#040c1a] p-4">Sertifikat va hamkorlar bo‘limida yangi rasm yuklang, mavjudlarini tahrirlang yoki olib tashlang.</div>
          <div className="rounded-2xl border border-[#173462] bg-[#040c1a] p-4">Kontakt bo‘limida telefon, manzil, xarita va ijtimoiy tarmoq havolalarini boshqaring.</div>
          <div className="rounded-2xl border border-[#173462] bg-[#040c1a] p-4">Administratorlar bo‘limida yangi foydalanuvchilar yarating va rollarni belgilang.</div>
        </div>
      </div>
    </div>
  );
};

const ProductsManager: React.FC = () => {
  const content = useSiteContent();
  const [draft, setDraft] = useState<Product | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const filtered = useMemo(
    () => content.products.filter((product) => product.name.uz.toLowerCase().includes(query.toLowerCase())),
    [content.products, query],
  );

  const beginNew = () => {
    setEditingId(null);
    setDraft(emptyProduct());
  };
  const beginEdit = (product: Product) => {
    setEditingId(product.id);
    setDraft(structuredClone(product));
  };
  const close = () => {
    setDraft(null);
    setEditingId(null);
  };

  const save = () => {
    if (!draft || !draft.name.uz.trim() || !draft.image.trim()) {
      window.alert('Mahsulot nomi va rasmi majburiy.');
      return;
    }
    let nextId = draft.id.trim() || slugify(draft.name.uz);
    if (!editingId && content.products.some((item) => item.id === nextId)) nextId = uid(nextId);
    const normalized: Product = {
      ...draft,
      id: nextId,
      specs: draft.specs.filter((spec) => spec.label.uz.trim() || (typeof spec.value !== 'string' && spec.value.uz.trim())),
    };
    updateSiteContent((current) => ({
      ...current,
      products: editingId
        ? current.products.map((item) => (item.id === editingId ? normalized : item))
        : [...current.products, normalized],
    }));
    close();
  };

  const remove = (product: Product) => {
    if (!window.confirm(`“${product.name.uz}” mahsulotini o‘chirasizmi?`)) return;
    updateSiteContent((current) => ({ ...current, products: current.products.filter((item) => item.id !== product.id) }));
  };

  const setLocalized = (key: 'name' | 'shortDesc' | 'fullDesc', language: Language, value: string) => {
    setDraft((current) => current ? { ...current, [key]: { ...current[key], [language]: value } } : current);
  };

  const updateSpec = (index: number, side: 'label' | 'value', language: Language, value: string) => {
    setDraft((current) => {
      if (!current) return current;
      const specs = structuredClone(current.specs);
      const spec = specs[index];
      if (side === 'label') spec.label[language] = value;
      else {
        if (typeof spec.value === 'string') spec.value = { uz: spec.value, ru: spec.value, en: spec.value };
        spec.value[language] = value;
      }
      return { ...current, specs };
    });
  };

  return (
    <div>
      <SectionHeading
        eyebrow="Kontent boshqaruvi"
        title="Katalog management"
        description="Mahsulotlarni qo‘shish, tahrirlash, texnik xususiyatlarini yangilash va o‘chirish."
        action={<button type="button" onClick={beginNew} className={primaryButton}><Plus className="h-4 w-4" /> Yangi mahsulot</button>}
      />

      <div className={`${panelClass} p-4 sm:p-5`}>
        <Field label="Mahsulot qidirish" placeholder="Nom bo‘yicha qidirish..." value={query} onChange={(event) => setQuery(event.target.value)} />
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((product) => (
            <div key={product.id} className="overflow-hidden rounded-2xl border border-[#173462] bg-[#040c1a]">
              <div className="relative h-44 overflow-hidden bg-[#0b1422]">
                <img src={product.image} alt={product.name.uz} className="absolute inset-0 h-full w-full scale-110 object-cover opacity-35 blur-xl" />
                <img src={product.image} alt={product.name.uz} className="relative h-full w-full object-contain p-3" />
              </div>
              <div className="p-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#00e8ff]">{product.category}</div>
                <h3 className="mt-2 line-clamp-2 min-h-12 font-bold text-white">{product.name.uz}</h3>
                <div className="mt-4 flex gap-2">
                  <button type="button" onClick={() => beginEdit(product)} className={`${secondaryButton} flex-1 py-2.5`}><Pencil className="h-4 w-4" /> Tahrirlash</button>
                  <button type="button" onClick={() => remove(product)} className="inline-flex items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 px-3 text-red-300 transition hover:bg-red-500/20" aria-label="O‘chirish"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <div className="md:col-span-2 xl:col-span-3"><EmptyState text="Mahsulot topilmadi." /></div>}
        </div>
      </div>

      {draft && (
        <div className="fixed inset-0 z-[200] overflow-y-auto bg-black/80 p-3 backdrop-blur-md sm:p-6">
          <div className={`${panelClass} mx-auto max-w-6xl overflow-hidden`}>
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#173462] bg-[#071124]/95 px-5 py-4 backdrop-blur-xl">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.17em] text-[#00e8ff]">Katalog formasi</div>
                <h2 className="mt-1 font-display text-xl font-bold uppercase text-white">{editingId ? 'Mahsulotni tahrirlash' : 'Yangi mahsulot qo‘shish'}</h2>
              </div>
              <button type="button" onClick={close} className="rounded-xl border border-[#24487d] p-2.5 text-slate-300 hover:text-white"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-5 p-5 sm:p-7">
              <div className="grid gap-4 md:grid-cols-3">
                <Field label="ID / slug" value={draft.id} placeholder="Avtomatik yaratiladi" onChange={(event) => setDraft({ ...draft, id: event.target.value })} />
                <label className="block">
                  <span className={labelClass}>Kategoriya</span>
                  <select value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value as ProductCategory })} className={inputClass}>
                    <option value="tmg">TMG</option><option value="ktp">KTP</option><option value="ru">RU</option>
                  </select>
                </label>
                <label className="block">
                  <span className={labelClass}>Neon border variant</span>
                  <select value={draft.borderVariant} onChange={(event) => setDraft({ ...draft, borderVariant: Number(event.target.value) as Product['borderVariant'] })} className={inputClass}>
                    {[1,2,3,4,5,6,7,8,9].map((value) => <option key={value} value={value}>{value}</option>)}
                  </select>
                </label>
              </div>
              <ImageField label="Mahsulot rasmi" value={draft.image} onChange={(image) => setDraft({ ...draft, image })} />
              <LanguageFields title="Mahsulot nomi" value={draft.name} onChange={(language, value) => setLocalized('name', language, value)} />
              <LanguageFields title="Qisqa tavsif" multiline value={draft.shortDesc} onChange={(language, value) => setLocalized('shortDesc', language, value)} />
              <LanguageFields title="To‘liq tavsif" multiline value={draft.fullDesc} onChange={(language, value) => setLocalized('fullDesc', language, value)} />

              <div className="rounded-2xl border border-[#173462] bg-[#040c1a]/75 p-4">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-bold text-white">Texnik xususiyatlar</div>
                    <div className="mt-1 text-xs text-slate-500">Har bir qator uchun label va qiymatni 3 tilda kiriting.</div>
                  </div>
                  <button type="button" onClick={() => setDraft({ ...draft, specs: [...draft.specs, emptySpec()] })} className={secondaryButton}><Plus className="h-4 w-4" /> Qator qo‘shish</button>
                </div>
                <div className="space-y-4">
                  {draft.specs.map((spec, index) => {
                    const values = typeof spec.value === 'string' ? { uz: spec.value, ru: spec.value, en: spec.value } : spec.value;
                    return (
                      <div key={index} className="rounded-2xl border border-[#24487d] bg-[#020711] p-4">
                        <div className="mb-3 flex items-center justify-between">
                          <span className="font-mono text-xs text-[#00e8ff]">#{index + 1}</span>
                          <button type="button" disabled={draft.specs.length === 1} onClick={() => setDraft({ ...draft, specs: draft.specs.filter((_, itemIndex) => itemIndex !== index) })} className="text-red-300 disabled:opacity-30"><Trash2 className="h-4 w-4" /></button>
                        </div>
                        <div className="grid gap-3 lg:grid-cols-2">
                          <div className="grid gap-3 sm:grid-cols-3">{languages.map((language) => <Field key={language} label={`Label — ${language.toUpperCase()}`} value={spec.label[language]} onChange={(event) => updateSpec(index, 'label', language, event.target.value)} />)}</div>
                          <div className="grid gap-3 sm:grid-cols-3">{languages.map((language) => <Field key={language} label={`Qiymat — ${language.toUpperCase()}`} value={values[language]} onChange={(event) => updateSpec(index, 'value', language, event.target.value)} />)}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="sticky bottom-0 flex justify-end gap-3 border-t border-[#173462] bg-[#071124]/95 px-5 py-4 backdrop-blur-xl">
              <button type="button" onClick={close} className={secondaryButton}>Bekor qilish</button>
              <button type="button" onClick={save} className={primaryButton}><Save className="h-4 w-4" /> Saqlash</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CertificatesManager: React.FC = () => {
  const content = useSiteContent();
  const [draft, setDraft] = useState<Certificate | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const edit = (item: Certificate) => { setEditingId(item.id); setDraft(structuredClone(item)); };
  const close = () => { setDraft(null); setEditingId(null); };
  const save = () => {
    if (!draft || !draft.title.uz.trim() || !draft.image.trim()) return window.alert('Sertifikat nomi va rasmi majburiy.');
    const normalized = { ...draft, id: draft.id.trim() || slugify(draft.title.uz) };
    updateSiteContent((current) => ({ ...current, certificates: editingId ? current.certificates.map((item) => item.id === editingId ? normalized : item) : [...current.certificates, normalized] }));
    close();
  };
  const remove = (item: Certificate) => {
    if (!window.confirm(`“${item.title.uz}” sertifikatini o‘chirasizmi?`)) return;
    updateSiteContent((current) => ({ ...current, certificates: current.certificates.filter((value) => value.id !== item.id) }));
  };
  const localized = (key: 'title' | 'issuer' | 'description', language: Language, value: string) => setDraft((current) => current ? { ...current, [key]: { ...current[key], [language]: value } } : current);

  return (
    <div>
      <SectionHeading eyebrow="Hujjatlar" title="Sertifikatlar" description="Sertifikatlarni rasm, nom, tashkilot va tavsifi bilan boshqaring." action={<button onClick={() => { setEditingId(null); setDraft(emptyCertificate()); }} className={primaryButton}><Plus className="h-4 w-4" /> Sertifikat qo‘shish</button>} />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {content.certificates.map((item) => (
          <div key={item.id} className={`${panelClass} overflow-hidden`}>
            <div className="h-64 bg-black p-3"><img src={item.image} alt={item.title.uz} className="h-full w-full object-contain" /></div>
            <div className="p-4"><div className="font-mono text-[10px] text-[#00e8ff]">{item.year}</div><h3 className="mt-2 min-h-12 font-bold text-white">{item.title.uz}</h3><div className="mt-4 flex gap-2"><button onClick={() => edit(item)} className={`${secondaryButton} flex-1 py-2.5`}><Pencil className="h-4 w-4" /> Tahrirlash</button><button onClick={() => remove(item)} className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 text-red-300"><Trash2 className="h-4 w-4" /></button></div></div>
          </div>
        ))}
      </div>
      {draft && (
        <div className="fixed inset-0 z-[200] overflow-y-auto bg-black/80 p-3 backdrop-blur-md sm:p-6"><div className={`${panelClass} mx-auto max-w-5xl`}>
          <div className="flex items-center justify-between border-b border-[#173462] p-5"><h2 className="font-display text-xl font-bold uppercase text-white">{editingId ? 'Sertifikatni tahrirlash' : 'Yangi sertifikat'}</h2><button onClick={close}><X className="h-5 w-5" /></button></div>
          <div className="space-y-5 p-5 sm:p-7"><div className="grid gap-4 md:grid-cols-2"><Field label="ID" value={draft.id} onChange={(event) => setDraft({ ...draft, id: event.target.value })} /><Field label="Yil" value={draft.year} onChange={(event) => setDraft({ ...draft, year: event.target.value })} /></div><ImageField label="Sertifikat rasmi" value={draft.image} onChange={(image) => setDraft({ ...draft, image })} /><LanguageFields title="Sertifikat nomi" value={draft.title} onChange={(language, value) => localized('title', language, value)} /><LanguageFields title="Sertifikat bergan tashkilot" value={draft.issuer} onChange={(language, value) => localized('issuer', language, value)} /><LanguageFields title="Tavsif" multiline value={draft.description} onChange={(language, value) => localized('description', language, value)} /></div>
          <div className="flex justify-end gap-3 border-t border-[#173462] p-5"><button onClick={close} className={secondaryButton}>Bekor qilish</button><button onClick={save} className={primaryButton}><Save className="h-4 w-4" /> Saqlash</button></div>
        </div></div>
      )}
    </div>
  );
};

const PartnersManager: React.FC = () => {
  const content = useSiteContent();
  const [draft, setDraft] = useState<Partner | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const close = () => { setDraft(null); setEditingId(null); };
  const save = () => {
    if (!draft || !draft.name.trim() || !draft.logo.trim()) return window.alert('Hamkor nomi va logotipi majburiy.');
    const normalized = { ...draft, id: draft.id.trim() || slugify(draft.name) };
    updateSiteContent((current) => ({ ...current, partners: editingId ? current.partners.map((item) => item.id === editingId ? normalized : item) : [...current.partners, normalized] }));
    close();
  };
  const remove = (item: Partner) => {
    if (!window.confirm(`“${item.name}” hamkorini o‘chirasizmi?`)) return;
    updateSiteContent((current) => ({ ...current, partners: current.partners.filter((value) => value.id !== item.id) }));
  };
  return (
    <div>
      <SectionHeading eyebrow="Tashkilotlar" title="Hamkorlar" description="Hamkor tashkilotlar logotipi, nomi va rasmiy havolasini boshqaring." action={<button onClick={() => { setEditingId(null); setDraft(emptyPartner()); }} className={primaryButton}><Plus className="h-4 w-4" /> Hamkor qo‘shish</button>} />
      <div className={`${panelClass} p-5`}><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{content.partners.map((item) => <div key={item.id} className="rounded-2xl border border-[#173462] bg-[#040c1a] p-4"><div className="flex h-28 items-center justify-center rounded-xl bg-white p-4"><img src={item.logo} alt={item.name} className="max-h-full max-w-full object-contain" /></div><h3 className="mt-4 min-h-12 font-bold text-white">{item.name}</h3><div className="mt-3 flex gap-2"><button onClick={() => { setEditingId(item.id); setDraft(structuredClone(item)); }} className={`${secondaryButton} flex-1 py-2.5`}><Pencil className="h-4 w-4" /> Tahrirlash</button><button onClick={() => remove(item)} className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 text-red-300"><Trash2 className="h-4 w-4" /></button></div></div>)}</div></div>
      {draft && <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-md"><div className={`${panelClass} w-full max-w-3xl`}><div className="flex items-center justify-between border-b border-[#173462] p-5"><h2 className="font-display text-xl font-bold uppercase">{editingId ? 'Hamkorni tahrirlash' : 'Yangi hamkor'}</h2><button onClick={close}><X className="h-5 w-5" /></button></div><div className="space-y-5 p-5 sm:p-7"><div className="grid gap-4 md:grid-cols-2"><Field label="ID" value={draft.id} onChange={(event) => setDraft({ ...draft, id: event.target.value })} /><Field label="Hamkor nomi" value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} /></div><ImageField label="Logotip" value={draft.logo} onChange={(logo) => setDraft({ ...draft, logo })} /><Field label="Rasmiy sayt URL" value={draft.url} onChange={(event) => setDraft({ ...draft, url: event.target.value })} /></div><div className="flex justify-end gap-3 border-t border-[#173462] p-5"><button onClick={close} className={secondaryButton}>Bekor qilish</button><button onClick={save} className={primaryButton}><Save className="h-4 w-4" /> Saqlash</button></div></div></div>}
    </div>
  );
};

const ContactManager: React.FC = () => {
  const content = useSiteContent();
  const [draft, setDraft] = useState<ContactSettings>(() => structuredClone(content.contact));
  useEffect(() => setDraft(structuredClone(content.contact)), [content.contact]);
  const setLocalized = (key: 'address' | 'workHours' | 'locationText', language: Language, value: string) => setDraft((current) => ({ ...current, [key]: { ...current[key], [language]: value } }));
  const save = () => { updateSiteContent((current) => ({ ...current, contact: draft })); window.alert('Kontakt ma’lumotlari saqlandi.'); };
  return (
    <div>
      <SectionHeading eyebrow="Aloqa" title="Kontakt ma’lumotlari" description="Telefon, email, manzil, ish vaqti, xarita va ijtimoiy tarmoq havolalarini tahrirlang." action={<button onClick={save} className={primaryButton}><Save className="h-4 w-4" /> Saqlash</button>} />
      <div className={`${panelClass} space-y-6 p-5 sm:p-7`}>
        <div><div className="mb-3 flex items-center justify-between"><h2 className="font-bold text-white">Telefon raqamlari</h2><button onClick={() => setDraft({ ...draft, phones: [...draft.phones, { label: '', href: 'tel:' }] })} className={secondaryButton}><Plus className="h-4 w-4" /> Telefon</button></div><div className="space-y-3">{draft.phones.map((phone, index) => <div key={index} className="grid gap-3 md:grid-cols-[1fr_1fr_auto]"><Field label="Ko‘rinadigan raqam" value={phone.label} onChange={(event) => { const phones = [...draft.phones]; phones[index] = { ...phones[index], label: event.target.value }; setDraft({ ...draft, phones }); }} /><Field label="tel: havola" value={phone.href} onChange={(event) => { const phones = [...draft.phones]; phones[index] = { ...phones[index], href: event.target.value }; setDraft({ ...draft, phones }); }} /><button disabled={draft.phones.length === 1} onClick={() => setDraft({ ...draft, phones: draft.phones.filter((_, itemIndex) => itemIndex !== index) })} className="mt-6 h-12 rounded-xl border border-red-500/30 bg-red-500/10 px-4 text-red-300 disabled:opacity-30"><Trash2 className="h-4 w-4" /></button></div>)}</div></div>
        <div className="grid gap-4 md:grid-cols-2"><Field label="Email" value={draft.email} onChange={(event) => setDraft({ ...draft, email: event.target.value })} /><Field label="Koordinatalar" value={draft.coordinates} onChange={(event) => setDraft({ ...draft, coordinates: event.target.value })} /></div>
        <LanguageFields title="Manzil" multiline value={draft.address} onChange={(language, value) => setLocalized('address', language, value)} />
        <LanguageFields title="Ish vaqti" value={draft.workHours} onChange={(language, value) => setLocalized('workHours', language, value)} />
        <LanguageFields title="Lokatsiya nomi" value={draft.locationText} onChange={(language, value) => setLocalized('locationText', language, value)} />
        <div className="grid gap-4 md:grid-cols-2"><TextArea label="Google Maps URL" value={draft.mapUrl} onChange={(event) => setDraft({ ...draft, mapUrl: event.target.value })} /><TextArea label="Google Maps embed URL" value={draft.mapEmbed} onChange={(event) => setDraft({ ...draft, mapEmbed: event.target.value })} /></div>
        <div className="rounded-2xl border border-[#173462] bg-[#040c1a]/75 p-4"><h2 className="mb-4 font-bold text-white">Ijtimoiy tarmoqlar</h2><div className="grid gap-4 md:grid-cols-2">{Object.entries(draft.socials).map(([key, value]) => <Field key={key} label={key} value={value} onChange={(event) => setDraft({ ...draft, socials: { ...draft.socials, [key]: event.target.value } })} />)}</div></div>
      </div>
    </div>
  );
};

const AdminsManager: React.FC<{ currentAdminId: string }> = ({ currentAdminId }) => {
  const content = useSiteContent();
  const [draft, setDraft] = useState<AdminAccount | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const close = () => { setDraft(null); setEditingId(null); };
  const save = () => {
    if (!draft || !draft.name.trim() || !draft.username.trim() || !draft.password) return window.alert('Ism, login va parol majburiy.');
    const duplicate = content.admins.some((item) => item.username === draft.username && item.id !== editingId);
    if (duplicate) return window.alert('Bu login allaqachon mavjud.');
    const normalized = { ...draft, id: draft.id || uid('admin') };
    updateSiteContent((current) => ({ ...current, admins: editingId ? current.admins.map((item) => item.id === editingId ? normalized : item) : [...current.admins, normalized] }));
    close();
  };
  const remove = (item: AdminAccount) => {
    if (item.id === currentAdminId) return window.alert('Hozir kirilgan adminni o‘chirib bo‘lmaydi.');
    if (content.admins.length <= 1) return window.alert('Kamida bitta administrator qolishi kerak.');
    if (!window.confirm(`“${item.username}” adminini o‘chirasizmi?`)) return;
    updateSiteContent((current) => ({ ...current, admins: current.admins.filter((value) => value.id !== item.id) }));
  };
  return (
    <div>
      <SectionHeading eyebrow="Xavfsizlik" title="Adminlar management" description="Admin panelga kirish huquqiga ega foydalanuvchilarni qo‘shing, tahrirlang yoki olib tashlang." action={<button onClick={() => { setEditingId(null); setDraft(emptyAdmin()); }} className={primaryButton}><Plus className="h-4 w-4" /> Admin qo‘shish</button>} />
      <div className={`${panelClass} overflow-hidden`}><div className="overflow-x-auto"><table className="w-full min-w-[720px] text-left"><thead className="border-b border-[#173462] bg-[#040c1a]"><tr className="text-[11px] uppercase tracking-[0.12em] text-slate-500"><th className="px-5 py-4">Admin</th><th className="px-5 py-4">Login</th><th className="px-5 py-4">Rol</th><th className="px-5 py-4">Yaratilgan</th><th className="px-5 py-4 text-right">Amallar</th></tr></thead><tbody>{content.admins.map((item) => <tr key={item.id} className="border-b border-[#173462]/65 last:border-0"><td className="px-5 py-4 font-semibold text-white">{item.name}{item.id === currentAdminId && <span className="ml-2 rounded-full bg-[#00e8ff]/10 px-2 py-1 text-[9px] uppercase text-[#00e8ff]">Siz</span>}</td><td className="px-5 py-4 font-mono text-slate-300">{item.username}</td><td className="px-5 py-4 text-slate-300">{item.role}</td><td className="px-5 py-4 text-sm text-slate-500">{new Date(item.createdAt).toLocaleDateString()}</td><td className="px-5 py-4"><div className="flex justify-end gap-2"><button onClick={() => { setEditingId(item.id); setDraft({ ...item }); }} className="rounded-lg border border-[#24487d] p-2 text-slate-300 hover:text-white"><Pencil className="h-4 w-4" /></button><button onClick={() => remove(item)} className="rounded-lg border border-red-500/30 bg-red-500/10 p-2 text-red-300"><Trash2 className="h-4 w-4" /></button></div></td></tr>)}</tbody></table></div></div>
      {draft && <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"><div className={`${panelClass} w-full max-w-xl`}><div className="flex items-center justify-between border-b border-[#173462] p-5"><h2 className="font-display text-xl font-bold uppercase">{editingId ? 'Adminni tahrirlash' : 'Yangi admin'}</h2><button onClick={close}><X className="h-5 w-5" /></button></div><div className="space-y-4 p-5 sm:p-7"><Field label="Ism" value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} /><Field label="Login" value={draft.username} onChange={(event) => setDraft({ ...draft, username: event.target.value })} /><Field label="Parol" value={draft.password} onChange={(event) => setDraft({ ...draft, password: event.target.value })} /><label className="block"><span className={labelClass}>Rol</span><select className={inputClass} value={draft.role} onChange={(event) => setDraft({ ...draft, role: event.target.value as AdminAccount['role'] })}><option>Super Admin</option><option>Editor</option></select></label></div><div className="flex justify-end gap-3 border-t border-[#173462] p-5"><button onClick={close} className={secondaryButton}>Bekor qilish</button><button onClick={save} className={primaryButton}><Save className="h-4 w-4" /> Saqlash</button></div></div></div>}
    </div>
  );
};

export const AdminPage: React.FC = () => {
  const content = useSiteContent();
  const [sessionId, setSessionId] = useState(() => window.sessionStorage.getItem(SESSION_KEY) ?? '');
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const admin = content.admins.find((item) => item.id === sessionId) ?? null;

  useEffect(() => {
    document.title = 'UZTRANSFORMATOR — Admin panel';
  }, []);

  const login = (account: AdminAccount) => {
    window.sessionStorage.setItem(SESSION_KEY, account.id);
    setSessionId(account.id);
  };
  const logout = () => {
    window.sessionStorage.removeItem(SESSION_KEY);
    setSessionId('');
  };

  if (!admin) return <LoginScreen onLogin={login} />;

  const navItems: Array<{ id: AdminTab; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { id: 'dashboard', label: 'Dashboard', icon: Gauge },
    { id: 'products', label: 'Katalog', icon: Package },
    { id: 'certificates', label: 'Sertifikatlar', icon: Award },
    { id: 'partners', label: 'Hamkorlar', icon: Building2 },
    { id: 'contact', label: 'Kontaktlar', icon: Contact },
    { id: 'admins', label: 'Adminlar', icon: UserCog },
  ];

  const renderPage = () => {
    if (activeTab === 'products') return <ProductsManager />;
    if (activeTab === 'certificates') return <CertificatesManager />;
    if (activeTab === 'partners') return <PartnersManager />;
    if (activeTab === 'contact') return <ContactManager />;
    if (activeTab === 'admins') return <AdminsManager currentAdminId={admin.id} />;
    return <Dashboard />;
  };

  return (
    <div className="min-h-screen bg-[#020308] text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(15,91,255,0.12),transparent_30%),radial-gradient(circle_at_90%_80%,rgba(0,232,255,0.07),transparent_28%)]" />
      <aside className={`fixed inset-y-0 left-0 z-50 w-[278px] border-r border-[#173462] bg-[#040b17]/98 p-4 backdrop-blur-xl transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between rounded-2xl border border-[#173462] bg-[#071124] p-4">
            <div><div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#00e8ff]">UZTRANSFORMATOR</div><div className="mt-1 font-display text-lg font-bold uppercase">Admin panel</div></div>
            <button className="lg:hidden" onClick={() => setSidebarOpen(false)}><X className="h-5 w-5" /></button>
          </div>
          <nav className="mt-5 space-y-2">{navItems.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => { setActiveTab(id); setSidebarOpen(false); }} className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${activeTab === id ? 'border border-[#00e8ff]/35 bg-[#0F5BFF]/18 text-white shadow-[0_0_22px_rgba(15,91,255,0.1)]' : 'border border-transparent text-slate-400 hover:bg-[#071124] hover:text-white'}`}><Icon className={`h-5 w-5 ${activeTab === id ? 'text-[#00e8ff]' : ''}`} />{label}</button>)}</nav>
          <div className="mt-auto space-y-3">
            <div className="rounded-2xl border border-[#173462] bg-[#071124] p-4"><div className="text-sm font-bold text-white">{admin.name}</div><div className="mt-1 font-mono text-[10px] text-slate-500">@{admin.username} · {admin.role}</div></div>
            <button onClick={() => window.open('/', '_blank')} className={`${secondaryButton} w-full`}><Eye className="h-4 w-4" /> Saytni ko‘rish</button>
            <button onClick={logout} className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/25 bg-red-500/8 px-4 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-500/15"><LogOut className="h-4 w-4" /> Chiqish</button>
          </div>
        </div>
      </aside>
      {sidebarOpen && <button className="fixed inset-0 z-40 bg-black/70 lg:hidden" onClick={() => setSidebarOpen(false)} aria-label="Menyuni yopish" />}
      <div className="relative z-10 lg:pl-[278px]">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#173462] bg-[#020711]/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <button onClick={() => setSidebarOpen(true)} className="rounded-xl border border-[#24487d] p-2.5 lg:hidden"><Menu className="h-5 w-5" /></button>
          <div className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 sm:block">Kontent boshqaruv tizimi</div>
          <button
            onClick={() => {
              if (!window.confirm('Barcha admin o‘zgarishlarini dastlabki holatga qaytarasizmi?')) return;
              resetSiteContent();
              window.sessionStorage.removeItem(SESSION_KEY);
              setSessionId('');
            }}
            className="inline-flex items-center gap-2 rounded-xl border border-[#24487d] bg-[#071124] px-3 py-2 text-xs text-slate-400 transition hover:text-white"
          >
            <RotateCcw className="h-4 w-4" /> Reset
          </button>
        </header>
        <main className="mx-auto max-w-[1540px] p-4 sm:p-6 lg:p-8">{renderPage()}</main>
      </div>
    </div>
  );
};
