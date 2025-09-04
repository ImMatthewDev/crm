export default function StatsCard({ label, value, hint, tone = 'slate' }) {
const tones = {
green: 'bg-green-50 text-green-700 border-green-200',
yellow: 'bg-yellow-50 text-yellow-700 border-yellow-200',
red: 'bg-red-50 text-red-700 border-red-200',
slate: 'bg-slate-50 text-slate-700 border-slate-200'
}


return (
<div className="card">
<div className="card-body">
<div className={`badge ${tones[tone]} mb-2`}>{hint}</div>
<div className="text-2xl font-semibold">{value}</div>
<div className="text-sm text-gray-500">{label}</div>
</div>
</div>
)
}