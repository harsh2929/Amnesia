
import {createEmotionCache} from '@/styles/utils/index';
import {DeepPartial} from '@/utils/types';
import {render, RenderOptions} from '@testing-library/react';
import {merge} from 'lodash';
import React, {ReactElement, ReactNode} from 'react';
import {Provider} from 'react-redux';
import {GmapContainer, GstvContainer} from '@/services/google';
import {ThemeWrapper} from '../src/pages/wrappers/theme';
import {createStore, initialStates, RootState} from '../src/redux/store';

const emotionCache = createEmotionCache();
function customRender(
  ui: ReactElement,
  store: ReturnType<typeof createStore> = createStore(),
  options?: Omit<RenderOptions, 'wrapper'>
) {
  const Wrapper = ({children}: {children: ReactNode}) => {
    return (
      <Provider store={store}>
        <ThemeWrapper emotionCache={emotionCache}>
          <GmapContainer />
          <GstvContainer />
          {children}
        </ThemeWrapper>
      </Provider>
    );
  };

  return render(ui, {
    wrapper: Wrapper,
    ...options,
  });
}
export * from '@testing-library/react';
export {customRender as render};
export {createStore as createMockStore};
export {mock};
export {initialStates as __actualInitialAppState};
const mock = (
  partialState: DeepPartial<RootState> = {}
): RootState => {
  if (!Object.keys(partialState).length) return initialStates;
  return merge({}, initialStates, partialState);
};
