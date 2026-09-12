import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://eownpzhsvghqrulwmqnj.supabase.co' // Llenar luego
const supabaseKey = 'sb_publishable_N31cEVHRwOlOFu-Fh-ulHA_5fOR9e2d' // Llenar luego

export const supabase = createClient(supabaseUrl, supabaseKey)
