import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Plus, Trash2, User, ShieldCheck, AlertCircle, Send } from 'lucide-react';
import Section from '../components/Section';
import CodeSnippet from '../components/CodeSnippet';
import Callout from '../components/Callout';

// 1. Validasyon Şeması (Yup)
const schema = yup.object({
  groupName: yup.string().required('Grup ismi zorunludur').min(3, 'En az 3 karakter'),
  members: yup.array().of(
    yup.object({
      name: yup.string().required('İsim zorunludur').min(3, 'En az 3 karakter'),
      email: yup.string().required('E-posta zorunludur').email('Geçersiz e-posta formatı'),
    })
  ).required('En az bir üye eklemelisiniz').min(1, 'En az bir üye eklemelisiniz'),
}).required();

type FormData = yup.InferType<typeof schema>;

const formCode = `const schema = yup.object({
  members: yup.array().of(
    yup.object({
      name: yup.string().required(),
      email: yup.string().email().required()
    })
  )
});

const { control, register } = useForm({
  resolver: yupResolver(schema)
});

const { fields, append, remove } = useFieldArray({ control, name: "members" });`;

const FormValidation: React.FC = () => {
  const { register, control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      groupName: '',
      members: [{ name: '', email: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "members"
  });

  const onSubmit = (data: FormData) => {
    alert('Form Başarıyla Gönderildi: ' + JSON.stringify(data, null, 2));
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
          Gelişmiş Form Yönetimi ve Validasyon
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          React Hook Form ve Yup ile performanslı, şema tabanlı ve dinamik form yapıları.
        </p>
      </div>

      <Section 
        id="theory" 
        title="Akademik Bakış: Neden Şema Doğrulama?" 
        description="Yup şema doğrulaması, form kurallarını UI bileşenlerinden ayırarak merkezi bir kontrol sağlar."
      >
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed">
            <p>
              <strong>Yup</strong>, deklaratif bir yapı sunarak form verilerinin geçerliliğini kontrol etmemizi sağlar. UI içerisinde karmaşık <code>if-else</code> blokları yazmak yerine, verinin şeklini ve kurallarını bir şema üzerinden tanımlarız.
            </p>
            <p>
              <strong>yupResolver</strong> kullanarak bu şemayı React Hook Form'a bağladığımızda; form gönderilmeden önce (veya anlık olarak) tüm veriler şemaya göre taranır ve hatalar otomatik olarak <code>formState.errors</code> nesnesine aktarılır.
            </p>
          </div>
          <CodeSnippet code={formCode} language="tsx" />
        </div>
      </Section>

      <Section 
        id="demo" 
        title="İnteraktif Demo: Dinamik Üye Kayıt Formu" 
        description="Kullanıcının dinamik olarak alan ekleyebildiği ve Yup ile anlık doğrulanan gelişmiş form yapısı."
      >
        <div className="bg-white dark:bg-dark-card border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 relative z-10">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3 ml-1">Grup/Proje İsmi</label>
              <div className="relative">
                <input 
                  {...register('groupName')}
                  className={`w-full px-5 py-4 rounded-2xl border bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none transition-all ${
                    errors.groupName ? 'border-rose-500 ring-4 ring-rose-500/10' : 'border-slate-100 dark:border-slate-800 focus:border-primary-500'
                  }`}
                  placeholder="Proje ismini giriniz..."
                />
                {errors.groupName && (
                  <p className="mt-2 text-xs font-bold text-rose-500 flex items-center gap-1.5 ml-1 animate-in slide-in-from-top-1">
                    <AlertCircle size={14} /> {errors.groupName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <h4 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <User size={18} className="text-primary-500" /> Üyeler ({fields.length})
                </h4>
                <button 
                  type="button"
                  onClick={() => append({ name: '', email: '' })}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-xl text-xs font-black hover:bg-primary-100 transition-all"
                >
                  <Plus size={16} /> ÜYE EKLE
                </button>
              </div>

              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {fields.map((field, index) => (
                  <div key={field.id} className="p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-3xl relative animate-in slide-in-from-right-4 duration-300">
                    <button 
                      type="button"
                      onClick={() => remove(index)}
                      className="absolute top-4 right-4 text-slate-400 hover:text-rose-500 p-2 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-all"
                    >
                      <Trash2 size={16} />
                    </button>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1">Üye Adı</label>
                        <input 
                          {...register(`members.${index}.name` as const)}
                          className={`w-full px-4 py-3 bg-white dark:bg-slate-800 rounded-xl border text-sm outline-none transition-all ${
                            errors.members?.[index]?.name ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700 focus:border-primary-500'
                          }`}
                        />
                        {errors.members?.[index]?.name && <p className="mt-1.5 text-[10px] font-bold text-rose-500">{errors.members[index]?.name?.message}</p>}
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1">E-posta</label>
                        <input 
                          {...register(`members.${index}.email` as const)}
                          className={`w-full px-4 py-3 bg-white dark:bg-slate-800 rounded-xl border text-sm outline-none transition-all ${
                            errors.members?.[index]?.email ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700 focus:border-primary-500'
                          }`}
                        />
                        {errors.members?.[index]?.email && <p className="mt-1.5 text-[10px] font-bold text-rose-500">{errors.members[index]?.email?.message}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-5 bg-slate-900 dark:bg-primary-600 text-white font-black rounded-2xl shadow-xl hover:shadow-primary-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3"
            >
              <Send size={18} /> Formu Kaydet ve Gönder
            </button>
          </form>

          <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
            <ShieldCheck size={200} />
          </div>
        </div>
      </Section>

      <div className="grid md:grid-cols-2 gap-6 mt-12">
        <Callout type="tip" title="Sık Kullanılan Yup Kuralları">
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <code className="bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-2 py-0.5 rounded">yup.string().required()</code>
              <span className="text-xs text-slate-500 italic">Alan zorunluluğu</span>
            </li>
            <li className="flex items-center gap-2">
              <code className="bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-2 py-0.5 rounded">yup.string().email()</code>
              <span className="text-xs text-slate-500 italic">E-posta format kontrolü</span>
            </li>
            <li className="flex items-center gap-2">
              <code className="bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-2 py-0.5 rounded">yup.string().min(8)</code>
              <span className="text-xs text-slate-500 italic">Minimum karakter sayısı</span>
            </li>
            <li className="flex items-center gap-2">
              <code className="bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-2 py-0.5 rounded">yup.ref('field')</code>
              <span className="text-xs text-slate-500 italic">Başka bir alanı referans alma (Şifre eşleşme)</span>
            </li>
          </ul>
        </Callout>
        <Callout type="info" title="Neden Uncontrolled Form?">
          React Hook Form, her tuş vuruşunda state güncellemek yerine veriyi ref'ler üzerinden toplar. Bu sayede yüzlerce alanı olan formlarda bile re-render kaynaklı gecikmeler (lag) yaşanmaz.
        </Callout>
      </div>
    </div>
  );
};

export default FormValidation;
