import { computed, reactive, ref, toRefs, watchSyncEffect } from 'vue';

import type { FixedSizeListProps } from '../fixed-size-list/props';

export interface ListItemPosition {
  top: number;
  height: number;
  index: number;
}

export const useRenderer = (props: FixedSizeListProps) => {
  const renderInfo = reactive({
    cacheStart: 0, // 上缓冲边界
    start: 0, // 可见元素起始位置
    end: 0, // 可见元素结束位置
    cacheEnd: 0, // 下缓冲边界
  });
  // 缓存已经加载过的 item
  const positions = reactive<ListItemPosition[]>([]);
  // 当前已经缓存过的 item 的最大 index
  const maxItemIndex = ref(0);
  const initPositions = () => {
    const len = props.data.length;
    for (let index = maxItemIndex.value; index < len; index++) {
      positions[index] = {
        top: index == 0 ? 0 : positions[index - 1].top + positions[index - 1].height,
        height: props.itemSize,
        index,
      };
    }
    maxItemIndex.value = len;
  };
  watchSyncEffect(initPositions);
  // 可视区域样式
  const containerStyle = computed(() => ({
    width: props.width + (typeof props.width === 'number' ? 'px' : ''),
    height: props.height + 'px',
  }));
  // 占位元素样式
  const listStyle = computed(() => {
    const endPos = positions[positions.length - 1];
    const height = endPos ? endPos.top + endPos.height : 0;
    return {
      width: '100%',
      height: height + 'px',
    };
  });
  // 渲染数据
  const renderData = computed(() => {
    return props.data
      .slice(renderInfo.cacheStart, renderInfo.cacheEnd + 1)
      .map((itemData, i) => ({ ...positions[renderInfo.cacheStart + i], itemData }));
  });
  return {
    ...toRefs(renderInfo),
    positions,
    containerStyle,
    listStyle,
    renderData,
  };
};
