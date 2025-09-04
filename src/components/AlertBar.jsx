import { AlertTriangle } from 'lucide-react'


export default function AlertBar({ items = [] }) {
if (!items.length) return null
return (
<div className="card border-yellow-200 bg-yellow-50">
<div className="card-body flex flex-wrap gap-3 items-center">
<div className="flex items-center gap-2 text-yellow-800 font-semibold">
<AlertTriangle className="size-5" /> Avisos importantes
</div>
<div className="flex gap-2 flex-wrap">
{items.map((it, i) => (
<span key={i} className="badge badge-yellow">{it}</span>
))}
</div>
</div>
</div>
)
}