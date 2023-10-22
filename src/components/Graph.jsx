import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

// eslint-disable-next-line react/prop-types
export default function Graph({ graphData = [] }) {

    return (
        <>
            <Line
                data={
                    {
                        labels: graphData.map((i) => i[0]),
                        datasets: [
                            {
                                data: graphData.map(i => i[1]),
                                label: 'WPM',
                                borderColor: '#007BA7',
                                color: '#007BA7'
                            }
                        ]
                    }
                }
            />
        </>
    )
}

