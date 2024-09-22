import { Chart } from "react-google-charts";
import { useSelector } from "react-redux";
import { selectRuralProducers } from "../../store/ruralProducers/slice";
import "./index.scss";

const Dashboard = () => {
    const ruralProducers = useSelector(selectRuralProducers);

    const totalNumberOfFarms = ruralProducers.length;

    const totalNumberOfFarmsInHectares = () => {
        const totalArea = ruralProducers.map(rural => rural.totalArea);

        const sumTotalArea = totalArea.reduce(
            (accumulator, currentValue) => accumulator + currentValue
        );

        return sumTotalArea;
    }

    const handleStateDataForGraph = () => {
        const groupByState = Object.groupBy(ruralProducers, ({ state }) => state);

        const stateMap = {};

        stateMap["title"] = ["Nome", "Quantidade"]

        for (const key in groupByState) {
            stateMap[key] = [key, groupByState[key].length];
        }

        return Object.keys(stateMap).map(key => stateMap[key]);
    }

    const handleLandUseDataToGraph = () => {
        const agriculturalArea = ruralProducers.map(rural => rural.agriculturalArea);
        const vegetationArea = ruralProducers.map(rural => rural.vegetationArea);

        const sumAgriculturalArea = agriculturalArea.reduce(
            (accumulator, currentValue) => accumulator + currentValue
        );

        const sumVegetationArea = vegetationArea.reduce(
            (accumulator, currentValue) => accumulator + currentValue
        );

        return [
            ["Nome", "Quantidade"],
            ["Agricultável", sumAgriculturalArea],
            ["Vegetação", sumVegetationArea]
        ]
    }

    const handleCropDataToGraph = () => {
        const plantedCrops = ruralProducers.map(rural => rural.plantedCrops);

        const combinedArray = plantedCrops.flat();

        const countByGroupOfPlantedCrops = () => {
            return combinedArray.reduce((accumulator, item) => {
                accumulator[item] = (accumulator[item] || 0) + 1;
                return accumulator;
            }, {});
        };

        const plantedCropsTold = countByGroupOfPlantedCrops();

        let mapPlantedCropsTold = Object.entries(plantedCropsTold).map(([item, count]) => (
            [item, count]
        ));

        let title = ["Nome", "Quantidade"];

        mapPlantedCropsTold.push(title);

        return mapPlantedCropsTold.reverse();
    }

    const dataToFeedTheGraphics = [
        { title: "Gráfico por estado", data: handleStateDataForGraph() },
        { title: "Gráfico por cultura", data: handleCropDataToGraph() },
        { title: "Gráfico por uso de solo", data: handleLandUseDataToGraph() }
    ]


    return (
        <div>
            <h2>Dashboard</h2>
            <hr className="dashboard-delimiter" />

            <p className="dashboard-text">Total de fazendas: <b>{totalNumberOfFarms}</b></p>
            <p className="dashboard-text">Total de fazendas em hectares: <b>{totalNumberOfFarmsInHectares()}</b> ha</p>

            <hr className="dashboard-delimiter" />

            <div className="dashboard-wrapper">
                {
                    dataToFeedTheGraphics.map((item) => (
                        <Chart
                            key={item.title}
                            width={"320px"}
                            height={"200px"}
                            chartType="PieChart"
                            options={{ title: item.title }}
                            data={item.data}

                        />
                    ))
                }
            </div>
            <hr className="dashboard-delimiter" />
        </div>
    )
}


export default Dashboard;