import { Sort } from "../types/sort.enum";

interface Sorter {
  field?: string;
  order?: Sort.ASCEND | Sort.DESCEND;
}

const getSortOption = (sorter: Sorter) => {
  if (sorter && sorter.field && sorter.order) {
    return {
      sort: `${sorter.field},${
        sorter.order === Sort.ASCEND ? Sort.ASC : Sort.DESC
      }`,
    };
  } else {
    return { sort: `updated_date,${Sort.DESC}` };
  }
};

export { getSortOption };
