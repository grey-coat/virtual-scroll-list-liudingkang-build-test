import { withInstall } from '../../utils';

import _FixedSizeList from './fixed-size-list.vue';
import '../../styles/base.scss';
import '../../styles/animate.css';

export const FixedSizeList = withInstall(_FixedSizeList);
export default FixedSizeList;

declare module 'vue' {
  export interface GlobalComponents {
    FixedSizeList: typeof FixedSizeList;
  }
}
