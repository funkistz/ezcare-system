import { Badge } from "@mantine/core";

function VehicleStatusesBadge({ statuses }: any) {
    return (<>
        {statuses && statuses.map((status: any, index: any) => {
            return <Badge size="sm" mt={4} mr='xs' key={index} color={status.color} variant="outline" >{status.name}{status.pivot.label ? ': ' + status.pivot.label : ''} </Badge>
        })}
    </>);
}

export default VehicleStatusesBadge;