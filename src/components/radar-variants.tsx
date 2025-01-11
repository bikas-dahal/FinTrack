import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts"

type Props = {
    data?: {
        name: string
        value: number
    }[]
}

export const RadarVariants = ({ data = [] }: Props) => {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <RadarChart
                cx="50%"
                cy="50%"
                outerRadius="80%"

                data={data}
            >
                <PolarGrid />
                <PolarAngleAxis style={{ fontSize: '14px' }} dataKey="name" />
                <PolarRadiusAxis style={{ fontSize: '14px' }} />
                <Radar dataKey="value" fill="#8884d8" stroke="#8884d8" fillOpacity={0.6} />
            </RadarChart>
        </ResponsiveContainer>
    )
}