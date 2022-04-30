import {isFilledArray} from '@root/shared/utils';
import _ from 'lodash';

export function processMainData(data) {
    if (!isFilledArray(data)) {
        return [];
    }
    return _.sortBy(data, ['name']);
}
