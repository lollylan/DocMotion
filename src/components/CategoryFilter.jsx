import useStore from '../store/useStore'

const CATEGORIES = [
  { id: 'alle', label: 'Alle', emoji: '⚡' },
  { id: 'kraft', label: 'Kraft', emoji: '💪' },
  { id: 'dehnen', label: 'Dehnen', emoji: '🧘' },
  { id: 'cardio', label: 'Cardio', emoji: '🏃' },
]

export default function CategoryFilter() {
  const { selectedCategory, setCategory } = useStore()

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide" role="tablist" aria-label="Kategorie-Filter">
      {CATEGORIES.map((cat) => {
        const active = selectedCategory === cat.id
        return (
          <button
            key={cat.id}
            role="tab"
            aria-selected={active}
            onClick={() => setCategory(cat.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all btn-tap flex-shrink-0 ${
              active
                ? 'bg-accent-green text-black font-semibold shadow-lg shadow-green-500/20'
                : 'bg-bg-card-2 text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            <span>{cat.emoji}</span>
            <span>{cat.label}</span>
          </button>
        )
      })}
    </div>
  )
}
