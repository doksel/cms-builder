import supabase from '@/lib/supabase/supabaseClient';

export type Translation = {
  key: string;
  values: {
    [lang: string]: string;
  };
};

export const fetchTranslations = async (): Promise<Translation[]> => {
  const { data, error } = await supabase.from('translations').select('*');
  if (error) throw new Error(error.message);
  return data as Translation[];
};

export const addTranslation = async (translation: Translation) => {
  const { error } = await supabase.from('translations').insert([translation]);
  if (error) throw new Error(error.message);
};

export const updateTranslation = async (
  key: string,
  values: Record<string, string>
) => {
  const { error } = await supabase
    .from('translations')
    .update({ values })
    .eq('key', key);
  if (error) throw new Error(error.message);
};

export const deleteTranslation = async (key: string) => {
  const { error } = await supabase.from('translations').delete().eq('key', key);
  if (error) throw new Error(error.message);
};
