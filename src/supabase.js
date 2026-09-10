import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wohvfuxqpyoigkwfjlbl.supabase.co' // Llenar luego
const supabaseKey = 'sb_publishable_Dhk_-yc5ZAXDcKCTHD3sHg_SGHTzbzx' // Llenar luego

export const supabase = createClient(supabaseUrl, supabaseKey)
