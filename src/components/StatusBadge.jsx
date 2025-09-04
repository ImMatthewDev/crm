export default function StatusBadge({ status }) {
const map = {
'Activo': 'badge-green',
'Pendiente Pago': 'badge-red',
'En Pausa': 'badge-slate',
'Vence pronto': 'badge-yellow',
'Pagado': 'badge-green',
'Vencido': 'badge-red'
}
return <span className={`badge ${map[status] || 'badge-slate'}`}>{status}</span>
}