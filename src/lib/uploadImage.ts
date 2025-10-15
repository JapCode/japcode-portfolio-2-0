import { supabase } from './supabaseClient';

async function uploadImage(file: File): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `uploads/${fileName}`;

  const { error } = await supabase.storage
    .from('content')
    .upload(filePath, file);

  if (error) throw error;

  const { data } = supabase.storage.from('content').getPublicUrl(filePath);

  return data.publicUrl;
}

export default uploadImage;
