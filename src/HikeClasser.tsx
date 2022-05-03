import {
  DefineComponent,
  defineComponent,
  inject,
  InjectionKey,
  PropType,
  provide,
  reactive, SetupContext,
  watch,
  h, Fragment,
} from 'vue';

declare type AppClassName = string;
declare type LibClassName = string;
type Classes = Record<LibClassName, AppClassName>;

interface ClasserProviderProp {
  classes: Classes;
}

const ClasserProviderKey: InjectionKey<ClasserProviderProp> = Symbol('classerProviderKey');

const ClasserProvider = defineComponent({
  name: 'ClasserProvider',
  inheritAttrs: false,
  props: {
    classes: {
      type: Object as PropType<Classes>,
      required: true,
      default() {
        return {} as Classes;
      },
    },
  },
  setup(props: ClasserProviderProp, { slots }) {
    const context = reactive({ classes: { ...props.classes } });

    provide(ClasserProviderKey, context);

    watch(() => props.classes, () => {
      context.classes = props.classes;
    }, { deep: true });

    return () => slots.default?.();
  },
}) as DefineComponent<ClasserProviderProp>;

function useClasser(libClassPrefix: string, customClasses = {} as Classes) {
  return getClasser.call(null, libClassPrefix, customClasses);
}

function getClasser(libClassPrefix: string, customClasses: Classes) {
  return function classer() {
    const libClassSuffixList: string[] = [];

    const outer = inject(ClasserProviderKey, { classes: {} });
    const classes = useMerge(outer.classes || {}, customClasses);

    for (let i = 0; i < arguments.length; i++) {
      libClassSuffixList[i] = arguments[i];
    }
    const libClassList =
      libClassSuffixList.map((libClassSuffix) => libClassPrefix +
        (libClassPrefix && libClassSuffix ? '-' : '') +
        libClassSuffix);

    const outputList = libClassList.slice();
    libClassList.forEach((libClass) => {
      if (libClass in classes) {
        outputList.push(classes[libClass]);
      }
    });

    return outputList.join(' ');
  } as (...libClassSuffixList: string[]) => string;
}

function useMerge(outer: Classes, inner: Classes) {
  return { ...outer, ...inner } as Classes;
}

function getClasserContext(): { classes: Classes } {
  return inject(ClasserProviderKey, { classes: {} as Classes });
}

export { ClasserProvider, getClasserContext, useClasser };
export type { Classes, ClasserProviderProp };
