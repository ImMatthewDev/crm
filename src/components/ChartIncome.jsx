import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'


export default function ChartIncome({ data }) {
return (
<div className="card">
<div className="card-body">
<div className="text-lg font-semibold mb-4">Ingresos mensuales</div>
<div style={{ width: '100%', height: 260 }}>
<ResponsiveContainer>
<BarChart data={data}>
<CartesianGrid strokeDasharray="3 3" />
<XAxis dataKey="name" />
<YAxis />
<Tooltip />
<Bar dataKey="ingresos" radius={[8,8,0,0]} />
</BarChart>
</ResponsiveContainer>
</div>
</div>
</div>
)
}