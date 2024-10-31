import { BasebandInfo } from "@renderer/schema/BasebandInfo";

const getColumns = (data: BasebandInfo): void => {

    for (const [k, v] of Object.entries(data)) {
        console.log(k, v);
    }
};

export { getColumns };