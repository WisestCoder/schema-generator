import pcWidgets from './pc';
import mobileWidgets from './mobile';
import settingWidgets from './settings';

export const widgets = {
  pc: {
    ...pcWidgets,
    ...settingWidgets
  },
  mobile: {
    ...mobileWidgets,
    ...settingWidgets
  }
}
