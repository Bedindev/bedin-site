import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://znteahessyhlqzfvmmyt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpudGVhaGVzc3lobHF6ZnZtbXl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0NzI4MjIsImV4cCI6MjA5MjA0ODgyMn0.kMBjmGl7HwZYoLX-EK1jRx9LWmKQBBbuj_THPRZKXgI'
)
