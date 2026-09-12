const categoryTones: Record<string, string> = {
  'Guias para Lojistas': 'green',
  'Gestão de Loja': 'amber',
  'Tendências e Mercado': 'slate',
  'Saúde e Nutrição': 'forest',
  'Viver Natural': 'terracota',
}

export default function CategoryChip({ category }: { category: string | null }) {
  return <span className={`category-chip category-chip--${categoryTones[category || ''] || 'green'}`}>{category || 'Blog'}</span>
}
