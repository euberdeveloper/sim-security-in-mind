import MangleConstructor from './mangle-constructor.md?raw';
import MangleType from './mangle-type.md?raw';
import MangleClassIdentifier from './mangle-class-identifier.md?raw';
import MangleMethod from './mangle-method.md?raw';

const markdowns = {
  MangleConstructor,
  MangleType,
  MangleClassIdentifier,
  MangleMethod
};

export type MarkdownKey = keyof typeof markdowns;

export default markdowns;
