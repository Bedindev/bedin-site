import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tnhajvnwofourjusnivh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRuaGFqdm53b2ZvdXJqdXNuaXZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NTUxNTQsImV4cCI6MjA4OTQzMTE1NH0.whtvJ-AOFBldfNEm8Tf0CmeqtF92bI8u4LWJ0h1p1U0'

export const supabase = createClient(supabaseUrl, supabaseKey)
