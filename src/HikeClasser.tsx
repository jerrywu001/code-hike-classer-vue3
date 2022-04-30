import {
  computed,
  DefineComponent,
  defineComponent,
  getCurrentInstance,
  inject,
  InjectionKey,
  PropType,
  provide,
  unref,
} from 'vue';

declare type AppClassName = string;
declare type LibClassName = string;
type Classes = Record<LibClassName, AppClassName>;

interface ClasserProviderProp {
  classes: Classes;
}

const ClasserProviderKey: InjectionKey<Classes> = Symbol('classerProviderKey');

const ClasserProvider = defineComponent({
  name: 'ClasserProvider',
  inheritAttrs: true,
  props: {
    classes: {
      type: Object as PropType<Classes>,
      required: true,
    },
  },
  setup(props: ClasserProviderProp, { slots }) {
    const mergedClass = useMerge({}, props.classes);

    provide(ClasserProviderKey, mergedClass);

    return () => (
      <div>{ slots.default ? slots.default() : null }</div>
    );
  },
}) as DefineComponent<ClasserProviderProp>;

function useClasser(libClassPrefix: string, innerClasses = {} as Classes) {
  const instance = (getCurrentInstance() || {}) as any;
  const provides: Record<symbol, any> = instance.provides || {};
  const hasContext = !!provides[ClasserProviderKey as symbol];
  const outer = hasContext ? inject(ClasserProviderKey) : null;

  const mergedClass = useMerge(outer || {}, innerClasses);
  return getClasser.call(null, libClassPrefix, mergedClass);
}

function getClasser(libClassPrefix: string, classes = {} as Classes) {
  return function classer() {
    const libClassSuffixList: string[] = [];
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
  const mergedClassed = computed(() => ({ ...outer, ...inner } as Classes));
  return unref(mergedClassed);
}

export { ClasserProvider, ClasserProviderKey, useClasser, Classes };

export default ClasserProvider;
