import { library, dom } from '@fortawesome/fontawesome-svg-core';
import * as icon from './icons.js';

library.add(
    icon.faUser,
    icon.faGear,
    icon.faCircleQuestion,
    icon.faMoon,
    icon.faArrowRightFromBracket,
    icon.faChevronRight
);

dom.watch();
