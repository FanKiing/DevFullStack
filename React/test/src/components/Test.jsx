import { Pie, PieChart, Tooltip } from 'recharts';

<PieChart width={400} height={400}>
<Pie
  activeShape={{
    fill: 'red',
  }}
  data={[
    { name: 'Page A', uv: 590 },
    { name: 'Page B', uv: 590 },
    { name: 'Page C', uv: 868 },
  ]}
  dataKey="uv"
/>
<Tooltip defaultIndex={2} />
</PieChart>

